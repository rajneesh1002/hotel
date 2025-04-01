const express = require('express');
const router = express.Router();
const person = require('../models/person');


router.post('/', async (req, res) => {

    try {
        const data = req.body; //assumin the request body contains the person data

        //create new person document using mongoose model
        const newperson = new person(data);

        //save the nwe person to the database
        const response = await newperson.save()
        console.log("data saved")
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})


router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log("data fetched")
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})



router.get('/:WorkType', async (req, res) => {
    try {
        const WorkType = req.params.WorkType;
        if (WorkType == 'chef' || WorkType == 'manager' || WorkType == 'waiter') {
            const response=await person.find({work: WorkType})
            console.log('response fetched');
            res.status(200).json(response);

        } else {
            res.status(404).json({ error: 'Invalid work type' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatedPersonData=req.body

        const response= await person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true, //return the updated document
            runValidators: true, // run monoose validation
        })
        if(!response){
            return res.status(404).json({error:'person not fount'})
        }

        console.log('data updated');
        res.status(200).json(response)
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'internal server error' });

    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const personId=req.params.id;
        const response=await person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'person not fount'})
        }
        console.log('data deleted');
        res.status(200).json({message: 'person deleted Successfuly'})
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'internal server error' });
    }
})
module.exports=router;