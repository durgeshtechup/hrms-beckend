const db = require("../models");
var fs = require("fs");
const { Op } = require("sequelize");
// create main model
const Staff = db.staff;
const { v4: uuid } = require("uuid");

// import { v4 as uuid } from 'uuid'
// const { sequelize, Sequelize } = require("sequelize");
// const Candidate = db.candidate
const CandidateSkill = db.department;
const Staffdocument = db.staffdocument;
const User = db.user;
const RoleModule = db.roleModule;
const Module = db.module;
const moment = require("moment");
const sendEmail = require("../Utills/emailService");

let date = Date.now();

//1. create staff
const addStaff = async (req, res) => {
  const unique_id = uuid();

  let employeCodeUUID = unique_id.slice(0, 10);

  try {
    if (!req.body) {
      res.status(400).send({
        flag: false,
        message: "Please insert all required fields.",
      });

      return;
    }
    const {
      staffPhoto,
      aadhar,
      salarySlip,
      experience,
      marksheet,
      cv,
      addressProof,
    } = req?.files;
    const {
      candidateId,
      employeCode,
      roleId,
      name,
      gender,
      dateOfBirth,
      fatherName,
      motherName,
      maidenName,
      marritalStatus,
      currentAddress,
      permanentAddress,
      email,
      mobile,
      emergencyContact,
      createdBy,
      departmentId,
      dateOfJoining,
    } = req.body;
    let info = {
      employeCode: employeCodeUUID,
      candidateId,
      roleId,
      name,
      gender,
      dateOfBirth: moment(new Date(dateOfBirth)).format("YYYY-MM-DD"),
      fatherName,
      motherName,
      maidenName,
      marritalStatus,
      currentAddress,
      permanentAddress,
      email,
      mobile,
      emergencyContact,
      departmentId,
      dateOfJoining: moment(new Date(dateOfJoining)).format("YYYY-MM-DD"),
      createdBy,
      isActive: "yes",
    };

    if (
      !name ||
      !email ||
      !mobile ||
      !createdBy ||
      !roleId
      // !employeCode
      // || !staffPhoto || !aadhar || !salarySlip || !experience || !marksheet || !cv || !addressProof
    ) {
      if (staffPhoto) {
        fs.unlink(staffPhoto[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("staffPhoto file deleted successfully");
        });
      }

      if (aadhar) {
        fs.unlink(aadhar[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("aadhar file deleted successfully");
        });
      }
      if (salarySlip) {
        fs.unlink(salarySlip[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("salarySlip file deleted successfully");
        });
      }
      if (experience) {
        fs.unlink(experience[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("experience file deleted successfully");
        });
      }
      if (marksheet) {
        fs.unlink(marksheet[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("marksheet file deleted successfully");
        });
      }
      if (cv) {
        fs.unlink(cv[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("cv file deleted successfully");
        });
      }
      if (addressProof) {
        fs.unlink(addressProof[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("addressProof file deleted successfully");
        });
      }

      res.send({
        flag: false,
        message: "Please insert all required fields.",
      });
      return false;
    }

    const currentUser = await User.findOne({ where: { userId: createdBy } });

    const currentUserRoleId = currentUser.roleId;
    const allRoleModule = await RoleModule.findAll({
      where: { roleId: currentUserRoleId },
    });
    // const module = await Module.findAll({ where: { moduleId: currentUserRoleId } })
    const isEditedModule = allRoleModule.filter(
      (f) => f.isEdited == "yes" && f.moduleId == 1
    );
    const isEditedUsers = isEditedModule.filter(
      (f) => f.roleId == currentUserRoleId
    );
    console.log("isEditedUsers", isEditedUsers);
    if (isEditedUsers?.length == 0) {
      if (staffPhoto) {
        fs.unlink(staffPhoto[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("staffPhoto file deleted successfully");
        });
      }

      if (aadhar) {
        fs.unlink(aadhar[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("aadhar file deleted successfully");
        });
      }
      if (salarySlip) {
        fs.unlink(salarySlip[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("salarySlip file deleted successfully");
        });
      }
      if (experience) {
        fs.unlink(experience[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("experience file deleted successfully");
        });
      }
      if (marksheet) {
        fs.unlink(marksheet[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("marksheet file deleted successfully");
        });
      }
      if (cv) {
        fs.unlink(cv[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("cv file deleted successfully");
        });
      }
      if (addressProof) {
        fs.unlink(addressProof[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("addressProof file deleted successfully");
        });
      }

      res.status(200).send({
        flag: false,
        message: "You dont have right to add staff.",
      });
      return false;
    }

    let allDocs = {};
    const staff = await Staff.create(info);
    if (staff?.staffId > 0) {
      const currentUser = await User.findOne({ where: { userId: createdBy } });

      sendEmail({
        subject: "New Staff Added",
        html: `<div>
            <p>Hello Sir</p>
            <p>
              I would like to inform you that a new staff ${info?.name} (
              ${info?.email}) is added by ${currentUser.email}.
            </p>
            <br  />
            <br />
            
            <p>Thanks and regards,</p>
            <p>${currentUser.email} </p>
          </div>`,
        to: process.env.FROM_EMAIL,
        from: process.env.EMAIL,
      });

      if (staffPhoto) {
        allDocs.staffdocumentPhoto = await Staffdocument.create({
          staffId: staff?.staffId,
          docType: "staffPhoto",
          docName: staffPhoto[0]?.filename,
          docPath: staffPhoto[0]?.path,
          createdBy,
        });
      }
      if (aadhar) {
        allDocs.staffdocumentAadhar = await Staffdocument.create({
          staffId: staff?.staffId,
          docType: "aadhar",
          docName: aadhar[0]?.filename,
          docPath: aadhar[0]?.path,
          createdBy,
        });
      }
      if (salarySlip) {
        allDocs.staffdocumentSalarySlip = await Staffdocument.create({
          staffId: staff?.staffId,
          docType: "salarySlip",
          docName: salarySlip[0]?.filename,
          docPath: salarySlip[0]?.path,
          createdBy,
        });
      }
      if (experience) {
        allDocs.staffdocumentExperience = await Staffdocument.create({
          staffId: staff?.staffId,
          docType: "experience",
          docName: experience[0]?.filename,
          docPath: experience[0]?.path,
          createdBy,
        });
      }
      if (marksheet) {
        allDocs.staffdocumentMarksheet = await Staffdocument.create({
          staffId: staff?.staffId,
          docType: "marksheet",
          docName: marksheet[0]?.filename,
          docPath: marksheet[0]?.path,
          createdBy,
        });
      }
      if (cv) {
        allDocs.staffdocumentCv = await Staffdocument.create({
          staffId: staff?.staffId,
          docType: "cv",
          docName: cv[0]?.filename,
          docPath: cv[0]?.path,
          createdBy,
        });
      }

      if (addressProof) {
        allDocs.staffdocumentAddressProof = await Staffdocument.create({
          staffId: staff?.staffId,
          docType: "addressProof",
          docName: addressProof[0]?.filename,
          docPath: addressProof[0]?.path,
          createdBy,
        });
      }

      res.status(200).send({
        flag: true,
        message: "Staff created successfully!",
        outdata: {
          staff,
          allDocs,
        },
      });
    } else {
      if (staffPhoto) {
        fs.unlink(staffPhoto[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("staffPhoto file deleted successfully");
        });
      }

      if (aadhar) {
        fs.unlink(aadhar[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("aadhar file deleted successfully");
        });
      }
      if (salarySlip) {
        fs.unlink(salarySlip[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("salarySlip file deleted successfully");
        });
      }
      if (experience) {
        fs.unlink(experience[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("experience file deleted successfully");
        });
      }
      if (marksheet) {
        fs.unlink(marksheet[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("marksheet file deleted successfully");
        });
      }
      if (cv) {
        fs.unlink(cv[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("cv file deleted successfully");
        });
      }
      if (addressProof) {
        fs.unlink(addressProof[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("addressProof file deleted successfully");
        });
      }

      res.status(500).send({
        flag: false,
        message: "Something went wrong.",
      });
      return false;
    }

    // const staff = await Staff.create(req.body)
    // res.status(200).send({
    //     flag: true,
    //     staff
    // })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      flag: false,
      message: "Something went wrong",
      error,
    });
  }
};

