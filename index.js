'use strict'
$(".getGitHubRepo").submit(function (e) {
  e.preventDefault();
  console.log("clicked");
  let gitHandle = $('#repoInput').val();
  console.log(gitHandle);
  getUserRepo(gitHandle);
});

function getUserRepo(gitHandle) {
  fetch(`https://api.github.com/users/${gitHandle}/repos`)
    .then(response => response.json())
    .then(responseJson => getRepoNameAndURL(responseJson))
    .catch(error => alert('Something went wrong try again later'))

}

function getRepoNameAndURL(responseJson) {
  $('.results').empty();
  var searchResults = responseJson.map(function (key) {

    return (`<div>URL :<a href="${key.url}">${key.url}</a></div>
    <div> name : ${key.name}</div>`);
  });
  if (responseJson.code == "Not Found") {
    
    $(".result").html(responseJson.message);
  } 
  
  else {
    $(".results").html(searchResults);
    $(".result").removeClass("hidden");
  }
}