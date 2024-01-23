const db = require("../models");

// create main model
const Module = db.module;
// const Role = db.role

//2. get all skills
const getAllModules = async (req, res) => {
  try {
    let module = await Module.findAll();
    res.status(200).send({
      flag: true,
      outdata: { module },
      totalRecord: module?.length,
    });
    return;
  } catch (err) {
    res.status(501).send(err);
    return;
  }
};

module.exports = {
  // addUser,
  getAllModules,
  // getOneRole,
  // updateSkill,
  // deleteUser,
};
