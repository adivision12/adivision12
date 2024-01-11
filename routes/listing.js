const express=require("express");
const router=express.Router();
const listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js")
const {isLoggedIn, isOwner,isListingOwner,validateListing}=require("../middleware.js");
const controllerListing=require("../Controller/listings.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")

const upload = multer({storage});

router.route("/")
.get(controllerListing.index)
.post(isLoggedIn,upload.single('listing[image]'),validateListing,controllerListing.newListing);




router.get("/new",isLoggedIn,controllerListing.newForm)

router.route("/:id")
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(controllerListing.editListing))
.get(wrapAsync(controllerListing.showListings))
.delete(isLoggedIn,isListingOwner,wrapAsync(controllerListing.destroyListing))


router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(controllerListing.editForm))

module.exports = router;