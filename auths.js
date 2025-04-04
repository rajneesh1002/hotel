const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const person=require('./models/person')



passport.use(new LocalStrategy(async(user_name,pwd,done)=>{
    
    try{
        //console.log('received credential:', user_name,pwd);
        const user=await person.findOne({username:user_name});
        if(!user){
            return done(null,false,{message: 'incorrect username'});
        }
        const isPasswordMatch=await user.comparePassword(pwd);

        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'incorrect password'});
        }

    }catch(err){
        return done(err);

    }
}))


module.exports=passport;