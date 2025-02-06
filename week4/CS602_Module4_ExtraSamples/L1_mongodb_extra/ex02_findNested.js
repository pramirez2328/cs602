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

console.log("\n**test1** - Match an Embedded/Nested Document");

docs = await collection.find({ size: { h: 14, w: 21, uom: "cm" } } ).toArray();

console.log(docs);

console.log("\n**test2** - Specify Equality Match on a Nested Field");

docs = await collection.find({ "size.uom": "in" } ).toArray();

console.log(docs);

console.log("\n**test3** - Specify Match using Query Operator");

docs = await collection.find({ "size.h": { $lt: 15 } }).toArray();

console.log(docs);

console.log("\n**test4** - Specify AND Condition");

docs = await collection.find({ "size.h": { $lt: 15 }, "size.uom": "in", status: "D" } ).toArray();

console.log(docs);

await client.close();




