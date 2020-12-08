import React, { Component } from 'react';
import axios from 'axios';

export default class CreateNewExercise extends Component {
    constructor(props) {
        super(props);

        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            description: ''
        }
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            description: this.state.description
        }

        console.log(exercise);
        
        axios.post('http://localhost:5000/descriptions/add', exercise)
            .then(res => console.log(res.data));

        this.setState({
            description: ''
        })
    }

    render() {
        return (
            <div>
                <h3>Create New Exercise</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group"> 
                    <label>Exercise: </label>
                    <input  type="text"
                        required
                        className="form-control"
                        value={this.state.description}
                        onChange={this.onChangeDescription}
                        />
                </div>
                <div className="form-group">
                    <input type="submit" value="Create Exercise" className="btn btn-primary" />
                </div>
                </form>
            </div>
        )
    }
}

