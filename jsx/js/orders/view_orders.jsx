class OrderShipmentApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      // By OrderPackageId
      shipmentMap: {},
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
        for(let i=0; i< orders.length; i++) {
          orders[i].itemsList = this.convertOrderItems(orders[i]);
        }
        this.setState({
          orders: orders,
          selectedOrderIndex: -1,
        });
      }
    })
  };

  onClick_selectOrder = () => {

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
              <th scope="col">Select</th>
              <th scope="col">Shipments</th>
            </tr>
          </thead>
          <tbody>
            {this.state.orders.map(((orderPackage, index) => {
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
                  <td>{orderPackage.complete == 1 ? "Yes" : "No"}</td>
                  <td>
                    <button type="button"
                      value={index} onClick={this.onClick_selectOrder}
                      className="btn btn-sm btn-outline-primary"
                    >Select</button>
                  </td>
                  <td>
                    {(orderPackage.id in this.state.shipmentMap) ?
                      (this.state.shipmentMap[orderPackage.id].length) : 0
                    }
                  </td>
                </tr>)
            }))}
          </tbody>
        </table>
      </div>
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