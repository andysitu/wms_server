class OrderShipmentApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.loadShipments();
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