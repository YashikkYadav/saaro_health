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
