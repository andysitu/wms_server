class PickupOrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.getOrders();
  }

  getOrders = () => {
    $.ajax({
      url: "/orderpackages",
      type: "GET",
      context: this,
      success: function(orders) {
        console.log(orders);
      }
    })
  };

  render() {
    return (
    <div>
      <h2>Open Orders</h2>
      <div>
      </div>
    </div>      
    );
  }
}

function loadReact() {
  ReactDOM.render((<PickupOrderApp />), document.getElementById("content-container"));
}

loadReact();