const express = require('express');
const router = express.Router();
const User = require("../models/User");

const { checkRole,veryToken } = require("../util/auth-mid")



router.patch("/editMyUser", veryToken,(req,res)=>{
    const { _id } = req.user
    User.findByIdAndUpdate(_id, req.body, {new:true})
    .then( user =>{
      res.status(200).json({result:user})
    })
    .catch( error => res.status(400).json( {error} ) )
})

router.delete("/:id/deleteUser", veryToken, (res,req)=>{
  const { id }= req.params
  User.findByIdAndDelete(id)
  .then( () =>{
    res.status(200).json({msg:"Usuario borrado"})
  })
  .catch( error => res.status(400).json( {error} ) )
})





module.exports = router;