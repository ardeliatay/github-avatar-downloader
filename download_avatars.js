var request = require('request');
var secrets = require('./secrets.js')

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: 'https://api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors',
    headers: {
      'User-Agent': 'request',
      'Authorization': 'secrets'
    }
  };

  request(options, function(err, res, body) {
    cb(err, JSON.parse(body));
  });
}


getRepoContributors('jquery', 'jquery', function(err, result) {
  // if (err) throw err;
  var avatarURL = '';
  for (var i = 0; i < result.length; i++) {
    avatarURL = result[i].avatar_url;
  }
  // console.log('Errors:', err);
  // console.log('Results:', result);
  console.log('avatar_url:', avatarURL);
})