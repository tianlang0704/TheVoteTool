/**
 * Created by CMonk on 2/21/2017.
 */
var mongoose = require("mongoose");

var candidateSchema = new mongoose.Schema({
  name: {
    type: String
  },
  number: {
    type: Number,
    required: true
  },
  listId: {
    type: String,
    required: true
  },
  thoughts: {
    type: String
  },
  imageFileString: {
    type: String
  },
  upCount: {
    type: Number,
    required: true,
    default: 0
  }
});

var CandidateModel = module.exports = mongoose.model("Candidate", candidateSchema);

CandidateModel.promiseToGetAllFromListId = function(listId) {
  return this.find({listId: listId}).sort({upCount: -1}).exec();
};

CandidateModel.promiseToGetOneFromListId = function(listId, candidateNumber) {
  return this.findOne({listId: listId, number: candidateNumber}).exec();
};

CandidateModel.promiseToUpVote = function(listId, candidateNumber) {
  return this.findOneAndUpdate({listId: listId, number: candidateNumber}, {$inc: { "upCount": 1 }}).exec();
};