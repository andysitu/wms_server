import { TableSearchBar } from '../etc/TableSearchBar.js'
import { ModalMenu } from "../etc/modalmenu/ModalMenu.js"
import { ItemInfoRow } from "../components/items/ItemInfoRow.js"

class ItemInfoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemInfos: [],
    }
    this.modalMenu = React.createRef();
  }

  add_ref(element) {
    element.ref=React.createRef()
  }

  onClick_search = (search_type, search_value) => {
    var that = this;
    $.ajax({
      url: "./item_info?type=" + search_type + "&value=" + search_value,
      type: "GET",
      success: function(data) {
        console.log(data);
        data.forEach((element) => {
          that.add_ref(element);
        });
        that.setState({itemInfos: data});
      }
    });
  };

  show_itemInfo_barcode = (barcodes) => {
    this.modalMenu.current.show_menu(
      "create_barcode", {barcode_strings: barcodes,});
  }

  update_itemInfoRow = (index) => {
    this.state.itemInfos[index].ref.current.update_data(this.state.itemInfos[index]);
  };

  editItemInfo = (row_index) => {
    var that = this;
    this.modalMenu.current.show_menu(
      "edit_item_info",
      this.state.itemInfos[row_index],
      (data) => {
        $.ajax({
          url: "../item_info/" + this.state.itemInfos[row_index].id,
          type: "PATCH",
          data: data,
          success: function(new_data) {
            that.setState(prevState => {
              let new_itemInfos = prevState.itemInfos;
              Object.assign(new_itemInfos[row_index], new_data);
            }, ()=>{that.update_itemInfoRow(row_index)});
          },
        });
      }
    )
  };

  create_itemInfo = (data) => {
    console.log(data);
    return;
    var that = this;
    $.ajax({
      url: "../item_info",
      type: "POST",
      data: data,
      success: function(item_data) {
        that.add_ref(item_data);
        that.setState({
          itemInfos: [...that.state.itemInfos, item_data],
        })
      },
      error: function(xhr, textStatus, error) {
        if (xhr.status == 409) {
          window.alert("Item Name already in use");
        } else {
          window.alert(textStatus + " " + error);
        }
      }
    });
  };

  onClick_createItemInfo = () => {
    this.modalMenu.current.show_menu(
      "create_item_info", {}, this.create_itemInfo);
  };

  deleteItemInfo = (row_index, itemInfo_id) => {
    var that = this;
    $.ajax({
      url: "../item_info/" + itemInfo_id,
      type: "DELETE",
      success: function(return_data) {
        that.state.itemInfos.splice(row_index, 1)
        that.setState({
          itemInfos: that.state.itemInfos,
        });
      },
    });
  }

  get_search_types = () => {
    return [
      {}
    ]
  }

  render() {
    var rows = [];
    if (this.state.itemInfos.length > 0) {
      rows = this.state.itemInfos.map((itemInfo, index) => {
        return (<ItemInfoRow key={"itemInifo-" + itemInfo.id}
          ref={itemInfo.ref}
          deleteItemInfo={this.deleteItemInfo}
          editItemInfo={this.editItemInfo}
          row_index={index}
          data={itemInfo}
          itemName={itemInfo.itemName}
          editItemInfo = {this.editItemInfo}
          show_itemInfo_barcode={this.show_itemInfo_barcode}
        />);
      });   
    }
    return (<div>
      <h1>Items</h1>
      <div className="row justify-content-between">
        <div className="col-1">
          <button onClick={this.onClick_createItemInfo}>+</button>
        </div>
        <TableSearchBar onClick_search={this.onClick_search} search_type="item_info"/>
      </div>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Item Name</th>
            <th scope="col">Descriptions</th>
            <th scope="col">Weight</th>
            <th scope="col">Category</th>
            <th scope="col">[w, l, h]</th>
            <th scope="col">SKUs</th>
            <th scope="col">Options</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <ModalMenu ref={this.modalMenu} />
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((
    <ItemInfoApp />
  ), document.getElementById("content-container"));
}

loadReact();