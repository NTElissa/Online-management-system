const {sequelize, User}=require('./models');
const express=require('express');

const app= express()
app.use(express.json())

app.post('/users',async (req,res) =>{
    const{firstName,lastName,email}=req.body;
   
    try{
       const newUser =await User.create({firstName,lastName,email});
   
        return res.status(201).json({
          message:"user created",
          data:newUser
            });
   
    }catch(err){
     console.log("error "+err);
     return res.status(500).json(err)
    }
    
   });
  //  app.get('/users' , async(req,res))

app.listen({port:3000} ,async()=>{
    console.log('Server listning on http://localhost:3000')
    await sequelize.authenticate()
    console.log('connected to db')
})
  
