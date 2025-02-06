// File: credentials.js

import { MongoClient, ServerApiVersion } 
  from "mongodb";

const dbURL = 'mongodb://localhost:27017/cs602db';

export  const client = new MongoClient(dbURL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});