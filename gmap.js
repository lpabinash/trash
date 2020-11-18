
import React, { Component } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup, Marker
} from "react-simple-maps";
require('isomorphic-fetch');

export class MapChart extends Component {
  state={
    marker:[]
  }
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
  .then(data=>{
      const markers=[]
      for(var i=0;i<data.data.deviothaptestbedv01_facilitym.length;i++){
          const facilityname=data.data.deviothaptestbedv01_facilitym[i].facilityname;
          const longitude=data.data.deviothaptestbedv01_facilitym[i].longitude;
          const latitude=data.data.deviothaptestbedv01_facilitym[i].latitude;
          // console.log(facilityname,longitude,latitude)
          
          if(latitude>0){
            markers.push({"name": facilityname, "coordinates":[longitude,latitude]})
          }
          
          
        }
        this.setState({marker:markers});
        // console.log(markers)
  })
  const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
  // console.log(markers)
    return (
      <div>
           <ComposableMap>
        {/* <ZoomableGroup zoom={1}> */}
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo} 
                fill="#EAEAEC"
                stroke="teal" 
                                />
              ))
            }
          </Geographies>
          {/* </ZoomableGroup> */}
                {this.state.marker.map(({ name, coordinates, }) => (
        <Marker key={name} coordinates={coordinates}>
          <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
         <div ></div>
        </Marker>
      ))}
        
      </ComposableMap>
      </div>
    )
  }
}

export default MapChart


