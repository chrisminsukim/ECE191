const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


//Arduino Serial Monitor Connection
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const ArduinoPort = new SerialPort('COM4', { baudRate: 9600 });
const parser = ArduinoPort.pipe(new Readline({ delimiter: '\r\n' }));

// Read the port data


var i;
ArduinoPort.on("open", () => {
  console.log('serial port open');
});

let dataArray = [];

parser.on('data', data=>{
  var line = data;
  dataArray.push(line);
  if (dataArray.length == 5){
    console.log(dataArray);
    //export  dataArray;
    dataArrayObject = {dataArray};
    app.get("/", (req, res) => {
      res.send({dataArrayObject});
    });
    dataArray = [];
  }
})



require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})


const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const descriptionsRouter = require('./routes/descriptions');
//const { json } = require('express');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/descriptions', descriptionsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



