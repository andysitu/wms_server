export { ShipmentItemMenu }

class ShipmentItemMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      warehouses: [],
      // Warehouse option selected
      selectedWarehouseId: null,
      shipmentType: "pallets",
      // pallets reset when shipmentType is changed. Contains dimensions
      pallets: [],
    };

    this.packageFormId = "package-form";
    this.getWarehouses();
  }

  getWarehouses = () => {
    $.ajax({
      url: "/warehouses",
      type: "GET",
      context: this,
      success: function(warehouses) {
        // Check if warehouse Id settings is set under localstorage &
        // set to state.selectedWarehouseId if so. If not, set to first one
        const wId = storage_obj.getWarehouseId()
        let found = false;
        for (let i=0; i< warehouses.length; i++) {
          if (warehouses[i].id == wId) {
            found = true;
            break;
          }
        }
        // Force user to go to warehouse page if there are no warehouses
        if (warehouses.length == 0) {
          window.alert("There are no warehouses created.");
          window.location = "./view_warehouses";
        }
        this.setState({
          warehouses: warehouses,
          selectedWarehouseId: (found) ? wId : warehousees[0].id,
        });
      }
    });
  };

  getItemsData = () => {
    return {
      warehouseId: this.state.selectedWarehouseId,
      items: this.state.pallets,
      shipmentType: this.state.shipmentType,
    };
  };

  getData = (formId) => {
    var formData = new FormData($("#" + formId)[0]),
        data = {};

    for (var key of formData.keys()) {
      data[key] = formData.get(key);
    }
    return data;
  };

  onChange_shipmentType = (e) => {
    this.setState({
      shipmentType: e.target.value,
      pallets: [],
    });
  };

  onSubmit_createPackage = (e) => {
    e.preventDefault();
    this.setState(state =>{
      let newPallets = [...state.pallets];
      newPallets.push(
        this.getData(this.packageFormId)
      );
      return { pallets: newPallets };
    });
  };

  render() {
    return (
      <div>
        <div>
          <div>Items</div>
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">SKU</th>
                <th scope="col">Description</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {this.props.shipmentItems.map((item, index) => {
                return (<tr key={item.id}>
                  <td>{item.itemName}</td>
                  <td>{item.itemSku}</td>
                  <td>{item.description}</td>
                  <td>{item.shippingQuantity}</td>
                </tr>);
              })}
            </tbody>
          </table>
        </div>

        <div className="form-row">
          <div className="form-group col-md-4">
            <label htmlFor="ship-type-select">Shipment Type</label>
            <select id="ship-type-select" className="form-control"
                value={this.state.shipmentType} onChange={this.onChange_shipmentType}>
              <option value="pallets">Pallets</option>
              <option value="packages">Packages</option>
            </select>
          </div>
          <div className="form-group col-md-8">
            <label htmlFor="mm-warehouse-select">Warehouse</label>
            <select className="form-control" id="mm-warehouse-select" 
                defaultValue={this.state.selectedWarehouseId}>
              {this.state.warehouses.map(warehouse=> {
                return (<option value={warehouse.id} key={warehouse.id}>
                  {warehouse.name} - {warehouse.code} - {warehouse.city}, {warehouse.state}
                </option>)
              })}
            </select>
          </div>
        </div>
        <form id={this.packageFormId} onSubmit={this.onSubmit_createPackage}>
          <div className="form-row">
            <div className="form-group col-md-3">
              <label htmlFor="mm-ship-quantity">Quantity</label>
              <input type="number" name="quantity" id="mm-ship-quantity" 
                min="1" className="form-control" required />
            </div>
            <div className="form-group col-md-3">
              <label htmlFor="mm-ship-weight">Weight</label>
              <input type="number" name="weight" id="mm-ship-weight" 
                min="1" className="form-control" required />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="mm-ship-length">Length</label>
              <input type="number" name="length" id="mm-ship-length" 
                min="1" className="form-control" required />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="mm-ship-width">Width</label>
              <input type="number" name="width" id="mm-ship-width" 
                min="1" className="form-control" required />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="mm-ship-height">Height</label>
              <input type="number" name="height" id="mm-ship-height" 
                min="1" className="form-control" required />
            </div>
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Add {this.state.shipmentType}</button>
        </form>
  
        <div>
          Shipments
          <table className="table table-sm">
            <thead>
              <tr>
                <th scope="col">Quantity</th>
                <th scope="col">Weight</th>
                <th scope="col">L</th>
                <th scope="col">W</th>
                <th scope="col">H</th>
              </tr>
            </thead>
            <tbody>
              {this.state.pallets.map((p,index) => {
                return (
                <tr key={index}>
                  <td>{p.quantity}</td>
                  <td>{p.weight}</td>
                  <td>{p.length}</td>
                  <td>{p.width}</td>
                  <td>{p.height}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </div>
      </div>);
  }
}