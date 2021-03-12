import { InventoryTableView } from "./InventoryTableView.js";

class InventoryApp extends React.Component {
  render() {
    return (
      <div>
        <h1>Item Inventory</h1>
        <InventoryTableView type={"view_items"}/>
      </div>
    );
  }
}

function loadReact() {
  ReactDOM.render((<InventoryApp />), document.getElementById("content-container"));
}

loadReact();