import React, { Component } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'

export class Cooldown extends Component {
    render() {
        return (
            <div>
                <div>
                <div class="list-group borderless" style={{width:"30%"}}>
                <button style={{border: 0,padding:"10px 80px",borderRadius:"10px", backgroundColor:"grey",}}>Start Cool Down</button>
                    <a href="#" class="list-group-item" style={{border:0}}>Add New Cool Down</a>
                    <h6>Status</h6>
                    <a href="#" class="list-group-item" style={{border:0}}>In Progress</a>
                    <a href="#" class="list-group-item" style={{border:0}}>Passed</a>
                    <a href="#" class="list-group-item" style={{border:0}}>Failed</a>
                    <a href="#" class="list-group-item" style={{border:0}}>Waiting for Approval</a>
                    <a href="#" class="list-group-item" style={{border:0}}>Approved</a>
                    <a href="#" class="list-group-item" style={{border:0}}>Aborted</a>
                    <a href="#" class="list-group-item" style={{border:0}}>All</a>
                    
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}

export default Cooldown
