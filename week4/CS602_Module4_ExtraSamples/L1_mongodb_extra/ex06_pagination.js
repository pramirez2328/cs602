import {client} from "./credentials.js";

const printZipCodes = async (collection, pageNumber, numPerPage) => {
    
    await collection.find({state: "MA"})
            .sort( { _id: 1 } )
            .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * numPerPage ) : 0 )
            .limit(numPerPage)
            .forEach(data => {
                console.log(" Zipcode", data._id, "City", data.city, "Pop", data.pop)
            });
}
	
let collection = client.db("cs602db").collection('zipcodes');

console.log("\n**test1**");
await printZipCodes(collection, 1, 20);

console.log("\n**test2**");
await printZipCodes(collection, 2, 20);


await client.close();

	
	

