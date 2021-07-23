const express = require("express")
const router = express.Router();
const Diet = require("../models/Diet");
const User = require("../models/User");
const { veryToken } = require("../util/auth-mid");

router.get("/myDiet", veryToken, (res,req)=>{
    const {_id :_owner} = req.user
  
    Diet.find({_owner})
    .then( diet =>{
      res.status(200).json({result:diet})
    })
    .catch( error => res.status(400).json( {error} ) )
})
        
router.post('/create', veryToken, (req,res)=>{
    const { _id : _owner } = req.user
   
    Diet.create({...req.body,_owner})
    .then(diet => {
        res.status(200).json({result:diet})
    })
    .catch(error=>res.status(400).json({ error }))
})

router.patch("/updateDiet", veryToken, (req, res)=>{
    const { _id : _owner } = req.user
    
    Diet.findOneAndUpdate({_owner}, req.body,{new:true} )
    .then(updateDiet => {
        console.log(_owner)
        res.status(200).json({result:updateDiet})
    })
    .catch(error=>res.status(400).json({ error }))
})

router.delete("/deleteCourse/:course_id", veryToken,(req, res)=>{
    const { course_id } = req.params

    Diet.findByIdAndDelete( course_id )
    .then(() => {
        res.status(200).json({msg:"Se borro el curso"})
    })
    .catch(error=>res.status(400).json({ error }))
})


module.exports = router;