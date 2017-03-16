/**
 * Created by CMonk on 3/6/2017.
 */

var CandidateModel = require("../../../model/CandidateModel");
var ListModel = require("../../../model/ListModel");
var sendAndLogJSONError400 = require("../helpers/send-log-400");

module.exports.queryParamString = "/:listId/:candidateNumber";
module.exports.handler = function(req, res) {
  res.header("Content-Type", "application/json");
  var listId = req.params.listId;
  var candidateNumber = req.params.candidateNumber;
  if(!listId || !candidateNumber) {
    sendAndLogJSONError400(res, "Invalid parameters").end();
    return;
  }

  CandidateModel.promiseToGetOneFromListId(listId, candidateNumber)
  .then(function(result){
    if(!result){ throw "No candidate found"; }
    console.log("result: " + result);
    res.send(result).end();
  }).catch(function(error){
    // console.log(error);
    sendAndLogJSONError400(res, "Error getting candidate detail information").end();
  });
};