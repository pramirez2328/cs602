// File: Coordinator.js

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Fill in the code
const coordinatorSchema = new Schema({
  



}, 
{collection : 'coordinators'});

export const Coordinator = mongoose.model(
  "Coordinator", coordinatorSchema);
