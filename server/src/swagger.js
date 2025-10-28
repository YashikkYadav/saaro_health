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
            opdLocations: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  clinicName: {
                    type: "string"
                  },
                  city: {
                    type: "string"
                  },
                  address: {
                    type: "string"
                  },
                  days: {
                    type: "object",
                    properties: {
                      Mon: {
                        type: "boolean"
                      },
                      Tue: {
                        type: "boolean"
                      },
                      Wed: {
                        type: "boolean"
                      },
                      Thu: {
                        type: "boolean"
                      },
                      Fri: {
                        type: "boolean"
                      },
                      Sat: {
                        type: "boolean"
                      },
                      Sun: {
                        type: "boolean"
                      }
                    }
                  },
                  startTime: {
                    type: "string",
                    format: "time"
                  },
                  endTime: {
                    type: "string",
                    format: "time"
                  },
                  slotMins: {
                    type: "number"
                  },
                  active: {
                    type: "boolean"
                  },
                  mapLocation: {
                    type: "object",
                    properties: {
                      lat: {
                        type: "number"
                      },
                      lng: {
                        type: "number"
                      }
                    }
                  }
                }
              },
              description: "Doctor's OPD locations"
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
        },
        Appointment: {
          type: "object",
          required: ["doctorId", "patientId", "location", "date", "time", "type"],
          properties: {
            _id: {
              type: "string",
              description: "Appointment ID"
            },
            doctorId: {
              type: "string",
              description: "Doctor ID"
            },
            patientId: {
              type: "string",
              description: "Patient ID"
            },
            location: {
              type: "string",
              description: "Appointment location"
            },
            date: {
              type: "string",
              format: "date-time",
              description: "Appointment date and time"
            },
            time: {
              type: "string",
              description: "Appointment time"
            },
            type: {
              type: "string",
              description: "Appointment type"
            },
            markComplete: {
              type: "boolean",
              description: "Whether appointment is marked complete"
            },
            status: {
              type: "string",
              description: "Appointment status"
            },
            source: {
              type: "string",
              enum: ["manual", "public_booking", "qr_code", "whatsapp"],
              description: "Appointment source"
            },
            reason: {
              type: "string",
              description: "Appointment reason"
            },
            email: {
              type: "string",
              format: "email",
              description: "Patient email"
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
        Invoice: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Invoice ID"
            },
            doctorId: {
              type: "string",
              description: "Doctor ID"
            },
            patientId: {
              type: "string",
              description: "Patient ID"
            },
            invoiceId: {
              type: "string",
              description: "Invoice ID"
            },
            name: {
              type: "string",
              description: "Invoice name"
            },
            uid: {
              type: "string",
              description: "Unique identifier"
            },
            phone: {
              type: "string",
              description: "Phone number"
            },
            paymentStatus: {
              type: "string",
              enum: ["Unbilled", "Billed", "Paid", "Overdue"],
              description: "Invoice payment status"
            },
            privateNote: {
              type: "string",
              description: "Private notes"
            },
            items: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  service: {
                    type: "string",
                    description: "Service description"
                  },
                  amount: {
                    type: "number",
                    description: "Service amount"
                  },
                  quantity: {
                    type: "number",
                    description: "Service quantity"
                  },
                  discount: {
                    type: "number",
                    description: "Service discount"
                  }
                }
              },
              description: "Invoice items"
            },
            additionalDiscountAmount: {
              type: "number",
              description: "Additional discount amount"
            },
            totalAmount: {
              type: "number",
              description: "Invoice total amount"
            },
            paymentMode: {
              type: "string",
              enum: ["Cash", "Card", "UPI", "Bank Transfer"],
              description: "Invoice payment method"
            },
            patientNote: {
              type: "string",
              description: "Patient notes"
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
        Prescription: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "Prescription ID"
            },
            doctorId: {
              type: "string",
              description: "Doctor ID"
            },
            patientId: {
              type: "string",
              description: "Patient ID"
            },
            vitals: {
              type: "object",
              properties: {
                bloodPressure: {
                  type: "string"
                },
                pulse: {
                  type: "string"
                },
                height: {
                  type: "string"
                },
                weight: {
                  type: "string"
                },
                temperature: {
                  type: "string"
                },
                painScore: {
                  type: "string"
                },
                oxygenSaturation: {
                  type: "string"
                },
                respiratoryRate: {
                  type: "string"
                }
              },
              description: "Patient vitals"
            },
            complaints: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  text: {
                    type: "string"
                  },
                  id: {
                    type: "string"
                  }
                }
              },
              description: "Chief complaints"
            },
            pastHistory: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  value: {
                    type: "string"
                  },
                  id: {
                    type: "string"
                  }
                }
              },
              description: "Past medical history"
            },
            surgicalHistory: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  value: {
                    type: "string"
                  },
                  id: {
                    type: "string"
                  }
                }
              },
              description: "Surgical history"
            },
            drugAllergy: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  value: {
                    type: "string"
                  },
                  id: {
                    type: "string"
                  }
                }
              },
              description: "Drug allergies"
            },
            physicalExamination: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  text: {
                    type: "string"
                  },
                  id: {
                    type: "string"
                  }
                }
              },
              description: "Physical examination findings"
            },
            diagnosis: {
              type: "object",
              properties: {
                provisional: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      value: {
                        type: "string"
                      },
                      id: {
                        type: "string"
                      }
                    }
                  }
                },
                final: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      value: {
                        type: "string"
                      },
                      id: {
                        type: "string"
                      }
                    }
                  }
                }
              },
              description: "Diagnosis information"
            },
            tests: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  value: {
                    type: "string"
                  },
                  id: {
                    type: "string"
                  }
                }
              },
              description: "Investigation tests"
            },
            medication: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    type: "string"
                  },
                  dosage: {
                    type: "string"
                  },
                  frequency: {
                    type: "string"
                  },
                  duration: {
                    type: "string"
                  },
                  notes: {
                    type: "string"
                  },
                  id: {
                    type: "string"
                  }
                }
              },
              description: "Medications prescribed"
            },
            advice: {
              type: "string",
              description: "Medical advice"
            },
            followUp: {
              type: "array",
              items: {
                type: "string"
              },
              description: "Follow-up instructions"
            },
            status: {
              type: "string",
              enum: ["draft", "complete", "archived"],
              description: "Prescription status"
            },
            consultationDate: {
              type: "string",
              format: "date-time",
              description: "Consultation date"
            },
            consultationType: {
              type: "string",
              enum: ["general", "followup", "emergency", "specialty"],
              description: "Type of consultation"
            },
            notes: {
              type: "string",
              description: "Additional notes"
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
        Review: {
          type: "object",
          required: ["text", "rating", "doctorId", "patientId"],
          properties: {
            _id: {
              type: "string",
              description: "Review ID"
            },
            text: {
              type: "string",
              description: "Review text"
            },
            rating: {
              type: "number",
              description: "Rating out of 5",
              minimum: 1,
              maximum: 5
            },
            doctorId: {
              type: "string",
              description: "Doctor ID"
            },
            patientId: {
              type: "string",
              description: "Patient ID"
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