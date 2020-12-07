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
require('isomorphic-fetch');

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
          { label: "userstatus", key: "userstatus" },
          { label: "userpassword", key: "userpassword" },
          { label: "usermobile", key: "usermobile" },
          { label: "useremailid", key: "useremailid" },
          { label: "user_fact_access_delete", key: "user_fact_access_delete" },
          { label: "user_fact_access_read", key: "user_fact_access_read" },
          { label: "user_fact_access_update", key: "user_fact_access_update" },
          { label: "user_fact_access_write", key: "user_fact_access_write" },
          { label: "user_fact_company_id", key: "user_fact_company_id" },
          { label: "user_fact_email_id", key: "user_fact_email_id" },
          { label: "user_fact_id", key: "user_fact_id" },
          { label: "user_fact_user_role", key: "user_fact_user_role" }

        ]
    }
    componentWillMount(){
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
            console.log(Userdata)
            const UserCount=data.data.deviothaptestbedv01_user_facility
            var userC=0
            var leadC=0
            var managerC=0
            for(var i = 0;i<UserCount.length;i++){

              if(UserCount[i].user_fact_user_role==="User"){
                // console.log(UserCount[i].user_fact_user_role)
                userC=userC+1
              }else if(UserCount[i].user_fact_user_role==="Manager"){
                managerC=managerC+1
              }else{
                leadC=leadC+1
              }
              
            }
            console.log(userC); 
            console.log(managerC);
            console.log(leadC);
           
            
            // console.log(UserCount.length)
            this.setState({Userdata:Userdata,userC:userC,managerC:managerC,leadC:leadC})
              })

           
    }
    handleChange=(e)=>{
        if(e.target.checked===true&&e.target.getAttribute('datakey')){
            this.state.checked.push(e.target.getAttribute('datakey'))
        }else{
            const index=this.state.checked.indexOf(e.target.getAttribute('datakey'))
            this.state.checked.splice(index, 1)
        }
        console.log(this.state.checked)
        
    }
    handleChange1=(e)=>{
        console.log(e); 
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
            console.log(Userdata)
            const UserCount=data.data.deviothaptestbedv01_user_facility
            var userC=0
            var leadC=0
            var managerC=0
            for(var i = 0;i<UserCount.length;i++){

              if(UserCount[i].user_fact_user_role==="User"){
                // console.log(UserCount[i].user_fact_user_role)
                userC=userC+1
              }else if(UserCount[i].user_fact_user_role==="Manager"){
                managerC=managerC+1
              }else{
                leadC=leadC+1
              }
              
            }
            console.log(userC); 
            console.log(managerC);
            console.log(leadC);
           
            
            // console.log(UserCount.length)
            this.setState({Userdata:Userdata,userC:userC,managerC:managerC,leadC:leadC})
              })

        
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
      window.alert("File Type must be vnd.ms-excel")
  }


}

