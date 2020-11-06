import React, { Component } from 'react'
// import Dropdown,{DropdownToggle} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'


export class Entities extends Component {
    
    render() {
        return (
            <div >
              <div style={{display:"flex",width:"100%",textAlign:"center"}}>
                  <div style={{width:"33%",borderBottom:"5px solid red"}}>
                      <span>
                      <h1>1</h1>
                      Stable
                      </span>
                  </div>
                  <div style={{width:"33%",borderBottom:"5px solid yellow"}}><span>
                      <h1>0</h1>
                      Warning
                      </span></div>
                  <div style={{width:"33%",borderBottom:"5px solid green"}}><span>
                      <h1>0</h1>
                      Alarm
                      </span></div>
                      
              </div>
              <button style={{marginTop:"30px",marginLeft:"50%",transform: "translateX(-50%)",border: 0,padding:"10px 80px",borderRadius:"10px", backgroundColor:"grey"}}>View Daily Log</button>
             <div style={{display:"flex",marginTop:"30px"}}>
              <div style={{width:"20%"}}>
              <DropdownButton
                alignBottom
                title="Entity Type"
                
                    >
              <Dropdown.Item eventKey="option-1">option-1</Dropdown.Item>
              <Dropdown.Item eventKey="option-2">option-2</Dropdown.Item>
              <Dropdown.Item eventKey="option-3">option 3</Dropdown.Item>
                </DropdownButton>
                </div>
                <input type="text" style={{width:"80%",border: 0,borderRadius:"10px"}} />
                </div>
                <div style={{marginLeft:"50%",width:"100%",marginTop:"30px",transform: "translateX(-50%)",}}>
                <table class="table table-borderless" style={{textAlign:"center"}}>
                    <thead>
                        <tr>
                        <th scope="col">Stable</th>
                        <th scope="col">Temperature</th>
                        <th scope="col">Humidity</th>
                        <th scope="col">Door</th>
                        <th scope="col">On Duty</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">Entity1</th>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>N/A</td>
                        <td>
                        N/A
                            </td>
                        </tr>
                        
                        
                    </tbody>
                    </table>
                    </div>
            </div>
        )
    }
}

export default Entities
