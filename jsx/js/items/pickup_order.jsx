class PickupOrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
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
        });
      }
    });
  };

  render() {
    let numOpenItems, i;
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
              return (
                <tr key={orderPackage.id}>
                  <td>{orderPackage.orderName}</td>
                  <td>{orderPackage.companyName}</td>
                  <td>{orderPackage.transportName}</td>
                  <td>{numOpenItems}</td>
                  <td>{orderPackage.itemOrderResponses.length}</td>
                </tr>)
            }))}
          </tbody>
        </table>
        
      </div>
    </div>      
    );
  }
}

function loadReact() {
  ReactDOM.render((<PickupOrderApp />), document.getElementById("content-container"));
}

loadReact();