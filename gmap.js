// import React from "react";
// import {
//   ComposableMap,
//   Geographies,
//   Geography,
//   ZoomableGroup,
//   Marker
// } from "react-simple-maps";
const markers = [

];

// const geoUrl =
//   "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";
const mapdata=JSON.parse(localStorage.getItem('data'))
// const marks=[mapdata.facilityname,mapdata.longitude,mapdata.latitude]
console.log(mapdata.length)
for(var i=0;i<mapdata.length;i++){
  const facilityname=mapdata[i].facilityname;
  const longitude=mapdata[i].longitude;
  const latitude=mapdata[i].latitude;
  console.log(facilityname,longitude,latitude)
  if(latitude>0){
    markers.push({"name": facilityname, "coordinates":[longitude,latitude]})
  }
  
}




// import { NULL } from "node-sass";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup, Marker
} from "react-simple-maps";
require('isomorphic-fetch');

//     fetch('http://157.245.104.15/v1/graphql', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"  },
//   // body: JSON.stringify({ "mutation": '{ Weather {"Sr_No":9 "Temp_Max":200,"Temp_Min":400 } }'  }),
// })
//   .then(res => res.json())
//   .then(data => console.log(data));
//    const query = JSON.stringify({
//       query: `{
//         deviothaptestbedv01_facilitym {
//           latitude
//           longitude
//           facilityname
//         }
//       }
//       `
//     });

        // console.log(data)
        

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = () => {
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
                {markers.map(({ name, coordinates, }) => (
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
  );
};

export default MapChart;

