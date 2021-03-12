export { ShipmentsTable }

class ShipmentsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shipments: props.shipments,
    }
  }

  onClick_viewShipment = (e) => {
    const shipmentId = e.target.value;
    this.props.selectShipment(shipmentId);
  };

  render() {
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Transport</th>
            <th scope="col">Tracking</th>
            <th scope="col">Select</th>
          </tr>
        </thead>
        <tbody>
          {this.state.shipments.map(shipment => {
            return (
            <tr key={shipment.id}>
              <td>
                {shipment.city}
              </td>
              <td>
                {shipment.state}
              </td>
              <td>
                {shipment.transportName}
              </td>
              <td>
                {shipment.tracking}
              </td>
              <td>
                <button onClick={this.onClick_viewShipment} value={shipment.id}>
                  {shipment.id}
                </button>
              </td>
            </tr>)
          })}
        </tbody>
      </table>
    );
  }
}