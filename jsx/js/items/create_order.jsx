import { InventoryTableOrder } from "./InventoryTableOrder.js"
import { ModalMenu } from "../etc/modalmenu/ModalMenu.js"

class CreateOrderApp extends React.Component {
  constructor(props) {
    super(props);
    this.modalmenu = React.createRef();
  }

  createItemOrder = (itemReceivedList) => {
    var items = itemReceivedList.map( item => item.id );
    if (items.length == 0) {
      window.alert("You must select at least 1 item.");
      return;
    }
    
    this.modalmenu.current.show_menu(
      "createItemorder",
      {},
      (data) => {
        console.log(data);
        data.itemIds = items;
        $.ajax({
          url: "/orderpackage",
          type: "POST",
          context: this,
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function(data) {
            console.log(data);
          },
        });
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