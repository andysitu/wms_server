import { InventoryTableOrder } from "./InventoryTableOrder.js"
import { ModalMenu } from "../etc/modalmenu/ModalMenu.js"

class CreateOrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.modalmenu = React.createRef();
  }

  createItemOrder = (itemReceivedList) => {
    console.log(itemReceivedList);
    this.modalmenu.current.show_menu(
      "createItemorder",
      {},
      (data) => {
        console.log(data);
      }
    );
  }

  render() {
    return (<div>
      <InventoryTableOrder type={"ship_items"}
        createItemOrder={this.createItemOrder}
      />
      <ModalMenu ref={this.modalmenu}/>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((<CreateOrderApp />), document.getElementById("content-container"));
}

loadReact();