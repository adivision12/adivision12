const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const passport = require("passport");
const { saveRedirectUrl }=require("../middleware.js");
const controllerUser=require("../Controller/users.js");
router.route("/signup")
.get(controllerUser.signUpForm)
.post(wrapAsync(controllerUser.signUp));

router.route("/login")
.get(controllerUser.loginForm)
.post(saveRedirectUrl,passport.authenticate("local",{
    failureFlash:true,
    failureRedirect:"/login"
}),controllerUser.login);


router.get("/logout",controllerUser.logOut)

module.exports=router;