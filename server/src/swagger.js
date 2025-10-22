const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Saaro Health API",
      version: "1.0.0",
      description: "API documentation for Saaro Health Clinic Management System",
      contact: {
        name: "Saaro Health Support",
        email: "support@saarohealth.com"
      }
    },
    servers: [
      { url: "http://localhost:5000", description: "Local server" },
      { url: "https://api.saarohealth.com", description: "Production server" }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },
      schemas: {
        Doctor: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Doctor ID"
            },
            name: {
              type: "string",
              description: "Doctor's full name"
            },
            rmcNumber: {
              type: "string",
              description: "Doctor's registration number"
            },
            phoneNumber: {
              type: "string",
              description: "Doctor's phone number"
            },
            email: {
              type: "string",
              format: "email",
              description: "Doctor's email address"
            },
            city: {
              type: "string",
              description: "Doctor's city"
            },
            address: {
              type: "string",
              description: "Doctor's address"
            },
            clinicName: {
              type: "string",
              description: "Doctor's clinic name"
            },
            experience: {
              type: "number",
              description: "Doctor's experience in years"
            },
            education: {
              type: "string",
              description: "Doctor's education"
            },
            bio: {
              type: "string",
              description: "Doctor's bio"
            },
            avatar: {
              type: "string",
              description: "Doctor's avatar URL"
            },
            introduction: {
              type: "string",
              description: "Doctor's introduction"
            },
            happyClients: {
              type: "number",
              description: "Number of happy clients"
            },
            about: {
              type: "string",
              description: "About the doctor"
            },
            qualification: {
              type: "string",
              description: "Doctor's qualification"
            },
            gender: {
              type: "string",
              description: "Doctor's gender"
            },
            cashlessAvailable: {
              type: "boolean",
              description: "Whether cashless payment is available"
            },
            rating: {
              type: "string",
              description: "Doctor's rating"
            },
            clinicAddress: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Clinic addresses"
            },
            availableDates: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Available dates"
            },
            awards: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Doctor's awards"
            },
            specialization: {
              type: "string",
              description: "Doctor's specialization"
            },
            surgeries: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Doctor's surgeries"
            },
            patients: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Patient IDs"
            },
            appointments: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Appointment IDs"
            },
            prescriptions: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Prescription IDs"
            },
            documents: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Document IDs"
            },
            invoices: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Invoice IDs"
            },
            messages: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Message IDs"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Update timestamp"
            }
          }
        },
        Patient: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Patient ID"
            },
            uid: {
              type: "string",
              description: "Patient unique ID"
            },
            title: {
              type: "string",
              description: "Patient title"
            },
            fullName: {
              type: "string",
              description: "Patient full name"
            },
            phoneNumber: {
              type: "number",
              description: "Patient phone number"
            },
            spouseName: {
              type: "string",
              description: "Patient spouse name"
            },
            alternatePhoneNumber: {
              type: "number",
              description: "Patient alternate phone number"
            },
            dateOfBirth: {
              type: "string",
              format: "date",
              description: "Patient date of birth"
            },
            age: {
              type: "number",
              description: "Patient age"
            },
            gender: {
              type: "string",
              description: "Patient gender"
            },
            email: {
              type: "string",
              format: "email",
              description: "Patient email"
            },
            address: {
              type: "string",
              description: "Patient address"
            },
            bloodGroup: {
              type: "string",
              description: "Patient blood group"
            },
            allergies: {
              type: "string",
              description: "Patient allergies"
            },
            tags: {
              type: "string",
              description: "Patient tags"
            },
            referredBy: {
              type: "string",
              description: "How the patient was referred"
            },
            category: {
              type: "string",
              description: "Patient category"
            },
            doctors: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Doctor IDs"
            },
            appointments: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Appointment IDs"
            },
            prescriptions: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Prescription IDs"
            },
            documents: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Document IDs"
            },
            invoices: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Invoice IDs"
            },
            messages: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Message IDs"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation timestamp"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Update timestamp"
            }
          }
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ["./src/modules/**/*.routes.js"]
};

const specs = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
  console.log("Swagger docs available at /api-docs");
};

module.exports = { swaggerDocs };