//2. get all staffs
const getAllStaffs = async (req, res) => {
  console.log("req.query", req.query);
  const { isActive, searchString } = req.query;
  let { currentPage } = req.query;
  if (currentPage == null || currentPage == undefined) {
    currentPage = 0;
  }
  let staffs;
  try {
    // if (!searchString && !isActive) {
    //   if (currentPage == 0) {
    //     staffs = await Staff.findAndCountAll({});
    //   } else {
    //     staffs = await Staff.findAndCountAll({
    //       offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //       limit: Number(process.env.PAGE_LIMIT),
    //     });
    //   }

    //   // staffs = await Staff.findAll();
    // } else if (isActive && searchString) {
    //   if (currentPage == 0) {
    //     staffs = await Staff.findAndCountAll({
    //       where: {
    //         name: { [Op.like]: `%${searchString}%` },
    //         isActive,
    //       },
    //     });
    //   } else {
    //     staffs = await Staff.findAndCountAll({
    //       where: {
    //         name: { [Op.like]: `%${searchString}%` },
    //         isActive,
    //       },
    //       offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //       limit: Number(process.env.PAGE_LIMIT),
    //     });
    //   }
    // } else if (searchString) {
    //   if (currentPage == 0) {
    //     staffs = await Staff.findAndCountAll({
    //       where: {
    //         name: { [Op.like]: `%${searchString}%` },
    //       },
    //     });
    //   } else {
    //     // currentPage = 1;
    //     staffs = await Staff.findAndCountAll({
    //       where: {
    //         name: { [Op.like]: `%${searchString}%` },
    //       },
    //       offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //       limit: Number(process.env.PAGE_LIMIT),
    //     });
    //   }
    // } else if (isActive) {
    //   if (currentPage == 0) {
    //     staffs = await Staff.findAndCountAll({
    //       where: {
    //         isActive,
    //       },
    //     });
    //   } else {
    //     staffs = await Staff.findAndCountAll({
    //       where: {
    //         isActive,
    //       },
    //       offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //       limit: Number(process.env.PAGE_LIMIT),
    //     });
    //   }
    // }

    // staffs = await Staff.findAll();

    if (true) {
      if (currentPage == 0) {
        staffs = await Staff.findAndCountAll({
          order: [["createdAt", "DESC"]],
          where: {
            name: { [Op.like]: `%${searchString ? searchString : ""}%` },
            isActive: { [Op.like]: `%${isActive ? isActive : ""}%` },
            // dateOfApplication: {
            //   [Op.gte]: new Date(startDate),
            //   [Op.lte]: new Date(endDate),
            //   // [Op.lte]: { [Op.like]: `%${endDate ? new Date(endDate) : ""}%` },
            // },
          },
        });
      } else {
        staffs = await Staff.findAndCountAll({
          order: [["createdAt", "DESC"]],

          where: {
            name: { [Op.like]: `%${searchString ? searchString : ""}%` },
            isActive: { [Op.like]: `%${isActive ? isActive : ""}%` },
            // dateOfApplication: {
            //   [Op.gte]: new Date(startDate),
            //   [Op.lte]: new Date(endDate),
            // },
          },
          offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
          limit: Number(process.env.PAGE_LIMIT),
        });
      }
    }

    res.status(200).send({
      flag: true,
      outdata: staffs?.rows,
      totalRecord: staffs?.count,
    });
    return;
  } catch (err) {
    res.status(501).send(err);
    return;
  }
};

