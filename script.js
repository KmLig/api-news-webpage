let formSelectLang = document.getElementById("selectLang");
let language = formSelectLang.value;
let searchKey = "";
let token = "9c3b10d3beb178312e1130fbab86bc74";
let newsApi = `https://gnews.io/api/v4/top-headlines?lang=${language}&q=${searchKey}&max=8&token=${token}`;
let timeToSearch = document.getElementById("searchingTime");
let totalQuanArt = document.getElementById("totalArt");
let newsTitle = document.getElementById("newsTitle");
let logo = document.getElementById("logo");
let homePage = document.getElementById("homeIcon");
let btnSearchNews = document.getElementById("searchNews");


formSelectLang.onchange = getLang;
logo.onclick = start;
homePage.onclick = start;
btnSearchNews.onclick = searchNews;

function start() {
    showLoading();    
    language = formSelectLang.value;
    searchKey = "";
    newsApi = `https://gnews.io/api/v4/top-headlines?lang=${language}&q=${searchKey}&max=8&token=${token}`;
    getNews(renderNews);    
    timeToSearch.innerHTML = "";    
    setTimeout(hideLoading, 1000);      
}

function getNews(callback) {
    fetch(newsApi)
    .then(function (response) {
        return response.json();
    })    
    .then(callback);
    newsTitle.innerHTML = "Top headlines in the day";
}

function renderNews(news) {
    console.log(news);
    totalQuanArt.innerHTML = "About " + news.totalArticles + " results"; 
    let newsListBlock = document.querySelector("#newsList");    
    let htmls = news.articles.map(function(article){
        return `
            <div class="col-sm-12 col-md-6 col-lg-3">
                <div id="imgFrame">
                    <a href="${article.url}" target="_blank"><img class="img-thumbnail" src="${article.image}" alt="" style="width:100%"></a>                    
                </div>
                <div>
                    <h4><a href="${article.url}" target="_blank"><b>${article.title}</b></a></h4>
                    <p>${article.description}</p>
                    <a href="${article.url}" title="${article.url}" target="_blank">Read more at...</a>
                </div>                
            </div>
            `;
    });
    newsListBlock.innerHTML = htmls.join("");
}

function showLoading() {
    document.getElementById("loading-group").style.display = "block";
}
function hideLoading() {
    document.getElementById("loading-group").style.display = "none";
}

function getLang() {
    showLoading();
    language = selectLang.value;        
    searchKey = "";
    timeToSearch.innerHTML= "";    
    newsApi = `https://gnews.io/api/v4/top-headlines?lang=${language}&q=${searchKey}&max=8&token=${token}`;     
    getNews(renderNews);      
    setTimeout(hideLoading, 1000);
}

function searchNews() { 
    showLoading();
    searchKey =  document.getElementById("searchKey").value;
    document.getElementById("searchKey").value = "";
    newsApi = `https://gnews.io/api/v4/search?lang=${language}&q=${searchKey}&max=8&token=${token}`;       
    let timeBefore = Date.now();  
    getNews(renderNews); 
    setTimeout(hideLoading, 1000);
    let timeAfter = Date.now();     
    timeToSearch.innerHTML = ". Searching time: " + (timeAfter - timeBefore).toFixed(3) + " second(s)";
    newsTitle.innerHTML = "Related news to the key word(s): "  + `"${searchKey}"`;    
}

start();