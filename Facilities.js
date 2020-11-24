import React, { Component } from 'react'
require('isomorphic-fetch');
import TopNav from "./containers/TopNav/index"
import { CarouselCaption, Table } from 'reactstrap';
// import Axios from 'axios'


export class Facilities extends Component {
    state={
        companyID:localStorage.getItem("companyID"),
        facilities:[]

    }
    componentDidMount(){
              const id=localStorage.getItem("companyID")
              fetch("http://157.245.104.15/v1/graphql",{
                method: "POST",
                headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
                body:JSON.stringify({query:`{
                    deviothaptestbedv01_facilitym(where: {company: {_eq: ${id}}}) {
                      idfacilitym
                      state
                      street
                      zipcode
                      facilitymobile
                      facilityemail
                      facilitycontractperson
                      facilitylocation
                      company
                      facilityname
                    }
                  }`
                })
    
            })
            .then(res=>res.json())
            .then(data=>{
                const facilitydata=data.data.deviothaptestbedv01_facilitym
                this.setState({facilities:facilitydata})
                // console.log(facilitydata)
                
                  })

                 
                  // const id=localStorage.getItem("companyID")
                  

    }

    handleclick=(e)=>{
      e.preventDefault();
      
      localStorage.setItem("facilityID",e.target.getAttribute('data-key'))
     
      console.log(e.target.getAttribute('data-key'))
      location.href = '/Devices';
    
    }


    render() {
            // console.log(this.state.facilities)
            const filteredData = this.state.facilities.map((item,pos) => {
              return (
                  // <Link to="/Facilities"  >
                  <tr key={pos+1}  onClick={this.handleclick}>
                  <td data-key={item.idfacilitym}>{item.facilityname}</td>
                  <td>{(item.facilitylocation)?item.facilitylocation:"N/A"}</td>
                  <td>{(item.state)?item.state:'N/A'}</td>
                  <td >{(item.street)?item.street:"N/A"}</td>
                  <td >{(item.zipcode)?item.zipcode:"N/A"}</td>
                  <td >{(item.facilitycontractperson)?item.facilitycontractperson:"N/A"}</td>
                  <td >{(item.facilitymobile)?item.facilitymobile:"N/A"}</td>
                  </tr>
                  // {/* </Link> */}
              )
          });
        return (
          <div>
          <TopNav/>
          <div style={{width:"90vw",backgroundColor:"white",margin: "auto",paddingTop:"50px",paddingBottom:"20px",marginTop:"100px",borderRadius:"20px"}}>
            {/* <div style={{display:"flex",justifyContent:"space-between",width:"80vw",margin:"auto",marginTop:"100px"}}> */}
                 {/* {this.state.facilities.filter(item => item.company == localStorage.getItem("companyID")).map(filteredfacility => (
    
      (filteredfacility.facilityname!=null)? <p>{filteredfacility.facilityname}</p>:<h1>notfound</h1>
    
  ))} */}     
  {/* {this.state.facilities.map((item)=>{
                        <h1>{item.facilityname}</h1>
  })} */}

            {/* {this.state.facilities.map((item,pos) => (
             (item==[])?<h1>Sorry</h1>:<div key={pos} style={{backgroundColor:"white",height:"200px",width:"300px",padding:"20px"}} onClick={this.handleclick} ><h1>{item.facilityname}</h1></div>
            
          
                     
            )
                  )}
            </div> */}
                <Table style={{textAlign:"center",borderRadius:"10px",backgroundColor:"white",width:"80vw",marginLeft:"auto",marginRight:"auto",borderCollapse:"collapse"}} >
        <thead >
          <tr >
            {/* <th >Id</th> */}
            <th>Name</th>
            <th>Location</th>
            <th>State</th>
            <th>Street</th>
            <th>ZipCode</th>
            <th >Contact Person</th>
            <th >Contact No</th>
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

export default Facilities
