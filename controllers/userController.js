const userData = require('../models/userModel');
const bcrypt = require('bcrypt');
const CustomErrorHandler = require('../error/CustomErrorHandler')

const salt = 10;

exports.userRegister = async(req,res)=>{
    const {username, firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, salt);
    try{
    const user = new  userData({
        username,
        firstName,
        lastName,
        email,
        password:hashedPassword
      });
      
        const data = await user.save();
        res.status(200).json({message:'user registered successfully',user_id:data.dataValues.id})
      } catch (err) {
        res.status(400).json({message:err.message})
      }
};


exports.userLogin = async(req,res,next) =>{
  const {username,password} = req.body;
  try{
    
    const user  = await userData.findOne({where:{username}});
    if (user && (await bcrypt.compare(password, user.password))) {
     return  res.status(200).json({access_token:user.dataValues.id,message:'user login successfully'});
    } 
    next('invalid credentials')
}catch(err){
    res.status(400).json({message:err.message});
  }
};


exports.getUser = async (req,res) =>{
  try{
    const id = req.headers.access_token;
    const user  = await userData.findOne({where:{id}});
    res.status(200).json({data:user})
  } catch(err){
    res.status(400).json({message:err.message});
  }
}


exports.deleteUser = async (req,res)=>{
  try{
    const id = req.headers.access_token;
    const user  = await userData.findOne({where:{id}});
     await user.destroy();  
     res.status(200).json({message:'user delete successfully'});
  } catch(err){
    res.status(400).json({message:err.message});
  }
}

exports.userList = async(req,res,next)=>{
  console.log(req.query.page,'---<<') 
    const page = Number(req.query.page);
    console.log(page,'==>')
    if (!page)
        return next(CustomError.Error404("Not a valid page"));
    const limit = 10;
    const user = await userData.find().limit(limit).skip((page - 1) * limit).exec();
    const count = await userData.countDocuments();
    try {
        res.json({
            user,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        })
    }
    catch (err) {
        return next(err);
    }

}
