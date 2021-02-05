import { InventoryTable } from "./InventoryTable.js"

class ShipApp extends React.Component {
  render() {
    return (<div>
      <InventoryTable type={"ship_items"}/>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((<ShipApp />), document.getElementById("content-container"));
}

loadReact();