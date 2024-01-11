const Review = require("../models/reviews.js");
const listing=require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

module.exports.createReview=async(req,res)=>{
    let list=await listing.findById(req.params.id);
    let {id}=req.params;
    let newReview=new Review(req.body.review);
    list.reviews.push(newReview);
    newReview.author=req.user._id;
    console.log(newReview)
    await newReview.save();
    await list.save();
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${list.id}`)
}

module.exports.destroyReview=async(req,res)=>{
    let {id,reviewId}=req.params;
    await listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}