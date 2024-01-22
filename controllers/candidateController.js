const db = require("../models");
var fs = require("fs");
const { Op } = require("sequelize");
// create main model
const Candidate = db.candidate;
const CandidateSkill = db.candidateskills;
const Candidatedocument = db.candidatedocument;
const User = db.user;
const RoleModule = db.roleModule;
const Module = db.module;
const Candidatestatus = db.candidatestatus;
const { v4: uuid } = require("uuid");
const moment = require("moment");
// main work

//1. create candidate
const addCandidate = async (req, res, next) => {
  const unique_id = uuid();

  let applicationNumberUUID = unique_id.slice(0, 10);
  let info = {
    // candidateId: req.body.candidateId,
    applicationNumber: applicationNumberUUID,
    name: req.body.name,
    mobile: req.body.mobile,
    jobProfileId: req.body.jobProfileId,
    currentCTC: req.body.currentCTC,
    expectedCTC: req.body.expectedCTC,
    location: req.body.location,
    isRelocate: req.body.isRelocate,
    reasonForJobChange: req.body.reasonForJobChange,
    noticePeriod: req.body.noticePeriod,
    experience: req.body.experience,
    otherInfo: req.body.otherInfo,
    createdBy: req.body.createdBy,
    email: req.body.email,
    gender: req.body.gender,
    isActive: "yes",
    departmentId: req.body.departmentId,
    dateOfApplication: moment(req.body.dateOfApplication).format("YYYY-MM-DD"),
  };

  try {
    if (!req?.files) {
      res.status(400).send({
        flag: false,
        message: "Something went wrong!",
      });
      return false;
    }
    const { candidatePhoto, resume, others } = req?.files;
    const { createdBy, name, mobile, rating, skillId, dateOfApplication } =
      req.body;
    // console.log("Files", candidatePhoto[0]?.path)

    console.log("response", info);

    if (!name || !mobile || !resume || !createdBy || !dateOfApplication) {
      if (candidatePhoto) {
        fs.unlink(candidatePhoto[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("candidatePhoto file deleted successfully");
        });
      }
      if (resume) {
        fs.unlink(resume[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("resume file deleted successfully");
        });
      }

      res.status(400).send({
        flag: false,
        message: "Please insert all required fields.",
      });
      return false;
    }

    const currentUser = await User.findOne({ where: { userId: createdBy } });
    if (!currentUser) {
      res.status(404).send({
        flag: false,
        message: "user not found",
      });
      return false;
    }

    const currentUserRoleId = currentUser?.roleId;
    const allRoleModule = await RoleModule.findAll({
      where: { userId: createdBy },
    });
    // console.log("allRoleModule", allRoleModule)

    // const module = await Module.findAll({ where: { moduleId: currentUserRoleId } })
    const isEditedModule = allRoleModule.filter(
      (f) => f.isEdited == "yes" && Number(f.moduleId) == Number(8)
    );
    // const isEditedUsers = isEditedModule.filter(f => f.roleId == currentUserRoleId)
    // console.log("isEditedUsers", isEditedModule)

    if (isEditedModule?.length == 0) {
      if (candidatePhoto) {
        fs.unlink(candidatePhoto[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("candidatePhoto file deleted successfully");
        });
      }
      if (resume) {
        fs.unlink(resume[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("resume file deleted successfully");
        });
      }
      res.status(200).send({
        flag: false,
        message: "You dont have right to add candidate.",
      });
      return false;
    }

    let allDocs = {};
    let candidateSkillsData = {};

    const candidate = await Candidate.create(info);
    if (candidate?.candidateId > 0) {
      await Candidatestatus.create({
        candidateId: candidate?.candidateId,
        statusId: 6,
        remark: "",
        createdBy,
        dateOfStatus: moment(dateOfApplication).format("YYYY-MM-DD"),
      });
    }

    if (candidate?.candidateId > 0) {
      candidateSkillsData.skills = await CandidateSkill.create({
        candidateId: candidate?.candidateId,
        rating,
        skillId,
        createdBy,
      });
      if (candidatePhoto) {
        allDocs.candidatedocumentPhoto = await Candidatedocument.create({
          candidateId: candidate?.candidateId,
          fileType: "candidatePhoto",
          docName: candidatePhoto[0]?.filename,
          docPath: candidatePhoto[0]?.path,
          createdBy,
        });
      }
      if (resume) {
        allDocs.candidatedocumentResume = await Candidatedocument.create({
          candidateId: candidate?.candidateId,
          fileType: "candidateResume",
          docName: resume[0]?.filename,
          docPath: resume[0]?.path,
          createdBy,
        });
      }

      res.status(200).send({
        flag: true,
        outdata: {
          candidate,
          allDocs,
        },
      });
      return;
    } else {
      if (candidatePhoto) {
        fs.unlink(candidatePhoto[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("candidatePhoto file deleted successfully");
        });
      }
      if (resume) {
        fs.unlink(resume[0]?.path, function (err) {
          if (err) return console.log(err);
          console.log("resume file deleted successfully");
        });
      }
      res.status(500).send({
        flag: false,
        message: "Something went wrong.",
      });

      return false;
    }
  } catch (error) {
    // console.log("error", error)
    // if (candidatePhoto) {
    //     fs.unlink(candidatePhoto[0]?.path, function (err) {
    //         if (err) return console.log(err);
    //         console.log('candidatePhoto file deleted successfully');
    //     });
    // }

    // if (resume) {
    //     fs.unlink(resume[0]?.path, function (err) {
    //         if (err) return console.log(err);
    //         console.log('resume file deleted successfully');
    //     });
    // }

    res.status(500).send({
      flag: false,
      message: "Something went wrong",
      error,
    });
    return;
  }
};
//2. get all candidates
const getAllCandidates = async (req, res) => {
  console.log("req.query", req.query);
  let { isActive, searchString, endDate, startDate } = req.query;
  let { currentPage } = req.query;
  if (currentPage == null || currentPage == undefined) {
    currentPage = 0;
  }
  if (!isActive) {
    isActive = "";
  }
  if (!searchString) {
    searchString = "";
  }
  if (!startDate) {
    startDate = moment(new Date("1994-01-01")).format("YYYY-MM-DD");
  }
  if (!endDate) {
    let cDate = new Date();
    let year = cDate.getFullYear() + 10;
    let month = cDate.getMonth();
    let date = cDate.getDate();
    endDate = moment(new Date(year, month, date)).format("YYYY-MM-DD");
  }
  let candidates;
  try {
    // candidates = await Candidate.findAndCountAll({
    //   where: {
    //     name: { [Op.like]: `%${searchString}%` },
    //     isActive,
    //   },
    //   offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //   limit: Number(process.env.PAGE_LIMIT),
    // });

    // if (!searchString && !isActive) {
    //   if (currentPage == 0) {
    //     candidates = await Candidate.findAndCountAll({});
    //   } else {
    //     candidates = await Candidate.findAndCountAll({
    //       offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //       limit: Number(process.env.PAGE_LIMIT),
    //     });
    //   }
    // } else if (isActive && searchString) {
    //   if (currentPage == 0) {
    //     candidates = await Candidate.findAndCountAll({
    //       where: {
    //         name: { [Op.like]: `%${searchString}%` },
    //         isActive,
    //       },
    //     });
    //   } else {
    //     candidates = await Candidate.findAndCountAll({
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
    //     candidates = await Candidate.findAndCountAll({
    //       where: {
    //         name: { [Op.like]: `%${searchString}%` },
    //       },
    //     });
    //   } else {
    //     candidates = await Candidate.findAndCountAll({
    //       where: {
    //         name: { [Op.like]: `%${searchString}%` },
    //       },
    //       offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //       limit: Number(process.env.PAGE_LIMIT),
    //     });
    //   }
    // } else if (isActive) {
    //   if (currentPage == 0) {
    //     candidates = await Candidate.findAndCountAll({
    //       where: {
    //         isActive,
    //       },
    //     });
    //   } else {
    //     candidates = await Candidate.findAndCountAll({
    //       where: {
    //         isActive,
    //       },
    //       offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
    //       limit: Number(process.env.PAGE_LIMIT),
    //     });
    //   }
    // }

    if (true) {
      if (currentPage == 0) {
        candidates = await Candidate.findAndCountAll({
          where: {
            name: { [Op.like]: `%${searchString ? searchString : ""}%` },
            isActive: { [Op.like]: `%${isActive ? isActive : ""}%` },
            dateOfApplication: {
              [Op.gte]: new Date(startDate),
              [Op.lte]: new Date(endDate),
              // [Op.lte]: { [Op.like]: `%${endDate ? new Date(endDate) : ""}%` },
            },
          },
        });
      } else {
        candidates = await Candidate.findAndCountAll({
          where: {
            name: { [Op.like]: `%${searchString ? searchString : ""}%` },
            isActive: { [Op.like]: `%${isActive ? isActive : ""}%` },
            dateOfApplication: {
              [Op.gte]: new Date(startDate),
              [Op.lte]: new Date(endDate),
            },
          },
          offset: Number(process.env.PAGE_OFFSET * (currentPage - 1)),
          limit: Number(process.env.PAGE_LIMIT),
        });
      }
    }

    // try {
    //     let candidates = await Candidate.findAll()
    // let candidateSkills = await CandidateSkill.findAll()
    console.log("candidates", candidates);
    res.status(200).send({
      flag: true,
      outdata: { candidates: candidates?.rows },
      totalRecord: candidates?.count,
      // candidateSkills
    });
    return;
  } catch (err) {
    res.status(501).send(err);
    return;
  }
};

