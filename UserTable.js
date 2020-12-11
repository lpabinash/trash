import React, { Component } from 'react'
import { CarouselCaption, Table } from 'reactstrap';
import { parse } from "papaparse";
import { DropdownButton, Dropdown, Button, Form } from 'react-bootstrap';
import './index.less';
import './UserTable.css'
import "./main.css";
import Popup from 'reactjs-popup';
import { CSVLink } from "react-csv";
import 'reactjs-popup/dist/index.css';
// import Styled from 'styled-components';
require('isomorphic-fetch');
const ClearbitLogo = require('clearbit-logo');
let logo = new ClearbitLogo
const contentStyle = { borderRadius:"20px",borderTopRightRadius:"20px",marginTop:"100px" };
// const modal = { backgroundColor: 'yellow' };
export class UserTable extends Component {
    state={
        username:[],
        value:'',
        Userdata:[],
        checked:[],
        check:"",
        searchedTitle:'',
        ifSearched:false,
        userC:0,
        managerC:0,
        leadC:0,
        highlighted:'',
        setHighlighted:false,
        contacts:[],
        headers: [
          { label: "username", key: "username" },
          // { label: "userstatus", key: "userstatus" },
          // { label: "userpassword", key: "userpassword" },
          { label: "usermobile", key: "usermobile" },
          { label: "useremailid", key: "useremailid" },
        
          // { label: "user_fact_email_id", key: "user_fact_email_id" },
          // { label: "user_fact_id", key: "user_fact_id" },
          // { label: "user_fact_user_role", key: "user_fact_user_role" },
          // { label: "user_fact_access_delete", key: "user_fact_access_delete" },
          // { label: "user_fact_access_read", key: "user_fact_access_read" },
          // { label: "user_fact_access_update", key: "user_fact_access_update" },
          // { label: "user_fact_access_write", key: "user_fact_access_write" },
          // { label: "user_fact_company_id", key: "user_fact_company_id" },

        ],
        logo:"",file:undefined
    }
    componentWillMount(){
      logo.topSuggestion('Ebisu Technologies').then((company) => {
        console.log(company.logo);
        this.setState({logo:company.logo})

      });
        fetch("http://157.245.104.15/v1/graphql",{
            method: "POST",
            headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
            body:JSON.stringify({query:`{
              deviothaptestbedv01_user_facility_aggregate {
                nodes {
                  user_fact_access_delete
                  user_fact_access_read
                  user_fact_user_role
                  user_fact_access_update
                  user_fact_access_write
                  facility_relation {
                    facilityname
                  }
                  user_relation {
                    useremailid
                    usermobile
                    username
                    userstatus
                    iduserm
                  }
                }
              }
              deviothaptestbedv01_user_facility {
          user_fact_user_role
        }
              }`
            })
  
        })
        .then(res=>res.json())
        .then(data=>{
   
            const Userdata = data.data.deviothaptestbedv01_user_facility_aggregate.nodes
            Userdata.map(i=>{i["checked"]=false})
            const UserCount=data.data.deviothaptestbedv01_user_facility
            var userC=0
            var leadC=0
            var managerC=0
            for(var i = 0;i<UserCount.length;i++){

              if(UserCount[i].user_fact_user_role==="User"){
                userC=userC+1
              }else if(UserCount[i].user_fact_user_role==="Manager"){
                managerC=managerC+1
              }else{
                leadC=leadC+1
              }
              
            }
            console.log(Userdata)
            this.setState({Userdata:Userdata,userC:userC,managerC:managerC,leadC:leadC})
              })

           
    }
    handleChange=(e)=>{
        // if(e.target.checked===true&&e.target.getAttribute('datakey')){
        //     this.state.checked.push(e.target.getAttribute('datakey'))
        // }else{
        //     const index=this.state.checked.indexOf(e.target.getAttribute('datakey'))
        //     this.state.checked.splice(index, 1)
        // }
        // console.log(this.state.checked)
        var selectedValues = [],
			newData = [];
// console.log(e.target.getAttribute('datakey'))
		this.state.Userdata.forEach(function(item) {
			if(item.user_relation.iduserm == e.target.getAttribute('datakey')) {
				item.checked = e.target.checked;
			}
			if(item.checked) {
        selectedValues.push(item.user_relation.iduserm);
        // console.log(selectedValues)
        // this.setState({checked:selectedValues})

			}
      newData.push(item);
      console.log(item)
		});
    this.setState({Userdata: newData,checked:selectedValues});
    // console.log(this.state.checked)
    
        
    }
    

