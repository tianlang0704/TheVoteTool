/**
 * Created by CMonk on 3/22/2017.
 */

var ListModel = require("../../../model/ListModel");
var sendAndLogJSONError400 = require("../helpers/send-log-400");
var err = require("../../../error/error");

module.exports.queryParamString = "/:listId";
module.exports.handler = function(req, res) {
  var listId = req.params.listId;
  res.header("Content-Type", "application/json");
  if(!listId) {
    sendAndLogJSONError400(res, err.invalidParameters).end();
    return;
  }

  ListModel.promiseToGetListFromId(listId)
  .then(function(result) {
    res.send({exist: true}).end();
  }).catch(function(error){
    sendAndLogJSONError400(res, error).end();
  });
};