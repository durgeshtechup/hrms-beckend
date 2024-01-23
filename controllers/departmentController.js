const db = require("../models");

// create main model
const Department = db.department;

const getAllDepartments = async (req, res) => {
  try {
    let departments = await Department.findAll();
    res.status(200).send({
      flag: true,
      outdata: { departments: departments },
      totalRecord: departments?.length,
    });
    return;
  } catch (err) {
    res.status(501).send(err);
    return;
  }
};

module.exports = {
  getAllDepartments,
};
