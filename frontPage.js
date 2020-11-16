import React, { Component } from 'react'
// import CardColumns from '@bit/react-bootstrap.react-bootstrap.card-columns';
import {Card, CardGroup} from 'react-bootstrap';
import Iframe from 'react-iframe';
// import SimpleMap from './../src/gmap';
import MapChart from './../src/gmap'
require('isomorphic-fetch');
// import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';

export class FrontPage extends Component {

        

    render() {
        fetch("http://157.245.104.15/v1/graphql",{
            method: "POST",
            headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
            body:JSON.stringify({query:`{
              deviothaptestbedv01_facilitym {
                latitude 
                longitude
                facilityname
              }
            }`})

        })
        .then(res=>res.json())
        // .then(data=>data.data.deviothaptestbedv01_facilitym)
        // console.log(JSON.stringify(data))
        .then(data=>localStorage.setItem("data",JSON.stringify(data.data.deviothaptestbedv01_facilitym)));
        // .then(data=>console.log({data}))
//     fetch('https://more-troll-94.hasura.app/v1/graphql', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ "mutation": '{ Weather {"Sr_No":9 "Temp_Max":200,"Temp_Min":400 } }'  }),
// })
//   .then(res => res.json())
//   .then(data => console.log(data));
    // const query = JSON.stringify({
    //   query: `mutation {
    //         Weather(
    //           Sr_No: 9
    //           Temp_Max: 400
    //           Temp_Min: 200
    //           )
    //       }
    //   `
    // });
  
//    fetch("https://more-troll-94.hasura.app/v1/graphql", {
//       headers: {'content-type': 'application/json'},
//       method: 'POST',
//       body: JSON.stringify({
//         query: `mutation {
//                 insert_Weather(objects: [{Sr_No:13,Temp_Max:1400,Temp_Min:500}]) {
//               returning {
//                 Sr_No
//                 Temp_Max
//                 Temp_Min
//               }
//             }
//           }
//         `
//       })
      
//     }).then(console.log("done"))
  
    
    // const responseJson = response.json();
    // console.log(responseJson.data);
  
        return (
            <div style={{"overflowX": "hidden"}}>
                <h1>WELCOME</h1>
                
                        {/* <iframe src= width="720" height="391"></iframe> */}
                        {/* <iframe src="http://165.22.217.213/embed/query/4/visualization/8?api_key=N7JcK4YqeEcxLc2Y6ACIqmZMqHXRuvedat93Pwql&" width="720" height="391"></iframe> */}
            <div>
               {/* <CardGroup>
                    <Card style={{marginRight:"10px"}}>
                        <Card.Body >
                        <Card.Title style={{textAlign:"center"}} >Pending Incidents</Card.Title>
                        <h2 style={{textAlign:"center"}}>0</h2>
                        </Card.Body>
                    </Card>
                    <Card style={{marginRight:"10px"}}>
                        
                        <Card.Body>
                        <Card.Title style={{textAlign:"center"}}>Open Incidents</Card.Title>
                        <h2 style={{textAlign:"center"}}>0</h2>
                        </Card.Body>
                    </Card>
                    <Card style={{marginRight:"10px"}}>
                      
                        <Card.Body>
                        <Card.Title style={{textAlign:"center"}}>Notifications</Card.Title>
                        <h2 style={{textAlign:"center"}}>0</h2>
                        </Card.Body>
                    </Card>
                    <Card style={{marginRight:"10px"}}>
                      
                        <Card.Body>
                        <Card.Title style={{textAlign:"center"}}>Reopened Checklists</Card.Title>
                        <h2 style={{textAlign:"center"}}>0</h2>
                        </Card.Body>
                    </Card>
            </CardGroup> */}
            </div>
            <div style={{marginTop:"20px", marginRight:"10px"}}>
                <Card style={{cursor:"pointer"}}>
                    <div style={{padding:"25px"}}>
                        <i style={{fontSize:"20px"}} class="fas fa-plus-circle"></i>
                        <a style={{fontSize:"20px"}}>Add New Site:</a>
                    </div>
                </Card> 
                <Iframe url="http://165.22.217.213/embed/query/12/visualization/26?api_key=WTKbdppcRwjf8x1FNiguVtyOkKQ4nAmTh1RATEfV&"
                        width="100%"
                        height="561px"
                        id="myId"
                        display="initial"
                        scrolling="no"
                        frameBorder="0"
                        position="relative"/> 
                        <div style={{display:"flex"}}>
                <Iframe url="http://165.22.217.213/embed/query/7/visualization/16?api_key=GN754WozDX3D74iLvqnOaHjnuhzZDUGFGvvSi2hI&"
                        width="40%"
                        height="561px"
                        id="myId"
                        display="initial"
                        scrolling="no"
                        frameBorder="0"
                        position="relative"/> 
                <Iframe url="http://165.22.217.213/embed/query/8/visualization/18?api_key=LDYk0NO8AG0vfiicdGdLHSiejpAzXyRawimncAkf&"
                        width="60%"
                        height="561px"
                        id="myId"
                        display="initial"
                        scrolling="no"
                        frameBorder="0"
                        position="relative"/>
                        </div>
                        <div style={{display:"flex"}}>
                <Iframe url="http://165.22.217.213/embed/query/9/visualization/21?api_key=Do3A0T6NJymSpcWe8Tgr2mCTiedHwntrKlLnVs8d&"
                        width="50%"
                        height="561px"
                        id="myId"
                        display="initial"
                        scrolling="no"
                        frameBorder="0"
                        position="relative"/>
                <Iframe url="http://165.22.217.213/embed/query/11/visualization/24?api_key=f760mpKxUMxHzdgV9jo5v4UxnzIDMOKb0lPNbtuh&"
                        width="50%"
                        height="561px"
                        id="myId"
                        display="initial"
                        scrolling="no"
                        frameBorder="0"
                        position="relative"/>
                        </div>
                        {/* <SimpleMap/> */}
                        <MapChart/>
                {/* <i className="https://app.redash.io/lpabinash/queries/506864#866870"></i> */}
                {/* <Iframe src="https://app.redash.io/lpabinash/queries/506864#866870" height="500" width="500"/> */}
            </div>
            </div>
        )
    }
}

export default FrontPage




