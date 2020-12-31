class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_type: "none",
      submit_handler: null,
      data: null,
      title: null,
    };
  }

  get_title = (menu_type) => {
    switch(menu_type) {
      case "create_location":
        return "Create Location";
      case "create_item_info":
        return "Create Item Info";
      case "create_barcode":
        return "Create Barcode";
      default:
        return "Title";
    }
  }
  
  show_menu = (menu_type, data, submit_handler=null) => {
    console.log(data);
    // Create a blank form to reset it, and then create actual menu
    this.setState({
        menu_type: menu_type,
        submit_handler: submit_handler,
        data: data,
        title: this.get_title(menu_type),
      }, () => {
      if (menu_type == "create_barcode") {
        // Set the barcode after img element is set
        for (let i=0; i < this.state.data.location_strings.length; i++) {
          JsBarcode("#barcode_" + i, data.location_strings[i]);
        }
      }
      $("#modalMenu").modal("show");
    });
  };

  componentDidMount() {
    // Blank out menu when it's hidden
    $("#modalMenu").on("hidden.bs.modal", () => {
      this.setState({menu_type: "none"});
    });
  }

  complete_and_check_data = (data) => {
    if (this.state.menu_type == "create_location") {
      // Complete the end values if they're blank
      data.bay_end = data.bay_end ? data.bay_end : data.bay_start;
      data.level_end = data.level_end ? data.level_end : data.level_start;
      data.row_end = data.row_end ? data.row_end : data.row_start;
      data.shelf_end = data.shelf_end ? data.shelf_end : data.shelf_start;

      // Check that the end values are greater than then start values
      return (parseInt(data.bay_start) > parseInt(data.bay_end) || 
          parseInt(data.level_start) > parseInt(data.level_end) ||
          parseInt(data.row_start) > parseInt(data.row_end) || 
          parseInt(data.shelf_start) > parseInt(data.shelf_end)) 
        ? false : true
    } else {
      return true;
    }
  };
  // Print all the barcodes shown in the menu in new window
  onClick_print_barcode = () => {
    var new_window = window.open('', 'Print Barcode', "_blank");
    new_window.document.write('<html><head><title>Print</title></head><body>');
    new_window.document.write(document.getElementById("barcode-container").innerHTML);
    new_window.document.write("</body></html>");
    new_window.print();
    new_window.close();
    // new_window.onload = function() {window.print();}
  }
  // Save multiple barcodes into png file
  onClick_save_barcode = () => {
    let imgs = document.getElementsByClassName("barcode-img");
    var link, index;
    for (let i=0; i<imgs.length; i++) {
      index = imgs[i].getAttribute("index");
      link = document.createElement("a");
      link.setAttribute("href", imgs[i].src);
      link.setAttribute("download", this.state.data.location_strings[index].replaceAll(".", "-") + ".png");
      link.click();
    }
  }

  create_menu = () => {
    if (this.state.menu_type == "none") {
      return (<div></div>);
    } else if (this.state.menu_type == "create_location") {
      return (<CreateLocationMenu />);
    } else if (this.state.menu_type == "create_item_info") {
      return (<div>
        <div className="form-group">
          <label htmlFor="item-name-input">Item Name</label>
          <input type="text" className="form-control" 
            name="name" id="item-name-input"
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="item-description-input">Description</label>
          <input type="text" className="form-control" 
            name="description" id="item-description-input"
            required
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="item-weight-input">Weight</label>
          <input type="number" className="form-control" 
            name="weight" id="item-weight-input"
            min="0" step="0.01" required
          ></input>
        </div>
      </div>)
    } else if (this.state.menu_type == "create_barcode") {
      return (<div>
        <div>
          <button type="button" className="btn btn-outline-primary"
            onClick={this.onClick_print_barcode}>Print</button>
          <button type="button" className="btn btn-outline-secondary"
            onClick={this.onClick_save_barcode}>Save</button>
        </div>

        <div id="barcode-container">
          {this.state.data.location_strings.map(
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
    } else {
      return ;
    }
  };

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

  onSubmit = (e) => {
    e.preventDefault();
    var data = this.get_data();

    var result = this.complete_and_check_data(data);
    console.log(result, data);
    if (result) {
      if (this.state.submit_handler) {
        this.state.submit_handler(data);  
      }
      $("#modalMenu").modal("hide");
    } else {
      window.alert("Please check that the end values are greater than the start values");
    }
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
      <div className="modal-dialog" role="document">
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

class CreateLocationMenu extends React.Component {
  render() {
    return (<div>
      <div className="form-group">
        <label>Area</label>
        <input type="text" className="form-control" min="0" name="area" required></input>
      </div>
      <div className="form-group">
        <label>Location</label>
        <input type="text" className="form-control" min="0" name="loc" required></input>
      </div>
      <div className="form-row">
        <div className="form-group col-sm-6">
          <label>Start Row</label>
          <input type="number" className="form-control" min="0" name="row_start" required></input>
        </div>
        <div className="form-group col-sm-6">
          <label>End Row</label>
          <input type="number" className="form-control" min="0" name="row_end"></input>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-sm-6">
          <label>Start Bay</label>
          <input type="number" className="form-control" min="0" name="bay_start" required></input>
        </div>
        <div className="form-group col-sm-6">
          <label>End Bay</label>
          <input type="number" className="form-control" min="0" name="bay_end"></input>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-sm-6">
          <label>Start Level</label>
          <input type="number" className="form-control" min="0" name="level_start" required></input>
        </div>
        <div className="form-group col-sm-6">
          <label>End Level</label>
          <input type="number" className="form-control" min="0" name="level_end"></input>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-sm-6">
          <label>Start Shelf</label>
          <input type="number" className="form-control" min="0" name="shelf_start" required></input>
        </div>
        <div className="form-group col-sm-6">
          <label>End Shelf</label>
          <input type="number" className="form-control" min="0" name="shelf_end"></input>
        </div>
      </div>                                                                                                                                                                                                                                                                                                                          
    </div>);
  }
}