//3. get one staff
const getOneStaff = async (req, res) => {
  let id = req.params.id;
  try {
    let staff = await Staff.findOne({ where: { staffId: id } });
    let staffdocuments = await Staffdocument.findAll({
      where: { staffId: id },
    });

    res.status(200).send({
      flag: true,
      outdata: { staff, staffdocuments },
    });
    return;
  } catch (error) {
    res.status(500).send({
      flag: false,
      message: "something went wrong!",
      error,
    });
    return;
  }
};

//4. update staff details

const updateStaff = async (req, res) => {
  let id = req.params.id;
  let {
    candidateId,
    employeCode,
    roleId,
    name,
    gender,
    dateOfBirth,
    fatherName,
    motherName,
    maidenName,
    marritalStatus,
    currentAddress,
    permanentAddress,
    email,
    mobile,
    emergencyContact,
    dateOfJoining,
    updatedBy,
    departmentId,
  } = req.body;
  let info = {
    candidateId,
    employeCode,
    roleId,
    name,
    gender,

    dateOfBirth: moment(new Date(dateOfBirth)).format("YYYY-MM-DD"),

    fatherName,
    motherName,
    maidenName,
    marritalStatus,
    currentAddress,
    permanentAddress,
    email,
    mobile,
    emergencyContact,
    dateOfJoining: moment(new Date(dateOfJoining)).format("YYYY-MM-DD"),
    updatedBy,
    departmentId,
  };

  try {
    // const transaction = await sequelize.transaction();
    const staff = await Staff.update(info, {
      where: { staffId: id },
    });
    const {
      staffPhoto,
      aadhar,
      salarySlip,
      experience,
      marksheet,
      cv,
      addressProof,
    } = req?.files;

    let allDocs = {};

    if (staffPhoto) {
      let isUpdated;
      isUpdated = await Staffdocument.update(
        {
          docName: staffPhoto[0]?.filename,
          docPath: staffPhoto[0]?.path,
          updatedBy,
        },
        { where: { staffId: id, docType: "staffPhoto" } }
      );
      if (isUpdated[0] == 0) {
        if (isUpdated[0] == 0) {
          await Staffdocument.create({
            staffId: id,
            docType: "staffPhoto",
            docName: staffPhoto[0]?.filename,
            docPath: staffPhoto[0]?.path,
            updatedBy,
          });
        }
      }
      // console.log("staffPhoto", staffPhoto);
    }
    if (aadhar) {
      let isUpdated;

      isUpdated = await Staffdocument.update(
        {
          docName: aadhar[0]?.filename,
          docPath: aadhar[0]?.path,
          updatedBy,
        },

        { where: { staffId: id, docType: "aadhar" } }
      );
      if (isUpdated[0] == 0) {
        await Staffdocument.create({
          staffId: id,
          docType: "aadhar",
          docName: aadhar[0]?.filename,
          docPath: aadhar[0]?.path,
          updatedBy,
        });
      }
    }
    if (salarySlip) {
      let isUpdated;
      isUpdated = await Staffdocument.update(
        {
          docName: salarySlip[0]?.filename,
          docPath: salarySlip[0]?.path,
          updatedBy,
        },
        { where: { staffId: id, docType: "salarySlip" } }
      );
      if (isUpdated[0] == 0) {
        await Staffdocument.create({
          staffId: id,
          docType: "salarySlip",
          docName: salarySlip[0]?.filename,
          docPath: salarySlip[0]?.path,
          updatedBy,
        });
      }
    }
    if (experience) {
      let isUpdated;
      isUpdated = await Staffdocument.update(
        {
          docName: experience[0]?.filename,
          docPath: experience[0]?.path,
          updatedBy,
        },
        { where: { staffId: id, docType: "experience" } }
      );

      if (isUpdated[0] == 0) {
        await Staffdocument.create({
          staffId: id,
          docType: "experience",
          docName: experience[0]?.filename,
          docPath: experience[0]?.path,
          updatedBy,
        });
      }
    }
    if (marksheet) {
      let isUpdated;
      isUpdated = await Staffdocument.update(
        {
          docName: marksheet[0]?.filename,
          docPath: marksheet[0]?.path,
          updatedBy,
        },
        { where: { staffId: id, docType: "marksheet" } }
      );
      if (isUpdated[0] == 0) {
        await Staffdocument.create({
          staffId: id,
          docType: "marksheet",
          docName: marksheet[0]?.filename,
          docPath: marksheet[0]?.path,
          updatedBy,
        });
      }
    }
    if (cv) {
      let isUpdated;
      isUpdated = await Staffdocument.update(
        {
          docName: cv[0]?.filename,
          docPath: cv[0]?.path,
          updatedBy,
        },
        { where: { staffId: id, docType: "cv" } }
      );
      if (isUpdated[0] == 0) {
        await Staffdocument.create({
          staffId: id,
          docType: "cv",
          docName: cv[0]?.filename,
          docPath: cv[0]?.path,
          updatedBy,
        });
      }
    }

    if (addressProof) {
      let isUpdated;
      isUpdated = await Staffdocument.update(
        {
          docName: addressProof[0]?.filename,
          docPath: addressProof[0]?.path,
          updatedBy,
        },
        { where: { staffId: id, docType: "addressProof" } }
      );
      if (isUpdated[0] == 0) {
        await Staffdocument.create({
          staffId: id,
          docType: "addressProof",
          docName: addressProof[0]?.filename,
          docPath: addressProof[0]?.path,
          updatedBy,
        });
      }
    }

    // await transaction.commit();
    // console.log("Staff", staff);
    if (staff == 1) {
      res.status(200).send({
        flag: true,
        message: "Staff details updated!",
        // allDocs,
      });
      return;
    } else {
      res.status(200).send({
        flag: false,
        message: "Something went wrong!",
      });
      return;
    }
  } catch (error) {
    // try {
    //   // await transaction.rollback();
    //   res.status(500).send({
    //     flag: false,
    //     message: "Something went wrong!",
    //     error,
    //   });
    //   return;
    // } catch (error) {
    //   res.status(500).send({
    //     flag: false,
    //     message: "Something went wrong!",
    //     error,
    //   });
    //   return;
    // }

    res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
    return;
  }
};

