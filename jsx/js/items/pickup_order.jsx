class PickupOrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      selectedOrderIndex: -1,
    }
    this.getOrders();
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
          selectedOrderIndex: -1,
        });
      }
    });
  };

  createPickupItems = () => {
    if  (this.state.selectedOrderIndex == -1) {
      return (<tbody></tbody>);
    } else {
      const order = this.state.orders[this.state.selectedOrderIndex],
            items = order.itemOrderResponses;
      return (<tbody>
        {items.map((itemOrder, index) => {
          console.log(itemOrder);
          return (
            <tr key={itemOrder.id}>
              <td>{itemOrder.itemInventoryResponse.itemName}</td>
              <td>{itemOrder.itemInventoryResponse.itemDescription}</td>
              <td>{itemOrder.itemInventoryResponse.itemSku}</td>
              <td>{itemOrder.pickedQuantity}</td>
              <td>{itemOrder.itemInventoryResponse.locationCode}</td>
            </tr>
          );
        })}
      </tbody>);
    }
  };

  onClick_selectOrder = (e) => {
    this.setState({
      selectedOrderIndex: parseInt(e.target.value),
    })
  };

  render() {
    let numOpenItems, i, trClass;
    return (
    <div>
      <h2>Open Orders</h2>
      <div>
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
        <div>
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
    </div>      
    );
  }
}

function loadReact() {
  ReactDOM.render((<PickupOrderApp />), document.getElementById("content-container"));
}

loadReact();