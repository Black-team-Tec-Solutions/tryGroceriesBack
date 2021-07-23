const express = require('express');
const router = express.Router();
const User = require("../models/User")
const  bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { clearRes, createJWT } = require("../util/auth-mid");
const { token } = require('morgan');

router.post('/signup', (req, res, next)  => {
    const {email,name,password,confirmPassword} = req.body
 
    if(password != confirmPassword){
        return  res.status(403).json({msg:"Las contraseñas no coinciden"})
    }

    bcrypt.hash(password,10)
    .then(hashedPass =>{
        const user = {
            email,
            password:hashedPass,
            name
        }

        User.create(user)
        .then(userCreated =>{
            const newUser = clearRes(userCreated.toObject())

            res.cookie("token", createJWT(userCreated) ,{
                sameSite: "none",
                expires:  new Date(Date.now + 86400000 ),
                secure:false,
                httpOnly:true
            } ).status(200).json({ result:newUser })
        })
    })
    .catch( error => res.status(400).json( {error} ) )

});

router.post("/login",(req,res)=>{
    const { email , password} = req.body;
    User.findOne({ email })
    .then(user =>{

        if(user === null){
            return res.status(404).json({ msg:"El correo o contraseña son erroneos" })
        }

        bcrypt.compare(password, user.password)
        .then(match=>{
            if(match){
                const newUser = clearRes(user.toObject())

                res.cookie("token", createJWT(user) ,{
                    expires:new Date(Date.now() + 86400000),
                    secure:false, 
                    httpOnly:true
                } ).status(200).json({ result:newUser })
    
            }else{
                return res.status(404).json({ msg:"El correo o contraseña son erroneos" })
            }

        })

    })
    .catch( error => res.status(400).json( {error} ) )

})


router.post("/logout",(req,res)=>{
    res.clearCookie("token").json({ msg: "vuelve pronto"})
})


module.exports = router;