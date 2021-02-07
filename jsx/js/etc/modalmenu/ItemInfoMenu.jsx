export { ItemInfoMenu }

/**
 * Needs in props: 
 *  menu_type, 
 *  data [itemName, description, weight, width, height, length, itemCategoryId],
 *  categories
 */
class ItemInfoMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var edit_status = this.props.menu_type == "edit_item_info";
    var item_name   = edit_status ? this.props.data.itemName : "",
        description = edit_status ? this.props.data.description : "",
        weight      = edit_status ? this.props.data.weight : "",
        width       = edit_status ? this.props.data.width : "",
        height      = edit_status ? this.props.data.height : "",
        length      = edit_status ? this.props.data.length : "",
        itemCategoryId    = this.props.data.itemCategoryId;
    return (<div>
      <div className="form-group">
        <label htmlFor="item-name-input">Item Name</label>
        <input type="text" className="form-control" 
          name="name" id="item-name-input"
          defaultValue={item_name} required
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="item-description-input">Description</label>
        <input type="text" className="form-control" 
          name="description" id="item-description-input"
          defaultValue={description} required
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="item-weight-input">Weight</label>
        <input type="number" className="form-control" 
          name="weight" id="item-weight-input"
          min="0" step="0.01" required
          defaultValue={weight} required
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="">Category</label>
        <button type="button" className=""
          onClick={this.onClick_add_itemCategory}>+</button>
        <select className="form-control" size="4" name="itemCategory"
          value={itemCategoryId} onChange={this.onChange_itemCategory}>
          <option value="">None</option>
          {this.props.categories.map((category) => {
            return (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>);
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="">Dimensions</label>
        <div className="form-row">
          <div className="col-4">
            <input type="number" name="width" className="form-control" 
              defaultValue={width} placeholder="Width" step="0.1" min="0.1"/>
          </div>
          <div className="col-4">
            <input type="number" name="length" className="form-control" 
              defaultValue={length} placeholder="Length" step="0.1" min="0.1"/>
          </div>
          <div className="col-4">
            <input type="number" name="height" className="form-control" 
              defaultValue={height} placeholder="Height" step="0.1" min="0.1"/>
          </div>
        </div>
      </div>
    </div>);
  }
}