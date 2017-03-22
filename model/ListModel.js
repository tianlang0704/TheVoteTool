/**
 * Created by CMonk on 2/21/2017.
 */
var mongoose = require("mongoose");
var err = require("../error/error");

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

ListModel.promiseToGetListFromId = function(listId) {
  return this.findOne({_id: listId}).exec()
    .catch(function(error){
      if(error.name == "CastError" && error.path == "_id") {
        throw err.listIdNotFound;
      }else{
        throw error;
      }
    });
};

ListModel.promiseToAdvanceInsertNumber = function(listId) {
  return this.findOneAndUpdate({_id: listId}, {$inc: {listInsertNumber: 1}}, {new: true}).exec();
};