//5. delete or change staff status details
const deleteStaff = async (req, res) => {
  let id = req.params.id;
  const { isActive, updatedBy, candidateId } = req.body;
  let info = {
    isActive,
    updatedBy,
  };

  try {
    if (!updatedBy) {
      res.status(400).send({
        flag: false,
      });
      return;
    }
    const staff = await Staff.update(info, { where: { staffId: id } });

    if (staff == 1) {
      if (isActive == "yes") {
        res.status(200).send({
          flag: true,
          // user,
          message: "Staff details is recovered.",
        });
        return;
      }
      if (isActive == "no") {
        res.status(200).send({
          flag: true,
          // user,
          message: "Staff details is deleted.",
        });
        return;
      }
      res.status(404).send({
        flag: false,
        message: "Something went wrong!",
      });
      return;
    } else {
      res.status(404).send({
        flag: false,
        message: "Something went wrong!",
      });
      return;
    }
  } catch (error) {
    res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
    return;
  }
};

const AniversaryStaff = async (req, res) => {
  // const { email, mobile } = req.body;
  let TodayDate = new Date();

  TodayDate.setFullYear(TodayDate.getFullYear() - 1);

  let cDate = moment(TodayDate).format("YYYY-MM-DD");
  // console.log("TodayDate", cDate);

  // let StaffCreatedDate = moment(createdAt).format("YYYY-MM-DD");

  let staffs;
  try {
    staffs = await Staff.findAndCountAll({
      where: {
        dateOfJoining: new Date(cDate),
      },
    });

    if (staffs?.count > 0) {
      res.status(200).send({
        flag: true,
        message: "Today is the Work Anniversary of some staff!",
        outdata: { staffs: staffs?.rows },
        totalRecord: staffs?.count,
      });
    } else {
      res.status(200).send({
        flag: false,
        message: "",
      });
    }

    return;
  } catch (err) {
    res.status(501).send(err);
    return;
  }
};

