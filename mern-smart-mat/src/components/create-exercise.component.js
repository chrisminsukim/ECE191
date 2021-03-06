import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
//import {dataArray} from '../../backend/server';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";



export default class CreateExercise extends Component {
    constructor(props) {
        super(props);
        
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: [],
            data: [],
            descriptions:[]
        }
        
    }
    
    // getData(){
    //   setInterval(()=> {
    //     axios.get('http://localhost:5000/')
    //     // .then(response=>{
    //     //   console.log(response)
    //     // })
    //     .then(response=>{
    //       this.setState({data: response.data.dataArrayObject.dataArray})
    //   })
    //   },1000)
    // }

    componentDidMount() {
      



      axios.get('http://localhost:5000/users/')
        .then(response => {
          if (response.data.length > 0) {
            this.setState({
              users: response.data.map(user => user.username),
              username: response.data[0].username
            })
          }
        })
      axios.get('http://localhost:5000/descriptions/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            descriptions: response.data.map(descriptions => descriptions.description),
            description: response.data[0].description
          })
        }
      })
    }
    
  
    
      

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        const chartData = {
          duration: this.state.duration,
          dataArray: this.state.dataArray
        }
        console.log(exercise);
        
        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data));
        
        // axios.get('http://localhost:5000/', dataArray)
        // .then(response=>{
        //   this.setState({chartData: response.chartSchema.dataArray})
        // axios.get('http://localhost:5000/', chartData)
        //   .then(res=>console.log(res.data));

        // axios.post('http://localhost:5000/', chartData)
        //   .then(res => {axios.post('http://localhost:5000/chart/add', {dataArray: res})}()
        //   .then(res => console.log(res.data)))
        axios.post("http://localhost:5000/", chartData).then((res) => {
          console.log("dataArray: ", res.data)
          this.props.setData(res.data);
        axios.post("http://localhost:5000/chart/add", { dataArray: res.data })
        .then((res) => console.log("Chart added!"));
});
        

        
        //window.location = '/chart';
    }

    render() {
      
        return (

     <div>
    {/* //   {this.getData()}
    //   <div>
    //     {this.state.data[0]}
    //   </div>
    //   <div>
    //     {this.state.data[1]}
    //   </div>
    //   <div>
    //     {this.state.data[2]}
    //   </div>
    //   <div>
    //     {this.state.data[3]}
    //   </div>
    //   <div>
    //     {this.state.data[4]}
    //   </div> */}
      
    
      <h3>Record Session</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.descriptions}
              onChange={this.onChangeDescription}>
              {
                this.state.descriptions.map(function(descriptions) {
                  return <option 
                    key={descriptions}
                    value={descriptions}>{descriptions}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group">
          <label>Duration (in seconds): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>

    )
  }
}


