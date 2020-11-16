import React from 'react';
import { Line } from 'react-chartjs-2';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import SyntaxHighlighter from 'react-syntax-highlighter';
import graphql2chartjs from 'graphql2chartjs';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';
// import Axios from 'axios'

const subscription = 
`MyQuery {
  deviothaptestbedv01_devicemonitort(limit: 10) {
    date_t:devicemonitorvalue
    date_y:devicemonitortime
  }
}`


// Chart component
const Chart = () => (
  <Subscription
    subscription={gql`${subscription}`}
  >
      
    {
      ({data, error, loading}) => {
        if (loading || error) {
          console.error(error);
          return <div className="loadingIndicator">Please wait </div>;
        }
        // create graphql2chartjs instance
        const g2c = new graphql2chartjs();
        // add graphql data to graphql2chartjs instance while adding different chart types and properties
        g2c.add(data, (dataSetName, dataPoint) => {
           console.log(gc2)
          return {
            ...dataPoint,
            chartType: 'line',
            borderColor: '#333538',
            pointBackgroundColor: '#333538',
            backgroundsColor: '#333538',
            fill: false
          }
        });
        // render chart with g2c data :)
        return (
            
          <Line
            data={g2c.data}
            options={{
              scales: {
                xAxes: [{
                  type: 'time'
                }]
              },
              animation: {
                duration: 0, // general animation time
              },
              bezierCurve : false
            }}
          />
        )
      }
    }
  </Subscription>
)



const LiveChart = () => {
  return (
    <div style={{margin: '10px', paddingTop: '65px'}}>
      <div key="live-chart">
        <div style={{marginBottom: '20px'}} id="live-chart">
            <h2 style={{margin: '10px', textAlign: 'center'}}>Live chart (with mock data)</h2>
            <div className="chartWrapper">
            
              <div className="half_screen">
                <Chart />
              </div>
            </div>
          </div>
          {/* <a href="https://github.com/hasura/graphql-engine/tree/master/community/tools/graphql2chartjs/example/app/src/charts/LiveChart.js">View source </a> */}
          <br/>
        <hr />
      </div>
    </div>
  )
}

export { LiveChart };