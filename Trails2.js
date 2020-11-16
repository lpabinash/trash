import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Table } from 'reactstrap';

export const GET_POSTS = gql`
 {
  deviothaptestbedv01_devicemonitort(limit: 10) {
    devicemonitorvalue
    devicemonitortime
  }
}
  
`;


export default () => (
  
  <Query query={GET_POSTS}>
    {({ loading, data }) => !loading && (
      
        <div style={{height:"250px",width:"40%",overflow:"scroll",textAlign:"center", overflowX:"hidden"}}>
      <Table >
        <thead >
          <tr>
            <th>Sr-No</th>
            <th>Temp-Max</th>
            {/* <th>Temp-Min</th> */}
          </tr>
        </thead>
        <tbody>
          {data.deviothaptestbedv01_devicemonitort.map(dummy => (
            <tr key={dummy.devicemonitortime}>
                <td>{dummy.devicemonitortime}</td>
              <td>{dummy.devicemonitorvalue}</td>
              {/* <td>{dummy.Temp_Min}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
       </div>
    )}
  </Query>
);