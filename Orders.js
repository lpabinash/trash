import React from "react";
import "./Order.css";
const axios = require('axios');


class Search extends React.Component {
 
    state = {
      filterList: [
        {
          id: 11,
          name: "New",
          value: "New"
        },
        {
          id: 12,
          name: "Packed",
          value: "Packed"
        },
        {
          id: 13,
          name: "InTransit",
          value: "InTransit"
        },
        {
          id: 14,
          name: "Delivered",
          value: "Delivered"
        }
      ],
      searchLists: [],
      activeFilter: [],
      filteredList:[]
    };


  componentDidMount(){
    axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders')
  .then( (response)=> {
    // handle success
    console.log(response.data);
    this.setState({searchLists:[...response.data]});
  })
  }

  onFilterChange(filter) {
    const { filterList, activeFilter } = this.state;
    if (filter === "ALL") {
      if (activeFilter.length === filterList.length) {
        this.setState({ activeFilter: [] });
      } else {
        this.setState({ activeFilter: filterList.map(filter => filter.value) });
      }
    } else {
      if (activeFilter.includes(filter)) {
        const filterIndex = activeFilter.indexOf(filter);
        const newFilter = [...activeFilter];
        newFilter.splice(filterIndex, 1);
        this.setState({ activeFilter: newFilter });
      } else {
        this.setState({ activeFilter: [...activeFilter, filter] });
      }
    }
    // console.log(this.state.activeFilter)
  }

  render() {
    // const { filterList, activeFilter } = this.state;
    let filteredList=[];
    if (
        this.state.activeFilter.length === 0 ||
        this.state.activeFilter.length === this.state.filterList.length
    ) {
        
      filteredList = this.state.searchLists;
    //   console.log(filteredList[0])
    } else {
        console.log(this.state.activeFilter)
        console.log(this.state.searchLists)
      filteredList = this.state.searchLists.filter(item =>
        this.state.activeFilter.includes(item.orderStatus)
      );
    //   console.log(filteredList)
    }
    // this.setState({filteredList:filteredList})
    // console.log(filteredList)
    return (
        <div>
        
      <div class="userList-pageWrapper">
      <h1 style={{width:"100%",textAlign:"left"}}>Orders</h1>
      <div class="subWrapper">
          <div class="filters">
              
              <h2 style={{textAlign:"left"}}>Filters</h2>
              <p  style={{textAlign:"left"}}>Count: {filteredList.length}</p>
        <form  style={{display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
          <label style={{display:"none"}} htmlFor="myInput">All</label>
          <input style={{display:"none"}}
            id="myInput"
            type="checkbox"
            onClick={() => this.onFilterChange("ALL")}
            checked={this.state.activeFilter.length === this.state.filterList.length || this.state.activeFilter.length===0}
          />
          {this.state.filterList.map(filter => (
            <React.Fragment>
                <div class="filter">
              
              <input
                id={filter.id}
                type="checkbox"
                checked={this.state.activeFilter.includes(filter.value)}
                onClick={() => this.onFilterChange(filter.value)}
              />
              <label htmlFor={filter.id}>{filter.name}</label>
              </div>
            </React.Fragment>
          ))}
        </form>
        </div>
        <div>
        <table class="userList-table">
        <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            {/* <th>Age</th> */}
        </tr>
        
        
            
    {
          filteredList.map(item => {
            return( 
                <tr class="userList-tableRow">
                 <td class="userList-secondaryText"> {item.id}</td>
                 <td class="userList-primaryText"> {item.customerName}</td>
                 <td > <h5 style={{marginBottom:"0px"}} class="userList-primaryText">{item.orderDate}</h5><p style={{marginTop:"5px"}} class="userList-secondaryText">{item.orderTime}</p></td>
                 <td class="userList-secondaryText"> {item.amount}</td>
                 <td class="userList-primaryText">{item.orderStatus}</td>
                 
                </tr>
              )
          }
          
          )
        // console.log(filteredList[0])
          }
          </table>
        </div>
      </div>
      </div>
      </div>
    );
  }
}

export default Search;
