import React, {useState} from 'react'; 

import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
//import Chart from'./components/create-exercise';

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
import CreateNewExercise from "./components/create-new-exercise.component";
import Chart from './components/chart';

function App() {
  const [data,setData] = useState([1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  return (
    <Router>
      <div className = "container">
        <Navbar />
        <br/>
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create"><CreateExercise
          setData = {(data) => setData(data)}
        /></Route>
        <Route path="/user" component={CreateUser} />
        <Route path="/createnewexercise"><CreateNewExercise
          
        /></Route>
        <Route path="/chart" ><Chart
          data = {data}
        /></Route>  
      </div>
    </Router>
  );
}



export default App;

