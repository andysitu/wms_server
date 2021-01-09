class ItemInfoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInfos: [],
    }
    this.modalMenu = React.createRef();
  }

  add_ref(element) {
    element.ref=React.createRef()
  }

  onClick_search = () => {
    var search_type = document.getElementById("item-search1-type-select").value,
        search_value = document.getElementById("search-bar1-input").value;
    var that = this;
    $.ajax({
      url: "./item_info?type=" + search_type + "&value=" + search_value,
      type: "GET",
      success: function(data) {
        console.log(data);
        data.forEach((element) => {
          that.add_ref(element);
        });
        that.setState({itemInfos: data});
      }
    });
  };

  update_itemInfoRow = (index) => {
    this.state.itemInfos[index].ref.current.update_data(this.state.itemInfos[index]);
  };

  editItemInfo = (row_index) => {
    var that = this;
    this.modalMenu.current.show_menu(
      "edit_item_info",
      this.state.itemInfos[row_index],
      (data) => {
        $.ajax({
          url: "../item_info/" + this.state.itemInfos[row_index].id,
          type: "PATCH",
          data: data,
          success: function(new_data) {
            that.setState(prevState => {
              let new_itemInfos = prevState.itemInfos;
              Object.assign(new_itemInfos[row_index], new_data);
            }, ()=>{that.update_itemInfoRow(row_index)});
          },
        });
      }
    )
  };

  create_itemInfo = (data) => {
    var that = this;
    $.ajax({
      url: "../item_info",
      type: "POST",
      data: data,
      success: function(item_data) {
        that.add_ref(item_data);
        that.setState({
          itemInfos: [...that.state.itemInfos, item_data],
        })
      },
    });
  };

  onClick_createItemInfo = () => {
    this.modalMenu.current.show_menu(
      "create_item_info", {}, this.create_itemInfo);
  };

  deleteItemInfo = (row_index, itemInfo_id) => {
    var that = this;
    $.ajax({
      url: "../item_info/" + itemInfo_id,
      type: "DELETE",
      success: function(return_data) {
        that.state.itemInfos.splice(row_index, 1)
        that.setState({
          itemInfos: that.state.itemInfos,
        });
      },
    });
  }

  render() {
    var rows = [];
    if (this.state.itemInfos.length > 0) {
      rows = this.state.itemInfos.map((itemInfo, index) => {
        return (<ItemInfoRow key={"itemInifo-" + itemInfo.id}
          ref={itemInfo.ref}
          deleteItemInfo={this.deleteItemInfo}
          editItemInfo={this.editItemInfo}
          row_index={index}
          data={itemInfo}
          itemName={itemInfo.itemName}
          editItemInfo = {this.editItemInfo}
        />);
      });   
    }
    return (<div>
      <div className="row justify-content-between">
        <div className="col-1">
          <button onClick={this.onClick_createItemInfo}>+</button>
        </div>
        <div className="col-sm-6 col-md-4 input-group">
          <input className="form-control" type="text" id="search-bar1-input"></input>
          <select className="custom-select" id="item-search1-type-select">
            <option value="name">Name</option>
            <option value="description">Description</option>
          </select>
          <button className="btn btn-outline-secondary"
            onClick={this.onClick_search}>
            Search
          </button>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Descriptions</th>
            <th scope="col">Weight</th>
            <th scope="col">Dimensions (w, l, h)</th>
            <th scope="col">UPCs</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <ModalMenu ref={this.modalMenu} />
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((
    <ItemInfoApp />
  ), document.getElementById("content-container"));
}

loadReact();

class ItemInfoRow extends React.Component {
  state = {
    data: this.props.data ? this.props.data : {},
    show_itemUpcs: false,
  }

  onClick_editItemInfo = () => {
    this.props.editItemInfo(this.props.row_index);
  }
  onClick_deleteItemInfo = () => {
    var result = window.confirm("Are you sure you want to delete ?")
    if (result) {
      this.props.deleteItemInfo(this.props.row_index, this.props.data.id);
    }
  };

  update_data =(new_data) => {
    this.setState({data: new_data,})
  }

  onClick_add_itemUpcs = () => {
    var upc = window.prompt("UPC/ itemUpc number?"),
        that = this;
    if (upc != null && upc.length > 5) {
      $.ajax({
        url: "../item_info/" + this.state.data.id + "/itemupcs",
        type: "POST",
        data: {
          upc: upc,
        },
        success: function(returnData) {
          that.setState(prev_state => {
            prev_state.data.itemupcs.push(returnData);

            return {
              data: prev_state.data,
            };
          });
        },
      });
    }
  };

  onClick_delete_itemInfo_itemUpc =(e) => {
    var id = e.target.getAttribute("itemupc_id"),
        upc = e.target.getAttribute("itemupc");
    if (e.target.getAttribute("itemupc_id")) {
      let result = window.confirm("Are you sure you want to delete upc " + upc + "?");  
      if (result) {
        $.ajax({
          url: "../item_info/" + this.state.data.id + "/itemupcs/" + id,
          type: "DELETE",
          success: function(data) {
            console.log(data);
          },
        });
      }
    }
    
  };

  onClick_expand_itemUpcs = () => {
    this.setState({show_itemUpcs: !this.state.show_itemUpcs});
  };

  create_itemUpcs = () => {
    if (this.state.data.itemupcs && (this.state.data.itemupcs.length > 1)) {
      if (this.state.show_itemUpcs) {
        return (
        <div className="expanded-itemUpcs-div">
          {this.state.data.itemupcs.map((itemUpc)=> {
            return (
              <div key={itemUpc.id}>
                {itemUpc.upc}
                <span className="del-item-itemUpcs-span" 
                  itemupc_id={itemUpc.id} itemupc={itemUpc.upc}
                  onClick={this.onClick_delete_itemInfo_itemUpc}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                  </span>
              </div>);
          })}
          <div onClick={this.onClick_expand_itemUpcs} className="reduce-btn-div">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
            </svg>
          </div>
        </div>);
      } else {
        return (
          <div className="reduced-itemUpcs-div" onClick={this.onClick_expand_itemUpcs}>
            {this.state.data.itemupcs[0].upc + "..."}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
          </div>
        );
      }
    } else if (this.state.data.itemupcs && (this.state.data.itemupcs.length == 1)) {
      return (<div>{this.state.data.itemupcs[0].upc}</div>);
    }
    return (<div></div>);
  };

  render() {
    return (<tr key={"itemInfo-" + this.state.data.id}>
    <td>{this.state.data.itemName}</td>
    <td>{this.state.data.description}</td>
    <td>{this.state.data.weight}</td>
    <td>
      {`${this.state.data.width} ${this.state.data.length} ${this.state.data.height}`}
    </td>
    <td>
      {this.create_itemUpcs()}
    </td>
    
    <td>
      <button type="button" className="btn btn-sm btn-outline-warning"
        onClick={this.onClick_editItemInfo}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </button>
      <button type="button" className="btn btn-sm btn-outline-danger"
        onClick={this.onClick_deleteItemInfo}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </button>
      <button type="button" className="btn btn-sm btn-outline-dark"
        onClick={this.onClick_add_itemUpcs}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upc" viewBox="0 0 16 16">
          <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
        </svg>
      </button>
    </td>
  </tr>);
  }
}