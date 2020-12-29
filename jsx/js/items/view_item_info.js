class ItemInfoApp extends React.Component {
  render() {
    return (<div>Hello Hello</div>);
  }
}

function loadReact() {
  ReactDOM.render((
    <div>
      <ItemInfoApp />
    </div>
  ), document.getElementById("content-container"));
}

loadReact();