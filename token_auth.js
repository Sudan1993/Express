var jwt = require('jsonwebtoken')

exports.ensureToken = function(req, res, next) {
 var bearerHeader = req.headers["authorization"]
 if(typeof bearerHeader !== 'undefined') {
  const bearer = bearerHeader.split(" ")
  const bearerToken = bearer[1]
  req.token = bearerToken
  console.log("Bearer Token ::: "+bearerToken);
  var verifiedJwt = jwt.verify(bearerToken,'secret');
  console.log(verifiedJwt);
  if(verifiedJwt != undefined){
    req.username = verifiedJwt.username,
    req.id = verifiedJwt.id
	  next()
  }
  else
  	res.sendStatus(403);
 } else {
  res.sendStatus(403)
 }
}