const express = require("express");
const patientController = require("../controllers/patientController");
const router = express.Router();

router.route("/").get(patientController.getHompage);
router.route("/patients").get(patientController.getPatientForm);
router.route("/addpatients").post(patientController.addPatientsDetails);
router.route("/confirmationpage").get(patientController.getConfirmationPage);
router
  .route("/sendemail")
  .get(patientController.sendEmail)
  .post(patientController.sendEmail);

router.route("/refnumber").get(patientController.getReferencePage);



router
  .route("/signup")
  .get(patientController.getSignUp)
  .post(patientController.addUser);

module.exports = router;
