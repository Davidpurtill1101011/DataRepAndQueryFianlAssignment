const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const exerciseRoute = require('./routes/exercises')
const usersRoute = require('./routes/users');

// for enviroment vars in file
require('dotenv').config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const myConnString = 'mongodb+srv://fredboi1101:ZqVena@cluster0.rpowa.mongodb.net/mydatabase?retryWrites=true&w=majority';
mongoose.connect(myConnString, { useNewUrlParser: true, useCreateIndex: true });


const Schema = mongoose.Schema;
const exerciseSchema = new Schema({
    username: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

// const 


const connection = mongoose.connection;

const exer = mongoose.model('exercise', exerciseSchema);

connection.once('open', () => {
    console.log("Mongo Db has been connected");
})

app.get('/exercises/add', (req,res)=>{
    exer.find((err,data)=>{
        res.json(data);
    })
})

app.post('/exercises/add', (req,res)=>{
    console.log(req.body);

    exer.create({
        username: req.body.username,
        description: req.body.description,
        duration: req.body.duration,
        date: Date.parse(req.body.date),
    }).then()
    .catch();

    res.send('data recieved');
})

app.get('/excercise/add/:id',(req,res)=>{
    console.log(req.params.id);

    exer.findById(req.params.id,(err,data)=>{
        res.json(data);
    })
})

app.put('/excercise/add/:id',(req,res)=>{
    exer.findByIdAndUpdate(req.params.id,
        req.body, {new:true},
        (err,data)=>{

        })
})

app.delete('/excercise/add/:id',(req,res)=>{

    exer.findByIdAndDelete({_id:req.params.id},
        (err,data)=>{
            res.send(data)
        })
})

app.use('/users', usersRoute);

app.listen(port, () => {
    console.log('Server is running on port:' + port);
})
