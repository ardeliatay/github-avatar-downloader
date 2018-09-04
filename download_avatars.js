var request = require('request');
var secrets = require('./secrets.js')
var fs = require('fs')

var repoOwner = process.argv[2];
var repoName = process.argv[3];


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

function downloadImageByURL(url, filepath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .on('response', function (response) {
    console.log('Response Status Code: ', response.statusCode);
  })
  .pipe(fs.createWriteStream('./' + filepath));
}


getRepoContributors(repoOwner, repoName, function(err, result) {
  // if (err) throw err;
  if (err) {
    console.log('error:' + err);
    throw err;
  }
  var avatarURL = '';
  for (var i = 0; i < result.length; i++) {
    avatarURL = result[i].avatar_url;
  //
  downloadImageByURL(avatarURL, "avatars/" + result[i].login + ".jpg");
  }
})