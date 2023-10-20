const db = require("../models");
const resMsg = require("../Common/CommonResponce");
// create main model
const Candidate = db.candidate;
const CandidateSkill = db.department;
const Candidatedocument = db.candidatedocument;

// main work

//1. create candidate
const addCandidate = async (req, res, next) => {
  let info = {
    candidateId: req.body.candidateId,
    applicationNumber: req.body.applicationNumber,
    name: req.body.name,
    Contact: req.body.Contact,
    jobProfileId: req.body.jobProfileId,
    currentCTC: req.body.currentCTC,
    expectedCTC: req.body.expectedCTC,
    location: req.body.location,
    isRelocate: req.body.isRelocate,
    reasonForJobChange: req.body.reasonForJobChange,
    noticePeriod: req.body.noticePeriod,
    experience: req.body.experience,
    otherInfo: req.body.otherInfo,
  };

  try {
    const { candidatePhoto, resume, others } = req.files;
    let candidatedocumentPhoto = {};
    let candidatedocumentResume = {};
    if (!candidatePhoto || !resume) {
      return res.send({
        success: false,
        message: "Please upload all required files.",
      });
    } else {
      const candidate = await Candidate.create(info);
      if (candidate?.candidateId > 0) {
        candidatedocumentPhoto = await Candidatedocument.create({
          candidateId: candidate?.candidateId,
          fileType: "candidateImage",
          docName: candidatePhoto[0]?.filename,
          docPath: candidatePhoto[0]?.path,
        });
        candidatedocumentResume = await Candidatedocument.create({
          candidateId: candidate?.candidateId,
          fileType: "candidateResume",
          docName: resume[0]?.filename,
          docPath: resume[0]?.path,
        });
        res.status(200).send({
          flag: true,
          candidate,
          candidatedocumentPhoto,
          candidatedocumentResume,
        });
      } else {
        res.status(500).send({
          flag: false,
          message: "Something went wrong.",
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      flag: false,
      message: "Something went wrong",
      error,
    });
  }
};
//2. get all candidates
const getAllCandidates = async (req, res) => {
  try {
    let candidates = await Candidate.findAll();
    let candidateSkills = await CandidateSkill.findAll();
    // console.log("candidateSkills", candidateSkills)
    res.status(200).send({
      flag: true,
      candidates,
      // candidateSkills
    });
  } catch (err) {
    res.status(501).send(err);
  }
};

//3. get one candidate
const getOneCandidate = async (req, res) => {
  let id = req.params.id;
  try {
    let candidate = await Candidate.findOne({ where: { id: id } });
    res.status(200).send({
      flag: true,
      candidate,
    });
  } catch (error) {
    res.status(500).send({
      flag: false,
      message: "something went wrong!",
      error,
    });
  }
};

//4. update candidate details

const updateCandidate = async (req, res) => {
  let id = req.params.id;
  try {
    const candidate = await Candidate.update(req.body, { where: { id: id } });
    if (candidate == 1) {
      res.status(200).send({
        flag: true,
        message: "Candidate details updated!",
      });
    } else {
      res.status(200).send({
        flag: false,
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    res.status(500).send({
      flag: false,
      error,
    });
  }
};

//5. delete candidate by id

const deleteCandidate = async (req, res) => {
  let id = req.params.id;
  try {
    await Candidate.destroy({ where: { id: id } });
    res.status(200).json(resMsg.success("", "Candidate details is deleted."));
    // resMsg.success();
    // res.status(200).send({
    //     flag: true,
    //     message: "Candidate details is deleted."
    // })
  } catch (error) {
    res.status(500).json(resMsg.error(error));
    // res.status(500).send({
    //   flag: false,
    //   error,
    // });
  }
};

module.exports = {
  addCandidate,
  getAllCandidates,
  getOneCandidate,
  updateCandidate,
  deleteCandidate,
};
