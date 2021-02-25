export { WarehouseMenu }

class WarehouseMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const edit_status = this.props.menu_type == "edit_warehouse";
    const name        = edit_status ? this.props.data.name : "",
          description = edit_status ? this.props.data.description : "",
          address1    = edit_status ? this.props.data.address1 : "",
          address2    = edit_status ? this.props.data.address2 : "",
          city        = edit_status ? this.props.data.city : "",
          state       = edit_status ? this.props.data.state : "",
          zip         = edit_status ? this.props.data.zip : "",
          phone       = edit_status ? this.props.data.phone : "",
          code        = edit_status ? this.props.data.code : "",
          country     = edit_status ? this.props.data.country : "";
    return (
      <div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mm-name-input">Name</label>
            <input type="text" name="name" id="mm-name-input" 
              className="form-control" defaultValue={name} required />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="mm-desc-input">Description</label>
            <input type="text" name="description" id="mm-desc-input" 
              className="form-control" defaultValue={description} required />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="mm-addr1-input">Address 1</label>
          <input type="text" name="address1" id="mm-addr1-input" 
            className="form-control" defaultValue={address1} required />
        </div>
        <div className="form-group">
          <label htmlFor="mm-addr2-input">Address 2</label>
          <input type="text" name="address2" id="mm-addr2-input" 
            className="form-control" defaultValue={address2} />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="mm-city-input">City</label>
            <input type="text" className="form-control" id="mm-input-city" 
              name="city" defaultValue={city} required />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="mm-state-input">State</label>
            <input type="text" id="mm-state-input" className="form-control" 
              name="state" defaultValue={state} required />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="mm-zip-input">Zip</label>
            <input type="text" className="form-control" id="mm-zip-input"
              name="zip" defaultValue={zip} required />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="mm-country-input">Country</label>
            <input type="text" name="country" id="mm-country-input" 
              className="form-control" defaultValue={country} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="mm-phone-input">Phone</label>
            <input type="text" name="phone" id="mm-phone-input" 
              className="form-control" defaultValue={phone} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="mm-code-input">Warehouse Code</label>
            <input type="text" name="code" id="mm-code-input" 
              className="form-control" defaultValue={code} required />
          </div>
        </div>
      </div>);
  }
}