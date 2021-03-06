# wms_server
 
Set $env GOOGLE_APPLICATION_CREDENTIALS to service account key for Firebase
> https://firebase.google.com/docs/admin/setup#windows


> npx babel --watch jsx --out-dir ./src/main/resources/static --presets react-app/prod

JSX converter command

> java -jar demo.jar

Run Spring Boot application with Java JAR file

> java -jar target/gs-rest-service-0.1.0.jar

Create JAR file

## Item Process / Notes

### Process
* Create ItemInfo
* Create ItemReceive
* Receive Item -> Creates ItemInventory that points to ItemReceive & ItemInfo
* Create Itemorder
	* Increase orderedQuantity for ItemOrder
	* ItemInventory -> reservedQuantity: decrease quantity, increase reservedQuantity
* Pickup ItemOrder in OrderPackage
	* ItemOrder -> pickup -> increased pickedQuantity & decrase orderedQuantity
	* ItemInventory -> pickup: decrease reservedQuantity
* ItemOrder is aggregated in ship order page 
* Create Shipment & ship items
	* Create Shipment
	* Create ShipmentItem and pull information from ItemOrder
	* Create ShipmentUnit for the pallets/packages created in that order for the shipment
	* ItemOrder: decrease pickedQuantity, increase completeQuantity

Shipment, ShipmentItem, ShipmentUnit - represents the data used for each separate shipment


## SQL

\dt
Alter table shipment drop column shipment_amount;

## todo

* Add Typescript
	* View orders page & ship order pages: Define itemresponse
	* Remove ItemsList