    toggleHandle=(e)=>{
      if(e.target.checked===true){
        var newData = [];
        var selectedValues=[]
      this.state.Userdata.forEach(function(item) {
        item.checked = true;
        selectedValues.push(item.user_relation.iduserm)
        // this.setState({checked:item.user_relation.iduserm})
        newData.push(item);
      });
      // console.log(this.state.checked)
      this.setState({Userdata: newData,checked:selectedValues});
      }else{
        var newData = [];
        // var selectedValues=[]
      this.state.Userdata.forEach(function(item) {
        item.checked = false;
        newData.push(item);
      });
  
      this.setState({Userdata: newData,checked:[]});
      
      }
    }

    handleChange1=(e)=>{
        console.log(this.state.checked); 
        for (var i = 0; i < this.state.checked.length; i++) {
            let index = parseInt(this.state.checked[i])
            console.log(index)
            const query = JSON.stringify({
                query: `mutation MyMutation {
                  update_deviothaptestbedv01_user_facility(where: {user_relation: {iduserm: {_eq: ${index}}}}, _set: {user_fact_user_role: "${e}"}) {
                    returning {
                      user_fact_user_role
                    }
                  }
                  }
                `
              });
            
              const response = fetch("http://157.245.104.15/v1/graphql", {
                headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
                method: 'POST',
                body: query,
              });
             
          }
      
        this.componentWillMount()


        
    }
    handleChange2=(e)=>{
      console.log(e.target.checked)
      console.log(e.target.getAttribute('datakey1'))
      const query = JSON.stringify({
        query: `mutation MyMutation {
            update_deviothaptestbedv01_user_facility(where: {user_relation: {iduserm: {_eq: "${e.target.getAttribute('datakey1')}"}}}, _set: {user_fact_access_read:  "${e.target.checked}"}) {
              returning {
                user_fact_access_read
              }
            }
          }
        `
      });
    
      const response = fetch("http://157.245.104.15/v1/graphql", {
        headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
        method: 'POST',
        body: query,
      });
      fetch("http://157.245.104.15/v1/graphql",{
        method: "POST",
        headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
        body:JSON.stringify({query:`{
          deviothaptestbedv01_user_facility_aggregate {
            nodes {
              user_fact_access_delete
              user_fact_access_read
              user_fact_user_role
              user_fact_access_update
              user_fact_access_write
              facility_relation {
                facilityname
              }
              user_relation {
                useremailid
                usermobile
                username
                userstatus
                iduserm
              }
            }
          }
          }`
        })

    })
    .then(res=>res.json())
    .then(data=>{

        const Userdata = data.data.deviothaptestbedv01_user_facility_aggregate.nodes
        Userdata.map(i=>{i["checked"]=false})
        this.setState({Userdata:Userdata})
          })

     
  }
  handleChange3=(e)=>{
    console.log(e.target.checked)
    console.log(e.target.getAttribute('datakey2'))
    const query = JSON.stringify({
      query: `mutation MyMutation {
          update_deviothaptestbedv01_user_facility(where: {user_relation: {iduserm: {_eq: "${e.target.getAttribute('datakey2')}"}}}, _set: {user_fact_access_write:  "${e.target.checked}"}) {
            returning {
              user_fact_access_write
            }
          }
        }
      `
    });
  
    const response = fetch("http://157.245.104.15/v1/graphql", {
      headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
      method: 'POST',
      body: query,
    });
    fetch("http://157.245.104.15/v1/graphql",{
      method: "POST",
      headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
      body:JSON.stringify({query:`{
        deviothaptestbedv01_user_facility_aggregate {
          nodes {
            user_fact_access_delete
            user_fact_access_read
            user_fact_user_role
            user_fact_access_update
            user_fact_access_write
            facility_relation {
              facilityname
            }
            user_relation {
              useremailid
              usermobile
              username
              userstatus
              iduserm
            }
          }
        }
        
        }`
      })

  })
  .then(res=>res.json())
  .then(data=>{

      const Userdata = data.data.deviothaptestbedv01_user_facility_aggregate.nodes
      Userdata.map(i=>{i["checked"]=false})
      // const UserCount = data.data.deviothaptestbedv01_user_facility
      // console.log(UserCount)
      this.setState({Userdata:Userdata})
        })

   
}
handleChange4=(e)=>{
  console.log(e.target.checked)
  console.log(e.target.getAttribute('datakey3'))
  const query = JSON.stringify({
    query: `mutation MyMutation {
        update_deviothaptestbedv01_user_facility(where: {user_relation: {iduserm: {_eq: "${e.target.getAttribute('datakey3')}"}}}, _set: {user_fact_access_update:  "${e.target.checked}"}) {
          returning {
            user_fact_access_update
          }
        }
      }
    `
  });

  const response = fetch("http://157.245.104.15/v1/graphql", {
    headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
    method: 'POST',
    body: query,
  });
  fetch("http://157.245.104.15/v1/graphql",{
    method: "POST",
    headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
    body:JSON.stringify({query:`{
      deviothaptestbedv01_user_facility_aggregate {
        nodes {
          user_fact_access_delete
          user_fact_access_read
          user_fact_user_role
          user_fact_access_update
          user_fact_access_write
          facility_relation {
            facilityname
          }
          user_relation {
            useremailid
            usermobile
            username
            userstatus
            iduserm
          }
        }
      }
      }`
    })

})
.then(res=>res.json())
.then(data=>{

    const Userdata = data.data.deviothaptestbedv01_user_facility_aggregate.nodes
    Userdata.map(i=>{i["checked"]=false})
    this.setState({Userdata:Userdata})
      })

 
}
handleChange5=(e)=>{
  console.log(e.target.checked)
  console.log(e.target.getAttribute('datakey4'))
  const query = JSON.stringify({
    query: `mutation MyMutation {
        update_deviothaptestbedv01_user_facility(where: {user_relation: {iduserm: {_eq: "${e.target.getAttribute('datakey4')}"}}}, _set: {user_fact_access_delete:  "${e.target.checked}"}) {
          returning {
            user_fact_access_delete
          }
        }
      }
    `
  });

  const response = fetch("http://157.245.104.15/v1/graphql", {
    headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
    method: 'POST',
    body: query,
  });
  fetch("http://157.245.104.15/v1/graphql",{
    method: "POST",
    headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
    body:JSON.stringify({query:`{
      deviothaptestbedv01_user_facility_aggregate {
        nodes {
          user_fact_access_delete
          user_fact_access_read
          user_fact_user_role
          user_fact_access_update
          user_fact_access_write
          facility_relation {
            facilityname
          }
          user_relation {
            useremailid
            usermobile
            username
            userstatus
            iduserm
          }
        }
      }
      }`
    })

})
.then(res=>res.json())
.then(data=>{

    const Userdata = data.data.deviothaptestbedv01_user_facility_aggregate.nodes
    Userdata.map(i=>{i["checked"]=false})
    this.setState({Userdata:Userdata})
      })

 
}
onInputSubmit = (e) => {
  e.preventDefault()
  // console.log(e.target.value);
  this.setState({searchedTitle: e.target.value,ifSearched: true});
}
handleDrag=()=>{
  this.setState({setHighlighted:true})
}
handleDragLeave=()=>{
  this.setState({setHighlighted:false})
}
handleDragOver=(e)=>{
  e.preventDefault();
}
handleDrop=(e)=>{
  e.preventDefault();
  this.setState({setHighlighted:false})
  // setHighlighted(false);
  console.log(e.dataTransfer.files[0].type)
  if(e.dataTransfer.files[0].type==="application/vnd.ms-excel"){
      Array.from(e.dataTransfer.files)
      .filter((file) => file.type === "application/vnd.ms-excel")
      .forEach(async(file) => {
        // const text = file.text();
        // const result = parse(text);
        const text = await file.text();
          const result = parse(text, { header: true });
        console.log(result)
        this.setState({contacts:result.data})
        // setContacts((existing) => [...existing, ...result.data]);
      });
  }else{
      window.alert("File Type must be vnd.ms-excel or CSV")
  }


}
onFileChange=(e)=>{
  e.preventDefault();
  // this.setState({setHighlighted:false})
  // setHighlighted(false);
  console.log(e.target.files[0])
  if(e.target.files[0].type==="application/vnd.ms-excel"){
      Array.from(e.target.files)
      .filter((file) => file.type === "application/vnd.ms-excel")
      .forEach(async(file) => {
        // const text = file.text();
        // const result = parse(text);
        const text = await file.text();
          const result = parse(text, { header: true });
        console.log(result)
        this.setState({contacts:result.data})
        // setContacts((existing) => [...existing, ...result.data]);
      });
  }else{
      window.alert("File Type must be vnd.ms-excel or CSV")
  }
}

handleSubmission=(e)=>{
// console.log(this.state.contacts)
// e.preventDefault();

  this.state.contacts.map((item)=>{
    if(item.username!=undefined){
      
      const query = JSON.stringify({
        query: `mutation MyMutation {
            insert_deviothaptestbedv01_userm(objects: {userpassword: "${item.userpassword}", username: "${item.username}", usermobile: "${item.usermobile}", useremailid: "${item.useremailid}"}) {
                returning {
                  userstatus
                  userpassword
                  username
                  usermobile
                  useremailid
                  iduserm
                }
              }
              insert_deviothaptestbedv01_user_facility(objects: {user_fact_user_role: "${item.user_fact_user_role}", user_fact_facility_id: ${parseInt(item.user_fact_facility_id)}, user_fact_email_id: "${item.useremailid}", user_fact_company_id: "${item.user_fact_company_id}", user_fact_access_write: ${parseInt(item.user_fact_access_write)?true:false}, user_fact_access_update: ${parseInt(item.user_fact_access_update)?true:false}, user_fact_access_read: ${parseInt(item.user_fact_access_read)?true:false}, user_fact_access_delete: ${parseInt(item.user_fact_access_delete)?true:false}}) {
                returning {
                  user_fact_access_delete
                  user_fact_access_read
                  user_fact_access_update
                  user_fact_access_write
                  user_fact_company_id
                  user_fact_email_id
                  user_fact_id
                  user_fact_user_role
                  user_fact_facility_id
                }
              }
            
          }
        `
      });
    
      const response = fetch("http://157.245.104.15/v1/graphql", {
        headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
        method: 'POST',
        body: query,
      });
    
    
  
  
  
  }})

   this.componentWillMount()   
}

ondeleteclick=()=>{
  console.log(this.state.checked)
  this.state.checked.map((item)=>{
    
    const query = JSON.stringify({
      query: `mutation MyMutation {
        delete_deviothaptestbedv01_user_facility(where: {user_relation: {iduserm: {_eq: ${parseInt(item)}}}}) {
          returning {
            user_relation {
              iduserm
            }
            user_fact_id
          }
        }
        delete_deviothaptestbedv01_userm(where: {iduserm: {_eq: ${parseInt(item)}}}) {
          returning {
            iduserm
          }
        }
        }
      `
    });
    
    const response = fetch("http://157.245.104.15/v1/graphql", {
      headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
      method: 'POST',
      body: query,
    });
  })
  // this.setState({checked:[]})

  this.componentWillMount()



}
onInactive=()=>{
  console.log(this.state.checked)

  this.state.checked.map((item)=>{
    
    const query = JSON.stringify({
      query: `mutation MyMutation {
        update_deviothaptestbedv01_userm(_set: {userstatus: false}, where: {iduserm: {_eq: ${parseInt(item)}}}) {
          returning {
            userstatus
          }
        }
      }
      
      `
    });
    
    const response = fetch("http://157.245.104.15/v1/graphql", {
      headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
      method: 'POST',
      body: query,
    });
  })
  // this.setState({checked:[]})

  this.componentWillMount()
}
onActive=()=>{
  console.log(this.state.checked)

  this.state.checked.map((item)=>{
    
    const query = JSON.stringify({
      query: `mutation MyMutation {
        update_deviothaptestbedv01_userm(_set: {userstatus: true}, where: {iduserm: {_eq: ${parseInt(item)}}}) {
          returning {
            userstatus
          }
        }
      }
      
      `
    });
    
    const response = fetch("http://157.245.104.15/v1/graphql", {
      headers: {'content-type': 'application/json',"x-hasura-admin-secret":"Lets0rg@20@)"},
      method: 'POST',
      body: query,
    });
  })
  // this.setState({checked:[]})

  this.componentWillMount()
}


  
    render() {
        const renderingData = this.state.Userdata.map((item,pos) => {
            return (
              
                <tr key={pos+1}>
                <td ><input type="checkbox" datakey={item.user_relation.iduserm}  onChange={this.handleChange} checked= {item.checked ? true : false} ></input></td>
                <td style={{textAlign:"left",fontSize:"12px"}}>{(item.user_relation.username)?item.user_relation.username:'N/A'}</td>
                <td style={{textAlign:"left",fontSize:"12px",marginRight:"-20px"}}>{item.user_fact_user_role}</td>
                <td style={{textAlign:"left",fontSize:"12px"}}>{(item.user_relation.userstatus===true)?"Active":'Inactive'} </td>
                <td style={{textAlign:"right",fontSize:"12px"}}>{(item.user_relation.usermobile)?item.user_relation.usermobile:'N/A'}</td>
                <td style={{textAlign:"left",fontSize:"12px"}}>{(item.user_relation.useremailid)?item.user_relation.useremailid:'N/A'}</td>
                <td style={{textAlign:"left",fontSize:"12px"}}>{(item.facility_relation!=null||undefined)?item.facility_relation.facilityname:'N/A'}</td>
                <td><input type="checkbox" datakey1={item.user_relation.iduserm} checked={(item.user_fact_access_read)? true : false}  onChange={this.handleChange2}></input></td>
                <td><input type="checkbox" datakey2={item.user_relation.iduserm} checked={(item.user_fact_access_write)? true : false} onChange={this.handleChange3}></input></td>
                <td><input type="checkbox" datakey3={item.user_relation.iduserm} checked={(item.user_fact_access_update)? true : false} onChange={this.handleChange4}></input></td>
                <td><input type="checkbox" datakey4={item.user_relation.iduserm} checked={(item.user_fact_access_delete)? true : false} onChange={this.handleChange5}></input></td>

                {/* <td>Running</td> */}
                </tr>
                // {/* </Link> */}
            )
        });
        const filteredData = this.state.Userdata.filter(searched=>searched.user_relation.username.toLowerCase().includes(this.state.searchedTitle.toLowerCase())).map((item,pos) => {
          return (
              // <Link to="/Facilities"  >
              <tr key={pos+1}>
                <td><input type="checkbox" datakey={item.user_relation.iduserm}  onChange={this.handleChange} checked= {item.checked ? true : false}></input></td>
                <td style={{textAlign:"left",fontSize:"12px"}}>{(item.user_relation.username)?item.user_relation.username:'N/A'}</td>
                <td style={{textAlign:"left",fontSize:"12px"}}>{item.user_fact_user_role}</td>
                <td style={{textAlign:"left",fontSize:"12px"}}>{(item.user_relation.userstatus)?item.user_relation.userstatus:'N/A'} </td>
                <td style={{textAlign:"right",fontSize:"12px"}}>{(item.user_relation.usermobile)?item.user_relation.usermobile:'N/A'}</td>
                <td style={{textAlign:"left",fontSize:"12px"}}>{(item.user_relation.useremailid)?item.user_relation.useremailid:'N/A'}</td>
                <td style={{textAlign:"left",fontSize:"12px"}}>{(item.facility_relation!=null)?item.facility_relation.facilityname:'N/A'}</td>
                <td><input type="checkbox" datakey1={item.user_relation.iduserm} checked={(item.user_fact_access_read)? true : false}  onChange={this.handleChange2}></input></td>
                <td><input type="checkbox" datakey2={item.user_relation.iduserm} checked={(item.user_fact_access_write)? true : false} onChange={this.handleChange3}></input></td>
                <td><input type="checkbox" datakey3={item.user_relation.iduserm} checked={(item.user_fact_access_update)? true : false} onChange={this.handleChange4}></input></td>
                <td><input type="checkbox" datakey4={item.user_relation.iduserm} checked={(item.user_fact_access_delete)? true : false} onChange={this.handleChange5}></input></td>
              </tr>
              // {/* </Link> */}
          )
      });
      const renderingData2 = this.state.contacts.map((item,pos) => {
        // console.log(item.user_fact_access_read)
        if(item.username!=undefined){
            return (
         
                <tr key={pos+1}>
                {/* <td><input type="checkbox"></input></td> */}
                <td style={{textAlign:"center",fontSize:"12px"}}>{item.username}</td>
                {/* <td style={{textAlign:"center",fontSize:"12px"}}>{item.user_fact_user_role}</td> */}
                {/* <td style={{textAlign:"center",fontSize:"12px"}}>{item.userstatus} </td> */}
                <td style={{textAlign:"center",fontSize:"12px"}}>{item.usermobile}</td>
                <td style={{textAlign:"center",fontSize:"12px"}}>{item.useremailid}</td>
                {/* <td style={{textAlign:"left",fontSize:"9px"}}></td>
                <td><input type="checkbox"  checked={parseInt(item.user_fact_access_read)}></input></td>
                <td><input type="checkbox" checked={parseInt(item.user_fact_access_write)}></input></td>
                <td><input type="checkbox"  checked={parseInt(item.user_fact_access_update)}></input></td>
                <td><input type="checkbox"  checked={parseInt(item.user_fact_access_delete)}></input></td> */}

                {/* <td>Running</td> */}
                </tr>
                // {/* </Link> */}
            )
        }
       
    });
      

        return (
            <div style={{width:"100%",overflowX:"hidden"}}>
              <div style={{display:"flex",marginBottom:"20px"}}>
              <h5 style={{marginRight:"20px"}}>Manager:{this.state.managerC}</h5>
              <h5 style={{marginRight:"20px"}}>User:{this.state.userC}</h5>
              <h5 style={{marginRight:"20px"}}>Leads:{this.state.leadC}</h5>
              </div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              
                <div style={{display:"flex"}}>
            <DropdownButton  style={{marginRight:"20px"}} id="dropdown-basic-button"title="Bulk Action">
          
          <Dropdown.Item onClick={this.onActive} eventKey="Active" >Active</Dropdown.Item>
          <Dropdown.Item onClick={this.onInactive} eventKey="Inactive">Inactive</Dropdown.Item>
          <Dropdown.Item onClick={this.ondeleteclick} eventKey="delete">Delete</Dropdown.Item>
          {/* <Dropdown.Item eventKey="Lead">Lead</Dropdown.Item> */}
          </DropdownButton>
            <DropdownButton  style={{marginRight:"20px"}} id="dropdown-basic-button" onSelect={this.handleChange1}title="Change Role to">
          
                <Dropdown.Item eventKey="Manager" >Manager</Dropdown.Item>
                <Dropdown.Item eventKey="User">User</Dropdown.Item>
                <Dropdown.Item eventKey="Lead">Lead</Dropdown.Item>
                </DropdownButton>
            {/* </Dropdown.Menu>
            </Dropdown> */}
            <Button style={{backgroundColor:"#922c88",color:"white",height:"45px"}} variant="purple">Add User</Button>
            
            </div>
            <div style={{display:"flex",borderRadius:"20px"}}>
              <div style={{marginRight:"10px",borderRadius:"20px"}}>
            <Popup
    trigger={<Button  > Import </Button>}
    modal
    {...{  contentStyle }}
  >
    {close => (
      <div style={{marginRight:"10px",borderRadius:"20px"}}>
        {/* <Button className="close" onClick={close}>
          &times;
        </Button> */}
      
        <div style={{width:"100%",borderRadius:"20px"}}>
                 <div style={{textAlign:"center",}}>
      <div
        className={`p-6 my-2 mx-auto max-w-md border-2 ${
          this.state.highlighted ? "border-green-600 bg-green-100" : "border-gray-600"
        }`}
        style={{display:"flex",borderRadius:"10px",backgroundColor:"#1871ad",border:"3px dashed white"}}
        onDragEnter={this.handleDrag}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <p style={{marginRight:"2px",marginTop:"3px",marginLeft:"10px",color:"white"}}>DROP YOUR FILE HERE OR</p>
        <input onChange={this.onFileChange} style={{color:"white",border:"none",outline:"none",width:"200px",marginLeft:"10px"}} type="file"/>
      </div>
      <div style={{width:"100%",height:"350px", backgroundColor:"white",borderRadius:"20px",overflowY:"scroll"}}>
       <Table style={{textAlign:"center",borderRadius:"10px",backgroundColor:"white",fontSize:"10px",borderCollapse:"collapse", tableLayout: "fixed",
    width:"100%",overflowY:"scroll",}} >
     <thead >
          <tr style={{height:"10px"}}>
            {/* <th><input type="checkbox"></input></th> */}
            <th  style={{textAlign:"center"}}>Name</th>
            <th style={{textAlign:"center"}}>Mobile</th>
            <th style={{textAlign:"center"}}>E-mail</th>
            {/* <th style={{textAlign:"center"}}>Facility</th> */}
            {/* <th>Read</th>
            <th>Write</th>
            <th>Update</th>
            <th>Delete</th> */}

          </tr>
        </thead>
        <tbody>
        {renderingData2}
        </tbody>
        </Table>
            </div>
            <Button style={{marginRight:"50px"}}
            onClick={() => {
              console.log('modal closed ');
              close()
              }}>Cancel</Button>
            <Button onClick={() => {
              console.log('modal closed ');
              this.handleSubmission()
              close();
            }}>Import</Button>
            
     
    </div>
            </div>
      </div>
    )}
  </Popup>
  <Button style={{marginLeft:"20px"}}><CSVLink data={this.state.Userdata} headers={this.state.headers}>
  Export
</CSVLink></Button>
</div>
            <Form >
                    <Form.Control style={{width:"22vw",marginLeft:"10px"}} placeholder="Search" onChange={this.onInputSubmit}/>
            </Form>
            </div>
            </div>
    <div style={{backgroundColor:"white",paddingTop:"50px",paddingBottom:"20px",marginTop:"20px",borderRadius:"20px"}}>
       <Table style={{textAlign:"center",borderRadius:"10px",backgroundColor:"white",width:"100%",marginLeft:"auto",marginRight:"auto",borderCollapse:"collapse"}} >
     <thead >
          <tr >
          <th><input type="checkbox" onChange={this.toggleHandle}></input></th>
            <th  style={{textAlign:"left"}}>Name</th>
            <th  style={{textAlign:"left"}}>Role</th>
            <th style={{textAlign:"left"}}>Status</th>
            <th style={{width:"100px",textAlign:"right"}}>Mobile</th>
            <th style={{textAlign:"left"}}>E-mail</th>
            <th style={{textAlign:"left"}}>Facility</th>
            <th>Read</th>
            <th>Write</th>
            <th>Update</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
        {this.state.ifSearched === false ? renderingData : filteredData}
        </tbody>
        </Table>
            </div>
            
           <div><img src={this.state.logo}/></div>
            </div>
        )
    }
}

export default UserTable
