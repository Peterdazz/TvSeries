fetch("https://api.tvmaze.com/shows")
    .then(response => response.json())
    .then(data => {
        let arr = data.slice(0, 240);
        let str = "";
        let container = document.querySelector("#container");
        arr.forEach(element => {
            str += `
            <div class ="continer-image">
                <img src="${element.image.medium}">
                <div class="nome-serie">${element.name}</div>
                <div class="geenre-series">${element.genres}</div>
                <div class="valutazione">${element.rating.average}</div>
            </div>
            `;
        });
        container.innerHTML += str;
    });
document.querySelector("#cerca").addEventListener("click", function() {
    let nomeSerie = document.querySelector("#input").value;
    fetch(`https://api.tvmaze.com/singlesearch/shows?q=${nomeSerie}`)
        .then(response => response.json())
        .then(data => {
            ricerca(data);
        });
});

function ricerca(data) {
    let nuovaSerie = new MostraInfo(data.image, data.name, data.summary);
    console.log(nuovaSerie);

    let serieScelta = document.querySelector("#serieScelta");
    let container = document.querySelector("#container");
    let conteinerSummary = document.querySelector("#conteinerSeriesPAr");

    serieScelta.innerHTML = "";
    container.innerHTML = "";
    conteinerSummary.innerHTML = "";

    let strSummary = "";
    strSummary += `
            <div class="summary">${data.summary}</div>
            `;
    conteinerSummary.innerHTML = strSummary;

    let img = document.createElement("img");
    img.src = data.image.medium;
    img.classList.add("imageScelta");
    serieScelta.appendChild(img);
}

container.addEventListener("click", function(e) {
    const target = e.target;
    if (target.tagName == "IMG") {
        console.log("ciao");
        let modal = document.querySelector("#modal");
        modal.innerHTML = "";
        modal.style.display = "block";
        modal.innerHTML += `<img src="${target.src}"> `;
        console.log(target);
    }
});

class MostraInfo {
    immagine;
    titolo;
    descrizione;

    constructor(immagine, titolo, descrizione) {
        this.immagine = immagine;
        this.titolo = titolo;
        this.descrizione = descrizione;
    }
}