import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
require('isomorphic-fetch');
const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June'],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgba(255,99,132,0.2)',
			borderColor: 'rgba(255,99,132,1)',
			borderWidth: 1,
			hoverBackgroundColor: 'rgba(255,99,132,0.4)',
			hoverBorderColor: 'rgba(255,99,132,1)',
			// data: []
		}
	]
};

class Trail extends Component {
  state={
    data1:[]
  }
  
	render() {
    fetch("https://more-troll-94.hasura.app/v1/graphql",{
      method: "POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({query:`query MyQuery {
        Weather {
          Temp_Max
        }
      }` 
       })

  })
  .then(res=>res.json())
  .then(data=>this.setState({data1:data.data.Weather}))
  console.log(this.state.data1[0])
  
		return (
			<div className="flex flex-col items-center w-full max-w-md">
				
				<HorizontalBar data={this.state.data1} />
			</div>
		);
	}
}

export default Trail;
