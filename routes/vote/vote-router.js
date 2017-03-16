/**
 * Created by CMonk on 2/20/2017.
 */
var express = require("express");

var listView = require("./handlers/list-view-handler");
var listDetail = require("./handlers/list-detail-handler");
var listCreate = require("./handlers/list-create-handler");
var listUpvote = require("./handlers/list-upvote-handler");
var listJoin = require("./handlers/list-join-handler");

var router = express.Router();

router.post("/create" + listCreate.queryParamString, listCreate.handler);
router.post("/join" + listJoin.queryParamString, listJoin.handler);
router.get("/detail" + listDetail.queryParamString, listDetail.handler);
router.get("/upvote" + listUpvote.queryParamString, listUpvote.handler);
router.get("/view" + listView.queryParamString, listView.handler);

module.exports = router;