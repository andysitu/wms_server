class InventoryApp extends React.Component {
  constructor(props) {
    super(props);
    this.loadItemInventory();
  }

  loadItemInventory = () => {
    $.ajax({
      url: "./iteminventory",
      type: "GET",
      context: this,
      success: function(data) {
        console.log(data);
      }
    });
  };

  render() {
    return (<div>HI</div>);
  }
}

function loadReact() {
  ReactDOM.render((<InventoryApp />), document.getElementById("content-container"));
}

loadReact();