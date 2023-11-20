const { sequelize } = require("../../config/database");
const { DataTypes, UUID } = require("sequelize");

const Patient = sequelize.define("Patient", {
  patientId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  patientsTelephone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  patientsName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientsDateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  patientsIdNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  patientsAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientsCounty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientsSubCounty: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientsEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  patientsGender: {
    type: DataTypes.ENUM,
    values: ["Male", "Female", "Other", "Rather not say"],
  },
  patientsMaritalStatus: {
    type: DataTypes.ENUM,
    values: ["Single", "Married", "Divorced"],
  },
});

Patient.beforeSync(() => {
  console.log("before creating patient table");
});
Patient.afterSync(() => {
  console.log("after creating patient table");
});

const PatientKin = sequelize.define("PatientKin", {
  kinId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  kinsName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kinsDateOfBirth: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  kinsIdNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  kinsGender: {
    type: DataTypes.ENUM,
    values: ["Male", "Female", "Other", "Rather not say"],
  },
  kinsRelationship: {
    type: DataTypes.ENUM,
    values: [
      "Father",
      "Mother",
      "Sibling",
      "Guardian",
      "Cousin",
      "Uncle",
      "Aunt",
    ],
  },
  kinsTelephone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

Patient.hasOne(PatientKin, {
  foreignKey: {
    name: "patientId",
    type: DataTypes.UUID,
  },
});

PatientKin.belongsTo(Patient);

PatientKin.beforeSync(() => {
  console.log("before creating kin table");
});

PatientKin.afterSync(() => {
  console.log("after creating kin table");
});

module.exports = { Patient, PatientKin };
