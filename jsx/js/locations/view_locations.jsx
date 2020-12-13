class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.modalMenu = React.createRef();
  }

  show_menu = () => {
    this.modalMenu.current.show_menu("blank");
  }

  render () {
    return (<div>
      <button className="btn btn-primary"
        onClick={this.show_menu}
      >Create</button>

      <ModalMenu ref={this.modalMenu}/>
    </div>);
  }
}

class ModalMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu_type: "none",
    };
  }
  show_menu = (menu_type) => {
    this.setState({menu_type: "none"});
    this.setState({menu_type: menu_type});
    $("#modalMenu").modal("show");
  };
  create_menu = () => {
    if (this.state.menu_type == "none") {
      return (<div></div>);
    } else if (this.state.menu_type == "blank") {
      return (<div>Blank</div>)
    }
  };
  render() {
    return (<div className="modal" tabIndex="-1" role="dialog" id="modalMenu">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Title</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {this.create_menu()}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">Submit</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>);
  }
}

function loadReact() {
  ReactDOM.render((
    <div>
      <LocationTable />
      
    </div>
  ), document.getElementById("content-container"));
}

loadReact();