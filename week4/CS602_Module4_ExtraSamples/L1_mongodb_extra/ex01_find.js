import {client} from "./credentials.js";

let newData = [
   { item: "journal", qty: 25, size: { h: 14, w: 21, uom: "cm" }, status: "A" },
   { item: "notebook", qty: 50, size: { h: 8.5, w: 11, uom: "in" }, status: "A" },
   { item: "paper", qty: 100, size: { h: 8.5, w: 11, uom: "in" }, status: "D" },
   { item: "planner", qty: 75, size: { h: 22.85, w: 30, uom: "cm" }, status: "D" },
   { item: "postcard", qty: 45, size: { h: 10, w: 15.25, uom: "cm" }, status: "A" }
];

	
let collection = client.db("cs602db").collection('inventory');

await collection.deleteMany({});

let docs;

docs = await collection.insertMany(newData);

console.log('Inserted Count:', docs.insertedCount);
console.log('Inserted Ids:', docs.insertedIds);
	

// SELECT * FROM inventory

console.log("\n**test1** - Select All Documents in a Collection");

docs = await collection.find({}).toArray();

console.log(docs);

// SELECT * FROM inventory WHERE status = "D"

console.log("\n**test2** - Specify Equality Condition");

docs = await collection.find({ status: "D"}).toArray();
console.log(docs);
	
// SELECT * FROM inventory WHERE status in ("A", "D")

console.log("\n**test3**");

docs = await collection.find({ status: { $in: [ "A", "D" ] } }).toArray();
console.log(docs);

// SELECT * FROM inventory WHERE status = "A" AND qty < 30

console.log("\n**test4** - Specify AND Conditions");

docs = await collection.find( { status: "A", qty: { $lt: 30 } }).toArray();

console.log(docs);

// SELECT * FROM inventory WHERE status = "A" OR qty < 30

console.log("\n**test5** - Specify OR Conditions");
docs = await collection.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] }).toArray();

console.log(docs);

// SELECT * FROM inventory WHERE status = "A" AND ( qty < 30 OR item LIKE "p%")

console.log("\n**test6** - Specify AND as well as OR Conditions");

docs = await collection.find( {
 status: "A",
 $or: [ { qty: { $lt: 30 } }, { item: /^p/ } ]
	} ).toArray();

console.log(docs);
	
await client.close();


	


