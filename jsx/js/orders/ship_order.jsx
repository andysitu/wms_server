// import { ModalMenu } from "../etc/modalmenu/ModalMenu.js"
import { OrderMenu } from "../etc/modalmenu/OrderMenu.js"
import { ShipmentItemMenu } from "../etc/menu/ShipmentItemMenu.js"

class ShipOrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "orders", // "orders, items shipment"
      openOrders: [],
      shipmentItems: [],
      clearQuantity: false,
      selectedOrderIndex: -1,
    };
    this.loadOpenOrders();

    this.itemCheckFormId = "item-check-form";
    this.orderInfoFormId = "order-info-form"
    this.skuInputId = "itemsku-input";
    this.quantityInputId = "quantity-input";

    // mode - orders
    this.orderItemsId = "items-order-container";
    this.ordersContainerId = "orders-container";
    // mode - shipments
    this.shipmentItemsId = "shipment-items-container"
    this.orderMenuId = "order-menu-container";

    this.modalmenu = React.createRef();
    this.shipmentItemMenu = React.createRef();
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
          id: itemResponse.id,
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

  itemFormReset = () => {
    $("#" + this.itemCheckFormId)[0].reset();
    $("#" + this.skuInputId)[0].focus();
  };

  selectItem = (e) => {
    e.preventDefault();
    const sku = e.target.textContent;
    this.itemFormReset();
    $("#" + this.skuInputId).val(sku);
    $("#" + this.quantityInputId)[0].focus();
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
    this.setState({
      selectedOrderIndex: -1,
    }, 
      ()=> {this.setState(state =>{
        const selectedIndex = parseInt(e.target.value);
        let newOpenOrders = [...state.openOrders];
        newOpenOrders[selectedIndex] = {...state.openOrders[selectedIndex]};
        newOpenOrders[selectedIndex].itemsList = [...state.openOrders[selectedIndex].itemsList];
        const itemsList = newOpenOrders[selectedIndex].itemsList;
        for (let i=0; i<itemsList.length; i++) {
          itemsList[i].shippingQuantity = 0;
        }
        console.log(newOpenOrders[selectedIndex])
        return {
          mode: "items",
          selectedOrderIndex: parseInt(selectedIndex),
          openOrders: newOpenOrders,
        };
      }, 
      ()=> {
        $("#" + this.skuInputId)[0].focus();
      })
    });
    
  };
  setOrdersMode = () => {
    this.setState({
      mode: "orders",
      selectedOrderIndex: -1,
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

  onSubmit_itemCheck = (e) => {
    e.preventDefault();
    const itemData = this.getData(this.itemCheckFormId);
    let itemsList = this.state.openOrders[this.state.selectedOrderIndex].itemsList,
        index = -1;
    for (let i=0; i<itemsList.length; i++) {
      if (itemsList[i].itemSku == itemData.itemSku) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      window.alert("An incorrect item SKU was entered.");
      $("#" + this.skuInputId).select();
      return;
    }
    if (itemsList[index].pickedQuantity < itemData.quantity) {
      window.alert("The quantity is too large.");
      $("#" + this.quantityInputId).select();
      return;
    }
    this.setState(state => {
      const selectedIndex = state.selectedOrderIndex;
      let newOpenOrders = [...state.openOrders];
      newOpenOrders[selectedIndex] = {...state.openOrders[selectedIndex]};
      newOpenOrders[selectedIndex].itemsList = [...state.openOrders[selectedIndex].itemsList];

      newOpenOrders[selectedIndex].itemsList[index].shippingQuantity = parseInt(itemData.quantity);
      
      this.itemFormReset();
      return {
        openOrders: newOpenOrders,
      };
    });
  };

  createShipment = () => {
    if (this.state.selectedOrderIndex < 0) {
      return;
    }

    const result = window.confirm("Are you sure you want to create a shipment?");
    if (!result) 
      return;
    let data = this.state.openOrders[this.state.selectedOrderIndex];
    let items = [], item;
    for (let i=0; i<data.itemsList.length; i++) {
      item = data.itemsList[i];
      if (item.shippingQuantity > 0) {
        items.push(item);
      }
    }
    console.log("Ship Data", data);
    console.log("Shipped Items", items);

    this.setState({
      mode: "shipments",
      shipmentItems: items,
    }, ()=>{
      this.setShipmentContainerHeights();
    });
  };

  createOpenOrdersMenu = () => {
    let numOpenItems, totalItems, numPickedItems,
        i, trClass;
    return (
    <div id={this.ordersContainerId}>
      <h2>Open Orders</h2>
      <div id="open-orders-container">
        <table className="table table-sm">
          <thead>
            <tr>
              <th scope="col">Order Name</th>
              <th scope="col">Company Name</th>
              <th scope="col">Transport</th>
              <th scope="col">Unpicked Items</th>
              <th scope="col">Picked Items</th>
              <th scope="col">Total Items</th>
              <th scope="col">Select</th>
            </tr>
          </thead>
          <tbody>
            {this.state.openOrders.map(((orderPackage, index) => {
              numOpenItems = 0;
              totalItems = 0;
              numPickedItems = 0;
              orderPackage.itemsList.forEach(item => {
                numOpenItems += item.orderedQuantity;
                totalItems += item.startQuantity;
                numPickedItems += item.pickedQuantity;
              });
              trClass = (index == this.state.selectedOrderIndex) ?
                "selected" : "";
              return (
                <tr key={orderPackage.id} className={trClass}>
                  <td>{orderPackage.orderName}</td>
                  <td>{orderPackage.companyName}</td>
                  <td>{orderPackage.transportName}</td>
                  <td>{numOpenItems}</td>
                  <td>{numPickedItems}</td>
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
    </div>
    );
  };

  createPickupItemsTable = () => {
    let itemsList;
    if (this.state.selectedOrderIndex == -1) {
      itemsList = [];
    } else {
      const items = this.state.openOrders[this.state.selectedOrderIndex].itemsList;
      itemsList = items.map((itemOrder, index) => {
        const orderedQuantityClass = (itemOrder.orderedQuantity > 0) ?
          "warn-order" : "done-order";
        const pickedRemaining = itemOrder.pickedQuantity - itemOrder.shippingQuantity > 0;
        return (
          // IDs don't exist since the items are combined by location & sku
          <tr key={"pickup-items-" + index}>
            <td>{itemOrder.itemName}</td>
            <td>
              {pickedRemaining ?
              (<a href="" onClick={this.selectItem}>{itemOrder.itemSku}</a>) : 
              itemOrder.itemSku
              }
              </td>
            <td className={orderedQuantityClass}>
              {itemOrder.orderedQuantity}
            </td>
            <td className={pickedRemaining ? "warn-order" : "done-order"}>
              {itemOrder.pickedQuantity}
            </td>
            <td>{itemOrder.shippingQuantity}</td>
            <td>{itemOrder.completeQuantity}</td>
            <td>{itemOrder.startQuantity}</td>
            <td>{itemOrder.description}</td>
          </tr>
        );
      })
    }
    return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">SKU</th>
          <th scope="col">Unpicked</th>
          <th scope="col">Picked</th>
          <th scope="col">Shipping</th>
          <th scope="col">Completed</th>
          <th scope="col">Total Quantity</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        { itemsList }
      </tbody>
    </table>)
  };

  createAddItemsMenu = () => {
    const disabledInput = this.state.selectedOrderIndex ==  -1;
    return (
    <div id={this.orderItemsId}>
      <div>
        <h2>
          Items in Order
          <button className="btn btn-outline-primary"
            id="ship-order-btn" onClick={this.createShipment}
            type="button">Create Shipment
          </button>
          <button className="btn btn-outline-secondary"
            onClick={this.setOrdersMode}>
            Go Back
          </button>
        </h2>
        <div id="pickup-items-container">
          {this.createPickupItemsTable()}
        </div>
      </div>
      <div>
        <form onSubmit={this.onSubmit_itemCheck} id={this.itemCheckFormId}>
          <div className="form-group">
            <label htmlFor={this.skuInputId}>SKU</label>
            <input type="text" name="itemSku" className="form-control" 
            id={this.skuInputId} disabled={disabledInput} required></input>
          </div>
          <div className="form-group">
            <label htmlFor={this.quantityInputId}>Quantity</label>
            <input type="number" name="quantity" className="form-control" 
            id={this.quantityInputId} disabled={disabledInput} required></input>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" 
              onChange={this.onChangeClearQuantity} checked={this.state.clearQuantity}
              id="clear-quantity-checkbox" disabled={disabledInput}></input>
            <label className="form-check-label" htmlFor="clear-quantity-checkbox">
              Clear Quantity
            </label>
          </div>
          <button className="btn btn-outline-primary" type="submit">Submit</button>
          <button className="btn btn-outline-secondary" type="button" onClick={this.itemFormReset}>Clear</button>
        </form>
      </div>
    </div>  
    );
  };

  setShipmentContainerHeights = () => {
    const navbarHeight = $("#top-navbar-menu")[0].clientHeight;
    const h = window.innerHeight - navbarHeight;
    if (this.state.mode == "shipments") {
      $("#" + this.shipmentItemsId).height(h);
      $("#" + this.orderMenuId).height(h);
    } else {
      // $("#" + this.orderItemsId).height(parseInt(h/2));
      // $("#" + this.ordersContainerId).height(parseInt(h/2));
    }
  };

  onClick_cancelShipment = () => {
    this.setState({
      mode: "orders",
    }, ()=>{
      this.setShipmentContainerHeights();
    });
  };

  getPickedItems = () => {
    const itemsList = this.state.openOrders[this.state.selectedOrderIndex].itemsList;
    const items = [];
    for (let i=0; i<itemsList.length; i++) {
      if (itemsList[i].shippingQuantity > 0) {
        items.push(itemsList[i])
      }
    }
    return items;
  };

  onSubmit_shipOrder = (e) =>  {
    e.preventDefault();
    if (this.state.selectedOrderIndex >= 0) {
      const order = this.state.openOrders[this.state.selectedOrderIndex];
      const shipmentInfo = this.shipmentItemMenu.current.getItemsData();
      const data = {
        orderPackageId: order.id,
        items: this.getPickedItems(),
        shipmentType: shipmentInfo.shipmentType,
        units: shipmentInfo.items,
        ...this.getData(this.orderInfoFormId)
      };
      console.log(data);
      $.ajax({
        url: "/shipments",
        type: "POST",
        context: this,
        contentType: "application/json;",
        data: JSON.stringify(data),
        success: function(response) {
          console.log(response);
        }
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          {this.createOpenOrdersMenu()}
        </div>
        <div>
          {this.createAddItemsMenu()}
        </div>
        <div className="row">
          <div className="col-lg-6" id={this.shipmentItemsId}>
            <button typee="button" className="btn btn-outline-secondary"
              onClick={this.onClick_cancelShipment}>Cancel</button>
            <button typee="button"className="btn btn-outline-primary">
              Submit Shipment</button>
            <ShipmentItemMenu ref={this.shipmentItemMenu} 
              shipmentItems={this.state.shipmentItems}/>
          </div>
          {this.state.selectedOrderIndex >= 0 ?
            (<div className="col-lg-6" id={this.orderMenuId}>
              <form onSubmit={this.onSubmit_shipOrder} id={this.orderInfoFormId}>
                <OrderMenu menu_type={"shipOrder"} data={this.state.openOrders[this.state.selectedOrderIndex]}/>
                <button type="submit">Submit</button>
              </form>
            </div>
              ) : null}
        </div>
      </div>);

    
    if (this.state.mode == "shipments") {
      return (
        <div className="row">
          <div className="col-lg-6" id={this.shipmentItemsId}>
            <button typee="button" className="btn btn-outline-secondary"
              onClick={this.onClick_cancelShipment}>Cancel</button>
            <button typee="button"className="btn btn-outline-primary">
              Submit Shipment</button>
            <ShipmentItemMenu shipmentItems={this.state.shipmentItems}/>
          </div>
          <div className="col-lg-6" id={this.orderMenuId}>
            <OrderMenu menu_type={"shipOrder"} data={this.state.openOrders[this.state.selectedOrderIndex]}/>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="mm-cost-input">Transport Cost</label>
                <input type="number" name="transportCost" id="mm-cost-input"
                  step="0.01" min="0" className="form-control" />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="mm-pickup-date">Pickup Date</label>
                <input type="date" name="pickupDate" id="mm-pickup-date"
                className="form-control" required />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="mm-arrival-date">Arrival Date</label>
                <input type="date" name="arrivalDate" id="mm-arrival-date"
                className="form-control" />
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.mode == "items") {
      return (
        <div>
          {this.createAddItemsMenu()}
        </div>
      );
    } else {
      return (
        <div>
          {this.createOpenOrdersMenu()}
        </div>
        );
    }
  }
}

(function() {
  ReactDOM.render((<ShipOrderApp />), document.getElementById("content-container"));
})();