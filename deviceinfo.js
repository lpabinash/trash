

  
    import React, { Component } from 'react'
    import { Line } from 'react-chartjs-2';
    // import classes from './Dashboard.module.css'
    
    export class Deviceinfo extends Component {
        state = {
            data: {
              labels: [],
              datasets: [
                {
                  label: 'Temperature',
                  data: [],
                  pointBorderColor: 'rgba(75,192,192,1)',
                  pointBackgroundColor: '#fff',
                  pointBorderWidth: 1,
                  pointHoverRadius: 5,
                  pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                  pointHoverBorderColor: 'rgba(220,220,220,1)',
                  pointHoverBorderWidth: 2,
                  pointRadius: 1,
                  pointHitRadius: 10,
                }
              ]
            }
          }

          
          getdata=()=>{
              const getinfo=JSON.parse(localStorage.getItem('chart'));
              this.state.data.datasets[0].data=getinfo.map(item=>{
                return item.devicemonitorvalue
              });
              this.state.data.labels=getinfo.map(item=>{
                return item.devicemonitortime
              });
    
              if (this.state.data.datasets) {
                let colors = ['#4bc0c0',];
                this.state.data.datasets.forEach((set , i)=>{
                  set.borderColor = colors[i];
                  set.borderWidth = 3;
                
                });
              }
        // console.log(this.state.data)
            return this.state.data;
          }
        render() {
            return (
                    // <div className={classes.latesthits}>
                    <div style={{width:"90vw",backgroundColor:"white",margin: "auto",paddingTop:"50px",paddingBottom:"20px",marginTop:"100px",borderRadius:"20px"}}>
              <h2 style={{textAlign:"center"}}>Chart</h2>
              <Line 
                  options={{
                      responsive: true,
                      tooltips: {
                        mode: 'point'
                    },
                      legend: {
                          labels: {
                              // fontColor: "white",
                          }
                      },
                      scales: {
                          yAxes: [{
                              ticks: {
                                  // fontColor: "white",
                                  stepSize: 5,
                                  beginAtZero: false,
                                  min: 0,
                              },
                              scaleLabel: {
                                  display: true,
                                  labelString: 'Temperature',
                                  // fontColor: "white",
                              }
    
                          }],
                          xAxes: [{
                              ticks: {
                                  // fontColor: "white",
                          }
                      }]},
                      elements: {
                          point:{
                              radius: 0
                          }
                      }
                  }}
                  data={this.getdata}
              />
            </div>
        // </div>
            )
        }
    }
    
    export default Deviceinfo