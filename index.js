const URL_ENDPOINT = "https://en.wikipedia.org/api/rest_v1";

const TITLE = document.getElementById("Title");
const Main_Page_BTN = document.getElementById("Main_Page_BTN");
const Related_Page_BTN = document.getElementById("Related_Page_BTN");
const Summary_Page_BTN = document.getElementById("Summary_Page_BTN");

Main_Page_BTN.addEventListener("click", (e) => {Main_Page()});
Related_Page_BTN.addEventListener("click", (e) => {Related_Pages()});
Summary_Page_BTN.addEventListener("click", (e) => {Summary_Page()})


async function FetchAPI_HTML (Full_Url) {
    try{
        const RESPONSE = await fetch(Full_Url);
        const HTML = await RESPONSE.text();

        document.body.innerHTML = HTML;
        document.body.style = `
        body{
            display: grid;
            justify-items: center;
        }
        button{
            margin-top: 10px;
            margin-bottom: 10px;
        }`;
    
    } catch(err) {
        document.body.innerHTML = err;
    }
}

async function FetchAPI_JSON_related(Full_Url) {
    try{
        const RESPONSE = await fetch(Full_Url);
        const JSON = await RESPONSE.json();
        
        document.body.innerHTML = "";
        document.body.style = `
        body{
            display: block;
        }`;
        
        for (let index = 0; index < JSON["pages"]["length"] - 1; index++) {
            let link_URL = JSON["pages"][index]["content_urls"]["desktop"]["page"];
            
            document.body.innerHTML += `<a href="${link_URL}">${link_URL}</a> <br>`;
        }

    } catch(err) {
        document.body.innerHTML = err;
    }
}

async function FetchAPI_JSON_summary(Full_Url){
    try{
        const RESPONSE = await fetch(Full_Url);
        const JSON = await RESPONSE.json();
        
        const Title = JSON["title"];
        const Summary = JSON["extract"];
        const URL = JSON["content_urls"]["desktop"]["page"];

        document.body.style = `
        body{
            display: grid;
            justify-item: left;
        }`;
        
        document.body.innerHTML = `
        <h1>${Title}</h1>
        <a href="${URL}">${URL}</a>
        <h3>${Summary}</h3>
        `;

    } catch(err) {
        document.body.innerHTML = err;
    }
}

let Main_Page = () => {
    let Title = String(TITLE.value).replace(" ", "_");
    const Main_Page_Endpoint = `${URL_ENDPOINT}/page/html/${Title}`;
    
    FetchAPI_HTML(Main_Page_Endpoint);
}

let Related_Pages = () => {
    let Title = String(TITLE.value).replace(" ", "_");
    const Related_Pages_Endpoint = `${URL_ENDPOINT}/page/related/${Title}`;

    FetchAPI_JSON_related(Related_Pages_Endpoint);
}

let Summary_Page = () => {
    let Title = String(TITLE.value).replace(" ", "_");
    const Summary_Page_Endpoint = `${URL_ENDPOINT}/page/summary/${Title}`;

    FetchAPI_JSON_summary(Summary_Page_Endpoint);
}
