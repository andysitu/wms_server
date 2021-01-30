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

  getData = () => {
    var formData = new FormData($("#" + this.receiveFormId)[0]),
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
    
    const data = this.getData();
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
    var previousTrs = document.getElementsByClassName("selected");
    for (let i=0; i<previousTrs.length; i++) {
      previousTrs[i].classList.remove("selected");
    }
    var newTr = e.target.parentNode.parentNode;
    newTr.classList.add("selected");

    this.setState({
      selectedItemReceiveIndex: parseInt(e.target.value),
    }, () => {
      $("#" + this.locationInputId).focus();
    });
  }

  render() {
    let disablePutaway = this.state.selectedItemReceiveIndex < 0;

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
              return (
                <tr key={itemReceive.id}>
                  <td><input type="radio" value={index} name="itemReceive-select" 
                        onChange={this.onSelectItemReceive}/></td>
                  <td>{itemReceive.shipmentCode}</td>
                  <td>{itemReceive.itemInfoResponse.itemName}</td>
                  <td>{itemReceive.itemSku}</td>
                  <td>{itemReceive.quantity}</td>
                </tr>);
            })}
          </tbody>
        </table>
      </div>
      <form id={this.putawayFormId}>
        <div className="form-group row">
          <div className="col-6">
            <label htmlFor="location-input">Location</label>
            <input type="text" className="form-control" id={this.locationInputId}
              name="location" required disabled={disablePutaway}></input>
          </div>
          <div className="col-6">
            <label htmlFor="quantity-input">Quantity</label>
            <input type="number" className="form-control" id="quantity-input"
              name="quantity" required disabled={disablePutaway}></input>
          </div>  
        </div>
        <button type="submit">Search</button>
      </form>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((<PutawayApp />), document.getElementById("content-container"));
}

loadReact();