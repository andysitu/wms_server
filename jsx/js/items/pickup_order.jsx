class PickupOrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      selectedItems: [],
      selectedOrderIndex: -1,
    }
    this.getOrders();
    this.locationInputId = "location-input"
    this.orderFormId = "order-form"
  }

  getOrders = () => {
    $.ajax({
      url: "/orderpackages",
      type: "GET",
      context: this,
      success: function(orders) {
        console.log(orders);
        this.setState({
          orders: orders,
          selectedItems: [],
          selectedOrderIndex: -1,
        });
      }
    });
  };

  createPickupItems = () => {
    if  (this.state.selectedOrderIndex == -1) {
      return (<tbody></tbody>);
    } else {
      const items = this.state.selectedItems;
      return (<tbody>
        {items.map((itemOrder, index) => {
          return (
            <tr key={"pickup-items-" + itemOrder.id}>
              <td>{itemOrder.itemName}</td>
              <td>{itemOrder.itemSku}</td>
              <td>{itemOrder.itemDescription}</td>
              <td>{itemOrder.orderedQuantity}</td>
              <td>{itemOrder.locationCode}</td>
            </tr>
          );
        })}
      </tbody>);
    }
  };

  // Check there are that many total items reserved at the location
  checkItemQuantity = (data) => {
    const items = this.state.selectedItems;
    for (let i=0, item; i<items.length; i++) {
      item = items[i];
      if (item.locationCode == data.locationCode && item.itemSku == data.itemSku) {
        return parseInt(data.quantity) <= item.orderedQuantity;
      }
    }
    return false;
  };
  // Group up items by locationCode & itemSku and put combined items
  // into state.selectedItems;
  onClick_selectOrder = (e) => {
    this.setState(state =>{
      const selectedIndex = parseInt(e.target.value);
      let itemResponses = state.orders[selectedIndex].itemOrderResponses;
      console.log(itemResponses);

      var selectedItems = [];

      // {[locationCode] : { [itemSku]: [index in selectedItems]} }
      const itemLocationIndexMap = {};
      let locationCode, itemSku;
      itemResponses.forEach(itemResponse => {
        locationCode = itemResponse.itemInventoryResponse.locationCode;
        itemSku = itemResponse.itemInventoryResponse.itemSku;
        if (!(itemResponse.itemInventoryResponse.locationCode in itemLocationIndexMap)) {
          itemLocationIndexMap[locationCode] = {};
        }
        if (!(itemSku in itemLocationIndexMap[locationCode])) {
          itemLocationIndexMap[locationCode][itemSku] = selectedItems.length;
          selectedItems.push({
            itemName: itemResponse.itemInventoryResponse.itemName,
            itemSku: itemResponse.itemInventoryResponse.itemSku,
            locationCode: locationCode,
            orderedQuantity: itemResponse.orderedQuantity,
            description: itemResponse.itemInventoryResponse.itemDescription,
          });
        } else {
          selectedItems[itemLocationIndexMap[locationCode][itemSku]].orderedQuantity
            += itemResponse.orderedQuantity;
        }
      });
      
      return {
        selectedOrderIndex: parseInt(selectedIndex),
        selectedItems: selectedItems,
      };      
    }, 
    ()=> {
      $("#" + this.locationInputId).focus();
    });
    
  };

  getData = (formId) => {
    var formData = new FormData($("#" + formId)[0]),
        data = {};

    for (var key of formData.keys()) {
      data[key] = formData.get(key);
    }
    return data;
  }

  onSubmit_order = (e) => {
    e.preventDefault();
    const data = this.getData(this.orderFormId);
    if (this.checkItemQuantity(data)) {
      // $("#" + this.orderFormId)[0].reset();
      console.log(data);
    } else {
      window.alert("Error: item / location not found or quantity is too high");
    }
  };

  render() {
    let numOpenItems, i, trClass;

    const disabledInput = this.state.selectedOrderIndex ==  -1;
    return (
    <div>
      <h2>Open Orders</h2>
      <div id="open-orders-container">
        <table>
          <thead>
            <tr>
              <th scope="col">Order Name</th>
              <th scope="col">Company Name</th>
              <th scope="col">Transport</th>
              <th scope="col">Open Item Rows</th>
              <th scope="col">Total Item Row</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map(((orderPackage, index) => {
              numOpenItems = 0;
              for (i=0; i<orderPackage.itemOrderResponses.length; i++) {
                if (orderPackage.itemOrderResponses[i].complete == 0) {
                  numOpenItems++;
                }
              }
              trClass = (index == this.state.selectedOrderIndex) ?
                "selected" : "";
              return (
                <tr key={orderPackage.id} className={trClass}>
                  <td>{orderPackage.orderName}</td>
                  <td>{orderPackage.companyName}</td>
                  <td>{orderPackage.transportName}</td>
                  <td>
                    <button type="button"
                      value={index} onClick={this.onClick_selectOrder}
                      className="btn btn-sm btn-outline-primary"
                    >{numOpenItems}</button>
                    </td>
                  <td>{orderPackage.itemOrderResponses.length}</td>
                </tr>)
            }))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Pickup Items</h2>
        <div id="pickup-items-container">
          <table>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">SKU</th>
                <th scope="col">Description</th>
                <th scope="col">Quantity</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            {this.createPickupItems()}
          </table>
        </div>
      </div>

      <div>
        <form onSubmit={this.onSubmit_order} id={this.orderFormId}>
          <div className="form-group">
            <label htmlFor={this.locationInputId}>Location</label>
            <input type="text" name="locationCode" className="form-control" 
            id={this.locationInputId} disabled={disabledInput} required></input>
          </div>
          <div className="form-group">
            <label htmlFor="itemsku-input">SKU</label>
            <input type="text" name="itemSku" className="form-control" 
            id="itemsku-input" disabled={disabledInput} required></input>
          </div>
          <div className="form-group">
            <label htmlFor="quantity-input">Quantity</label>
            <input type="number" name="quantity" className="form-control" 
            id="quantity-input" disabled={disabledInput} required></input>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>

    </div>      
    );
  }
}

function loadReact() {
  ReactDOM.render((<PickupOrderApp />), document.getElementById("content-container"));
}

loadReact();