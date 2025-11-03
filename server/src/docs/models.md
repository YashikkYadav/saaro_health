# Database Models Documentation (saronewbackend)

This document provides detailed information about all the Mongoose models used in the saronewbackend application, including field names, types, required status, references, and other constraints.

## Doctor Model

**File:** `modules/doctor/doctor.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| name | String | Yes | - | - | - |
| rmcNumber | String | Yes | - | - | Unique, Indexed |
| phoneNumber | String | Yes | - | - | Indexed |
| email | String | Yes | - | - | Unique, Indexed |
| city | String | Yes | - | - | - |
| address | String | No | - | - | - |
| clinicName | String | No | - | null | - |
| password | String | Yes | - | - | - |
| experience | Number | No | - | 0 | - |
| education | String | No | - | "" | - |
| bio | String | No | - | "" | - |
| avatar | String | No | - | "" | - |
| introduction | String | No | - | "" | - |
| happyClients | Number | No | - | 0 | - |
| about | String | No | - | "" | - |
| qualification | String | No | - | - | - |
| gender | String | No | - | - | - |
| cashlessAvailable | Boolean | No | - | - | - |
| rating | String | No | - | - | - |
| reviews | Array | No | Review | - | Array of ObjectIds |
| clinicAddress | Array | No | - | - | Array of Strings |
| availableDates | Array | No | - | - | Array of Strings |
| awards | Array | No | - | - | Array of Strings |
| topTreatments | Array | No | - | - | Array of treatmentSchema objects |
| specialization | String | No | - | - | - |
| surgeries | Array | No | - | - | Array of Strings |
| locations | Array | No | - | - | Array of location objects |
| locations.latitude | String | No | - | - | - |
| locations.longitude | String | No | - | - | - |
| unavailabilityDate.from | Date | No | - | - | - |
| unavailabilityDate.to | Date | No | - | - | - |
| availabilityAfter | Number | No | - | - | - |
| patients | Array | No | Patient | - | Array of ObjectIds |
| appointments | Array | No | Appointment | - | Array of ObjectIds |
| prescriptions | Array | No | Prescription | - | Array of ObjectIds |
| documents | Array | No | Document | - | Array of ObjectIds |
| invoices | Array | No | Invoice | - | Array of ObjectIds |
| messages | Array | No | Message | - | Array of ObjectIds |

## Patient Model

**File:** `modules/patient/patient.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| uid | String | Yes | - | - | Unique, Indexed |
| title | String | Yes | - | - | - |
| fullName | String | Yes | - | - | - |
| phoneNumber | Number | Yes | - | - | Indexed |
| spouseName | String | No | - | null | - |
| alternatePhoneNumber | Number | No | - | null | - |
| dateOfBirth | Date | Yes | - | - | - |
| age | Number | No | - | - | - |
| gender | String | No | - | null | - |
| email | String | No | - | null | - |
| address | String | No | - | - | - |
| bloodGroup | String | No | - | null | - |
| allergies | String | No | - | null | - |
| tags | String | No | - | null | - |
| referredBy | String | No | - | null | - |
| otp | Number | No | - | null | - |
| category | String | No | - | 'Follow-up' | - |
| status | String | No | - | 'Waiting' | Enum: ['Waiting', 'In Consultation', 'Completed'] |
| doctors | Array | No | Doctor | - | Array of ObjectIds |
| appointments | Array | No | Appointment | - | Array of ObjectIds |
| prescriptions | Array | No | Prescription | - | Array of ObjectIds |
| documents | Array | No | Document | - | Array of ObjectIds |
| invoices | Array | No | Invoice | - | Array of ObjectIds |
| messages | Array | No | Message | - | Array of ObjectIds |

## Appointment Model

