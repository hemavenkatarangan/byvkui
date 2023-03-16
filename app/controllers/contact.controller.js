const Contact = require("../models/contact.model.js");

module.exports = {
  allContactUs: async (req, res, next) => {
    try {
      const events = await Contact.find({}).sort({createdAt:-1});
      res.status(200).json(events);
    } catch (err) {
      next(err);
    }
  },

  getContactUs: async (req, res) => {
    const { contactId } = req.params;
    const event = await Contact.findById(contactId);
    if (!event) {
      return res.status(404).send({
        message: "Contact data not found with id " + req.params.eventId,
      });
    }
    res.status(200).json(event);
  },

  createContactUs: async (req, res) => {
    const newEvent = new Contact(req.body);
    const event = await newEvent.save();
    res.status(200).json(event);
  },
};
