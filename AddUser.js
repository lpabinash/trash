import React, { Component } from 'react'
import { DropdownButton, Dropdown, Button, Form } from 'react-bootstrap';

export class AddUser extends Component {
        state={
            username:"",
            email:"",
            mobile:0,
            password:'',
            Company:[],
            facility:[],
            read:false,
            write:false,
            update:false,
            delete:false,
            role:'',
            status:false,
            CompanyId:0,
            facilityId:0


        }

    handleChange=(e)=>{
        console.log(e.target.value)
        this.setState({username:e.target.value})
    }
    handleChange1=(e)=>{
        console.log(e.target.value)
        this.setState({email:e.target.value})
    }
    handleChange2=(e)=>{
        console.log(e.target.value)
        this.setState({mobile:e.target.value})
    }
    handleChange3=(e)=>{
        console.log(e.target.value)
        this.setState({password:e.target.value})
    }
    handleClick=(e)=>{
        fetch("http://157.245.104.15/v1/graphql",{
            method: "POST",
            headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
            body:JSON.stringify({query:`{
                deviothaptestbedv01_companym {
                    companyname
                    idcompanym
                  }
              }`
            })
        
        })
        .then(res=>res.json())
        .then(data=>{
        
            const Company = data.data.deviothaptestbedv01_companym
            this.setState({Company:Company})
            // console.log(e)
              })
            //   console.log(e.target.getAttribute('eventKey'))
        
    }
    handlechange4=(e)=>{
        // console.log(e)
        const index=parseInt(e)
        // console.log(index)
        fetch("http://157.245.104.15/v1/graphql",{
            method: "POST",
            headers:{'Content-Type':'application/json',"x-hasura-admin-secret":"Lets0rg@20@)" },
            body:JSON.stringify({query:`{
                    deviothaptestbedv01_facilitym(where: {facilitycompany: {_eq: ${index}}}) {
                      facilityname
                      idfacilitym
                    }
              }`
            })
        
        })
        .then(res=>res.json())
        .then(data=>{
        
            const facility = data.data.deviothaptestbedv01_facilitym
            this.setState({facility:facility,CompanyId:index})
            console.log(index)
              })
    }
    handleChange5=(e)=>{
        console.log(e.target.checked)
        this.setState({read:e.target.checked})
    }
    handleChange6=(e)=>{
        console.log(e.target.checked)
        this.setState({write:e.target.checked})
    }
    handleChange7=(e)=>{
        console.log(e.target.checked)
        this.setState({update:e.target.checked})
    }
    handleChange8=(e)=>{
        console.log(e.target.checked)
        this.setState({delete:e.target.checked})
    }
    handleClick2=(e)=>{
            console.log(e.target.checked)
            this.setState({status:e.target.checked});

    }
    handleSelect=(e)=>{
        console.log(e)
        this.setState({facilityId:e})
    }
    handleClick3=(e)=>{
        console.log(e)
        this.setState({role:e});

}
handleSubmit=(e)=>{
    e.preventDefault();
    const query = JSON.stringify({
        query: `mutation MyMutation {
            insert_deviothaptestbedv01_userm(objects: {userstatus: ${this.state.status}, userpassword: "${this.state.password}", username: "${this.state.username}", usermobile: "${this.state.mobile}", useremailid: "${this.state.email}"}) {
                returning {
                  userstatus
                  userpassword
                  username
                  usermobile
                  useremailid
                  iduserm
                }
              }
              insert_deviothaptestbedv01_user_facility(objects: {user_fact_user_role: "${this.state.role}", user_fact_facility_id: ${this.state.facilityId}, user_fact_email_id: "${this.state.email}", user_fact_company_id: "${this.state.CompanyId}", user_fact_access_write: ${this.state.write}, user_fact_access_update: ${this.state.update}, user_fact_access_read: ${this.state.read}, user_fact_access_delete: ${this.state.delete}}) {
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
    render() {
        const renderingData = this.state.Company.map((item,pos) => {
            return (
            <Dropdown.Item key={pos} eventKey={item.idcompanym} onSelect={this.handlechange4}>{item.companyname}</Dropdown.Item>
            )
            
        });
        // const renderingData2=''
        // if(this.state.facility!=[]){
            const renderingData2 = this.state.facility.map((item,pos) => {
                return (
                <Dropdown.Item key={pos} eventKey={item.idfacilitym}>{item.facilityname}</Dropdown.Item>
                )})
        // }
        
        return (
            <div  style={{backgroundColor:"white"}}>
                <Form style={{height:"100%", marginRight:"auto",marginLeft:"auto",display:"flex",justifyContent:"space-between",paddingTop:"50px",paddingLeft:"40px",paddingRight:"40px"}}>
                    <div style={{width:"45vw"}}>
                        <Form.Group style={{marginBottom:"20px",display:"flex"}}>
                            <Form.Label style={{width:"100px",marginTop:"12px"}}>User Name</Form.Label>
                            <Form.Control type="text" onChange={this.handleChange} placeholder="Enter UserName" />
                        </Form.Group>
                        <Form.Group style={{marginBottom:"20px",display:"flex"}}>
                            <Form.Label style={{width:"100px",marginTop:"12px"}}>Email address</Form.Label>
                            <div style={{width:"45vw"}}>
                            <Form.Control type="email" onChange={this.handleChange1} placeholder="Enter email" />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                            </div>
                        </Form.Group>
                        <Form.Group style={{marginBottom:"20px",display:"flex"}}>
                            <Form.Label style={{width:"100px",marginTop:"12px"}}>User Mobile</Form.Label>
                            <Form.Control type="numner" onChange={this.handleChange2} placeholder="Enter Contact No" />
                        </Form.Group>
                        <Form.Group style={{marginBottom:"20px",display:"flex"}}>
                            <Form.Label style={{width:"100px",marginTop:"12px"}}>Password</Form.Label>
                            <Form.Control type="text" onChange={this.handleChange3} placeholder="Enter password " />
                        </Form.Group>
                        
                        </div>
                        <div>
                       <div style={{width:"30vw",marginBottom:"50px",display:"flex",justifyContent:"space-evenly"}}>
                        <DropdownButton title="Company Name" onClick={this.handleClick} style={{marginBottom:"20px"}}>
                        {renderingData}
                        </DropdownButton>
                        <DropdownButton title="Facility Name" style={{marginBottom:"20px"}} onSelect={this.handleSelect}>
                           {this.state.facility===null?<Dropdown.Item >Select A Company</Dropdown.Item>:renderingData2}
                        </DropdownButton>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between"}}>
                            <div style={{display:"flex"}}>
                        {/* <DropdownButton title="User Status" onSelect={this.handleClick2} style={{marginRight:"10px"}}>
                            <Dropdown.Item eventKey="Active" >Active</Dropdown.Item>
                            <Dropdown.Item eventKey="Inactive">Inactive</Dropdown.Item>
                        </DropdownButton> */}
                        <DropdownButton title="User Role" onSelect={this.handleClick3}>
                            <Dropdown.Item  eventKey="Manager">Manager</Dropdown.Item>
                            <Dropdown.Item eventKey="User">User</Dropdown.Item>
                            <Dropdown.Item eventKey="Lead">Lead</Dropdown.Item>
                        </DropdownButton>
                        <input type="checkbox" style={{marginLeft:"50px",marginRight:"10px",marginTop:"2px"}} onChange={this.handleClick2}></input><p>Status</p>
                        </div>
                            <div>
                        <div style={{display:"flex"}}>      
                        <input  type="checkbox" style={{marginBottom:"20px",marginRight:"10px",marginTop:"2px"}} onChange={this.handleChange5}></input><p>Read Access</p>
                        </div>
                        <div style={{display:"flex"}}>
                        <input  type="checkbox" style={{marginBottom:"20px",marginRight:"10px",marginTop:"2px"}} onChange={this.handleChange6}></input><p>Write Access</p>
                        </div>
                        <div style={{display:"flex"}}>
                        <input  type="checkbox" style={{marginBottom:"20px",marginRight:"10px",marginTop:"2px"}} onChange={this.handleChange7}></input><p>Update Access</p>
                        </div>
                        <div style={{display:"flex"}}>
                        <input type="checkbox" style={{marginBottom:"20px",marginRight:"10px",marginTop:"2px"}} onChange={this.handleChange8}></input><p>Delete Access</p>
                        </div>

{/*                         
                        <DropdownButton title="Write Access"  style={{marginBottom:"20px"}}>
                            <Dropdown.Item  >true</Dropdown.Item>
                            <Dropdown.Item >false</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton title="Delete Access" style={{marginBottom:"20px"}}>
                            <Dropdown.Item  >true</Dropdown.Item>
                            <Dropdown.Item >false</Dropdown.Item>
                        </DropdownButton>
                        <DropdownButton title="Update Access" style={{marginBottom:"20px"}}>
                            <Dropdown.Item  >true</Dropdown.Item>
                            <Dropdown.Item >false</Dropdown.Item>
                        </DropdownButton> */}
                        </div>
                        </div>
                        </div>
                       
                        
{/* 
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group> */}
                        
                </Form>
                <Button style={{marginLeft:"70%",marginTop:"-10%"}} variant="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
            </div>
        )
    }
}

export default AddUser
