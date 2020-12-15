class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_type: "none",
      submit_handler: null,
    };
  }
  
  show_menu = (menu_type, data, submit_handler=null) => {
    // Create a blank form to reset it, and then create actual menu
    this.setState({
        menu_type: menu_type,
        submit_handler: submit_handler,
      }, () => {
      if (menu_type == "create_barcode") {
        JsBarcode("#barcode", data.location);
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
      data.column_end = data.column_end ? data.column_end : data.column_start;
      data.level_end = data.level_end ? data.level_end : data.level_start;
      data.row_end = data.row_end ? data.row_end : data.row_start;
      data.shelf_end = data.shelf_end ? data.shelf_end : data.row_start;

      // Check that the end values are greater than then start values
      return (parseInt(data.column_start) > parseInt(data.column_end) || 
          parseInt(data.level_start) > parseInt(data.level_end) ||
          parseInt(data.row_start) > parseInt(data.row_end) || 
          parseInt(data.shelf_start) > parseInt(data.shelf_end)) 
        ? false : true
    } else {
      return true;
    }
  };

  create_menu = () => {
    if (this.state.menu_type == "none") {
      return (<div></div>);
    } else if (this.state.menu_type == "create_location") {
      return (
      <div>
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
            <label>Start Column</label>
            <input type="number" className="form-control" min="0" name="column_start" required></input>
          </div>
          <div className="form-group col-sm-6">
            <label>Start Column</label>
            <input type="number" className="form-control" min="0" name="column_end"></input>
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
    } else if (this.state.menu_type == "create_barcode") {
      return (<div>
        <img id="barcode"></img>
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
            <h5 className="modal-title">Title</h5>
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