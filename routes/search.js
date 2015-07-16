// TODO - could validate params on each function using regex or other...

// Common headers that need to be applied to each request to Bungie.net
var headers = {
  'X-API-Key': '', // TODO - your API key here! Keep it private. https://www.bungie.net/en/User/API
  'Cookie': 'bungledid=B6BGVMQFOKdJsTAWEnsW/ko5xn4glmfRCAAA; bungled=2796665744958383183',
  'Connection': 'keep-alive'
}

// Export all search functions.
module.exports = function(router, client) {

  var callback;

  // Search for the provided clan.
  router.get('/Group/:groupId/MembersV3/:page', function(req, res) {

    callback = req.query.callback;

    client.methods.searchGroup({
      path: {
        groupId : req.params.groupId,
        page : req.params.page
      },
      headers: headers
    }, function(searchResults, response) {
      //res.send(searchResults);
      res.header('Content-type','application/json');
      res.header('Charset','utf8');
      res.send(callback + '('+ JSON.stringify(searchResults) + ');');
    });
  });

  // Search for the provided player's display name based on membership type (1 = XBL, 2 = PSN).
  router.get('/SearchDestinyPlayer/:membershipType/:displayName', function(req, res) {

    callback = req.query.callback;

    client.methods.SearchDestinyPlayer({
      path: {
        membershipType : req.params.membershipType,
        displayName : req.params.displayName
      },
      headers: headers
    }, function(searchResults, response) {
      res.header('Content-type','application/json');
      res.header('Charset','utf8');
      res.send(callback + '('+ JSON.stringify(searchResults) + ');');
    });
  });

  // Get all characters for the provided player (membership ID).
  router.get('/:platform/Account/:membershipId', function(req, res) {

    callback = req.query.callback;

    client.methods.getCharacters({
      path: {
        platform : req.params.platform,
        membershipId : req.params.membershipId
      },
      headers: headers
    }, function(searchResults, response) {
      res.header('Content-type','application/json');
      res.header('Charset','utf8');
      res.send(callback + '('+ JSON.stringify(searchResults) + ');');
    });
  });

  // Get progressions for the provided character.
  router.get('/:platform/Account/:membershipId/Character/:characterId/Progression/', function(req, res) {

    callback = req.query.callback;

    client.methods.getProgressions({
      path: {
        platform : req.params.platform,
        membershipId : req.params.membershipId,
        characterId : req.params.characterId
      },
      headers: headers
    }, function(searchResults, response) {
      res.header('Content-type','application/json');
      res.header('Charset','utf8');
      res.send(callback + '('+ JSON.stringify(searchResults) + ');');
    });
  });

  // Get activities for the provided character.
  router.get('/:platform/Account/:membershipId/Character/:characterId/Activities/', function(req, res) {

    callback = req.query.callback;

    client.methods.getActivities({
      path: {
        platform : req.params.platform,
        membershipId : req.params.membershipId,
        characterId : req.params.characterId
      },
      headers: headers
    }, function(searchResults, response) {
      res.header('Content-type','application/json');
      res.header('Charset','utf8');
      res.send(callback + '('+ JSON.stringify(searchResults) + ');');
    });
  });

  // Get activity history for the provided character on the given type (Raid, Strike, etc).
  router.get('/Stats/ActivityHistory/:platform/:membershipId/:characterId/:mode', function(req, res) {

    callback = req.query.callback;

    client.methods.getActivityHistory({
      path: {
        platform : req.params.platform,
        membershipId : req.params.membershipId,
        characterId : req.params.characterId,
        mode : req.params.mode
      },
      headers: headers
    }, function(searchResults, response) {
      res.header('Content-type','application/json');
      res.header('Charset','utf8');
      res.send(callback + '('+ JSON.stringify(searchResults) + ');');
    });
  });

};
