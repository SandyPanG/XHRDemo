const form = document.getElementById('search-form');
const searchField = document.getElementById('search-keyword');
const responseContainer = document.getElementById('response-container');
let searchedForText;

form.addEventListener('submit', function (e) {
    e.preventDefault();
    responseContainer.innerHTML = '';
    searchedForText = searchField.value;
    getNews();
});

function getNews () {
    const articleRequest = new XMLHttpRequest();
    articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=ff85f7c3a07141c2afec60eb6be0423b`);
    articleRequest.onload = addNews;
    articleRequest.error = handleError;
    articleRequest.send();
}

function handleError() {
    console.log('se ha presentado un error');
}

function addNews() {
    const data = JSON.parse(this.responseText);
    // console.log(data);
    const article = data.response.docs[0];
    const title = article.headline.main;
    const snippet = article.snippet;

    let li = document.createElement('li');
    li.className = 'articleClass';
    li.innerText = snippet;

    responseContainer.appendChild(li)
    
}