**File:** `modules/appointment/appointment.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| doctorId | ObjectId | Yes | Doctor | - | Indexed |
| patientId | ObjectId | Yes | Patient | - | Indexed |
| location | String | Yes | - | - | - |
| date | Date | Yes | - | - | - |
| time | String | Yes | - | - | - |
| type | String | Yes | - | - | - |
| markComplete | Boolean | No | - | false | - |
| status | String | No | - | 'Pending' | - |
| source | String | No | - | 'manual' | Enum: ['manual', 'public_booking', 'qr_code', 'whatsapp'] |
| reason | String | No | - | - | - |
| email | String | No | - | - | - |

## Prescription Model

**File:** `modules/prescription/prescription.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| doctorId | ObjectId | Yes | Doctor | - | Indexed |
| patientId | ObjectId | Yes | Patient | - | Indexed |
| vitals.bloodPressure | String | No | - | '' | - |
| vitals.pulse | String | No | - | '' | - |
| vitals.height | String | No | - | '' | - |
| vitals.weight | String | No | - | '' | - |
| vitals.temperature | String | No | - | '' | - |
| vitals.painScore | String | No | - | '' | - |
| vitals.oxygenSaturation | String | No | - | '' | - |
| vitals.respiratoryRate | String | No | - | '' | - |
| complaints | Array | No | - | - | Array of objects with text and id |
| pastHistory | Array | No | - | - | Array of objects with value and id |
| surgicalHistory | Array | No | - | - | Array of objects with value and id |
| drugAllergy | Array | No | - | - | Array of objects with value and id |
| physicalExamination | Array | No | - | - | Array of objects with text and id |
| diagnosis.provisional | Array | No | - | - | Array of objects with value and id |
| diagnosis.final | Array | No | - | - | Array of objects with value and id |
| tests | Array | No | - | - | Array of objects with value and id |
| medication | Array | No | - | - | Array of objects with name, dosage, frequency, duration, notes, and id |
| advice | String | No | - | '' | - |
| followUp | Array | No | - | - | Array of strings |
| customSections | Array | No | - | - | Array of objects with required id, heading, and fields |
| bloodPressure | String | No | - | null | Legacy field |
| pulse | String | No | - | null | Legacy field |
| height | String | No | - | null | Legacy field |
| weight | String | No | - | null | Legacy field |
| temperature | String | No | - | null | Legacy field |
| painScore | String | No | - | null | Legacy field |
| complaints | Array | No | - | - | Legacy field, array of strings |
| history | Array | No | - | - | Legacy field, array of strings |
| drugHistory | Array | No | - | - | Legacy field, array of objects |
| drugAllergy | Array | No | - | - | Legacy field, array of objects |
| antiplatlet | Array | No | - | - | Legacy field, array of objects |
| previousSurgery | String | No | - | null | Legacy field |
| provisional | String | No | - | null | Legacy field |
| physicalExamination | Array | No | - | - | Legacy field, array of strings |
| investigationsAdviced | Array | No | - | - | Legacy field, array of objects |
| diagnosis | Array | No | - | - | Legacy field, array of objects |
| medications | Array | No | - | - | Legacy field, array of objects |
| advice | Array | No | - | - | Legacy field, array of strings |
| followUp.days | String | No | - | null | Legacy field |
| followUp.date | String | No | - | null | Legacy field |
| referredTo | Array | No | - | - | Legacy field, array of objects |
| referredBy.name | String | No | - | null | Legacy field |
| referredBy.speciality | String | No | - | null | Legacy field |
| implant | Array | No | - | - | Legacy field, array of objects |
| surgeryAdvice.name | String | No | - | null | Legacy field |
| surgeryAdvice.date | String | No | - | null | Legacy field |
| tags | String | No | - | null | Legacy field |
| status | String | No | - | 'draft' | Enum: ['draft', 'complete', 'archived'] |
| additionalVitals | Array | No | - | - | - |
| additionalSections | Array | No | - | - | - |
| consultationDate | Date | No | - | Date.now | - |
| consultationType | String | No | - | 'general' | Enum: ['general', 'followup', 'emergency', 'specialty'] |
| notes | String | No | - | '' | - |

## Document Model

**File:** `modules/document/document.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| doctorId | ObjectId | Yes | Doctor | - | Indexed |
| patientId | ObjectId | Yes | Patient | - | Indexed |
| name | String | Yes | - | - | - |
| patientName | String | Yes | - | - | - |
| type | String | Yes | - | - | Enum: ['Medical Report', 'Lab Report', 'X-Ray', 'Prescription', 'Discharge Summary', 'Surgery Report', 'Other'] |
| fileName | String | Yes | - | - | - |
| fileUrl | String | Yes | - | - | - |
| fileSize | Number | Yes | - | - | - |
| mimeType | String | Yes | - | - | - |

## Invoice Model

**File:** `modules/invoice/invoice.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| doctorId | ObjectId | Yes | Doctor | - | Indexed |
| patientId | ObjectId | Yes | Patient | - | Indexed |
| invoiceId | String | Yes | - | - | Unique, Indexed |
| name | String | Yes | - | - | - |
| uid | String | Yes | - | - | Indexed |
| phone | String | Yes | - | - | - |
| paymentStatus | String | No | - | 'Unbilled' | - |
| privateNote | String | No | - | - | - |
| items | Array | No | - | - | Array of objects with service, amount, quantity, and discount |
| additionalDiscountAmount | Number | No | - | 0 | - |
| totalAmount | Number | No | - | 0 | - |
| paymentMode | String | No | - | 'Cash' | - |
| patientNote | String | No | - | null | - |

