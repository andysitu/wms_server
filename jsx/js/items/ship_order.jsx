class ShipOrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openOrders: [],
      selectedOrderIndex: -1,
    };
    this.loadOpenOrders();
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
      } else {
        itemIndexMap[itemSku] = itemsList.length;
        itemsList.push({
          itemName: itemResponse.itemInventoryResponse.itemName,
          itemSku: itemResponse.itemInventoryResponse.itemSku,
          orderedQuantity: itemResponse.orderedQuantity,
          startQuantity: itemResponse.startQuantity,
          completeQuantity: itemResponse.completeQuantity,
          description: itemResponse.itemInventoryResponse.itemDescription,
        });
      }
    });
    return itemsList;
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

  render() {
    let numOpenItems, totalItems, i, trClass;
    return (
    <div>
      Ship Order
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
            // numOpenItems = 0;
            // totalItems = 0;
            // for (i=0; i<orderPackage.itemsList.length; i++) {
            //   numOpenItems += orderPackage.itemsList[i].orderedQuantity;
              
            //   totalItems += orderPackage.itemsList[i].startQuantity;
            // }
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
    );
  }
}

(function() {
  ReactDOM.render((<ShipOrderApp />), document.getElementById("content-container"));
})();