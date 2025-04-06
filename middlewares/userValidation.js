const Joi = require('joi');
const userData = require('../models/userModel');
const CustomErrorHandler = require('../error/CustomErrorHandler')


const userValidation = async (req, res, next) => {
    const registerSchema = Joi.object({
        username:Joi.string().min(4).max(15).required(),
      firstName: Joi.string().min(3).max(15).required(),
      lastName: Joi.string().min(3).max(15).required(),
      email: Joi.string().email().required(),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-z0-9]{3,30}$"))
        .required(),
      confirm_password: Joi.ref("password"),
    });
  
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }
  
    try {
      const exist = await userData.findOne({ where: { email:req.body.email }});
      console.log(exist,'==>')
      if (exist) {
        return next(
          CustomErrorHandler.alreadyExist("This email is already taken")
        );
      }
    } catch (err) {
      return next(err);
    }

    try{
        const usernameExist = await userData.findOne({where:{username: req.body.username }});
        if(usernameExist){
            return next(
                CustomErrorHandler.alreadyExist("username is already exists")
            );
        }
    }
    catch (err) {
        return next(err);
      }
  next();
   
  };


  const accessValidation = async(req,res,next)=>{
    const id = req.headers.access_token;
    const user = await userData.findOne({where:{id}});
    if(user===null){
      return res.status(404).json(CustomErrorHandler.notFound('data is not found'));
    }
   next()
  }
  

  module.exports  = {userValidation, accessValidation}