export { ItemOrdersTable }

class ItemOrdersTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: this.props.order,
    }
  }

  render() {
    const order = this.state.order;
    return (
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">SKU</th>
            <th scope="col">Unpicked</th>
            <th scope="col">Picked</th>
            <th scope="col">Completed</th>
            <th scope="col">Complete</th>
          </tr>
        </thead>
        <tbody>
          {order.itemOrderResponses.map(item => {
            return (
            <tr key={item.id}>
              <td>
                {item.itemInventoryResponse.itemName}
              </td>
              <td>
                {item.itemInventoryResponse.itemSku}
              </td>
              <td>
                {item.orderedQuantity}
              </td>
              <td>
                {item.pickedQuantity}
              </td>
              <td>
                {item.completeQuantity}
              </td>
              <td>
                {item.complete == 1 ? "Yes" : "No"}
              </td>
            </tr>);
          })}
        </tbody>
      </table>
    );
  }
}