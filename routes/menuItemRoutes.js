const express=require('express');
const router=express.Router();
const menuItem = require('../models/menuItem');


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const NewMenuItem = new menuItem(data);
        const response = await NewMenuItem.save();
        console.log('new menuItem saved');
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await menuItem.find();
        console.log('here is our menu');
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }

})
router.get('/:taste', async(req,res)=>{
    try{
        const data=req.params.taste;
        if(data=='spicy'||data=='sweet'||data=='sour'){
            const response=await menuItem.find({taste: data});
            console.log('here are the list of', data, 'item')
            res.status(200).json(response)
        }else{
            console.log('data not found');
            res.status(404).json({error: 'invalid taste type'})
        }

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const menuId=req.params.id;
        const updatedmenuData=req.body;

        const response=await menuItem.findByIdAndUpdate(menuId,updatedmenuData,{
            new: true,
            runValidators: true
        })
        if(!response){
            return res.status(404).json({error: 'data not found'})
        }
        console.log('manuitem updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'internal server error' })
    }
})

router.delete('/:id', async (req,res)=>{
    try{
        const menuId=req.params.id;

        const response=await menuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({error:'data not found'});
        }

        console.log('munuItem deleted seccessfuly');
        res.status(200).json({message: 'menu item deleted'})

    }catch(err){
        console.log(err);
        res.status(500).json({error:'internal server error'})
    }
})


module.exports=router;