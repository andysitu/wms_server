class ItemReceiveApp extends React.Component {
        console.log(data);
  render() {
    return (<div>
      <table>
        <thead>
          <tr>
            <th scole="col">Item Name</th>
            <th scole="col">Shipment</th>
            <th scole="col">Quantity</th>
            <th scole="col">Date</th>
            <th scole="col">Options</th>
          </tr>
        </thead>
      </table>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((
    <ItemReceiveApp />
  ), document.getElementById("content-container"));
}

loadReact();