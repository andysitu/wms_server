class OrderShipmentApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.loadShipments();
    this.loadOrders();
  }

  loadShipments = () => {
    $.ajax({
      url: "/shipments",
      type: "GET",
      context: this,
      success: function(shipments) {
        console.log(shipments);
      }
    })
  }

  loadOrders = () => {
    $.ajax({
      url: "/orderpackages",
      type: "GET",
      context: this,
      success: function(orders) {
        console.log(orders);
        // for(let i=0; i< orders.length; i++) {
        //   orders[i].itemsList = this.convertOrderItems(orders[i]);
        // }
        // this.setState({
        //   openOrders: orders,
        //   selectedOrderIndex: -1,
        // });
      }
    })
  };

  render() {
    return (<div>
      Orders
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((<OrderShipmentApp />), document.getElementById("content-container"));
}

loadReact();