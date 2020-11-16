import React, { Component, Fragment } from "react";
import IntlMessages from "Util/IntlMessages";
import { Row, Card, CardBody, CardTitle, Button, Jumbotron } from "reactstrap";

import { Colxx, Separator } from "Components/CustomBootstrap";
import BreadcrumbContainer from "Components/BreadcrumbContainer";
import Analytics from "./../../AnalyticsPage"
// import Entities from "./../../entities"
// import Cooldown from "./../../Cooldown"
// import Incidents from "../../Incidents";
import Trail from './../../trail';
import Trail2 from './../../Trails2'
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from 'apollo-cache-inmemory';
// const link = new WebSocketLink({
//   uri: 'wss://157.245.104.15/v1/graphql',
//   headers:{
     
//     "x-hasura-admin-secret":"Lets0rg@20@)"
  
// },
//   options: {
//     reconnect: true,
//     // credentials: "include",
    
//   }
// })
const link = createHttpLink({ uri: "http://157.245.104.15/v1/graphql",

headers:{     
    "x-hasura-admin-secret":"Lets0rg@20@)" 
},
options: {
  reconnect: true,
  // credentials: "include",
  
}



});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache
});

export default class extends Component {
  render() {
    return (
      <div style={{display:"flex"}}>
        {/* <Row>
          <Colxx xxs="12">
            <BreadcrumbContainer
              heading={<IntlMessages id="menu.third-single" />}
              match={this.props.match}
            />
            <Separator className="mb-5" />
          </Colxx>
        </Row> */}
        {
          /*Enjoy!*/
        }
       
        {/* <Analytics/> */}
        {/* <Incidents/> */}
        {/* <Trail/> */}
        <ApolloProvider client={client}>
      <Trail />
      <Trail2/>
      
    </ApolloProvider>
         {/* <Entities/> */}
      </div>
    );
  }
}
