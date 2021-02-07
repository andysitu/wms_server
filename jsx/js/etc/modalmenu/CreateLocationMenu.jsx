export { CreateLocationMenu }

class CreateLocationMenu extends React.Component {
  render() {
    return (<div>
      <h3>Warehouse: {this.props.warehouse_name}-{this.props.warehouse_code}</h3>
      <div className="form-group">
        <label>Area</label>
        <input type="text" className="form-control" min="0" name="area" required></input>
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