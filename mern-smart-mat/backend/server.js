const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


//Arduino Serial Monitor Connection
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const ArduinoPort = new SerialPort('COM3', { baudRate: 9600 });
const parser = ArduinoPort.pipe(new Readline({ delimiter: '\r\n' }));

// Read the port data


var i;
ArduinoPort.on("open", () => {
  console.log('serial port open');
});

// let dataArray = [];


// parser.on('data', data=>{
//   let testArray = [];
//   testArray = data.split(" ");
//   testArray.pop();
//   console.log(testArray);
//   // var line = data;
//   // dataArray.push(line);
//   // if (dataArray.length == 5){
//   //   console.log(dataArray);
//   //   //export  dataArray;
//   //   dataArrayObject = {dataArray};
//   //   app.get("/", (req, res) => {
//   //     res.send({dataArrayObject});
//   //   });
//   //   dataArray = [];
//   // }
// })


// app.post("/graph", (req, res) => {
//   let baseArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//   setTimeout(() => {
//     parser.on('data', data=> {
//       var line = data;
//       dataArray;

//     })
//   })
// });
//arduinoData = [time, weight, weight]
//time1 = arduinoData[0]
//time2 = 



//[time, cell1, ... cell 20]
//get duration from react
//time1 = first timestamp from serial monitor once submit is pressed
//time2 = every new line of data from serial monitor after
//once time2 - time1 = duration, start getting averages of each fsr to plot
//send the final array with all the averages to react to graph


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

// let dataArray;
// parser.on('data', data =>{
//   dataArray = data.split(' ');
//   dataArray.pop();
//   app.post("/", (req, res) => {
//     let counter = 0;
//     let baseArray = [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01];
    
//     let time1 = 0;
//     let time2 = 0;
//     // console.log("duration before Number: ", req.body.duration);
    
//     // console.log("duration: ", Number(req.body.duration));
    
//     while(time2 - time1 < (req.body.duration * 1000)){
//         //console.log("in while loop", (time2 - time1 < (req.body.duration*1000)));
//         //console.log(time2-time1);
//         console.log(data);
//         // parser.on('data', data => {
//         //     console.log("inside parser");
//             //counter++;
//             //console.log(counter);
//             //console.log(dataArray);
//             if (counter == 0){
//               time1 = dataArray[0];
//             }
//             counter = counter + 1;
//             for(var i = 1; i < 21; i++){
//               baseArray[i] = baseArray[i] + Number(dataArray[i]);
//             }
//             time2 = dataArray[0];
//     }
//         baseArray.shift();
//         for(var i = 0; i < 20; i++){
//           baseArray[i] = baseArray[i]/counter;
//         }
//         console.log("final array: ", baseArray)
//         res.send(baseArray);
//     // setTimeout(() => {
//     //   //baseArray = baseArray.map(data => data/counter);
      
//     //   res.send(baseArray)
//     //   console.log(baseArray);
//     // }, req.body.duration*1000)
    
//   })
// })

app.post("/", (req, res) => {
  let counter = 0;
  let baseArray = [0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01, 0.01];

  let time1 = 0;
  let time2 = 0;
  let dataArray;

  parser.on('data', data =>{
    dataArray = data.split(' ');
    dataArray.pop();
    if (counter == 0){
      time1 = dataArray[0];
    }
    counter = counter + 1;
    for(var i = 1; i < 22; i++){
      baseArray[i] = baseArray[i] + Number(dataArray[i]);
    }
    time2 = dataArray[0];
    if (time2 - time1 > (req.body.duration * 35000)) {
      
      baseArray.shift();
      baseArray.pop();
      for(var i = 0; i < 20; i++){
        baseArray[i] = baseArray[i]/counter;
        baseArray[i] = baseArray[i] * 10000;
      }
    
      

      console.log("final array: ", baseArray)
      console.log(baseArray.length);

      if (! isNaN(baseArray[baseArray.length- 1])){
        res.send(baseArray);
      }
    }

  })
})



const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const descriptionsRouter = require('./routes/descriptions');
const chartRouter = require('./routes/chart');
//const { json } = require('express');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/descriptions', descriptionsRouter);
app.use('/chart', chartRouter);
//app.use('/graph')

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});



