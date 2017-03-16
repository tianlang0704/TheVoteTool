/**
 * Created by CMonk on 3/6/2017.
 */

var ListModel = require("../../../model/ListModel");
var sendAndLogJSONError400 = require("../helpers/send-log-400");

module.exports.queryParamString = "";
module.exports.handler = function(req, res){
  res.header("Content-Type", "application/json");
  var listTitle = req.body.listTitle;
  if(!listTitle) {
    sendAndLogJSONError400(res, "Invalid parameters").end();
    return;
  }
  var listDescription = req.body.listDescription ? req.body.listDescription : "";

  //Create new list and fill in data
  var newList = new ListModel({
    listTitle: listTitle,
    listDescription: listDescription
  });
  newList.save(function(err){
    if(!err) {
      var resultJSON = {listId: newList._id.toString()};
      res.send(resultJSON);
    }else{
      sendAndLogJSONError400(res, "Error creating vote");
    }
    res.end();
  });
};