class ReceiveItemApp extends React.Component {
  render() {
    return (<div>
      <table>
        <thead>
          <tr>
            <th scole="col">Name</th>
            <th scole="col">Location</th>
            <th scole="col">Quantity</th>
            <th scole="col">Options</th>
          </tr>
        </thead>
      </table>
    </div>);
  }
}


function loadReact() {
  ReactDOM.render((
    <ReceiveItemApp />
  ), document.getElementById("content-container"));
}

loadReact();