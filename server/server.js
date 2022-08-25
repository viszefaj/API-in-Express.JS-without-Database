const express=require("express")
const app=express();
const port=5000;
const data = require("./db.js");
const cors=require('cors')
const bodyParser=require('body-parser')

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())

app.use((req,res,next)=>{
    req.data=data
    next();
})

app.get("/users",(req,res)=>{
    res.send(data);
})

app.post("/user",(req,res)=>{
    req.data.users.push(req.body)
    // console.log(req.data.users);
    res.status(201).send("Added")
})

app.put("/update/:username",(req,res)=>{
    const username=req.params.username
    req.data.users[username]=req.body
    console.log(req.data.users);
    res.status(200).send(req.data.users[username])
})

app.delete("/delete/:username",(req,res)=>{
    const username=req.params.username
    data.users = data.users.filter(item=>item.username !== username)
    console.log(req.params);
    res.status(200).send("Deleted");
})

app.listen(port,()=>{
console.log(`Port is listen in ${port}`)
})