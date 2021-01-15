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

  show_itemInfo_barcode = (barcodes) => {
    this.modalMenu.current.show_menu(
      "create_barcode", {barcode_strings: barcodes,});
  }

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
          show_itemInfo_barcode={this.show_itemInfo_barcode}
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
            <option value="sku">SKU</option>
            <option value="category">Category</option>
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
            <th scope="col">Category</th>
            <th scope="col">[w, l, h]</th>
            <th scope="col">SKUs</th>
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
    show_itemSkus: false,
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

  onClick_add_itemSkuss = () => {
    var sku = window.prompt("SKU/ itemSku number?"),
        that = this;
    if (sku != null && sku.length > 5) {
      $.ajax({
        url: "../item_info/" + this.state.data.id + "/itemskus",
        type: "POST",
        data: {
          sku: sku,
        },
        success: function(returnData) {
          that.setState(prev_state => {
            prev_state.data.itemskus.push(returnData);

            return {
              data: prev_state.data,
            };
          });
        },
      });
    }
  };

  onClick_delete_itemInfo_itemSku =(e) => {
    var id = e.target.getAttribute("itemsku_id"),
        sku = e.target.getAttribute("itemsku"),
        that = this;
    if (e.target.getAttribute("itemsku_id")) {
      let result = window.confirm("Are you sure you want to delete sku " + sku + "?");  
      if (result) {
        $.ajax({
          url: "../item_info/" + this.state.data.id + "/itemskus/" + id,
          type: "DELETE",
          success: function(data) {
            that.setState(prev_state => {
              for (let i=0; i<prev_state.data.itemskus.length; i++) {
                if (prev_state.data.itemskus[i].id == id) {
                  prev_state.data.itemskus.splice(i, 1);
                  return {
                    data: prev_state.data,
                  };
                }
              }
            });
          },
        });
      }
    }
  };

  onClick_expand_itemSkus = () => {
    this.setState({show_itemSkus: !this.state.show_itemSkus});
  };

  onClick_show_barcode = (e) => {
    this.props.show_itemInfo_barcode( [ e.target.getAttribute("sku"), ] );
    // this.modalMenu.current.show_menu("create_barcode", {barcode_strings: locations,});
  }

  create_itemSku_div = (itemSku) => {
    return (
    <span key={itemSku.id}>
      {itemSku.sku}
      <button type="button" className="btn btn-sm btn-outline-dark btn-with-svgs"
        sku={itemSku.sku}
        onClick={this.onClick_show_barcode}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upc" viewBox="0 0 16 16">
          <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
        </svg>
      </button>
      <button type="button" className="btn btn-sm btn-outline-danger btn-with-svgs"
        itemsku_id={itemSku.id} itemsku={itemSku.sku}
        onClick={this.onClick_delete_itemInfo_itemSku}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </button>
    </span>);
  };

  create_itemSku_divs = () => {
    if (this.state.data.itemskus && this.state.data.itemskus.length > 1) {
      if (this.state.show_itemSkus) {
        return (
        <div className="expanded-itemSkus-div">
          {this.state.data.itemskus.map((itemSku)=> {
            return (
            <div key={"div-" + itemSku.id}>
              {this.create_itemSku_div(itemSku)}
            </div>);
          })}
          <div onClick={this.onClick_expand_itemSkus} className="itemSkus-btn-container">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-up" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
            </svg>
          </div>
        </div>);
      } else {
        return (
          <div className="reduced-itemSkus-div">
            {this.create_itemSku_div(this.state.data.itemskus[0])}
            <span onClick={this.onClick_expand_itemSkus} className="itemSkus-btn-container">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              </svg>
            </span>
          </div>
        );
      }
    } else if (this.state.data.itemskus && this.state.data.itemskus.length == 1) {
      return (
        <div>
          {this.create_itemSku_div(this.state.data.itemskus[0])}
        </div>
      );
    }
    return (<div></div>);
  };

  render() {
    return (<tr key={"itemInfo-" + this.state.data.id}>
    <td>{this.state.data.itemName}</td>
    <td>{this.state.data.description}</td>
    <td>{this.state.data.weight}</td>
    <td>{this.state.data.itemCategoryName}</td>
    <td>
      {`${this.state.data.width} ${this.state.data.length} ${this.state.data.height}`}
    </td>
    <td>
      {this.create_itemSku_divs()}
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
        onClick={this.onClick_add_itemSkuss}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upc" viewBox="0 0 16 16">
          <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
        </svg>
      </button>
      <button type="button" className="btn btn-sm btn-outline-dark">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
        <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
      </svg>
      </button>
    </td>
  </tr>);
  }
}