handleSubmission=(e)=>{
console.log(this.state.contacts)
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
            insert_deviothaptestbedv01_user_facility(objects: {user_fact_user_role: "${item.user_fact_user_role}", user_fact_facility_id: ${parseInt(item.user_fact_facility_id)}, user_fact_email_id: "${item.user_fact_email_id}", user_fact_company_id: "${item.user_fact_company_id}", user_fact_access_write: ${parseInt(item.user_fact_access_write)?true:false}, user_fact_access_update: ${parseInt(item.user_fact_access_update)?true:false}, user_fact_access_read: ${parseInt(item.user_fact_access_read)?true:false}, user_fact_access_delete: ${parseInt(item.user_fact_access_delete)?true:false}}) {
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
  
  }
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
    console.log(Userdata)
    const UserCount=data.data.deviothaptestbedv01_user_facility
    var userC=0
    var leadC=0
    var managerC=0
    for(var i = 0;i<UserCount.length;i++){

      if(UserCount[i].user_fact_user_role==="User"){
        // console.log(UserCount[i].user_fact_user_role)
        userC=userC+1
      }else if(UserCount[i].user_fact_user_role==="Manager"){
        managerC=managerC+1
      }else{
        leadC=leadC+1
      }
      
    }
    console.log(userC); 
    console.log(managerC);
    console.log(leadC);
   
    
    // console.log(UserCount.length)
    this.setState({Userdata:Userdata,userC:userC,managerC:managerC,leadC:leadC})
      })




})}

  
    render() {
        const renderingData = this.state.Userdata.map((item,pos) => {
            return (
              
                <tr key={pos+1}>
                <td><input type="checkbox" datakey={item.user_relation.iduserm}  onChange={this.handleChange}></input></td>
                <td style={{textAlign:"left"}}>{(item.user_relation.username)?item.user_relation.username:'N/A'}</td>
                <td style={{textAlign:"left"}}>{item.user_fact_user_role}</td>
                <td style={{textAlign:"left"}}>{(item.user_relation.userstatus)?item.user_relation.userstatus:'N/A'} </td>
                <td style={{textAlign:"right"}}>{(item.user_relation.usermobile)?item.user_relation.usermobile:'N/A'}</td>
                <td style={{textAlign:"left"}}>{(item.user_relation.useremailid)?item.user_relation.useremailid:'N/A'}</td>
                <td style={{textAlign:"left"}}>{(item.facility_relation!=null||undefined)?item.facility_relation.facilityname:'N/A'}</td>
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
                <td><input type="checkbox" datakey={item.user_relation.iduserm}  onChange={this.handleChange}></input></td>
                <td style={{textAlign:"left"}}>{(item.user_relation.username)?item.user_relation.username:'N/A'}</td>
                <td style={{textAlign:"left"}}>{item.user_fact_user_role}</td>
                <td style={{textAlign:"left"}}>{(item.user_relation.userstatus)?item.user_relation.userstatus:'N/A'} </td>
                <td style={{textAlign:"right"}}>{(item.user_relation.usermobile)?item.user_relation.usermobile:'N/A'}</td>
                <td style={{textAlign:"left"}}>{(item.user_relation.useremailid)?item.user_relation.useremailid:'N/A'}</td>
                <td style={{textAlign:"left"}}>{(item.facility_relation!=null)?item.facility_relation.facilityname:'N/A'}</td>
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
                <td><input type="checkbox"></input></td>
                <td style={{textAlign:"left"}}>{item.username}</td>
                <td style={{textAlign:"left"}}>{item.user_fact_user_role}</td>
                <td style={{textAlign:"left"}}>{item.userstatus} </td>
                <td style={{textAlign:"right"}}>{item.usermobile}</td>
                <td style={{textAlign:"left"}}>{item.useremailid}</td>
                <td><input type="checkbox"  checked={parseInt(item.user_fact_access_read)}></input></td>
                <td><input type="checkbox" checked={parseInt(item.user_fact_access_write)}></input></td>
                <td><input type="checkbox"  checked={parseInt(item.user_fact_access_update)}></input></td>
                <td><input type="checkbox"  checked={parseInt(item.user_fact_access_delete)}></input></td>

                {/* <td>Running</td> */}
                </tr>
                // {/* </Link> */}
            )
        }
       
    });
      

        return (
            <div style={{width:"90vw"}}>
              <div style={{display:"flex",marginBottom:"20px"}}>
              <h5 style={{marginRight:"20px"}}>Manager:{this.state.managerC}</h5>
              <h5 style={{marginRight:"20px"}}>User:{this.state.userC}</h5>
              <h5 style={{marginRight:"20px"}}>Leads:{this.state.leadC}</h5>
              </div>
            <div style={{display:"flex", justifyContent:"space-between"}}>
              
                <div style={{display:"flex"}}>
            <DropdownButton  style={{marginRight:"20px"}} id="dropdown-basic-button"title="Bulk Action">
          
          <Dropdown.Item eventKey="Active" >Active</Dropdown.Item>
          <Dropdown.Item eventKey="Inactive">Inactive</Dropdown.Item>
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
            <Popup
    trigger={<Button  style={{marginLeft:"65%",marginRight:"20px"}}> Import </Button>}
    modal
    nested
  >
    {close => (
      <div >
        <button className="close" onClick={close}>
          &times;
        </button>
      
        <div style={{width:"100%"}}>
                 <div style={{textAlign:"center"}}>
      <div
        className={`p-6 my-2 mx-auto max-w-md border-2 ${
          this.state.highlighted ? "border-green-600 bg-green-100" : "border-gray-600"
        }`}
        onDragEnter={this.handleDrag}
        onDragLeave={this.handleDragLeave}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        DROP HERE
      </div>
      <div style={{width:"100%",backgroundColor:"white",paddingTop:"50px",paddingBottom:"20px",marginTop:"20px",borderRadius:"20px"}}>
       <Table style={{textAlign:"center",borderRadius:"10px",backgroundColor:"white",fontSize:"10px",borderCollapse:"collapse"}} >
     <thead >
          <tr >
            <th><input type="checkbox"></input></th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Mobile</th>
            <th>EMail</th>
            <th>Read</th>
            <th>Write</th>
            <th>Update</th>
            <th>Delete</th>

          </tr>
        </thead>
        <tbody>
        {renderingData2}
        </tbody>
        </Table>
            </div>
            <button onClick={() => {
              console.log('modal closed ');
              this.handleSubmission()
              close();
            }}>Upload</button>
     
    </div>
            </div>
      </div>
    )}
  </Popup>
  <Button><CSVLink data={this.state.Userdata} headers={this.state.headers}>
  Export
</CSVLink></Button>
            </div>
            <div>
            <Form style={{marginRight: "50px"}}>
                    <Form.Control placeholder="Enter UserName to Search" onChange={this.onInputSubmit}/>
            </Form>
            </div>
            </div>
    <div style={{width:"92vw",backgroundColor:"white",marginLeft: "-50px",paddingTop:"50px",paddingBottom:"20px",marginTop:"20px",borderRadius:"20px"}}>
       <Table style={{textAlign:"center",borderRadius:"10px",backgroundColor:"white",width:"85vw",marginLeft:"auto",marginRight:"auto",borderCollapse:"collapse"}} >
     <thead >
          <tr >
          <th><input type="checkbox"></input></th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Mobile</th>
            <th>EMail</th>
            <th>Facility</th>
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
            
           
            </div>
        )
    }
}

export default UserTable
