import React from 'react';
import { Bar } from 'react-chartjs-2';

import graphql2chartjs from 'graphql2chartjs';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = `
 {
  deviothaptestbedv01_devicemonitort {
    data:devicemonitorvalue
    label:devicemonitortime
  }
}

`;

// Chart component
const Chart = ({ query }) => (
  <Query
    query={gql`${query}`}
  >
    {
      ({data, error, loading}) => {
        if (loading || error) {
          return <div className="loadingIndicator">Please wait </div>;
        }
        // create graphql2chartjs instance
        const g2c = new graphql2chartjs();
        // add graphql data to graphql2chartjs instance
        g2c.add(data, (datasetName, dataPoint) => ({
          ...dataPoint,
          chartType: 'bar',
          backgroundColor: '#44c0c1',
        }));
        // render chart with g2c data :)
        return (
          <Bar data={g2c.data} />
        )
      }
    }
  </Query>
)

const Trail = () => {
  return (
    <div style={{width:"40%"}}>
      <div key="bar">
        <div style={{marginBottom: '20px'}} id="bar">
            
                <Chart query={query}/>
              
          </div>
          
      </div>
    </div>
  )
}

export default Trail;