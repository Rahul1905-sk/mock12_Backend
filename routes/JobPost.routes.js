const express = require("express");
const { jobPostModel } = require("../model/JobPost.model");

const postRoutes = express.Router();

postRoutes.post("/add", async (req, res) => {
  let myDate = new Date();
  let day = myDate.getDate();
  let month = myDate.getMonth();
  let year = myDate.getFullYear();
  let newData = `${year}-${month}-${day}`; 
  req.body.postedAt = newData;


  try {
    const newPost = new jobPostModel(req.body);
    await newPost.save();
    res.status(200).send({ msg: "Post Added" });
  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});

postRoutes.get("/list", async (req, res) => {

    let {roles,mydate,skills,page=1} = req.query
    let ob = {}

    let Limits = 10

    

  try {
     
    if(roles) {
        ob.roles = roles
    }
if(skills) {
    ob.language= skills
}


if(page <= 0) {
    page=1
}


let arr = await jobPostModel.find(ob).limit(10).skip((page-1)*Limits)
res.send(arr)

  } catch (error) {
    res.status(400).send({ err: error.message });
  }
});


module.exports = {
  postRoutes,
};