const BirthAniversaryStaff = async (req, res) => {
  // const { email, mobile } = req.body;
  let TodayDate = new Date();

  TodayDate.setFullYear(TodayDate.getFullYear());

  let cDate = moment(TodayDate).format("YYYY-MM-DD");
  // let cDate = moment(new Date()).format("YYYY-MM-DD");
  console.log("cDate", cDate);

  let staffs;
  try {
    staffs = await Staff.findAndCountAll({
      where: {
        dateOfBirth: { [Op.like]: `%${new Date(cDate)}%` },
      },
      // attributes: [
      //   [sequelize.fn("DATE", sequelize.col("dateOfBirth")), 23],
      //   [sequelize.fn("MONTH", sequelize.col("dateOfBirth")), 1],
      // ],
    });
    console.log("staffs", staffs);
    if (staffs?.count > 0) {
      res.status(200).send({
        flag: true,
        message: "Today is the Birthday of some staff!",
        outdata: { staffs: staffs?.rows },
        totalRecord: staffs?.count,
      });
    } else {
      res.status(200).send({
        flag: false,
        message: "",
      });
    }

    return;
  } catch (err) {
    res.status(501).send(err);
    return;
  }
};

//Verify staff email and mobile
const VerifyStaff = async (req, res) => {
  const { email, mobile } = req.body;
  let staff;
  try {
    if (email) {
      staff = await Staff.findAndCountAll({
        where: {
          email: email,
        },
      });

      if (staff?.count > 0) {
        res.status(200).send({
          flag: false,
          message: "Email already exist!",
          // outdata: { candidate: candidate?.rows },
          // totalRecord: candidate?.count,
        });
      } else {
        res.status(200).send({
          flag: true,
          message: "",
        });
      }
    } else if (mobile) {
      staff = await Staff.findAndCountAll({
        where: {
          mobile: mobile,
        },
      });
      if (staff?.count > 0) {
        res.status(200).send({
          flag: false,
          message: "Mobile already exist!",
        });
      } else {
        res.status(200).send({
          flag: true,
          message: "",
        });
      }
    } else {
      res.status(400).send({
        flag: false,
        message: "Something went wrong!",
      });
    }
    return;
  } catch (err) {
    res.status(501).send(err);
    return;
  }
};
module.exports = {
  addStaff,
  getAllStaffs,
  getOneStaff,
  updateStaff,
  deleteStaff,
  AniversaryStaff,
  BirthAniversaryStaff,
  VerifyStaff,
};
