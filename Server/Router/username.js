const router = require('express').Router();
// const session = require('express-session');
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");

// router.use(session({
//     secret: "Our little secre.",
//     resave: false,
//     saveUninitialized: false
// }));
// router.use(passport.initialize());
// router.use(passport.session());

const userItem = require('../models/Sign');
var multer = require('multer');

const storage =multer.diskStorage({
      destination:(req,file,cb)=>{
                cb(null,'./uploads/')
      },
      filename: (req,file,cb)=>{
                cb(null,Date.now()+file.originalname)
      }
})
const upload =multer({storage:storage})

router.post('/api/username',upload.single('profile'),async( req, res )=>{
          try {
            console.log("post2d is workiing");
            console.log(req.body);
            //         const newUser = new userItem({
            //                   Name: req.body.Name,
            //                   Age: req.body.Age,
            //                   Birth: req.body.Birth,
            //                   Profile_img:(req.file) ? req.file.filename : null,                           
            //                   Email: req.body.Email,
            //                   Password: req.body.Password

            //         })
            //         console.log(req.body);
            //         console.log(userItem);
            //         const save = await newUser.save();
            //         res.status(200).json("Added Succefully");
                                  
          } catch (error) {
                    res.json(error);                    
          }
})
router.post("/api/user", async (req,res)=>{
      try {
            const reqEmail = req.body.Email;
            const reqPassword = req.body.Password;
            const item = await userItem.findOne({Email: reqEmail});
            console.log(reqPassword);
            console.log("item"+item.Password);
            if (reqPassword===item.Password){
                  console.log("yes");
                  res.json("working");
                  res.json(Email);
            }else{
                  console.log("no");
            }
      } catch (error) {
          console.log(error);  
      }
})
// Get all iteam

router.get('/api/usernames' ,async(req,res)=>{
            console.log("hello");
          try {
                const allprofileItem = await userItem.find({});
                res.status(200).json(allprofileItem);   
          } catch (error) {
                    res.json(error);
          }
})

//Specific item get
router.get('/api/usernames/:id' , async( req,res )=>{

          try {
                   const specificItem = await userItem.findById(req.params.id);
                   res.status(200).json(specificItem)
          } catch (error) {               
                    res.json(error);
          }
})

// Delete paticular item
router.delete('/api/username/:id' , async( req,res )=>{
      console.log(req.params.id);
          try {
                   const deleteItem = await userItem.findByIdAndRemove(req.params.id);
                   res.status(200).json(deleteItem);
          } catch (error) {               
                    res.json(error);
          }
})
// Delete all item 
router.delete('/api/username/e' , async( req,res )=>{
      
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {
            try {
                  const deleteAll = await userItem.deleteMany(req.params.id);
                  res.status(200).json("all item is detete");

         } catch (error) {               
                   res.json(error);
         }
          }
          
})

module.exports = router;


