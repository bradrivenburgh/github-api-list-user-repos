'use strict';

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
    // for each repo object add a list item to the results 
    // with the repo name and link
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
        <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
      </li>`
    )};

  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(githubHandle) {
  const url = `https://api.github.com/users/${githubHandle}/repos`;

  console.log(url);
  

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const githubHandle = $('#js-github-handle').val();
    getRepos(githubHandle);
  });
}

$(watchForm);