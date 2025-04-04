 const mongoose=require('mongoose')
 const bcrypt=require('bcrypt');

 const personschema=new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum:['chef','waiter','manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required:true,
        unique: true
    },
    address:{
        type: String,

    },
    salary:{
        type: Number,
        required: true
    
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
 });
personschema.pre('save',async function(next){
    const person=this;

    //for person only change data no need to generate new hash password
    if(!person.isModified('password')) return next(); //

    try{
        //hash password generation
        const salt=await bcrypt.genSalt(10);

        const hashPassword=await bcrypt.hash(person.password,salt);
        person.password= hashPassword;

        next();
    }catch(err){
        return next(err);
    }
})
personschema.methods.comparePassword=async function (candidatePassword){
    try{
        //use bcrypt to compare the provided password with the hashed password
        const isMatch=await bcrypt.compare(candidatePassword, this.password)
        return isMatch;
    }catch(err){
        throw err;
    }
}

//create person model
 const person= mongoose.model('person',personschema);
 module.exports=person;

