import React, { Component } from 'react'
import {withRouter, Link} from 'react-router-dom'
// import {
//     ComposableMap,
//     Geographies,
//     Geography,
//     ZoomableGroup, Marker
//   } from "react-simple-maps";

  require('isomorphic-fetch');

export class Process extends Component {
    state={
        process:[]
    }
    render() {
        fetch("http://157.245.104.15/v1/graphql",{
            method: "POST",
            headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
            body:JSON.stringify({query:`{
              deviothaptestbedv01_plant_process_steps { 
                plant_process_Desc
              }
            }
              `})
      
        })
        .then(res=>res.json())
        .then(data=>{
            // const Process=[]
           const Reqdata=data.data.deviothaptestbedv01_plant_process_steps
           this.setState({process:Reqdata})
         
        })
        return (
          <div>
            <h1>Process</h1>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:"20px",flexWrap: "wrap"}}>
                   {/* {this.state.process.map((item,pos)=>{
              <div>{item.production_process_step}</div>
           })} */}
            {this.state.process.map((item) => (
              <Link to="/devices" >
        <div style={{height:"300px",width:"250px",marginBottom:"20px", backgroundColor:"#1871ad",textAlign:"center",borderRadius:"8px"}}>
          <h2 style={{marginTop:"10px",padding:"10px",color:"white"}}>{item.plant_process_Desc}</h2>
          <h4 style={{padding:"10px",color:"white"}}>Running for 3 Hours</h4>
          </div>
          </Link>
      ))}
           
            </div>
            </div>
        )
    }
}

export default Process



