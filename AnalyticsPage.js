import React, { Component } from 'react';
import DatePicker from 'react-custom-date-picker';

class Analytics extends Component {
  state = {
    startDate: null,
    endDate: null
    
  }

  handleStartDateChange = (startDate) => {
    this.setState({
      startDate
    });
  }
  handleEndDateChange = (endDate) => {
    this.setState({
      endDate
    });
  }


  render() {
    
        const data = [
          "dadfsdfs",
          "afsgs",
          "fgdf",
        ]
         
         const renddata=data.map((item, i) => {
            return (
              <option key={i} value={item}>
                {item}
              </option>)})
  
    return (
        <div>
        <div style={{width:"80vw", backgroundColor:"white",borderRadius:"10px"}}>
            <div style={{padding:"20px"}}>
                <p style={{display:"inline", fontSize:"20px"}}>Start Date : </p> 
        <DatePicker
        color="purple"
        // width="100px"
        date={this.state.date}
        // endDate={this.state.endDate}
        errorColor="#c32c27"
        handleDateChange={this.handleStartDateChange}
        // range
        hoverWeek
        inputStyle={{
          borderRadius: "4px",width: "20vw",padding: "12px 20px",display: "inline",border: "1px solid #ccc",
        }}
        lightHeader
      />
       <p style={{display:"inline", fontSize:"20px",paddingLeft:"20px"}}>End Date : </p> 
        <DatePicker
        color="red"
        // width="100px"
        date={this.state.date}
        // endDate={this.state.endDate}
        errorColor="#c32c27"
        handleDateChange={this.handleEndDateChange}
        // range
        hoverWeek
        inputStyle={{
          borderRadius: "4px",width: "20vw",padding: "12px 20px",display: "inline",border: "1px solid #ccc",
        }}
        lightHeader
      />
      
      </div>
      
      <div style={{padding:"20px", justifyContent:"space-between"}}>
        <div  style={{display:"inline",}}>
      <p style={{display:"inline", fontSize:"20px",marginRight:"8px"}}> Site : </p> 
            {/* <label for="country">Country</label> */}
            <select style={{width: "30vw",padding: "12px 20px",display: "inline",border: "1px solid #ccc", borderRadius: "4px"}} id="site">
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
            {renddata}
            </select>
            </div>
            <div style={{display:"inline",marginLeft:"25vw"}}>
            <button style={{fontSize:"20px",height:"40px",backgroundColor:"grey",border: "1px solid #ccc",color:" white", borderRadius: "4px"}}>Run Report</button>
            </div>
      </div>
      </div>
      <div style={{display:"flex",width:"80vw", marginTop:"40px"}}>
          <div style={{width:"50vw",marginRight:"10px"}}>
          <div style={{display:"flex",justifyContent:"space-between",padding:"10px",boxShadow: "1px 1px 3px 2px #888888"}}>
                  <h3>Select All</h3>
                  <h3>Deselect All</h3>
              </div>
          </div>
          <div  style={{width:"50vw"}}>
              <div style={{display:"flex",justifyContent:"space-between",padding:"30px"}}>
                  <h3>Report Name</h3>
                  <h3>Selected</h3>
              </div>
            <div style={{padding:"30px",display:"flex",justifyContent:"space-between",borderBottom:"1px solid grey",height:"120px"}}>  
                <div>
                <h4>Performance Report</h4>
                <h6>At a glance entity performance</h6>
                </div>
                <input type="checkbox" style={{marginTop:"15px",marginRight:"5%",height:"20px",width:"20px"}}/>
                    </div>
                    <div style={{padding:"30px",display:"flex",justifyContent:"space-between",borderBottom:"1px solid grey",height:"120px"}}>  
                <div>
                <h4>Incident Count Report</h4>
                <h6>Number of new incidents</h6>
                </div>
                <input type="checkbox" style={{marginTop:"15px",marginRight:"5%",height:"20px",width:"20px"}}/>
                    </div>
                    <div style={{padding:"30px",display:"flex",justifyContent:"space-between",borderBottom:"1px solid grey",height:"120px"}}>  
                <div>
                <h4>Inactivity Report</h4>
                <h6>Is an entity reporting data</h6>
                </div>
                <input type="checkbox" style={{marginTop:"15px",marginRight:"5%",height:"20px",width:"20px"}}/>
                    </div>
                    <div style={{padding:"30px",display:"flex",justifyContent:"space-between",borderBottom:"1px solid grey",height:"120px"}}>  
                <div>
                <h4>Door vs Temperature Report</h4>
                <h6>Door vs Temperature co-analysis</h6>
                </div>
                <input type="checkbox" style={{marginTop:"15px",marginRight:"5%",height:"20px",width:"20px"}}/>
                    </div>
            
          </div>
      </div>
      </div>
    );
  }
}

export default Analytics;