//3. get one candidate
const getOneCandidate = async (req, res) => {
  let id = req.params.id;
  try {
    let candidate = await Candidate.findOne({ where: { candidateId: id } });
    let candidatedocuments = await Candidatedocument.findAll({
      where: { candidateId: id },
    });

    let candidateSkills = await CandidateSkill.findAll({
      where: { candidateId: id },
    });
    res.status(200).send({
      flag: true,
      outdata: { candidate, candidateSkills, candidatedocuments },
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

//4. update candidate details

const updateCandidate = async (req, res) => {
  let id = req.params.id;
  const {
    // applicationNumber,
    name,
    mobile,
    departmentId,
    currentCTC,
    expectedCTC,
    location,
    isRelocate,
    reasonForJobChange,
    noticePeriod,
    experience,
    otherInfo,
    email,
    isActive,
    updatedBy,
    skillId,
    gender,
    dateOfApplication,
  } = req.body;
  let info = {
    // applicationNumber,
    name: name,
    mobile,
    departmentId,
    currentCTC,
    expectedCTC,
    location,
    isRelocate,
    reasonForJobChange: reasonForJobChange,
    noticePeriod,
    experience,
    otherInfo: otherInfo,
    email: email,
    isActive,
    updatedBy,
    skillId,
    gender: gender,
    dateOfApplication,
  };
  try {
    const candidate = await Candidate.update(info, {
      where: { candidateId: id },
    });
    const { candidatePhoto, resume } = req?.files;

    if (1) {
      if (candidatePhoto) {
        await Candidatedocument.update(
          {
            docName: candidatePhoto[0]?.filename,
            docPath: candidatePhoto[0]?.path,
            updatedBy,
          },
          { where: { candidateId: id, fileType: "candidatePhoto" } }
        );
      }
      if (resume) {
        await Candidatedocument.update(
          {
            docName: resume[0]?.filename,
            docPath: resume[0]?.path,
            updatedBy,
          },
          { where: { candidateId: id, fileType: "candidateResume" } }
        );
      }
    }

    if (candidate == 1) {
      res.status(200).send({
        flag: true,
        message: "Candidate details updated!",
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
    res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
    return;
  }
};

//5. delete candidate by id

const deleteCandidate = async (req, res) => {
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
    const candidate = await Candidate.update(info, {
      where: { candidateId: id },
    });

    if (candidate == 1) {
      if (isActive == "yes") {
        res.status(200).send({
          flag: true,
          // user,
          message: "Candidate details is recovered.",
        });
        return;
      }
      if (isActive == "no") {
        res.status(200).send({
          flag: true,
          // user,
          message: "Candidate details is deleted.",
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

const getCandidateStatus = async (req, res) => {
  let id = req.params.id;
  try {
    let candidatestatus = await Candidatestatus.findAll({
      where: { candidateId: id },
    });
    res.status(200).send({
      flag: true,
      outdata: { candidatestatus },
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

const updateCandidateStatus = async (req, res) => {
  console.log("statuastatuastatuastatuastatuastatua", req?.body);

  const {
    candidateId,
    candidateStatusId,
    statusId,
    remark,
    updatedBy,
    dateOfStatus,
  } = req.body;
  if (
    !candidateId ||
    // !candidateStatusId ||
    !statusId ||
    !updatedBy ||
    !dateOfStatus
  ) {
    res.status(400).send({
      flag: true,
      message: "Please insert required fields!",
    });
    return;
  }
  let info = {
    statusId,
    remark,
    updatedBy,
    dateOfStatus,
    // updatedBy,
    // updatedAt: new Date(),
  };

  try {
    const candidateStatusResponse = await Candidatestatus.create({
      candidateId,
      statusId,
      remark,
      updatedBy,
      dateOfStatus: moment(dateOfStatus).format("YYYY-MM-DD"),
    });

    if (candidateStatusResponse?.candidateStatusId > 0) {
      res.status(200).send({
        flag: true,
        message: "Candidate status updated!",
        outdata: {
          candidateStatus: candidateStatusResponse,
        },
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
    res.status(500).send({
      flag: false,
      message: "Something went wrong!",
      error,
    });
    return;
  }
};

const VerifyCandidate = async (req, res) => {
  const { email, mobile } = req.body;
  let candidate;
  try {
    if (email) {
      candidate = await Candidate.findAndCountAll({
        where: {
          email: email,
        },
      });

      if (candidate?.count > 0) {
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
      candidate = await Candidate.findAndCountAll({
        where: {
          mobile: mobile,
        },
      });
      if (candidate?.count > 0) {
        res.status(200).send({
          flag: false,
          message: "Mobile already exist!",
          // outdata: { candidate: candidate?.rows },
          // totalRecord: candidate?.count,
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
  addCandidate,
  getAllCandidates,
  getOneCandidate,
  updateCandidate,
  deleteCandidate,
  getCandidateStatus,
  updateCandidateStatus,
  VerifyCandidate,
};
