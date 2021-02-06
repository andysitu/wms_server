import { InventoryTableView } from "./InventoryTableView.js";

class InventoryApp extends React.Component {
  
  render() {
    return (<InventoryTableView type={"view_items"}/>);
  }
}

function loadReact() {
  ReactDOM.render((<InventoryApp />), document.getElementById("content-container"));
}

loadReact();