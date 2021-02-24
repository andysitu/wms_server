import { CreateLocationMenu } from "./CreateLocationMenu.js"
import { ItemInfoMenu } from "./ItemInfoMenu.js"
import { OrderMenu } from "./OrderMenu.js"
import { WarehouseMenu } from "./WarehouseMenu.js"

export {
  ModalMenu,
}

class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_type: "none",
      submit_handler: null,
      data: {},
      title: null,
    };
  }

  get_title = (menu_type) => {
    var strings = menu_type.split("_");

    for (let i=0; i<strings.length; i++) {
      strings[i] = strings[i][0].toUpperCase() + strings[i].slice(1)
    }
    return strings.join(" ");
  }
  
  /**
   * Main function to show the modal menu.
   * @param {String} menu_type 
   * @param {Object} data Object of specific data to pass onto the menu
   * @param {*} submit_handler Submit handler given menu data in 1st arg
   */
  show_menu = (menu_type, data, submit_handler=null) => {
    // Create a blank form to reset it, and then create actual menu
    this.setState({
        menu_type: menu_type,
        submit_handler: submit_handler,
        data: data,
        title: this.get_title(menu_type),
      }, () => {
      if (menu_type == "create_barcode") {
        // Set the barcode after img element is set
        for (let i=0; i < this.state.data.barcode_strings.length; i++) {
          JsBarcode("#barcode_" + i, data.barcode_strings[i], {
            width: 1.5,
            fontSize: 20,
            fontOptions: "bold"
          });
        }
      }
      $("#modalMenu").modal("show");
    });
  };

  /**
   * Set menu type to none which creates a blank modal menu for subsequent runs
   */
  componentDidMount() {
    $("#modalMenu").on("hidden.bs.modal", () => {
      this.setState({menu_type: "none", data: {}});
    });
  }
  /**
   * Print all the barcodes shown in the menu in new window
   */
  onClick_print_barcode = () => {
    var new_window = window.open('', 'Print Barcode', "_blank");
    new_window.document.write('<html><head><title>Print</title></head><body>');
    new_window.document.write(document.getElementById("barcode-container").innerHTML);
    new_window.document.write("</body></html>");
    new_window.print();
    new_window.close();
    // new_window.onload = function() {window.print();}
  }
  /**
   * Save multiple barcodes into png file
   */
  onClick_save_barcode = () => {
    let imgs = document.getElementsByClassName("barcode-img");
    var link, index;
    for (let i=0; i<imgs.length; i++) {
      index = imgs[i].getAttribute("index");
      link = document.createElement("a");
      link.setAttribute("href", imgs[i].src);
      link.setAttribute("download", this.state.data.barcode_strings[index].replaceAll(".", "-") + ".png");
      link.click();
    }
  }

  /**
   * Creates the menu element that is run by render(). The menu type is 
   * defined by state.menu_type.
   */
  create_menu = () => {
    if (this.state.menu_type == "none") {
      return (<div></div>);
    } else if (this.state.menu_type == "create_location") {
      return (<CreateLocationMenu 
                warehouse_name={this.state.data.warehouse_name}
                warehouse_code={this.state.data.warehouse_code} />);
    } else if (this.state.menu_type == "create_item_info"
        || this.state.menu_type == "edit_item_info") {
      return (
        <ItemInfoMenu 
          menu_type={this.state.menu_type}
          data={this.state.data}
        />);
    } else if (this.state.menu_type == "create_barcode") {
      return (<div>
        <div>
          <button type="button" className="btn btn-outline-primary"
            onClick={this.onClick_print_barcode}>Print</button>
          <button type="button" className="btn btn-outline-secondary"
            onClick={this.onClick_save_barcode}>Save</button>
        </div>

        <div id="barcode-container">
          {this.state.data.barcode_strings.map(
            (location_string, index) => {
              return (
                <div key={"barcode_div_" + index}>
                  <img key={"barcode_img_" + index} className="barcode-img"
                    id={"barcode_"+index} index={index} />
                </div>);
            })
          }
        </div>
      </div>);
    } else if (this.state.menu_type == "create_warehouse" ||
        this.state.menu_type == "edit_warehouse") {
      return (<WarehouseMenu menu_type={this.state.menu_type} data={this.state.data}/>)
    } else if (this.state.menu_type == "createItemorder") {
      return (<OrderMenu />);
    } else {
      return ;
    }
  };

  /**
   * Gets the form/ modal menu data and then returns in as an object.
   */
  get_data = () => {
    var data = {};
    if (this.state.additional_data) {
      for (var k in this.state.additional_data) {
        data[k] = this.state.additional_data[k];
      }
    }
    var formData = new FormData($("#modalmenu-form")[0]);

    if (this.state.type=="create_workitem") {
      formData.set("handleit", formData.get("handleit") == "on" ? true:false); 
    }

    for (var key of formData.keys()) {
      data[key] = formData.get(key);
    }
    return data;
  };
  /**
   * Checks if data is valid & returns a promise with callback(result)
   * with result being boolean.
   * @param {Object} data Data object to be checked
   */
  complete_and_check_data = (data) => {
    return new Promise((resolve, reject) => {
      let result;
      if (this.state.menu_type == "create_location") {
        // Complete the end values if they're blank
        data.bay_end = data.bay_end ? data.bay_end : data.bay_start;
        data.level_end = data.level_end ? data.level_end : data.level_start;
        data.row_end = data.row_end ? data.row_end : data.row_start;
        data.shelf_end = data.shelf_end ? data.shelf_end : data.shelf_start;
  
        // Check that the end values are greater than then start values
        result = !(parseInt(data.bay_start) > parseInt(data.bay_end) || 
            parseInt(data.level_start) > parseInt(data.level_end) ||
            parseInt(data.row_start) > parseInt(data.row_end) || 
            parseInt(data.shelf_start) > parseInt(data.shelf_end));
        resolve(result ? 
          "Please check the end values are greater than the start":
          true);
      } else if (this.state.menu_type == "create_item_info") {
        // Check that the SKU doesn't exist
        $.ajax({
          url: "itemsku/check_sku/" + data.itemSku,
          type: "GET",
        }).then((exists  => {
          resolve(exists ? "Item SKU already exists.": true);
        }));
      } else {
        resolve(true);
      }
    });    
  };

  onSubmit = (e) => {
    e.preventDefault();
    var data = this.get_data();

    this.complete_and_check_data(data).then((result) => {
      if (result === true) {
        if (this.state.submit_handler) {
          this.state.submit_handler(data);  
        }
        $("#modalMenu").modal("hide");
      } else if (typeof result == "string") {
        window.alert(result);
      } else {
        window.alert("Error found in the data");
      }
    });
  };
  
  render() {
    var footer;
    if (this.state.submit_handler) {
      footer = (
        <div className="modal-footer">
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      );
    } else {
      footer = (
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            Close
          </button>
        </div>
      );
    }
    return (<div className="modal" tabIndex="-1" role="dialog" id="modalMenu">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{this.state.title}</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <form onSubmit={this.onSubmit} id="modalmenu-form">
            <div className="modal-body">
              {this.create_menu()}
            </div>
            
            {footer}
          </form>
        </div>
      </div>
    </div>);
  }
}