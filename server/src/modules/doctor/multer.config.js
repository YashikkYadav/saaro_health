const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../../../uploads/avatars');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'avatar-' + uniqueSuffix + extension);
  }
});

// File filter to only allow images
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Image processing middleware
const processImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    // Process and compress the image
    const imagePath = req.file.path;
    const compressedPath = imagePath.replace(path.extname(imagePath), '_compressed' + path.extname(imagePath));
    
    // First resize to a reasonable size
    await sharp(imagePath)
      .resize(512, 512, { 
        fit: 'inside',
        withoutEnlargement: true 
      })
      .jpeg({ 
        quality: 85,
        force: false 
      })
      .png({ 
        compressionLevel: 8,
        force: false 
      })
      .toFile(compressedPath);
    
    // Check file size and adjust quality if needed to stay under 100KB
    let stats = fs.statSync(compressedPath);
    let quality = 85;
    
    // If file is still too large, compress further
    if (stats.size > 100 * 1024) { // 100KB
      // Calculate target quality based on current size
      quality = Math.max(30, Math.floor(85 * (100 * 1024) / stats.size));
      
      await sharp(imagePath)
        .resize(512, 512, { 
          fit: 'inside',
          withoutEnlargement: true 
        })
        .jpeg({ 
          quality: quality,
          force: false 
        })
        .png({ 
          compressionLevel: 9,
          force: false 
        })
        .toFile(compressedPath);
      
      // Check again after compression
      stats = fs.statSync(compressedPath);
      
      // If still too large, resize smaller
      if (stats.size > 100 * 1024) {
        const scaleFactor = Math.sqrt((100 * 1024) / stats.size) * 0.9; // 0.9 for safety margin
        const newWidth = Math.floor(512 * scaleFactor);
        const newHeight = Math.floor(512 * scaleFactor);
        
        await sharp(imagePath)
          .resize(newWidth, newHeight, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .jpeg({ 
            quality: Math.max(30, quality - 10),
            force: false 
          })
          .png({ 
            compressionLevel: 9,
            force: false 
          })
          .toFile(compressedPath);
      }
    }
    
    // Replace original file with compressed version
    fs.unlinkSync(imagePath);
    fs.renameSync(compressedPath, imagePath);
    
    // Update file size in req.file
    const newStats = fs.statSync(imagePath);
    req.file.size = newStats.size;
    
    next();
  } catch (error) {
    console.error('Image processing error:', error);
    next(new Error('Failed to process image: ' + error.message));
  }
};

// Create multer instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit for upload
  }
});

module.exports = { upload, processImage };