var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');


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

  //pass object (from JSON string) to the cb function
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
  if (err) {
    console.log('error:' + err);
    throw err;
  }
  var avatarURL = '';
  for (var i = 0; i < result.length; i++) {
    avatarURL = result[i].avatar_url;
  //finding avatars folder in current directory which contains images corresponding to the avatars of the contributors of the repo
  downloadImageByURL(avatarURL, "avatars/" + result[i].login + ".jpg");
  }
})