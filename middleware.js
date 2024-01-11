const listing=require("./models/listing.js");
const Review = require("./models/reviews.js");
const ExpressError=require("./utils/ExpressError.js");
const { listingSchema,reviewSchema}=require("./schema.js");

module.exports.isLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl=req.originalUrl;
        req.flash("error","You must be logged in to Create Listing!");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl=(req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listings=await listing.findById(id);
    if(!listings.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission to edit");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isReviewAuthor=async(req,res,next)=>{
    let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not author of review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.isListingOwner=async(req,res,next)=>{
    let {id}=req.params;
    let listings=await listing.findById(id);
    if(!listings.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You are not Owner of this Listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports.validateListing=(req,res,next)=>{
    let {error} =listingSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error)
    }else{
        next();
    }
}

module.exports.validateReview=(req,res,next)=>{
    let {error} =reviewSchema.validate(req.body);
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
}