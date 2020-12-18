import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:{
                
                labels: ['Left Heel 1', 'Left Heel 2', 'Left Heel 3', 'Left Heel 4', 'Left Arch 1', 'Left Arch 2', 'Left Toe 1', 'Left Toe 2', 'Left Toe 3', 'Left Toe 4', 'Right Heel 1', 'Right Heel 2', 'Right Heel 3', 'Right Heel 4', 'Right Arch 1', 'Right Arch 2', 'Right Toe 1', 'Right Toe 2', 'Right Toe 3', 'Right Toe 4'],
                datasets:[
                    {
                        
                        label:'Averages',
                        data: this.props.data,
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255,45 , 87, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)'
                        ]
                    }
                ]
            }
        }
    }
    render(){
        
        return (
            
            <div className="chart">
                {console.log(this.props.data)}
                <Bar
                    data={this.state.chartData}
                    options={{
                        scales: {
                            yAxes: [{
                                scaleLabel: {
                                    display: true, 
                                    labelString: 'Average Weight in Pounds'
                                }
                            }]
                        }
                    }}
                />
            </div>
        )
    }
}

export default Chart;