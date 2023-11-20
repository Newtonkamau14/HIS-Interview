const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const { Patient, PatientKin } = require("./../models/patient.model");
const { User } = require("./../models/user.model");
const { Address } = require("./../models/address.model");
exports.getHompage = (req, res) => {
  res.render("homepage");
};

exports.getPatientForm = (req, res) => {
  res.render("patientform");
};

exports.addPatientsDetails = async (req, res) => {
  try {
    //Validate patient fields if empty
    if (
      !req.body.patientsTelephone ||
      !req.body.patientsName ||
      !req.body.patientsEmail
    ) {
      res
        .status(400)
        .json({ message: "Missing required fields in patient's form" })
        .redirect("/patients");
      return;
    }
    if (
      !req.body.kinsName ||
      !req.body.kinsIdNumber ||
      !req.body.kinsTelephone
    ) {
      res
        .status(400)
        .json({ message: "Missing required fields in next of kin's form" })
        .redirect("/patients");
    }
    //check if patient exists
    const [patient, patientCreated] = await Patient.findOrCreate({
      where: {
        [Op.and]: [
          {
            patientsTelephone: req.body.patientsTelephone,
          },
          {
            patientsIdNumber: req.body.patientsIdNumber,
          },
          {
            patientsEmail: req.body.patientsEmail,
          },
        ],
      },
      defaults: {
        patientsTelephone: req.body.patientsTelephone,
        patientsName: req.body.patientsName,
        patientsDateOfBirth: req.body.patientsDateOfBirth,
        patientsIdNumber: req.body.patientsIdNumber,
        patientsAddress: req.body.patientsAddress,
        patientsCounty: req.body.patientsCounty,
        patientsSubCounty: req.body.patientsSubCounty,
        patientsEmail: req.body.patientsEmail,
        patientsGender: req.body.patientsGender,
        patientsMaritalStatus: req.body.patientsMaritalStatus,
      },
    });

    if (!patientCreated) {
      res.status(400).json({ message: "Patient already exists." });
      return;
    }

    await PatientKin.create({
      kinsName: req.body.kinsName,
      kinsDateOfBirth: req.body.kinsDateOfBirth,
      kinsIdNumber: req.body.kinsIdNumber,
      kinsGender: req.body.kinsGender,
      kinsRelationship: req.body.kinsRelationship,
      kinsTelephone: req.body.kinsTelephone,
    });

    res.redirect("/confirmationpage");
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    res.status(500).json({ message: "An internal server error occurred." });
    res.render("patientform");
  }
};

exports.getConfirmationPage = (req, res) => {
  res.render("confirmationpage");
};
/*send ref number*/
exports.sendEmail = async (req, res) => {
  try {
    const [patient, patientNotCreated] = await Patient.findAll({
      attributes: ["patientId", "patientsEmail"],
      where: {
        patientsEmail: req.body.patientsEmail,
      },
    });
    /* if (!patientNotCreated) {
      res.status(404).json({ message: "Patient does not exist" });
      return;
    } */

    let pId = patient.patientId;

    let refNo = "";
    for (let i = 0; i < 8; i++) {
      refNo += pId[i].toUpperCase();
    }

   
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APPPASSWORD,
      },
    });
    const option = {
      from: process.env.EMAIL,
      to: req.body.patientsEmail,
      subject: `Patient reference number`,
      text: `This is the reference number to submit ${refNo}`,
    };
    console.log(option)
    await transporter.sendMail(option, function (error, info) {
      if (error) {
        console.log(error);
        res.redirect("/sendemail");
      } else {
        console.log("mail sent", info);
        res.redirect("/refnumber");
      }
    });

    // res.status(200).json({message: "ok"});
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

exports.getReferencePage = (req, res) => {
  res.render("viewreferencenumber");
};

exports.getSignUp = (req, res) => {
  res.render("signup");
};

exports.addUser = async (req, res) => {
  try {
    const [user, userCreated] = await User.findOrCreate({
      where: {
        [Op.and]: [{ username: req.body.username }, { email: req.body.email }],
      },
      defaults: {
        username: req.body.username,
        email: req.body.email,
        dob: req.body.dob,
        password: req.body.password,
      },
    });
    if (!userCreated) {
      res.status(400).json({ message: "User already exists." });
      return;
    }

    await Address.create({
      country: req.body.country,
      city: req.body.city,
      street: req.body.street,
      houseNumber: req.body.houseNumber,
    });
    res.redirect("/");
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    res.status(500).json({ message: "An internal server error occurred." });
    res.render("signup");
  }
};
