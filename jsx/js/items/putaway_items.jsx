class PutawayApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemReceiveList: [],
      selectedItemReceiveIndex: -1,
    };
    this.receiveFormId = "itemReceiveForm";
    this.putawayFormId = "putawayForm";
    this.shipmentCodeInpuId = "shipment-code-input";
    this.locationInputId = "location-input";
  }

  componentDidMount() {
    $("#" + this.shipmentCodeInpuId).focus();
  }

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
  }

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
    const quantity      = receiveData.quantity,
          location      = receiveData.location,
          itemReceiveId = itemReceive.id;
    const locationObj = this.getLocationData(location);
    if (!locationObj) {
      return; 
    }
    const data = {
      itemReceiveId: itemReceiveId,
      quantity: quantity,
      ...locationObj
    };

    $.ajax({
      url: "./iteminventory",
      type: "POST",
      data: data,
      context: this,
      success: function(data) {

      }
    });
  }

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
              name="location" required disabled={disablePutaway}
              placeholder="A-A-A-A-A"
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
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((<PutawayApp />), document.getElementById("content-container"));
}

loadReact();