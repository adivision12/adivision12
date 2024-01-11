const listing=require("../models/listing.js");
const mapToken=process.env.MAP_TOKEN;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocodingClient = mbxGeocoding({ accessToken: mapToken })

module.exports.index=async(req,res)=>{
    const allListing=await listing.find({})
    res.render("listings/index.ejs",{allListing})
}

module.exports.newForm=(req,res)=>{
    res.render("listings/new.ejs")
}

module.exports.newListing=async(req,res,next)=>{
   let response=await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
      })
        .send()
    console.log(response.body.features[0].geometry)
    res.send("successs")
    let url=req.file.path;
    let filename=req.file.filename;
    // console.log(url,"...",filename);

    const newListing=new listing(req.body.listing);
    newListing.owner=req.user._id;
    newListing.image={url,filename};
    await newListing.save();
    console.log(req.body.listing)
    req.flash("success","New Listing Created!");
    res.redirect("/listings")
    
}

module.exports.editForm=async(req,res)=>{
    let {id}=req.params;
    const listings=await listing.findById(id);
    if(!listings){
        req.flash("error","Listing you search does note exits!");
        res.redirect("/listings");
    }
    let originalImageUrl=listings.image.url;
    originalImageUrl=originalImageUrl.replace("/upload","/upload/w_250")
    res.render("listings/edit.ejs",{listings,originalImageUrl})
}

module.exports.editListing=async(req,res)=>{
    let {id}=req.params;
    let newListing=await listing.findByIdAndUpdate(id,{...req.body.listing})
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
    let filename=req.file.filename;
    newListing.image={url,filename};
    await newListing.save();
    }
    req.flash("success","Listing Updated!");
    res.redirect(`/listings/${id}`);
}

module.exports.showListings=async(req,res)=>{
    let {id}=req.params;
    
    const listings=await listing.findById(id).populate({
        path:"reviews",
        populate:{
            path:"author",
       }
   }).populate("owner");
    if(!listings){
        req.flash("error","Listing you search does note exits!");
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listings})
    // console.log(listings);
}

module.exports.destroyListing=async(req,res)=>{
    let {id}=req.params;
    const dltlistings=await listing.findByIdAndDelete(id);
    console.log(dltlistings)
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}