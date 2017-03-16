/**
 * Created by CMonk on 3/6/2017.
 */

var CandidateModel = require("../../../model/CandidateModel");
var ListModel = require("../../../model/ListModel");
var sendAndLogJSONError400 = require("../helpers/send-log-400");

module.exports.queryParamString = "/:listId";
module.exports.handler = function(req, res) {
  var listId = req.params.listId;
  res.header("Content-Type", "application/json");
  if(!listId) {
    sendAndLogJSONError400(res, "Invalid parameters").end();
    return;
  }

  //build return json from two queries
  ListModel.promiseToGetListFromId(listId)
  .then(function(result){
    //query list information
    if(!result){ return Promise.reject("No list found with listId: " + listId); }
    var returnJSON = {
      listTitle: result.listTitle,
      listDescription: result.listDescription,
      listStatus: result.listStatus,
      listId: result._id
    };
    return Promise.resolve(returnJSON);
  }).then(function(returnJSON){
    //query candidate information
    return CandidateModel.promiseToGetAllFromListId(listId)
    .then(function(result){
      if(!result){ return Promise.reject("No candidate found with listId: " + listId); }
      returnJSON.listCandidates = result;
      return Promise.resolve(returnJSON);
    });
  }).then(function(returnJSON){
    res.send(returnJSON).end();
  }).catch(function(error){
    // console.log(error);
    sendAndLogJSONError400(res, "Error getting vote list").end();
  });
};