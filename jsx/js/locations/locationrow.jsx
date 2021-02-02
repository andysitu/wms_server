export {
  LocationRow,
}

class LocationRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: this.props.location,
    }
  }

  onClick_delete_btn = () => {
    var result = window.confirm(
      `Are you sure you want to delete ${this.state.location.locationCode}?`);
    if (result) {
      this.props.delete_location(this.state.location.id);
    }
  };

  onClick_checkbox = (e) => {
    this.props.onClick_row_checkbox(e);
  }
  onChange_checkbox = (e) => {
    var $tr = $(e.target).closest("tr");
    if (e.target.checked) {
      $tr.addClass("checked-row");
    } else {
      $tr.removeClass("checked-row");
    }
  }

  onClick_show_barcodes = () => {
    this.props.show_barcodes([this.state.location.locationCode,]);
  };
  
  render() {
    return (
    <tr key={this.state.location.id}>
      <td><input type="checkbox" className="row-checkbox" row_index={this.props.index}
            id={"row-checkbox-"+this.props.index} 
            onClick={this.onClick_checkbox}
            onChange={this.onChange_checkbox}
            ></input></td>
      <td>{this.state.location.area}</td>
      <td>{this.state.location.row}</td>
      <td>{this.state.location.bay}</td>
      <td>{this.state.location.level}</td>
      <td>{this.state.location.shelf}</td>
      <td>{this.state.location.locationCode}</td>
      <td>
        <button type="button" className="btn btn-sm btn-outline-dark" 
            onClick={this.onClick_show_barcodes} title="Show barcodes window">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-upc" viewBox="0 0 16 16">
            <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
          </svg>
        </button>
        <button type="button" className="btn btn-sm btn-outline-warning"
            title="Edit Location">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg>
        </button>
        <button type="button" className="btn btn-sm btn-outline-danger"
            onClick={this.onClick_delete_btn} title="Delete location">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
      </td>
    </tr>);
  }
}