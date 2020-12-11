import React, { Component } from 'react'
import { DropdownButton, Dropdown, Button, Form } from 'react-bootstrap';
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'
import PhoneInput from 'react-phone-number-input'
// import IntlTelInput from 'react-bootstrap-intl-tel-input'
// import "./high-res-flags.less";
import 'react-phone-number-input/style.css'
// import PhoneInput from 'react-phone-number-input'

var domains = ["gmail","msn","yahoo"];

export class AddUser extends Component {
        state={
            username:"",
            email:"",
            mobile:"",
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
        var idx1 = e.target.value.indexOf("@");
        if(idx1>-1){
          var splitStr = e.target.value.split("@");
          var sub = splitStr[1].split(".");
          if(domains.indexOf(sub[0])>-1){
            e.target.value="";
            window.alert("Use your Company Domain Name");
          }
        }



    }
    handleChange2=(e)=>{
        console.log(e)
        this.setState({mobile:e})
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
    if(this.state.username===""){
        window.alert("Enter Username")
    }else{
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
          this.setState({username:'',mobile:'' ,email:''})
          
          window.alert("User Successfully Added")
         
    
    }
    
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
            <div style={{display:"flex",backgroundColor:"white",height:"72vh",width:"70vw",margin:"auto",borderRadius:"20px",overflow:"hidden"}} >
                <div style={{width:"45%",height:"100%",backgroundImage: "url(" + "https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/hot-air-balloon-over-water-at-sunset-elaine-plesser.jpg" + ")",backgroundPosition: 'center',backgroundSize:"cover",borderTopLeftRadius:"20px",borderBottomLeftRadius:"20px",height:"100%"}}>
                <p class="text-white h1" style={{textAlign:"center",marginTop:"20%"}}>MAGIC IS IN <br/>THE DETAILS</p>
                <p class="text-white h5" style={{textAlign:"center"}}>Please enter your Username,<br/>e-mail and Mobile.No<br/> to your add a new user.</p>
                </div>
                <div style={{width:"55%",height:"100%"}}>
                <div class="h4 card-title"style={{paddingLeft:"15%",paddingTop:"20%"}}>Add User</div>
                <form style={{paddingLeft:"15%",paddingRight:"15%"}}action="#" class="av-tooltip tooltip-label-bottom">
                    <div class="form-group has-float-label form-group">
                        <label >UserName</label>
                        <input  onChange={this.handleChange} class="form-control" value={this.state.username} type="text" />
                    </div>
                    <div class="form-group has-float-label form-group">
                        <label >e-Mail</label>
                        <input  onChange={this.handleChange1} class="form-control" value={this.state.email} type="email" />
                    </div>
                    <div class="form-group has-float-label form-group">
                        <label >Mobile.No</label>
                        <PhoneInput value={this.state.mobile} onChange={this.handleChange2} class="form-control"/>
                        {/* <PhoneInput value={this.state.mobile} style={{width:"2000px!important"}} onChange={this.handleChange2} class="form-control"/> */}
                        {/* <IntlTelInput defaultCountry={'US'} preferredCountries={['US', 'GB']} defaultValue={'+1 555-555-5555'} onChange={this.handleChange2} class="form-control"/> */}
                        {/* <input  onChange={this.handleChange2} class="form-control" value={this.state.mobile} type="tel"/> */}
                    </div>
                    <div class="form-group has-float-label form-group">
                        <label >Roles</label>
                        <select  class="form-control" onSelect={this.handleClick3} name="cars">
                            <option eventKey="Manager">Manager</option>
                            <option eventKey="User">User</option>
                            <option eventKey="Lead">Lead</option>
                        </select>
                    </div>
                            <div class="d-flex justify-content-between align-items-center">
                            <button  class="btn-shadow btn-multiple-state  btn btn-primary btn-lg">Cancel
                            </button>
                            <button onClick={this.handleSubmit} class="btn-shadow btn-multiple-state  btn btn-primary btn-lg">Submit
                            </button>
                            
                        </div>
                </form>
                </div>
                {/* <Form style={{height:"100%", marginRight:"auto",marginLeft:"auto",justifyContent:"space-between",paddingTop:"50px",paddingLeft:"40px",paddingRight:"40px"}}>
                    <div style={{width:"45vw"}}>
                        <Form.Group style={{marginBottom:"20px",display:"flex"}}>
                            <Form.Label style={{width:"100px",marginTop:"12px"}}>User Name</Form.Label>
                            <Form.Control type="text" onChange={this.handleChange} required />
                        </Form.Group>
                        <Form.Group style={{marginBottom:"20px",display:"flex"}}>
                            <Form.Label style={{width:"100px",marginTop:"12px"}}>Email address</Form.Label>
                            <div style={{width:"45vw"}}>
                            <Form.Control type="email" onChange={this.handleChange1} />
                            <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                            </Form.Text>
                            </div>
                        </Form.Group>
                        <Form.Group style={{marginBottom:"20px",display:"flex"}}>
                            <Form.Label style={{width:"100px",marginTop:"12px"}}>User Mobile</Form.Label>
                            <Form.Control type="numner" onChange={this.handleChange2} />
                        </Form.Group>
                        
                        </div>
                        <div>
                     
                        <div style={{justifyContent:"space-between"}}>
                            <div style={{display:"flex"}}>
                       
                        <h2 style={{marginTop:"13px",marginRight:"7%"}}>Role</h2>
                        <DropdownButton title="User Role" onSelect={this.handleClick3}>
                            <Dropdown.Item  eventKey="Manager">Manager</Dropdown.Item>
                            <Dropdown.Item eventKey="User">User</Dropdown.Item>
                            <Dropdown.Item eventKey="Lead">Lead</Dropdown.Item>
                        </DropdownButton>
                        </div> 
                        </div>
                        </div>
                       
                        
                </Form>
                <Button style={{marginLeft:"40%",marginTop:"40px",marginBottom:"40px"}} variant="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button> */}



                
            </div>
        )
    }
}

export default AddUser
