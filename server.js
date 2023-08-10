require('dotenv').config();
const express = require ('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())


const Expense = require('./models/expenseModel')


mongoose.connect(process.env.SECRET_MONGO_LINK)
.then(()=>{
    app.listen(4000,()=> {

        console.log("Node is running on port 4000") ;
    
    })
    console.log("data base connected")
}).catch((e) => {
   console.log(e)
})


app.get("/" ,(req,res) => {

    res.send(`Hi there 🙂 `) 
    
})

/// get all the full list 
app.get("/expenses" , async(req,res) => {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 5
    const skip =  (page - 1) * limit
    try {
       const stu = await Expense.find({}).limit(limit).skip(skip) ;  // {} empty means all 
       res.status(200).json(stu)
    }catch(err) {
        console.log(err)
        res.status(500).json({message:err.message})
    }
  
  })
  // POST 
app.post("/expense" , async(req,res) => {
   
    try {
       const exp = await Expense.create(req.body) 
       res.status(200).json(exp)
    }catch(err) {
        console.log(err)
        res.status(500).json({message:err.message})
    }
  
  })
///// put
  app.put("/expense/:id/" , async(req,res) => {

    try {
        const {id} = req.params;
        const n= req.body
        const exp =await Expense.findByIdAndUpdate(id,n);
        if (!exp) {
            return res.status(404).json({message:"could not find any expense name try with different casing uppper or lower case"})
        }
         const updatedExp = await Expense.findById(id)
         res.status(200).json(updatedExp)
    }catch (err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
  })

/// delete 
app.delete("/expense/:id/" , async(req,res) => {

    try {
        const {id} = req.params;
        
        const exp =await Expense.findByIdAndDelete(id);
        if (!exp) {
            return res.status(404).json({message:"could not find any expense name "})
        }
        res.status(200).json(exp)
    }catch (err){
        console.log(err)
        res.status(500).json({message:err.message})
    }
  })

/// get by name
  app.get("/expense/:name" , async(req,res) => {
    try {
        const {name} = req.params;
        const regName = new RegExp(name,'i')
       const exp = await Expense.find({"name":regName}) ;  
       res.status(200).json(exp)
    }catch(err) {
        console.log(err)
        res.status(500).json({message:err.message})
    }
  
  })







 