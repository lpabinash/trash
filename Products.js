import React from "react";
import "./Products.css";
const axios = require('axios');


class Products extends React.Component {
 
    state = {
      filterList: [
        {
          id: 11,
          name: "Expired",
          value: "Expired"
        },
        {
          id: 12,
          name: "LowStock",
          value: "LowStock"
        }
      ],
      searchLists: [],
      activeFilter: [],
      filteredList:[]
    };


  componentDidMount(){
    axios.get('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products')
  .then( (response)=> {
    // handle success
    // console.log(response.data);
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
    var d = Date.parse(new Date());
    if (
        this.state.activeFilter.length === 0
    ) {
        
      filteredList = this.state.searchLists;
    //   console.log(filteredList[0])
    } else if(this.state.activeFilter=="LowStock"){
      filteredList = this.state.searchLists.filter(item =>item.stock < 100);
    //   console.log(filteredList)
    }else if(this.state.activeFilter=="Expired"){
        filteredList = this.state.searchLists.filter(item =>Date.parse(item.expiryDate) < d);
        // console.log(filteredList)
    }else if(this.state.activeFilter.length>1){
        filteredList = this.state.searchLists.filter(item =>Date.parse(item.expiryDate) < d && item.stock < 100);
        // console.log(filteredList)
    }
    return (
        <div>
        
      <div class="userList-pageWrapper">
      <h1 style={{width:"100%",textAlign:"left"}}>Products</h1>
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
            <th>Product Name</th>
            <th>Brand</th>
            <th style={{width:"100px"}}>Expiry Date</th>
            <th>Unit Price</th>
            <th>Stock</th>
            {/* <th>Age</th> */}
        </tr>
        
        
            
    {
          filteredList.map(item => {
            return( 
                <tr class="userList-tableRow">
                 <td class="userList-secondaryText"> {item.id}</td>
                 <td class="userList-primaryText"> {item.medicineName}</td>
                 <td class="userList-secondaryText">{item.medicineBrand}</td>
                 <td class="userList-primaryText"> {item.expiryDate}</td>
                 <td class="userList-secondaryText">{item.unitPrice}</td>
                 <td class="userList-secondaryText">{item.stock}</td>
                 
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

export default Products;
