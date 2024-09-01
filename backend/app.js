
const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();

const port = 3000;

const {modules} = require('./utils/index.js');
const {getAllData,insertData,updateData,deleteData} = modules;

app.use(express.urlencoded({extends : true}))
app.use(express.raw({extends : true}))
app.use(cors());

app.get('/',(req,res) => {

    res.send('Hello World!');

    console.log('Home Get Hit')
})

app.get('/api/v1/note',(req,res) => {
    console.log('Mengirim Semua Data Note yang Ada..')
    res.json(getAllData());
})

app.post('/api/v1/save',(req,res) => {
    console.log("api/v1/save Di Hit")
    const reqBody = req.body;
    const data = {
        id : reqBody.id,
        title : reqBody.title,
        desc : reqBody.desc,
        date : reqBody.date
    }
    insertData(data);
})


app.put('/api/v1/update',(req,res) => {
    console.log("api/v1/Update Di Hit")
    const reqBody = req.body;
    console.log(reqBody)
    const data = {
        id : reqBody.id,
        title : reqBody.title,
        desc : reqBody.desc,
        date : reqBody.date
    }
    updateData(data.id,data);
})

app.delete('/api/v1/delete',(req,res) => {
    console.log("api/v1/Delete Di Hit")
    const reqBody = req.body;
    console.log(reqBody)
    const data = {
        id : reqBody.id,
        title : reqBody.title,
        desc : reqBody.desc,
        date : reqBody.date
    }
    deleteData(data.id);
})


app.listen(port,() => {
    console.log(`Server Running On Port ${port}`);
})