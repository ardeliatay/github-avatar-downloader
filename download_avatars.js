var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  //
}

getRepoContributors("jquery", "jquery", function(err, result) {
  if (err) throw err;
  console.log("Errors:", err);
  console.log("Results:", result);
})