class LocationTable extends React.Component {
  constructor(props) {
    super(props);
    this.modalMenu = React.createRef();
  }

  show_menu = () => {
    this.modalMenu.current.show_menu("create_location");
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

function loadReact() {
  ReactDOM.render((
    <div>
      <LocationTable />
      
    </div>
  ), document.getElementById("content-container"));
}

loadReact();