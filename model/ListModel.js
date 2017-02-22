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
  }
});

var ListModel = module.exports = mongoose.model("List", listSchema);

ListModel.promiseToGetOneFromId = function(listId) {
  return this.findOne({_id: listId}).exec();
};