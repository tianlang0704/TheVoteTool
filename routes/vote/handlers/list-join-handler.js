/**
 * Created by CMonk on 3/6/2017.
 */

var CandidateModel = require("../../../model/CandidateModel");
var ListModel = require("../../../model/ListModel");
var sendAndLogJSONError400 = require("../helpers/send-log-400");

module.exports.queryParamString = "";
module.exports.handler = function(req, res){
  res.header("Content-Type", "application/json");
  var listId = req.body.listId;
  var newCandidate = req.body.newCandidate;
  if(!listId || !newCandidate) {
    sendAndLogJSONError400(res, "Invalid parameters").end();
    return;
  }
  if(!newCandidate.name || !newCandidate.thoughts || !newCandidate.imageFileString) {
    sendAndLogJSONError400(res, "Invalid candidate").end();
    return;
  }
  //TODO: check image string size

  //Find list and fill in data
  ListModel.promiseToAdvanceInsertNumber(listId)
  .then(function(foundList){
    if(!foundList) {
      throw "List to join not found.";
    }
    var newCandidateModel = new CandidateModel({
      name: newCandidate.name,
      number: foundList.listInsertNumber,
      listId: foundList._id,
      thoughts: newCandidate.thoughts,
      imageFileString: newCandidate.imageFileString
    });
    newCandidateModel.save(function(err){
      if(err) {
        sendAndLogJSONError400(res, "Error joining vote").end();
        return;
      }

      var resultJSON = {
        listId: foundList._id.toString(),
        candidateNumber: newCandidateModel.number
      };
      res.send(resultJSON);
      res.end();
    });
  }).catch(function(errResult){
    // console.log(errResult);
    sendAndLogJSONError400(res, "Error joining vote").end();
  });
};