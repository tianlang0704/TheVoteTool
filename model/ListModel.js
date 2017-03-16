/**
 * Created by CMonk on 2/21/2017.
 */
var mongoose = require("mongoose");

var listSchema = new mongoose.Schema({
  listTitle: {
    type: String
  },
  listDescription: {
    type: String
  },
  listStatus: {
    type: String,
    default: "active"
  },
  listInsertNumber: {
    type: Number,
    default: 0
  }
});

var ListModel = module.exports = mongoose.model("List", listSchema);

// Mark: Class functions
ListModel.promiseToGetListFromId = function(listId) {
  return this.findOne({_id: listId}).exec();
};
// End: Class functions

// Mark: Instance functions
ListModel.promiseToAdvanceInsertNumber = function(listId) {
  return this.findOneAndUpdate({_id: listId}, {$inc: {listInsertNumber: 1}}, {new: true}).exec();
};

// End: Instance functions