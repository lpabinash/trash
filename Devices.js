import React, { Component } from 'react'
import { CarouselCaption, Table } from 'reactstrap';
import TopNav from "./containers/TopNav/index"

export class Devices extends Component {
    
    state={
            devices:[],
            deviceMon:[]
    }
    handleclick=(e)=>{
      e.preventDefault();
      
      localStorage.setItem("MACID",e.target.getAttribute('data-key'))


      
fetch("http://157.245.104.15/v1/graphql",{
  method: "POST",
  headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
  body:JSON.stringify({query:`{
    deviothaptestbedv01_devicemonitort(where: {devicemonitorerpid: {_eq: "${e.target.getAttribute('data-key')}"}}) {
      devicemonitortime
      devicemonitorvalue
    }
    }`
  })

})
.then(res=>res.json())
.then(data=>{
  const data1=data.data.deviothaptestbedv01_devicemonitort
  localStorage.setItem("chart",JSON.stringify(data1))
  // console.log(data1)
  
    })


     
      console.log(e.target.getAttribute('data-key'))
      // const id=e.target.getAttribute('data-key')
      location.href = '/deviceinfo';
    
    }
    componentDidMount(){
        const id=localStorage.getItem("facilityID")
        fetch("http://157.245.104.15/v1/graphql",{
          method: "POST",
          headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
          body:JSON.stringify({query:`{
              deviothaptestbedv01_devicem(where: {facilityid: {_eq: ${id}}}) {
                deviceid
                devicemacid
                devicetype
                facilityid
              }
              deviothaptestbedv01_devicemonitort(order_by: {devicemonitordate: desc, devicemonitortime: desc},) {
                devicemonitorerpid
                devicemonitortime
              }
            }`
          })

      })
      .then(res=>res.json())
      .then(data=>{
          // const devicedata=data.data.deviothaptestbedv01_devicem
          // const deviceMoniter=data.data.deviothaptestbedv01_devicemonitort
          // this.setState({devices:devicedata,deviceMon:deviceMoniter})
          // console.log(devicedata)

          // const devicedata = [{id:1, name: 'John'}, {id:2, name: 'Alice'}]

          // const deviceMoniter = [{id:1, peopleId: 1, address: 'Some street 1'}, {id:2, peopleId: 2, address: 'Some street 2'}]
          
          // const result = devicedata.map(item => {
          //   const subresult = deviceMoniter.find(item1 => e.devicemacid!=undefined||null && item1.devicemonitorerpid == item.devicemacid)
          //   console.log(subresult)
            
          //   item.lastreading = subresult 
          //   ? subresult.devicemonitertime
          //   : null
            
          //   return item
          // })
          
          // console.log(result)
          const devicedata = data.data.deviothaptestbedv01_devicem

            const deviceMoniter = data.data.deviothaptestbedv01_devicemonitort

            const result = devicedata.map(item1 => {
              const addressItem = deviceMoniter.find(item => item.devicemonitorerpid === item1.devicemacid)
              // console.log(addressItem.devicemonitortime)
              item1.devicemonitortime = addressItem 
              ? addressItem.devicemonitortime
              : null
              
              return item1
            })

            this.setState({devices:result})
            console.log(result)


        //   let op = devicedata.map((e,i)=>{
        //     let temp = deviceMoniter.find(element=> e.devicemacid!=undefined||null && element.devicemonitorerpid === e.devicemacid)
        //     console.log(temp)
        //    { if(temp.devicemonitortime) {
        //       e.devicemonitortime = temp.devicemonitortime;
        //     }}
        //     return e;
        //   })
        //   console.log(op);
        // this.setState({devices:op})

          
            })
}
    render() {
        const filteredData = this.state.devices.map((item,pos) => {
            return (
                // <Link to="/Facilities"  >
                <tr key={pos+1} onClick={this.handleclick}>
                {/* <td data-key={item.idfacilitym}>{item.deviceid}</td> */}
                <td data-key={item.devicemacid}>{(item.devicemacid)?item.devicemacid:"N/A"}</td>
                <td>{(item.devicetype)?item.devicetype:'N/A'}</td>
                <td></td>
                <td>{(item.devicemonitortime)?item.devicemonitortime:'N/A'}</td>
                <td>Running</td>
                </tr>
                // {/* </Link> */}
            )
        });
        return (
            <div>
                <TopNav/>
                <div style={{width:"90vw",backgroundColor:"white",margin: "auto",paddingTop:"50px",paddingBottom:"20px",marginTop:"100px",borderRadius:"20px"}}>
                 <Table style={{textAlign:"center",borderRadius:"10px",backgroundColor:"white",width:"80vw",marginLeft:"auto",marginRight:"auto",borderCollapse:"collapse"}} >
        <thead >
          <tr >
            {/* <th >Id</th> */}
            {/* <th>Device ID</th> */}
            <th>MAC ID</th>
            <th>Type</th>
            <th>Process</th>
            <th>Last Reading Time</th>
            {/* <th>Device Location</th> */}
            <th>Status</th>
            
            {/* <th >E-mail</th> */}
            
            {/* <th>Temp-Min</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredData}
        
        </tbody>
      </Table>
            </div>
            </div>
        )
    }
}

export default Devices
