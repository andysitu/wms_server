class ShipOrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openOrders: [],
    };
    this.loadOpenOrders();
  }

  loadOpenOrders = () => {
    $.ajax({
      url: "/orderpackages?type=open",
      type: "GET",
      context: this,
      success: function(orders) {
        console.log(orders);
        this.setState({
          openOrders: orders,
        });
      }
    })
  };

  render() {
    return (
    <div>
      Ship Order

      {this.state.openOrders.map(order=> {
        return (
        <div key={order.id}>
          {order.orderName}
        </div>);
      })}
    </div>
    );
  }
}

(function() {
  ReactDOM.render((<ShipOrderApp />), document.getElementById("content-container"));
})();