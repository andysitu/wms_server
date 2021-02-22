class ShipOrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openOrders: [],
      clearQuantity: false,
      selectedOrderIndex: -1,
    };
    this.loadOpenOrders();

    this.itemCheckFormId = "item-check-form";
  }

  convertOrderItems = (order) => {
    const itemIndexMap = {};
    const itemsList = [];
    let itemSku, index;
    order.itemOrderResponses.forEach(itemResponse => {
      itemSku = itemResponse.itemInventoryResponse.itemSku;
      if (itemSku in itemIndexMap) {
        index = itemIndexMap[itemSku];
        itemsList[index].orderedQuantity += itemResponse.orderedQuantity;
        itemsList[index].startQuantity += itemResponse.startQuantity;
        itemsList[index].completeQuantity += itemResponse.completeQuantity;
        itemsList[index].pickedQuantity += itemResponse.pickedQuantity;
      } else {
        itemIndexMap[itemSku] = itemsList.length;
        itemsList.push({
          itemName: itemResponse.itemInventoryResponse.itemName,
          itemSku: itemResponse.itemInventoryResponse.itemSku,
          orderedQuantity: itemResponse.orderedQuantity,
          startQuantity: itemResponse.startQuantity,
          pickedQuantity: itemResponse.pickedQuantity,
          completeQuantity: itemResponse.completeQuantity,
          description: itemResponse.itemInventoryResponse.itemDescription,
        });
      }
    });
    return itemsList;
  };

  createPickupItemsTbody = () => {
    if (this.state.selectedOrderIndex == -1) {
      return (<tbody></tbody>);
    } else {
      const items = this.state.openOrders[this.state.selectedOrderIndex].itemsList;
      return (<tbody>
        {items.map((itemOrder, index) => {
          const orderedQuantityClass = (itemOrder.orderedQuantity > 0) ?
            "text-danger" : "";
          return (
            // IDs don't exist since the items are combined by location & sku
            <tr key={"pickup-items-" + index}>
              <td>{itemOrder.itemName}</td>
              <td>{itemOrder.itemSku}</td>
              <td>{itemOrder.description}</td>
              <td className={orderedQuantityClass}>{itemOrder.orderedQuantity}</td>
              <td>{itemOrder.pickedQuantity}</td>
              <td>{itemOrder.completeQuantity}</td>
              <td>{itemOrder.startQuantity}</td>
            </tr>
          );
        })}
      </tbody>);
    }
  };

  loadOpenOrders = () => {
    $.ajax({
      url: "/orderpackages?type=open",
      type: "GET",
      context: this,
      success: function(orders) {
        console.log(orders);
        for(let i=0; i< orders.length; i++) {
          orders[i].itemsList = this.convertOrderItems(orders[i]);
        }
        this.setState({
          openOrders: orders,
          selectedOrderIndex: -1,
        });
      }
    })
  };

  onChangeClearQuantity = (e) => {
    this.setState(state => {
      return {
        clearQuantity: !state.clearQuantity
      };
    });
  }

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
      $("#" + this.locationInputId).focus();
    });
  };

  onSubmit_itemCheck = (e) => {
    e.preventDefault();
  }

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
            {this.state.openOrders.map(((orderPackage, index) => {
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
        <h2>Items in Order</h2>
        <div id="pickup-items-container">
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">SKU</th>
                <th scope="col">Description</th>
                <th scope="col">Unpicked Quantity</th>
                <th scope="col">Picked Quantity</th>
                <th scope="col">Completed Quantity</th>
                <th scope="col">Total Quantity</th>
              </tr>
            </thead>
            {this.createPickupItemsTbody()}
          </table>
        </div>
      </div>
      <div>
        <div className="form-check">
          <input className="form-check-input" type="checkbox" 
            onChange={this.onChangeClearQuantity} checked={this.state.clearQuantity}
            id="clear-quantity-checkbox" disabled={disabledInput}></input>
          <label className="form-check-label" htmlFor="clear-quantity-checkbox">
            Clear Quantity
          </label>
        </div>
        <form onSubmit={this.onSubmit_itemCheck} id={this.itemCheckFormId}>
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

(function() {
  ReactDOM.render((<ShipOrderApp />), document.getElementById("content-container"));
})();