import React, { Component } from 'react'
require('isomorphic-fetch');
import { CarouselCaption, Table } from 'reactstrap';
import "./devices.css"
import { DropdownButton, Dropdown } from 'react-bootstrap';
// import Dropdown from '@bit/react-bootstrap.react-bootstrap.dropdown';
import TopNav from "./containers/TopNav/index"
import Sidebar from './containers/Sidebar/index'
import {withRouter, Link} from 'react-router-dom'
// const { createApolloFetch } = require('apollo-fetch');

export class Company extends Component {
    state={
        Company:[],
        // CompanyId:'',
        searchedTitle:'',
        ifSearched:false,
        // filteredfacility:[],
        // facilities:[]
    }

    handleChange=(e)=>{
        // console.log(e.target)
        // console.log(e.target.getAttribute('datakey'))
        // this.setState({CompanyId:e.target.getAttribute('datakey')})
        localStorage.setItem("companyID",e.target.getAttribute('data-key'))
        console.log(e.target.getAttribute('data-key'))
        location.href = '/Facilities';
        // console.log(this.state.CompanyId)
    //  this.handlechange1()
    }
    
    onInputSubmit = (e) => {
        e.preventDefault()
        // console.log(e.target.value);
        this.setState({searchedTitle: e.target.value,ifSearched: true});
    }
    componentDidMount(){
        fetch("http://157.245.104.15/v1/graphql",{
            method: "POST",
            headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
            body:JSON.stringify({query:`{
                deviothaptestbedv01_companym {
                    companyname
                    companylocation
                    companyaddress
                    idcompanym
                    companycontractperson
                    companymobile
                    companyemail
                }
              }`})

        })
        .then(res=>res.json())
        .then(data=>{
            // const Reqdata=data.data.deviothaptestbedv01_companym
            this.setState({Company:data.data.deviothaptestbedv01_companym})
            // console.log(Reqdata)
            
              })
    // const fetch = createApolloFetch({
    //             uri: 'http://157.245.104.15/v1/graphql',headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" }
    //           });
              
    //           fetch({
    //             query: `{
    //                 deviothaptestbedv01_companym {
    //                     companyname
    //                     companylocation
    //                     companyaddress
    //                     idcompanym
    //                 }
    //               }`,
    //           }).then(res => {
    //             console.log(res.data);
    //           });
    }
    

    render() {
       
              const renderingData = this.state.Company.map((item,pos) => {
                return (
                    // <Link to="/Facilities"  >
                    <tr key={pos+1}  >
                    
                    {/* <td style={{marginLeft:"20px"}}>{item.idcompanym}</td> */}
                    <td><input type="checkbox" /></td>
                    <td data-key={item.idcompanym} onClick={this.handleChange}>{item.companyname}</td>
                    <td onClick={this.handleChange}>{(item.companyaddress)?item.companyaddress.slice(0, 25)+'...':"N/A"}</td>
                    <td onClick={this.handleChange}>{item.companylocation}</td>
                    <td onClick={this.handleChange}>{item.companycontractperson}</td>
                    <td onClick={this.handleChange}>{item.companymobile}</td>
                    <td onClick={this.handleChange}>{item.companyemail}</td>
                    </tr>
                    // {/* </Link> */}
                )
            });


            const filteredData = this.state.Company.filter(searched=>searched.companyname.toLowerCase().includes(this.state.searchedTitle.toLowerCase())).map((item,pos) => {
                return (
                    // <Link to="/Facilities"  >
                    <tr key={pos+1}  >
                    <td><input type="checkbox" /></td>
                    <td data-key={item.idcompanym} onClick={this.handleChange}>{item.companyname}</td>
                    <td onClick={this.handleChange}>{(item.companyaddress)?item.companyaddress:"Not Available"}</td>
                    <td onClick={this.handleChange}>{item.companylocation}</td>
                    <td onClick={this.handleChange}>{item.companycontractperson}</td>
                    <td onClick={this.handleChange}>{item.companymobile}</td>
                    <td onClick={this.handleChange}>{item.companyemail}</td>
                    </tr>
                    // {/* </Link> */}
                )
            });
      
        return (
        <div>
            <TopNav/>
            <div style={{marginTop:"100px",display:"flex"}}>
            <DropdownButton style={{marginTop:"20px",marginLeft:"10%"}} id="dropdown-basic-button" title="Actions">
            <Dropdown.Item>Action</Dropdown.Item>
            <Dropdown.Item>Another action</Dropdown.Item>
            <Dropdown.Item>Something else</Dropdown.Item>
            </DropdownButton>
            <div className="searchBar" style={{marginLeft:"63%"}}>
            
            <form action="" class="search-bar">
                                    <input type="search" name="search" onChange={this.onInputSubmit} pattern=".*\S.*" required/>
                                    <button className="search-btn" type="submit">
                                        <span>Search</span>
                                    </button>
                                 </form>
            </div>
            </div>
            
            
            <div style={{width:"90vw",backgroundColor:"white",margin: "auto",paddingTop:"50px",paddingBottom:"20px",marginTop:"20px",borderRadius:"20px"}}>
                
                {/* <div>
                     <input onChange={this.onInputSubmit} style={{width:"500px",}} type="text" />
                 </div> */}

                                
                 {/* <div style={{marginTop:"20px",textAlign:"center"}}>
      <p style={{display:"inline", fontSize:"20px",marginRight:"8px"}}> Company: </p> 
            <select style={{width: "80vw",padding: "12px 20px",display: "inline",border: "1px solid #ccc", borderRadius: "4px",marginTop:"20px"}} onChange={this.handleChange} id="site">
            {this.state.Company.map((item,pos) => (
          <option key={pos} value={item.idcompanym}>{item.companyname}</option>)

      )}
            </select>
            </div> */}
               <Table style={{textAlign:"center",borderRadius:"10px",backgroundColor:"white",width:"80vw",marginLeft:"auto",marginRight:"auto",borderCollapse:"collapse"}} >
        <thead >
          <tr >
            {/* <th >Id</th> */}
            <th></th>
            <th>Name</th>
            <th>Address</th>
            <th>Location</th>
            <th >Contact Person</th>
            <th >Contact No</th>
            <th >E-mail</th>
            
            {/* <th>Temp-Min</th> */}
          </tr>
        </thead>
        <tbody>
          {this.state.ifSearched === false ? renderingData : filteredData}
        
        </tbody>
      </Table>
            </div>
            </div>
        )
    }
}

export default Company
