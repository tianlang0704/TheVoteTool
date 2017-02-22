/**
 * Created by CMonk on 2/21/2017.
 */
var mongoose = require("mongoose");

var ipTrackerSchema = new mongoose.Schema({
  ipString: {
    type: String,
    required: true
  },
  listId: {
    type: String,
    required: true
  },
  candidateNumber: {
    type: Number,
    required: true
  }
});

var IPTrackerModel = module.exports = mongoose.model("IPTracker", ipTrackerSchema);

IPTrackerModel.promiseToCheckDuplicate = function(ip, listId, candidateNumber) {
  return this.find({ipString: ip, listId: listId, candidateNumber: candidateNumber}).count().exec()
    .then(function(res){
      if(res > 0) {
        return Promise.reject("Error IP already exist");
      }else{
        return Promise.resolve();
      }
    });
};

IPTrackerModel.promiseToAddTrack = function(ip, listId, candidateNumber) {
  var IPTrackerModel = this;
  return new Promise(function(resolve, reject) {
    var newTrack = new IPTrackerModel({
      ipString: ip,
      listId: listId,
      candidateNumber: candidateNumber
    });
    newTrack.save(function(error){
      if(error) { reject(error); return; }
      resolve();
    });
  });
};