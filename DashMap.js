import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
// import * as parkData from "./skateboard-parks.json";
import './DashMap.css'
import ItemsCarousel from 'react-items-carousel';
import Carousel from 'react-elastic-carousel';
// import InfiniteCarousel from 'react-leaf-carousel';
// import { render } from '@testing-library/react';
// import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
// const icon = new Icon({
//     iconUrl: "./skater.svg",
//     iconSize: [25, 25]
//   });
const pointer = new Icon({
    iconUrl: "./map-point-pointer.svg",
    iconSize: [2, 2]
  });
export class DashMap extends Component {
    state={
        activePark:"",
        Companydata:[],
        center:[40.5304, -5.6622],
        zoom:2
        // setActivePark:
    }
    componentWillMount(){
        this.setState({activePark:null})
        fetch("http://157.245.104.15/v1/graphql",{
            method: "POST",
            headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
            body:JSON.stringify({query:`{
                deviothaptestbedv01_facilitym {
                    idfacilitym
                    facilityzipcode
                    facilitytype
                    facilitystreet
                    facilitystate
                    facilityname
                    facilitymobile
                    facilitylongitude
                    facilitylocation
                    facilitylatitude
                    facilityemail
                    facilitycountry
                    facilitycontractperson
                    companym {
                      companyname
                    }
                  }
              }`
            })
  
        })
        .then(res=>res.json())
        .then(data=>{
   
            const Companydata = data.data.deviothaptestbedv01_facilitym
            console.log(Companydata)
            this.setState({Companydata:Companydata})
              })
    }
    clickHandle=(e)=>{
        console.log(e.target.getAttribute('dataKey'))
        var index=parseInt((e.target.getAttribute('dataKey')))
        fetch("http://157.245.104.15/v1/graphql",{
            method: "POST",
            headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
            body:JSON.stringify({query:`{
                deviothaptestbedv01_facilitym(where: {idfacilitym: {_eq: ${index}}}) {
                    idfacilitym
                    facilityzipcode
                    facilitytype
                    facilitystreet
                    facilitystate
                    facilityname
                    facilitymobile
                    facilitylongitude
                    facilitylocation
                    facilitylatitude
                    facilityemail
                    facilitycountry
                    facilitycontractperson
                    companym {
                      companyname
                    }
                  }
              }`
            })
  
        })
        .then(res=>res.json())
        .then(data=>{
   
            const reqData = data.data.deviothaptestbedv01_facilitym
            console.log(reqData[0])
            this.setState({activePark:reqData[0]})
              })

    }
    
    render() {
        const renderingData=this.state.Companydata.map(item=>{
            return(
                <div onClick={this.clickHandle} className="itemWrapper" dataKey={item.idfacilitym} style={{width:"12vw",padding:"10px",opacity:"0.6",borderRadius:"10px"}}>
            <h3 dataKey={item.idfacilitym} className="facName" >{item.facilityname}</h3>
            </div>
            )
        })
        const breakPoints = [
            { width: 1, itemsToShow: 1 },
            { width: 550, itemsToShow: 2, itemsToScroll: 2 },
            { width: 768, itemsToShow: 5 },
            { width: 1200, itemsToShow: 6 }
          ];

        return (
            <div>
             <Map
                className="markercluster-map"
                center={this.state.center}
                zoom={this.state.zoom}
                maxZoom={18}
                minZoom={2}
                dragging={false}
            >
                
                
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {this.state.Companydata.map(item => (
                     
                     <Marker
                        // style={{height:"5px"}}
                     key={item.idfacilitym}
                     position={[
                        item.facilitylatitude,
                        item.facilitylongitude,

                     ]}
                     onclick={()=>{
                        this.setState({activePark:item,center:[item.facilitylatitude, item.facilitylongitude],zoom:6})
                        console.log(this.state.activePark)
                     }}
                   
                     />
                     
                 ))}

                {this.state.activePark && (
                    <Popup
                    position={[
                        this.state.activePark.facilitylatitude,
                        this.state.activePark.facilitylongitude
                    ]}
                    onClose={() => {
                        this.setState({activePark:null,center:[40.5304, -5.6622],zoom:2});
                    }}
                    >
                         <div>
                        <h2 style={{color:"white"}}>{this.state.activePark.facilityname}</h2>
                        <p style={{color:"white"}}>{this.state.activePark.facilitylocation}</p>
                    </div>
                    </Popup>)}
            </Map>
            <div style={{position:"absolute",marginLeft:"-20px",top:"35%",height:"275px",width:"275px",borderRadius:"10px"}}>
                
                <div style={{height:"60px",width:"100%",backgroundColor:"#1871ad",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}}>
                <h1 style={{color:"white",marginLeft:"50%",transform:"translateX(-50%)",marginTop:"10px",fontSize:"16px"}}>{(this.state.activePark!=null||"")?this.state.activePark.facilityname:"Select a Facility"}</h1>
                </div>
                <div style={{backgroundColor:"#1871ad",height:"210px",opacity:"0.8",borderBottomLeftRadius:"10px",borderBottomRightRadius:"10px"}}></div>
            </div>
           
           <div style={{position:"absolute",border:"none",width:"1000px",display:"flex",top:"83vh",left:"18vw",height:"80px",borderBottomLeftRadius:"10px",justifyContent:"space-evenly",borderBottomRightRadius:"10px"}}>
          
      <Carousel breakPoints={breakPoints}>
        {renderingData}
      </Carousel>
             </div>
             </div>
        )
    }
}

export default DashMap
