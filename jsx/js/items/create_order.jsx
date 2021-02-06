import { InventoryTableOrder } from "./InventoryTableOrder.js"

class CreateOrderApp extends React.Component {
  render() {
    return (<div>
      <InventoryTableOrder type={"ship_items"}/>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((<CreateOrderApp />), document.getElementById("content-container"));
}

loadReact();