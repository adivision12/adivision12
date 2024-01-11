const mongoose = require("mongoose");
const initData = require("./data.js");
const listing=require("../models/listing.js");


main().then(()=>{
    console.log("connected to DB")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Project_1');

}

const initDB=async()=>{
    await listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({ ...obj ,owner:"6597cd36efbc06fbcc6b01e9"}));
    await listing.insertMany(initData.data);
    console.log("data was initialized");
}
initDB();