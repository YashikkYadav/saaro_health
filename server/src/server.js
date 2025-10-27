const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/error.middleware");
const { swaggerDocs } = require("./swagger");
const requestLogger = require("./middlewares/requestLogger.middleware");

dotenv.config();
const app = express();

// Request logging middleware
app.use(requestLogger);

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api", routes);

// Swagger
swaggerDocs(app);

// Global error handler
app.use(errorHandler);

// Test route
app.get("/", (req, res) => res.send("Server is running"));

// Start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT} 😎😎`));
});