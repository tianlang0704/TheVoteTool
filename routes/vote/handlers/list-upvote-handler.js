/**
 * Created by CMonk on 3/6/2017.
 */

var CandidateModel = require("../../../model/CandidateModel");
var ListModel = require("../../../model/ListModel");
var IPTrackerModel = require("../../../model/IPTrackerModel");
var sendAndLogJSONError400 = require("../helpers/send-log-400");

module.exports.queryParamString = "/:listId/:candidateNumber";
module.exports.handler = function(req, res){
  res.header("Content-Type", "application/json");
  var listId = req.params.listId;
  var candidateNumber = req.params.candidateNumber;
  if(!listId || !candidateNumber) {
    sendAndLogJSONError400(res, "Invalid parameters").end();
    return;
  }

  var ip = (req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress).split(",")[0];

  IPTrackerModel.promiseToCheckDuplicate(ip, listId, candidateNumber)
  .then(function(){
    //TODO: There's a bug here, check and add need to be atomic
    return IPTrackerModel.promiseToAddTrack(ip, listId, candidateNumber);
  }).then(function(){
    return CandidateModel.promiseToUpVote(listId, candidateNumber);
  }).then(function(){
    res.send({success: true});
  }).catch(function(error){
    // console.log(error);
    sendAndLogJSONError400(res, "Error upvoting").end();
  });
};