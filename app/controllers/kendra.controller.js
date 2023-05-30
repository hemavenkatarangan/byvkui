const Kendra = require("../models/kendra.model.js");
let response = {};

module.exports = {
  allKendras: async (req, res, next) => {
    try {
      const kendras = await Kendra.find({});
      response.status_code = "200";
      response.status_message = "Kendras Found";
      response.result = kendras;

      res.status(200).json(response);
    } catch (err) {
      response.status_code = "404";
      response.status_message = "Kendras Not Found";
      response.result = null;
      res.status(404).json(response);
    }
  },

  getKendra: async (req, res) => {
    const { kendraId } = req.params;
    const kendra = await Kendra.findById(kendraId);

    res.status(200).json({ kendra: kendra });
  },

  createKendra: async (req, res) => {
    const newKendra = new Kendra(req.body);
    const kendra = await newKendra.save();
    res.status(200).json({ kendra: kendra });
  },

  updateKendra: async (req, res) => {
    try {
      const kendra = await Kendra.findByIdAndUpdate(
        req.params.kendraId,
        req.body,
        { new: true }
      );
      response.status_code = "200";
      response.status_message = "Kendra updated successfully";
      response.result = kendra;
      res.status(200).json(response);
    } catch (err) {
      response.status_code = "404";
      response.status_message = "Kendra could not be updated";
      response.result = null;
      res.status(200).json(response);
    }
  },

  removeKendra: async (req, res) => {
    const kendra = await Kendra.findByIdAndRemove(req.params.kendraId);
    if (!kendra) {
      return res.status(404).send({
        message: "Kendra id" + req.params.eventId + "not found",
      });
    } else {
      res.status(200).json({
        message: "Kendra deleted successfully",
        deletedKendra: kendra,
      });
    }
  },
};
