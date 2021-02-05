import { InventoryTable } from "./InventoryTable.js";

class InventoryApp extends React.Component {
  
  render() {
    return (<InventoryTable />);
  }
}

function loadReact() {
  ReactDOM.render((<InventoryApp />), document.getElementById("content-container"));
}

loadReact();