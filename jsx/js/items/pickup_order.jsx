class PickupOrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      selectedOrderIndex: -1,
    }
    this.getOpenOrders();
    this.locationInputId = "location-input";
    this.skuInputId = "itemsku-input";
    this.quantityInputId = "quantity-input";
    this.orderFormId = "order-form";
  }
  // Categorize items in an order by LocationCode & SKU
  convertOrderItems = (order) => {
    let itemResponses = order.itemOrderResponses;

    let selectedItems = [];

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
          startQuantity: itemResponse.startQuantity,
          description: itemResponse.itemInventoryResponse.itemDescription,
        });
      } else {
        selectedItems[itemLocationIndexMap[locationCode][itemSku]].orderedQuantity
          += itemResponse.orderedQuantity;
        selectedItems[itemLocationIndexMap[locationCode][itemSku]].startQuantity
          += itemResponse.startQuantity;
      }
    });
    return selectedItems;
  }
  /**
   * Sends /GET/ to order packages to get open orders & then converts
   * the items in each order using convertOrderItems a list of items
   * combined with the same location & sku
   */
  getOpenOrders = () => {
    $.ajax({
      url: "/orderpackages?type=open",
      type: "GET",
      context: this,
      success: function(orders) {
        for (let i=0; i<orders.length; i++) {
          orders[i].itemsList = this.convertOrderItems(orders[i]);
        }
        console.log(orders);
        this.setState({
          orders: orders,
          selectedItems: [],
          selectedOrderIndex: -1,
        });
      }
    });
  };

  selectItem = (e) => {
    e.preventDefault();
    const sku = e.target.textContent;
    this.itemFormReset();
    $("#" + this.skuInputId).val(sku);
    $("#" + this.locationInputId)[0].focus();
  };

  createPickupItemsTbody = () => {
    if (this.state.selectedOrderIndex == -1) {
      return (<tbody></tbody>);
    } else {
      const items = this.state.orders[this.state.selectedOrderIndex].itemsList;
      return (<tbody>
        {items.map((itemOrder, index) => {
          const pickedRemaining = itemOrder.orderedQuantity > 0;
          return (
            // IDs don't exist since the items are combined by location & sku
            <tr key={"pickup-items-" + index}>
              <td>{itemOrder.itemName}</td>
              <td>
                { pickedRemaining ?
                (<a href="" onClick={this.selectItem}>{itemOrder.itemSku}</a>) :
                itemOrder.itemSku
                }
              </td>
              <td>{itemOrder.description}</td>
              <td>{itemOrder.orderedQuantity}</td>
              <td>{itemOrder.locationCode}</td>
            </tr>
          );
        })}
      </tbody>);
    }
  };

  // Check there are enough quantity for item & that the sku & locatio is correct
  // Notifies the user if it's incorrect and focuses on the input to be changed
  checkItem = (data) => {
    const items = this.state.orders[this.state.selectedOrderIndex].itemsList;
    let foundItem = false, foundLocation = false;
    for (let i=0, item; i<items.length; i++) {
      item = items[i];
      if (item.locationCode == data.locationCode) {
        foundLocation = true;
      }
      if (item.itemSku == data.itemSku) {
        foundItem = true;
      }
      if (item.locationCode == data.locationCode && item.itemSku == data.itemSku) {
        if (parseInt(data.quantity) > item.orderedQuantity) {
          window.alert(`The quantity is too large. Please choose ${
            item.orderedQuantity} or fewer`);
          $("#" + this.quantityInputId).select();
        }
        return true;
      }
    }
    // Select SKU Input if sku is incorrect
    if (!foundItem) {
      window.alert("The SKU is incorrect");
      $("#" + this.skuInputId).select();
    }
    // Reset entire form if location is incorrect (force user to redo)
    if (!foundLocation) {
      window.alert("The location is incorrect");
      this.itemFormReset();
    }
    return false;
  };
  // Group up items by locationCode & itemSku and put combined items
  // into state.selectedItems;
  onClick_selectOrder = (e) => {
    this.setState(state =>{
      const selectedIndex = parseInt(e.target.value);      
      return {
        selectedOrderIndex: parseInt(selectedIndex),
      };
    }, 
    ()=> {
      $("#" + this.skuInputId).focus();
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

  subtractItems = (itemData) => {
    this.setState(state => {
      const newOrders = [...state.orders];
      console.log(state.orders[state.selectedOrderIndex]);
      const newItems = [...state.orders[state.selectedOrderIndex].itemsList];
      for(let i=0; i<newItems.length; i++) {
        if (newItems[i].locationCode == itemData.locationCode && 
              newItems[i].itemSku == itemData.itemSku) 
        {
          newItems[i].orderedQuantity -= itemData.quantity;
          if (newItems[i].orderedQuantity <= 0) {
            newItems.splice(i, 1);
          }
          break;
        }
      }
      newOrders[state.selectedOrderIndex].itemsList = newItems;
      return {
        orders: newOrders,
      };
    });
  };

  itemFormReset = () => {
    $("#" + this.orderFormId)[0].reset();
    $("#" + this.skuInputId)[0].focus();
  };

  onSubmit_order = (e) => {
    e.preventDefault();
    const data = this.getData(this.orderFormId);
    if (this.checkItem(data)) {
      const order_id = this.state.orders[this.state.selectedOrderIndex].id;
      data.orderPackageId = order_id;
      $.ajax({
        url: "/orderpackages/" + order_id,
        context: this,
        data: JSON.stringify(data),
        contentType: "application/json",
        type: "POST",
        success: function(response) {
          this.subtractItems(data);
          this.itemFormReset();
        }
      });
    }
  };

  render() {
    let numOpenItems, totalItems, i, trClass;

    const disabledInput = this.state.selectedOrderIndex ==  -1;
    return (
    <div>
      <h2>Open Orders</h2>
      <div id="open-orders-container">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Order Name</th>
              <th scope="col">Company Name</th>
              <th scope="col">Transport</th>
              <th scope="col">Unpicked Items</th>
              <th scope="col">Total Items</th>
              <th scope="col">Select</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map(((orderPackage, index) => {
              numOpenItems = 0;
              totalItems = 0;
              for (i=0; i<orderPackage.itemsList.length; i++) {
                numOpenItems += orderPackage.itemsList[i].orderedQuantity;
                
                totalItems += orderPackage.itemsList[i].startQuantity;
              }
              trClass = (index == this.state.selectedOrderIndex) ?
                "selected" : "";
              return (
                <tr key={orderPackage.id} className={trClass}>
                  <td>{orderPackage.orderName}</td>
                  <td>{orderPackage.companyName}</td>
                  <td>{orderPackage.transportName}</td>
                  <td>{numOpenItems}</td>
                  <td>{totalItems}</td>
                  <td>
                    <button type="button"
                      value={index} onClick={this.onClick_selectOrder}
                      className="btn btn-sm btn-outline-primary"
                    >Select</button>
                  </td>
                </tr>)
            }))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Pickup Items</h2>
        <div id="pickup-items-container">
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">SKU</th>
                <th scope="col">Description</th>
                <th scope="col">Quantity</th>
                <th scope="col">Location</th>
              </tr>
            </thead>
            {this.createPickupItemsTbody()}
          </table>
        </div>
      </div>

      <div>
        <form onSubmit={this.onSubmit_order} id={this.orderFormId}>
          <div className="form-group">
            <label htmlFor={this.skuInputId}>SKU</label>
            <input type="text" name="itemSku" className="form-control" 
            id={this.skuInputId} disabled={disabledInput} required></input>
          </div>
          <div className="form-group">
            <label htmlFor={this.locationInputId}>Location</label>
            <input type="text" name="locationCode" className="form-control" 
            id={this.locationInputId} disabled={disabledInput} required></input>
          </div>
          <div className="form-group">
            <label htmlFor={this.quantityInputId}>Quantity</label>
            <input type="number" name="quantity" className="form-control"
              min="1" id={this.quantityInputId} disabled={disabledInput} required></input>
          </div>

          <button type="submit">Submit</button>
          <button type="button" onClick={this.itemFormReset}>Clear</button>
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