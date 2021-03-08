class OrderShipmentApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      // By OrderPackageId
      shipmentMap: {},
      selectedOrderIndex: -1,
    };
    this.loadShipments();
    this.loadOrders();
  }

  loadShipments = () => {
    $.ajax({
      url: "/shipments",
      type: "GET",
      context: this,
      success: function(shipments) {
        console.log("shipments", shipments)
        this.setState(state => {
          const shipMap = {};
          shipments.forEach(shipment => {
            let opid = shipment.orderPackageId;
            if (opid in shipMap) {
              shipMap[opid].push(shipment);
            } else {
              shipMap[opid] =[shipment,];
            }
          });
          return {
            shipmentMap: shipMap,
          }
        });
      }
    });
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

  loadOrders = () => {
    $.ajax({
      url: "/orderpackages",
      type: "GET",
      context: this,
      success: function(orders) {
        console.log(orders);
        this.setState({
          orders: orders,
          selectedOrderIndex: -1,
        });
      }
    })
  };

  onClick_selectOrder = (e) => {
    const index = e.target.value;
    this.setState({
      selectedOrderIndex: index,
    });
    let order = this.state.orders[index];
    console.log(order);
    console.log(this.state.shipmentMap[order.id]);
  }

  createOrdersMenu = () => {
    let numOpenItems, totalItems, numPickedItems,
        trClass;
    return (
    <div id={this.ordersContainerId}>
      <h2>Orders</h2>
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
              <th scope="col">Complete</th>
              <th scope="col">Shipments</th>
              <th scope="col">View Order</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map(((orderPackage, index) => {
              numOpenItems = 0;
              totalItems = 0;
              numPickedItems = 0;
              if (orderPackage.itemOrderResponses) {
                itemResponses = orderPackage.itemOrderResponses;
                for (let i=0; i< itemResponses.length; i++) {
                  numOpenItems += itemResponses[i].orderedQuantity;
                  totalItems += itemResponses[i].startQuantity;
                  numPickedItems += itemResponses[i].pickedQuantity;
                }
              }
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
                  <td>{orderPackage.complete == 1 ? "Yes" : "No"}</td>
                  <td>
                    {(orderPackage.id in this.state.shipmentMap) ?
                      (this.state.shipmentMap[orderPackage.id].length) : 0
                    }
                  </td>
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
      {this.state.selectedOrderIndex >= 0 ?
        (<div></div>) : null
      }
    </div>
    );
  };

  render() {
    return (<div>
      Orders
      {this.createOrdersMenu()}
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((<OrderShipmentApp />), document.getElementById("content-container"));
}

loadReact();