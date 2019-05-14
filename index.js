'use strict';

const searchURL = "https://api.github.com/users/";

function displayResults(responseJson) {
  console.log(responseJson);
  $('#results-list').empty();
  $('#js-error-message').empty()
  if (responseJson.message == "Not Found") {
    $('#results').addClass('hidden');
    $('#js-error-message').text(`User Handle: ${responseJson.message}`);
  } else {
    for (let i = 0; i < responseJson.length; i++){
        let date = new Date(responseJson[i].updated_at);
        let formattedDate = date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate();
        $('#results-list').append(
        `<li><h3>${responseJson[i].name}</h3>
        <p>Last updated: ${formattedDate}</p>
        <p><a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a></p>
        </li>`
        )}
    $('#results').removeClass('hidden'); 
    };
};

function getRepositories(query) {
  const url = searchURL + query + "/repos?sort=updated&direction=desc";
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const handle = $('#js-github-handle').val();
    $('#js-github-handle').val('');
    getRepositories(handle);
  });
}

$(watchForm);