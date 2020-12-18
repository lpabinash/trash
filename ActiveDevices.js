import React, { Component } from 'react'
import { CarouselCaption, Table } from 'reactstrap';

export class ActiveDevices extends Component {
    state={
        Devices:[]
    }
    componentWillMount(){
    
          fetch("http://157.245.104.15/v1/graphql",{
              method: "POST",
              headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
              body:JSON.stringify({query:`{
                deviothaptestbedv01_device_allocation {
                    devicesetuperpid
                    devicesetuptype
                    deviceallocgateway
                  }
                }`
              })
    
          })
          .then(res=>res.json())
          .then(data=>{
     
              const Devices = data.data.deviothaptestbedv01_device_allocation
              console.log(Devices)
              this.setState({Devices:Devices})
                })
  
             
      }
    render() {
        const renderingData = this.state.Devices.map((item,pos) => {
            return (
              
                <tr key={pos+1}>
                <td style={{fontSize:"12px"}}>{item.devicesetuperpid}</td>
                <td style={{fontSize:"12px",marginRight:"-20px"}}>{item.devicesetuptype}</td>
                <td style={{fontSize:"12px"}}>{(item.deviceallocgateway!=null)?item.deviceallocgateway:'N/A'} </td>
               
                {/* <td>Running</td> */}
                </tr>
                // {/* </Link> */}
            )
        });
        return (
            <div>
                 <Table style={{textAlign:"center",borderRadius:"10px",backgroundColor:"white",width:"100%",marginLeft:"auto",marginRight:"auto",borderCollapse:"collapse"}} >
     <thead >
          <tr >
            <th  >MAC Id</th>
            <th  >Type</th>
            <th >Gateway</th>
            
          </tr>
        </thead>
        <tbody>
        {renderingData}
        </tbody>
        </Table>
            </div>
        )
    }
}

export default ActiveDevices
