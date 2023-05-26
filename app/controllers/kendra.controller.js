const Kendra = require('../models/kendra.model.js');

module.exports = {

    allKendras: async (req, res, next) => {
        try {
            const kendras = await Kendra.find({});
            res.status(200).json({ kendras: kendras });
        }
        catch (err) {
            next(err);
        }

    },


    getKendra: async (req, res) => {
        const { kendraId } = req.value.params;
        const kendra = await Kendra.findById(kendraId);


        res.status(200).json({ kendra: kendra});
    },



    createKendra: async (req, res) => {
        const newKendra = new Kendra(req.value.body);
        const kendra = await newKendra.save();
        res.status(200).json({ kendra: kendra });
    },

    updateKendra: async (req, res) => {
        const kendra = await Kendra.findByIdAndUpdate(req.value.params.kendraId, req.body, { new: true });
        if (!kendra) {
            return res.status(404).send({
                message: "KendraId not found with id " + req.params.userId
            });
        }
        res.status(200).json({ kendra: kendra });
    },


    removeKendra: async (req, res) => {
        const kendra = await Kendra.findByIdAndRemove(req.value.params.kendraId);
        if (!kendra) {
            return res.status(404).send({
                message: "Kendra not found with id " + req.value.params.kendraId
            });
        }
        res.status(200).json({ kendra: kendra });
    },


};