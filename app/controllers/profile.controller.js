const Profile = require('../models/profile.model.js');

const { getError } = require('../helpers/errorHelpers')


module.exports = {

    allProfilesForLoggedUser: async (req, res, next) => {
        try {
            const users = await Profile.find({email_id:req.params.emailId});
            console.log("Profile data");
            console.log(users);
            if(users)
           res.status(200).json( { status_code:"200",status_message:"Successful reading profile ",result: users });
            else
            res.status(403).json({status_code:"403",status_message:"No profiles found"});
        }
        catch (err) {
            next(err);
          
        }

    },

    

    getProfile: async (req, res) => {
	
        var profileId  = req.query.profileId;
        console.log(profileId);
        const user = await Profile.findById(profileId);

        if (!user) {
            res.status(403).json({status_code:"403",status_message:"Error reading profile " });
        }
        else
        res.status(200).json({ status_code:"200",status_message:"Successful reading profile ",result: user });
    },

   

    createProfile: async (req, res) => {
	 try {
        const newProfile = new Profile(req.body);
        const profile = await newProfile.save();
        var response ={status_code:"200",status_message:"Successfully created profile ",result:profile};
        res.status(200).json(response);
        }
      catch (err) {
	var response ={status_code:"403",status_message:"Problem saving profile "+err};
        res.status(403).json(response);
          
        }
        
    },

    updateProfile: async (req, res) => {
		console.log(req.body,"body 123");
		
		if(req.body.id)
		{
		  const user = await Profile.findByIdAndUpdate({_id:req.body.id},req.body,{new: true});
		   if (!user) {
            return res.status(404).send({
                message: "Profile not found with id " + req.params.emailId
            });
        }
        var response ={status_code:"200",status_message:"Successfully Updated profile ",result:user};
        res.status(200).json(response);
		}
		else
		{
         const newProfile = new Profile(req.body);
         const profile = await newProfile.save();
        if (!profile) {
            return res.status(403).send({
                message: "Profile not found with id " + req.params.emailId
            });
        }
        var response ={status_code:"200",status_message:"Successfully Updated profile ",result:profile};
        res.status(200).json(response);
        }
        
    },

   
};