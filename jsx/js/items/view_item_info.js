class ItemInfoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInfos: [],
    }
    this.modalMenu = React.createRef();
  }
  onClick_search = () => {
    var search_type = document.getElementById("item-search1-type-select").value,
        search_value = document.getElementById("search-bar1-input").value;
    var that = this;
    $.ajax({
      url: "./item_info?type=" + search_type + "&value=" + search_value,
      type: "GET",
      success: function(data) {
        that.setState({itemInfos: data});
      }
    });
  };

  editItemInfo = (row_index) => {
    this.modalMenu.current.show_menu(
      "edit_item_info",
      this.state.itemInfos[row_index],
      (data) => {
        console.log(data);
        console.log(this.state.itemInfos[row_index].id)
      }
    )
  };

  create_itemInfo = (data) => {
    $.ajax({
      url: "../item_info",
      type: "POST",
      data: data,
      success: function(item_data) {
        console.log(item_data);
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
    })
  }

  render() {
    return (<div>
      <div className="input-group">
        <input className="form-control" type="text" id="search-bar1-input"></input>
        <select className="custom-select" id="item-search1-type-select">
          <option value="name">Name</option>
          <option value="description">Description</option>
        </select>
        <button className="btn btn-outline-secondary"
          onClick={this.onClick_search}
        >Search</button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Description</th>
            <th scope="col">Weight</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.itemInfos.map((itemInfo, index) => {
            return (<ItemInfoRow key={"itemInifo-" + index}
              deleteItemInfo={this.deleteItemInfo}
              editItemInfo={this.editItemInfo}
              row_index={index}
              data={itemInfo}
              editItemInfo = {this.editItemInfo}
              />);
          })}
        </tbody>
      </table>
      <div>
        <button
          onClick={this.onClick_createItemInfo}
        >+</button>
      </div>

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
  onClick_editItemInfo = () => {
    this.props.editItemInfo(this.props.row_index);
  }
  onClick_deleteItemInfo = () => {
    var result = window.confirm("Are you sure you want to delete ?")
    if (result) {
      this.props.deleteItemInfo(this.props.row_index, this.props.data.id);
    }
  };

  render() {
    return (<tr key={"itemInfo-" + this.props.data.id}>
    <td>{this.props.data.itemName}</td>
    <td>{this.props.data.description}</td>
    <td>{this.props.data.weight}</td>
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
    </td>
  </tr>);
  }
}