const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,isReviewAuthor}=require("../middleware.js");
const {validateReview}=require("../middleware.js");
const controllerReview=require("../Controller/reviews.js");
const listing=require("../models/listing.js");
const Review = require("../models/reviews.js");

router.post("/",isLoggedIn,validateReview,wrapAsync(controllerReview.createReview));

router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(controllerReview.destroyReview))

module.exports= router;
