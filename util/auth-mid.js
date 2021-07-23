const jwt = require("jsonwebtoken");
const User = require("../models/User")

exports.createJWT = (user) =>{

    const token = jwt.sign({ id : user._id  },process.env.SECRET,{
        expiresIn:"1d"
    })
    return token
};

exports.veryToken = (req,res,next) => {
    const { token } = req.cookies
    
    jwt.verify(token, process.env.SECRET, (error, decoded )=>{
        if(error){
            return res.status(401).json({ msg:"Tienes que tener una sesion", error })
        }
        User.findById(decoded.id)
            .then(user => {
                req.user = user

                next()
            })
    });

}

exports.clearRes = (data) => {
        const {password , __v , updatedAt,...cleanedData} = data
        return  cleanedData
}