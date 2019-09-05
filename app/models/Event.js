'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let eventSetSchema = new Schema({
  id: { type: String, default: '', index: true, unique: true},
  title: {type: String, default: '', trim: true},
  date: {type: String, default: '', trim: true},
  place: {type: String, default: '', trim: true},
  purpose: {type: String, default: '', trim: true}
})

let eventSchema = new Schema({
  userId: {
    type: String,
    default: '',
    index: true,
    unique: true
  },
  userEvents : [eventSetSchema]
})


mongoose.model('Event', eventSchema);


/*userEvents :[
  {
    id: Number,
    title: String,
    date: String
  }
]*/