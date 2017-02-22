/**
 * Created by CMonk on 2/20/2017.
 */
var express = require("express");
var CandidateModel = require("../model/CandidateModel");
var ListModel = require("../model/ListModel");
var IPTrackerModel = require("../model/IPTrackerModel");

var router = express.Router();

function sendAndLogJSONError400(res, error) {
  console.log("Error: " + error.stack ? error.stack : error);
  var errorJSON = {error: error};
  res.statusCode = 400;
  res.send(errorJSON);
  return res;
}

router.get("/:listId", function(req, res) {
  var listId = req.params.listId;
  res.header("Content-Type", "application/json");
  if(!listId) {
    sendAndLogJSONError400(res, "Invalid parameters").end();
    return;
  }

  //build return json from two queries
  ListModel.promiseToGetOneFromId(listId).then(function(result){
    //query list information
    if(!result){ return Promise.reject("No list found with listId: " + listId); }
    var returnJSON = {
      listTitle: result.listTitle,
      listDescription: result.listDescription,
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
    sendAndLogJSONError400(error).end();
  });
});

router.get("/detail/:listId/:candidateNumber", function(req, res) {
  var listId = req.params.listId;
  var candidateNumber = req.params.candidateNumber;

  res.header("Content-Type", "application/json");

  if(!listId || !candidateNumber) {
    sendAndLogJSONError400("Invalid parameters").end();
    return;
  }

  CandidateModel.promiseToGetOneFromListId(listId, candidateNumber)
    .then(function(result){
      if(!result){ throw "No candidate found"; }
      console.log("result: " + result);
      res.send(result).end();
    }).catch(function(error){
      sendAndLogJSONError400(error).end();
  });
});

router.post("/create", function(req, res){
  res.header("Content-Type", "application/json");
  //sanity check
  var listTitle = req.body.listTitle ? req.body.listTitle : "";
  var listDescription = req.body.listDescription ? req.body.listDescription : "";
  var listCandidates = req.body.listCandidates;
  if(!listCandidates) {
    sendAndLogJSONError400("/Create invalid candidate list name").end();
    return;
  }

  //Parse and check data received
  //TODO: Check unique number, Check image size
  var newCandidateList = [];
  for(var i = 0; i < listCandidates.length; ++i) {
    var item = listCandidates[i];
    var itemProps = Object.keys(item);
    var modelProps = Object.keys(CandidateModel.schema.paths).filter(function(ele){ return ele[0] != "_"; });

    var propCheck = modelProps.every(function(ele){
      return itemProps.indexOf(ele) != -1;
    });
    if(!propCheck){ continue; }

    var newCandidate = new CandidateModel();
    modelProps.forEach(function(ele){ newCandidate[ele] = item[ele]; });
    newCandidateList.push(newCandidate);
  }
  if(newCandidateList.length <= 0) {
    sendAndLogJSONError400("/Create invalid candidate list content");
    return;
  }

  //Create new list and fill in data
  var newList = new ListModel({
    listTitle: listTitle,
    listDescription: listDescription
  });
  newList.save(function(err){ if(err) { console.log(err); } });
  newCandidateList.forEach(function(ele) { ele.listId = newList._id; });

  CandidateModel.create(newCandidateList, function(error, result){
    if(result) {
      var resultJSON = {listId: newList._id.toString()};
      res.send(resultJSON);
    }else{
      sendAndLogJSONError400(res, "Error creating vote");
    }
    res.end();
  });
});

router.get("/upvote/:listId/:candidateNumber", function(req, res){
  res.header("Content-Type", "application/json");
  for(var param in req.params) {
    if(!param) {
      sendAndLogJSONError400(res, "Invalid parameters").end();
      return;
    }
  }
  var listId = req.params.listId;
  var candidateNumber = req.params.candidateNumber;
  var ip = (req.headers['x-forwarded-for'] ||
  req.connection.remoteAddress ||
  req.socket.remoteAddress ||
  req.connection.socket.remoteAddress).split(",")[0];

  IPTrackerModel.promiseToCheckDuplicate(ip, listId, candidateNumber)
    .then(function(){
      //TODO: This is a bug, check and add need to be atomic
      return IPTrackerModel.promiseToAddTrack(ip, listId, candidateNumber);
    }).then(function(){
      return CandidateModel.promiseToUpVote(listId, candidateNumber);
    }).then(function(){
      res.send({success: true});
    }).catch(function(error){
      sendAndLogJSONError400(res, error).end();
  });
});

module.exports = router;