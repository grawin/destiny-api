var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 8080));
//app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('Hello World!');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

var rest = require('node-rest-client');
var client = new rest.Client();

var baseUrl = 'http://www.bungie.net/Platform/Destiny/';

client.registerMethod('searchGroup', 'http://www.bungie.net/Platform/Group/${groupId}/MembersV3/?currentPage=${page}', 'GET');

client.registerMethod('SearchDestinyPlayer', baseUrl + 'SearchDestinyPlayer/${membershipType}/${displayName}/', 'GET');

client.registerMethod('getCharacters', baseUrl + '${platform}/Account/${membershipId}/', 'GET');

client.registerMethod('getProgressions', baseUrl + '${platform}/Account/${membershipId}/Character/${characterId}/Progression/', 'GET');

client.registerMethod('getActivities', baseUrl + '${platform}/Account/${membershipId}/Character/${characterId}/Activities/?definitions=true', 'GET');

client.registerMethod('getActivityHistory', baseUrl + '/Stats/ActivityHistory/${platform}/${membershipId}/${characterId}/?mode=${mode}&page=0', 'GET');

var router = express.Router();
require('./routes/search')(router, client);
app.use('/api', router);

