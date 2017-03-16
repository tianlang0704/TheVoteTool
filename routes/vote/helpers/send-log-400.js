/**
 * Created by CMonk on 3/6/2017.
 */

module.exports = function(res, error) {
  //TODO: If debug
  // const errorMsg = (error.stack ? error.stack : error);
  const errorMsg = error.toString();
  console.log(errorMsg);
  var errorJSON = {error: errorMsg};
  res.statusCode = 400;
  res.send(errorJSON);
  return res;
};