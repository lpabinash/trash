import React, { Component } from 'react'
// import CardColumns from '@bit/react-bootstrap.react-bootstrap.card-columns';
import {Card, CardGroup} from 'react-bootstrap';
import Iframe from 'react-iframe';
// import SimpleMap from './../src/gmap';
import MapChart from './../src/gmap'
import {withRouter, Link} from 'react-router-dom'
require('isomorphic-fetch');
import Process from './../src/process'
const { createApolloFetch } = require('apollo-fetch');
// import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';

export class FrontPage extends Component {
    state={
        CompanyCount:"",
        FacilityCount:""
    }
    componentDidMount(){
        fetch("http://157.245.104.15/v1/graphql",{
            method: "POST",
            headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
            body:JSON.stringify({query:`{
                deviothaptestbedv01_companym {
                  companyname
                }
                deviothaptestbedv01_facilitym {
                  facilityname
                }
              }`})

        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({CompanyCount:data.data.deviothaptestbedv01_companym.length,FacilityCount:data.data.deviothaptestbedv01_facilitym.length})
            // console.log(Reqdata)
            
              })
   
    }
 
    render() {
 
       
        return (
            <div style={{"overflowX": "hidden"}}>
                <h1>WELCOME</h1>      
            <div>
               <CardGroup>
               
                    <Card style={{marginRight:"10px"}}>
                    <Link to="/Companies" >
                        <Card.Body >
                        <Card.Title style={{textAlign:"center"}} >Listed Company</Card.Title>
                        <h2 style={{textAlign:"center"}}>{this.state.CompanyCount}</h2>
                        </Card.Body>
                        </Link>
                    </Card>
                    
                    <Card style={{marginRight:"10px"}}>
                        
                        <Card.Body>
                        <Card.Title style={{textAlign:"center"}}>Facilities</Card.Title>
                        <h2 style={{textAlign:"center"}}>{this.state.FacilityCount}</h2>
                        </Card.Body>
                    </Card>
                    <Card style={{marginRight:"10px"}}>
                      
                        <Card.Body>
                        <Card.Title style={{textAlign:"center"}}>Total Devices Added</Card.Title>
                        <h2 style={{textAlign:"center"}}>0</h2>
                        </Card.Body>
                    </Card>
                    <Card style={{marginRight:"10px"}}>
                      
                        <Card.Body>
                        <Card.Title style={{textAlign:"center"}}>Unused Devices</Card.Title>
                        <h2 style={{textAlign:"center"}}>0</h2>
                        </Card.Body>
                    </Card>
            </CardGroup>
            </div>
            {/* <div style={{marginTop:"20px"}}>
                <Card style={{cursor:"pointer"}}>
                    <div style={{padding:"25px"}}>
                        <i style={{fontSize:"20px"}} className="fas fa-plus-circle"></i>
                        <a style={{fontSize:"20px"}}>Add New Site:</a>
                    </div>
                </Card> 
            </div> */}
                        
                        <MapChart/>
                        {/* <Process/> */}
                {/* <i className="https://app.redash.io/lpabinash/queries/506864#866870"></i> */}
                {/* <Iframe src="https://app.redash.io/lpabinash/queries/506864#866870" height="500" width="500"/> */}
            </div>
            // </div>
        )
    }
}

export default FrontPage




