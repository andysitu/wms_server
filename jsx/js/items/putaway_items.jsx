class PutawayApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemReceiveList: [],
      selectedItemReceiveIndex: -1,
      putawayItemList: [],
    };
    this.receiveFormId = "itemReceiveForm";
    this.putawayFormId = "putawayForm";
    this.shipmentCodeInpuId = "shipment-code-input";
    this.locationInputId = "location-input";
  }

  componentDidMount() {
    $("#" + this.shipmentCodeInpuId).focus();
    this.load_items_from_localstorage();
  }

  load_items_from_localstorage = () => {
    // Save items to LocalStorage before closing
    window.addEventListener('beforeunload', (e) => {
      this.save_items_to_localstorage();
    });

    this.setState({
      putawayItemList: storage_obj.get_itemPutaway(),
    });
  }

  save_items_to_localstorage = () => {
    storage_obj.set_itemPutaway(this.state.putawayItemList);
  };

  getData = (formId) => {
    var formData = new FormData($("#" + formId)[0]),
        data = {};

    for (var key of formData.keys()) {
      data[key] = formData.get(key);
    }
    return data;
  }

  resetItemReceiveTable = () => {
    this.setState({
      selectedItemReceiveIndex: -1,
      itemReceiveList: [],
    });
  }

  onSubmit_searchForm = (e) => {
    e.preventDefault();
    this.resetItemReceiveTable();
    
    const data = this.getData(this.receiveFormId);
    let searchType = (data.itemSku.length > 0) ? 
          "shipmentCodeAndItemSku" : "shipmentCode",
        url = `./itemreceive?property=${searchType}&value=${data.shipmentCode}`;
    if (data.itemSku.length > 0) {
      url += `&value2=${data.itemSku}`;
    }
    $.ajax({
      type: "GET",
      url: url,
      context: this,
      success: function(returnData) {
        console.log(returnData);
        this.setState({
          itemReceiveList: returnData,
        });
      }
    });
  };

  onSelectItemReceive = (e) => {
    var element = e.target; 
    // Can't control propagation with React, so use JS to find TR
    for (let i=0; i<5; i++) {
      if (element.tagName == "TR") {
        break;
      }
      element = element.parentNode;
    }
    var selectedIndex = element.getAttribute("index");
    if (selectedIndex == null || element.tagName !="TR") {
      return;
    }
    var previousTrs = document.getElementsByClassName("selected");
    for (let i=0; i<previousTrs.length; i++) {
      previousTrs[i].classList.remove("selected");
    }
    element.classList.add("selected");

    this.setState({
      selectedItemReceiveIndex: parseInt(selectedIndex),
    }, () => {
      $("#" + this.locationInputId).focus();
    });
  };

  getLocationData(locationString) {
    const regex = /^(?<Area>\w+)-(?<row>\w+)-(?<bay>\w+)-(?<level>\w+)-(?<shelf>\w+)$/
    const result = locationString.match(regex);
    console.log(result);
    if (result != null) {
      return result.groups;
    }
  }
  
  submitItemInventory = (e) => {
    e.preventDefault();
    const receiveData = this.getData(this.putawayFormId);  
    const itemReceive = this.state.itemReceiveList[this.state.selectedItemReceiveIndex];
    const data = {
      itemReceiveId: itemReceive.id,
      quantity: receiveData.quantity,
      locationCode: receiveData.locationCode
    };

    $.ajax({
      url: "./iteminventory",
      type: "POST",
      data: data,
      context: this,
      success: function(itemData) {
        console.log(itemData);
        this.setState(state => {
          const index = state.selectedItemReceiveIndex;
          const newItemList = [...state.itemReceiveList];
          if (receiveData.quantity ==  newItemList[index]) {
            newItemList.splice(index, 1);
          } else {
            newItemList[index].quantity -= receiveData.quantity;
          }

          return { 
            putawayItemList: [itemData, ...state.putawayItemList],
            itemReceiveList: newItemList };
        }, () => {
          document.getElementById(this.locationInputId).focus();
        });
      }, 
      error: function(xhr, textStatus) {
        if (xhr.status == 404) {
          window.alert("Location not found");
        }
      },
      complete: function() {
        $("#" + this.putawayFormId)[0].reset();
      }
    });
  };

  onClick_deleteItem = (e) => {
    const id = e.target.getAttribute("id"),
          index = e.target.getAttribute("index");
    $.ajax({
      url: "/iteminventory/" + id,
      type: "DELETE",
      context: this,
      success: function(itemReceive) {
        this.setState(state => {
          let newItemReceiveList = [...state.itemReceiveList];
          for (let i=0; i< newItemReceiveList.length; i++) {
            if (newItemReceiveList[i].id == itemReceive.id) {
              newItemReceiveList[i] = itemReceive;
              break;
            }
          }
          return {itemReceiveList: newItemReceiveList};
        });
      },
      complete: function() {
        this.setState(state => {
          let newList = [...state.putawayItemList];
          newList.splice(index, 1);
          return {putawayItemList: newList};
        })
      }
    });
  };

  render() {
    let disablePutaway = this.state.selectedItemReceiveIndex < 0;

    let maxQuantity = (disablePutaway) ? 0 :
        this.state.itemReceiveList[this.state.selectedItemReceiveIndex].quantity;

    return (
    <div>
      <form onSubmit={this.onSubmit_searchForm} id={this.receiveFormId}>
        <div className="form-group row">
          <div className="col-6">
            <label htmlFor="shipment-code-input">Shipment Code</label>
            <input type="text" className="form-control" id={this.shipmentCodeInpuId}
              name="shipmentCode" required></input>
          </div>
          <div className="col-6">
            <label htmlFor="item-sku-input">Item SKU</label>
            <input type="text" className="form-control" id="item-sku-input"
              name="itemSku"></input>
          </div>  
        </div>
        <button type="submit">Search</button>
      </form>

      <div id="itemReceive-table-container">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Shipment Code</th>
              <th scope="col">Item Name</th>
              <th scope="col">SKU</th>
              <th scope="col">Quantity</th>
            </tr>
          </thead>
          <tbody id="itemReceive-table">
            {this.state.itemReceiveList.map((itemReceive, index) => {
              let checkStatus = this.state.selectedItemReceiveIndex == index
              return (
                <tr index={index} key={itemReceive.id} onClick={this.onSelectItemReceive}>
                  <td><input type="radio" checked={checkStatus} value={index} 
                    name="itemReceive-select" readOnly/></td>
                  <td>{itemReceive.shipmentCode}</td>
                  <td>{itemReceive.itemInfoResponse.itemName}</td>
                  <td>{itemReceive.itemSku}</td>
                  <td>{itemReceive.quantity}</td>
                </tr>);
            })}
          </tbody>
        </table>
      </div>
      <form id={this.putawayFormId} onSubmit={this.submitItemInventory}>
        <div className="form-group row">
          <div className="col-6">
            <label htmlFor="location-input">Location</label>
            <input type="text" className="form-control" id={this.locationInputId}
              name="locationCode" required disabled={disablePutaway}
              placeholder="A-1-1-1-1"
              pattern="^[\w]+-[\w]+-[\w]+-[\w]+-[\w]+$"
              ></input>
          </div>
          <div className="col-6">
            <label htmlFor="quantity-input">Quantity</label>
            <input type="number" className="form-control" id="quantity-input"
              placeholder={`Max Quantity: ${maxQuantity}`}
              min="1" max={maxQuantity}
              name="quantity" required disabled={disablePutaway}></input>
          </div>  
        </div>
        <button type="submit">Submit</button>
      </form>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">SKU</th>
            <th scope="col">Location</th>
            <th scope="col">Shipment Code</th>
            <th scope="col">Quantity</th>
            <th scope="col">Date</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {this.state.putawayItemList.map((item, index) => {
            return (
            <tr key={item.id}>
              <td>{item.itemName}</td>
              <td>{item.itemSku}</td>
              <td>{item.locationCode}</td>
              <td>{item.shipmentCode}</td>
              <td>{item.quantity}</td>
              <td>{item.createdDate}</td>
              <td>
                <button type="button" index={index} id={item.id}
                  onClick={this.onClick_deleteItem}>Delete</button>
              </td>
            </tr>);
          })}
        </tbody>
      </table>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((<PutawayApp />), document.getElementById("content-container"));
}

loadReact();