## Message Model

**File:** `modules/message/message.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| doctorId | ObjectId | Yes | Doctor | - | - |
| patientId | ObjectId | Yes | Patient | - | - |
| sender | String | Yes | - | - | Enum: ['doctor', 'patient'] |
| content | String | Yes | - | - | - |
| timestamp | Date | No | - | Date.now | - |

## DoctorPatient Model

**File:** `modules/doctorPatient/doctorPatient.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| doctorId | ObjectId | Yes | Doctor | - | Indexed |
| patientId | ObjectId | Yes | Patient | - | Indexed |

## User Model

**File:** `modules/user/user.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| name | String | Yes | - | - | Trim |
| phone | String | Yes | - | - | Unique, Trim |
| email | String | Yes | - | - | Unique, Lowercase |
| password | String | Yes | - | - | - |
| role | String | Yes | - | - | Enum: ["admin", "sub_admin", "doctor", "sub_agent", "patient"] |
| otp | String | No | - | null | - |
| otpExpiry | Date | No | - | null | - |
| isOtpVerified | Boolean | No | - | false | - |
| isActive | Boolean | No | - | true | - |
| isBlocked | Boolean | No | - | false | - |
| lastLogin | Date | No | - | null | - |
| doctorId | ObjectId | No | Doctor | null | - |
| patientId | ObjectId | No | Patient | null | - |

## Dropdown Model

**File:** `modules/dropdown/dropdown.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| id | Number | Yes | - | - | - |
| name | String | Yes | - | - | - |

## DropdownLibrary Model

**File:** `modules/dropdownLibrary/dropdownLibrary.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| doctorId | ObjectId | Yes | Doctor | - | Indexed |
| sectionId | String | Yes | - | - | - |
| sectionName | String | Yes | - | - | - |
| name | String | Yes | - | - | Indexed |
| creator | String | No | - | "System" | - |

## FileUploader Model

**File:** `modules/fileUploader/fileUploader.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| fileUrl | String | Yes | - | - | Unique |
| patientId | ObjectId | No | Patient | - | Indexed |
| doctorId | ObjectId | Yes | Doctor | - | - |
| type | String | Yes | - | - | - |
| admissionDate | String | No | - | - | - |
| dischargeDate | String | No | - | - | - |
| status | String | No | - | 'Admitted' | - |

## Library Model

**File:** `modules/library/library.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| id | Number | Yes | - | - | - |
| name | String | Yes | - | - | - |
| fields | Array | Yes | - | - | Array of Strings |

## MedicineLibrary Model

**File:** `modules/medicineLibrary/medicineLibrary.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| doctorId | ObjectId | Yes | Doctor | - | Indexed |
| name | String | Yes | - | - | Indexed |
| composition | String | Yes | - | - | - |
| frequency | String | No | - | '' | - |
| dosage | String | No | - | '' | - |
| notes | String | No | - | '' | - |
| createdBy | String | No | - | '' | - |

## PrescriptionSection Model

**File:** `modules/prescriptionSection/prescriptionSection.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| doctorId | ObjectId | Yes | Doctor | - | Indexed |
| label | String | Yes | - | - | - |
| fieldType | String | Yes | - | - | - |
| placeholder | String | No | - | - | - |
| sectionType | String | Yes | - | - | - |
| printable | Boolean | No | - | false | - |

## Surgery Model

**File:** `modules/surgery/surgery.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| prescriptionId | ObjectId | Yes | Prescription | - | Indexed |
| doctorId | ObjectId | Yes | Doctor | - | Indexed |
| type | String | Yes | - | - | - |
| name | String | Yes | - | - | - |
| date | String | Yes | - | - | - |

## TemplateLibrary Model

**File:** `modules/templateLibrary/templateLibrary.model.js`

### Fields

| Field Name | Type | Required | References | Default | Other Constraints |
|------------|------|----------|------------|---------|-------------------|
| doctorId | ObjectId | Yes | Doctor | - | Indexed |
| sectionId | String | Yes | - | - | - |
| sectionName | String | Yes | - | - | - |
| name | String | Yes | - | - | Indexed |
| data | Array | Yes | - | - | Array of Objects |