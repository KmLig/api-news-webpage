let language = document.getElementById("selectLang").value;
let searchKey = "";
let newsApi = `https://gnews.io/api/v4/top-headlines?lang=${language}&q=${searchKey}&max=8&token=138edba5f204b70bd1b71d0ae68faaaf`;

let formSelectLang = document.getElementById("selectLang");
formSelectLang.onchange = getLang;
let logo = document.getElementById("logo");
logo.onclick = start;
let btnSearchNews = document.getElementById("searchNews");
btnSearchNews.onclick = searchNews;

function start() {
    getNews(renderNews);        
    myDisplayer();    
}

function getNews(callback){
    fetch(newsApi)
    .then(function (response) {
        return response.json();
    })    
    .then(callback);
}

function renderNews(news){
    console.log(news);
    document.getElementById("totalArt").innerHTML = "About " + news.totalArticles + " results"; 
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

function myDisplayer(){
    document.getElementById("loading-group").style.display = "none";
}

function getLang() {
    language = selectLang.value;      
    console.log(language);
    console.log(newsApi);
    newsApi = `https://gnews.io/api/v4/top-headlines?lang=${language}&q=${searchKey}&max=8&token=138edba5f204b70bd1b71d0ae68faaaf`;     
    getNews(renderNews);  
    myDisplayer();
}

function searchNews(){ 
    searchKey =  document.getElementById("searchKey").value;
    document.getElementById("searchKey").value = "";
    newsApi = `https://gnews.io/api/v4/top-headlines?lang=${language}&q=${searchKey}&max=8&token=138edba5f204b70bd1b71d0ae68faaaf`;   
    let timeBefore = Date.now();  
    getNews(renderNews); 
    myDisplayer();
    let timeAfter = Date.now(); 
    let searchingTime = (timeAfter - timeBefore).toFixed(10);
    document.getElementById("searchingTime").innerHTML = "  Searching time " + searchingTime;
    document.getElementById("newsTitle").innerHTML = "Related news to the key words "  + searchKey;
}

setTimeout(start, 500);