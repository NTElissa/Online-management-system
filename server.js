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
  
// Get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll({
            include: []
        });
  
        return res.status(200).json({
            message: "Users retrieved",
            data: users
        });
    } catch (err) {
        console.log("error "+err);
        return res.status(500).json(err);
    }
  });
  

// Get a user by id
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
        const user = await User.findOne({
            where: {id}
        });
  
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
  
        return res.status(200).json({
            message: "User retrieved",
            data: user
        });
    } catch (err) {
        console.log("error "+err);
        return res.status(500).json(err);
    }
  });
  
// Get a user by id
app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
        const user = await User.findOne({
            where: {id}
        });
  
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
  
        return res.status(200).json({
            message: "User retrieved",
            data: user
        });
    } catch (err) {
        console.log("error "+err);
        return res.status(500).json(err);
    }
  });
  

// Delete a blog by id
app.delete('/users/:id', async (req, res) => {
  const id = req.params.id;

  try {
      const numRowsDeleted = await User.destroy({
          where: {id}
      });

      if (numRowsDeleted !== 1) {
          return res.status(404).json({
              message: "USER not found"
          });
      }

      return res.status(200).json({
          message: "USER deleted"
      });
  } catch (err) {
      console.log("error "+err);
      return res.status(500).json(err);
  }
});

app.listen({port:3000}, async () => {
  console.log('Server listening on http://localhost:3000');
  await sequelize.authenticate();
  console.log('Connected to db');
});
