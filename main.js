//alert("Olá, seja bem vinda(o) à atividade!")//

let meusAlbuns = [
  {
    "nome_do_album": "Jujutsu kaisen tracks",
    "nome_da_banda": "Release",
    "ano_do_album": 2020,
    "nome_da_musica": "Be prepared",
    "imagem_da_capa_do_album": "img/jjk.jpg",
    "link": "https://www.youtube.com/watch?v=--m_wq2U7uY",
    "ID": 1
  },
  {
    "nome_do_album": "MUSIC WORLD",
    "nome_da_banda": "ALI",
    "ano_do_album": 2020,
    "nome_da_musica": "lost in paradise",
    "imagem_da_capa_do_album": "img/lost_in_paradise.jfif",
    "link": "https://www.youtube.com/watch?v=tLsJQ5srVQA",
    "ID": 2
  },
  {
    "nome_do_album": "RAPS",
    "nome_da_banda": "M4rkin",
    "ano_do_album": 2020,
    "nome_da_musica": "Caminho da espada",
    "imagem_da_capa_do_album": "img/caminho_da_espada.jpg",
    "link": "https://www.youtube.com/watch?v=w0u134iUhY4",
    "ID": 3
  },
  {
    "nome_do_album": "RAPS",
    "nome_da_banda": "M4rkin",
    "ano_do_album": 2020,
    "nome_da_musica": "Caminho da morte",
    "imagem_da_capa_do_album": "img/caminho_da_morte.jpg",
    "link": "https://www.youtube.com/watch?v=JIvN9_imjjg",
    "ID": 4
  },
  {
    "nome_do_album": "nao sei",
    "nome_da_banda": "JPN",
    "ano_do_album": 2022,
    "nome_da_musica": "AMEND",
    "imagem_da_capa_do_album": "img/amend.jfif",
    "link": "https://www.youtube.com/watch?v=5Zach_0YEac",
    "ID": 5
  },
  {
    "nome_do_album": "ULTRAKILL SOUNDTRACK",
    "nome_da_banda": "heaven pierce her",
    "ano_do_album": 2022,
    "nome_da_musica": "VERSUS",
    "imagem_da_capa_do_album": "img/versus.jpg",
    "link": "https://www.youtube.com/watch?v=BhEnjxYLBYo",
    "ID": 6
  },
  
]

function organizaEmLinhasEColunas(albuns) {
  const numeroDeColunas = 3
  const numeroDeLinhas = Math.ceil(albuns.length / numeroDeColunas)

  let linhas = new Array(numeroDeLinhas)

  let indiceAlbuns = 0;

  for (let i = 0; i < numeroDeLinhas; i++) {
    linhas[i] = new Array(numeroDeColunas)

    for (let j = 0; j < numeroDeColunas; j++) {
      if (indiceAlbuns < albuns.length) {
        linhas[i][j] = albuns[indiceAlbuns++]
      }
    }
  }

  return linhas
}

function criaCardHtmlParaAlbum(album) {
  return `
  <div class="album-card">
    <img class="album-cover" src="${album.imagem_da_capa_do_album}" alt="">
    <div class="album-info">
      <h5 class="album-title">${album.nome_do_album}</h5>
      <p class="album-artist">${album.nome_da_banda}</p>
      <p class="album-year">${album.ano_do_album}</p>
      <a href="${album.link}" class="album-link">Link</a>
    </div>
  </div>
  `;
}

function criaLinhaDeAlbuns(uma_linha) {
  const div = document.createElement("div");
  div.classList.add("album-row");
  div.innerHTML = uma_linha.map(coluna => criaCardHtmlParaAlbum(coluna)).join("\n");
  return div;
}

function criaListaDeAlbuns(linhas) {
  const div = document.createElement("div")
  div.classList.add("col-lg-12", "px-0", "container")
  div.setAttribute("id", "album-list")

  linhas.forEach(linha => {
    div.appendChild(criaLinhaDeAlbuns(linha))
  });

  return div
}

function atualizaListaDeAlbuns() {
  const listaDeAlbuns = document.getElementById("album-list")
  const albunsEmbaralhados = embaralhar(meusAlbuns);
  listaDeAlbuns.replaceWith(criaListaDeAlbuns(organizaEmLinhasEColunas(meusAlbuns)))
}


function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


window.addEventListener("load", () => {
  onload()
});


let searchinput = document.getElementById("searchInput")
let searchBtn = document.getElementById("search-button")

searchBtn.addEventListener("click", function(e){
  e.preventDefault()
  let pesquisa = searchinput.value.trim().toLowerCase()
  let AlbunsFiltrados = meusAlbuns.filter((album)=> {
    return album.nome_do_album.toLowerCase().includes(pesquisa)
  })
  const listaDeAlbuns = document.getElementById("album-list")
  listaDeAlbuns.replaceWith(criaListaDeAlbuns(organizaEmLinhasEColunas(AlbunsFiltrados)))
})

document.getElementById('submit-button').addEventListener('click', function() {
  const musica = {
    "nome_do_album": document.getElementById('nome_do_album').value,
    "nome_da_banda": document.getElementById('nome_da_banda').value,
    "ano_do_album": document.getElementById('ano_do_album').value,
    "imagem_da_capa_do_album": document.getElementById('imagem_da_capa_do_album').value,
    "link" : document.getElementById('link').value
  };
  meusAlbuns.push(musica);
  localStorage.setItem("data1" , JSON.stringify(meusAlbuns));
  atualizaListaDeAlbuns()
  
}); 

function onload() {

  new_data_json = localStorage.getItem("data1")
  let new_data_js = JSON.parse(new_data_json)
  if(new_data_js && new_data_js.length != 0){
    meusAlbuns = new_data_js
  }
  console.log(new_data_js)

  let listaDeAlbuns = document.getElementById("album-list")
  listaDeAlbuns.replaceWith(criaListaDeAlbuns(organizaEmLinhasEColunas(JSON.parse(localStorage.getItem("data1")))))
  atualizaListaDeAlbuns()
}

async function pegarDadosDaAPI(nomeDoAlbum) {
  //const nomeDoAlbum = "Is This It"
  const respostaDaApi = await fetch(`https://api.gvillalta.com/albums/${encodeURIComponent(nomeDoAlbum)}`).then(response => response.json())
  return respostaDaApi
}

let listaDeMusicas = pegarDadosDaAPI("Is This It")

if (!array.isArray(listaDeMusicas)) {
  listaDeMusicas = array.from(listaDeMusicas);
  console.log(listaDeMusicas) 
}








