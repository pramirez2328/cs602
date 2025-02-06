import {client} from "./credentials.js";

let newData = [
  { "_id": 1, "quizzes": [ 10, 6, 7 ], "labs": [ 5, 8 ], "final": 80, "midterm": 75 },
  { "_id": 2, "quizzes": [ 9, 10 ], "labs": [ 8, 8 ], "final": 95, "midterm": 80 },
  { "_id": 3, "quizzes": [ 4, 5, 5 ], "labs": [ 6, 5 ], "final": 78, "midterm": 70 }
];

	
let collection = client.db("cs602db").collection('students');

let docs;

await collection.deleteMany({});

docs = await collection.insertMany(newData);

console.log('Inserted Count:', docs.insertedCount);
	
console.log("\n**test1** - Aggregate All Documents in a Collection");
docs = await collection.aggregate([
						   {
						     $project: {
						       quizMax: { $max: "$quizzes"},
						       quizMin: { $min: "$quizzes"},
						       labMax: { $max: "$labs" },
						       labMin: { $min: "$labs" },
						       examMax: { $max: [ "$final", "$midterm" ] },
						       examMin: { $min: [ "$final", "$midterm" ] },
						       quizTotal: { $sum: "$quizzes"},
						       labTotal: { $sum: "$labs" },
						       examTotal: { $sum: [ "$final", "$midterm" ] }
						     }
						   }
						]).toArray();

console.log(docs);

await client.close();
							


