const User=require("../models/user.js");

module.exports.signUpForm=async(req,res)=>{
    res.render("./user/signup.ejs");
}

module.exports.signUp=async(req,res)=>{
    try{
        let {username,email,password}=req.body;
    let newUser=new User({email,username})
    let registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to Wanderlust!")
    res.redirect("/listings");
    })}catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.login=async(req,res)=>{
    req.flash("success","Welcome Back To Wanderlust!");
    if(!res.locals.redirectUrl){
        res.redirect("/listings");
    }else{
        res.redirect(res.locals.redirectUrl)
    }
}

module.exports.loginForm=async(req,res)=>{
    res.render("./user/login.ejs");
}

module.exports.logOut=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }else{
            req.flash("success","You are logged out!");
            res.redirect("/listings");
        }
    });
}