var usuarios = []
var estatistica = {}

async function buscarUsuarios() {
  const response = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
  const data = await response.json()

  return data.results
}

function filtarDados(filtro) {
  const usuariosFiltrados = []

  for(const usuario of usuarios) {
    if(usuario.name.first.toUpperCase().indexOf(filtro.toUpperCase()) >= 0 || usuario.name.last.toUpperCase().indexOf(filtro.toUpperCase()) >= 0) {
      usuariosFiltrados.push(usuario)
    }
  }

  calcularDadosEstatisticas(usuariosFiltrados)
  montarDadosVazios(usuariosFiltrados)
  montarListaUsuarios(usuariosFiltrados)
  montarDadosEstatisticos(estatistica)
}

function montarListaUsuarios(usuarios) {
  const listaUsuarios = document.getElementById("dadosUsuarios");
  listaUsuarios.innerHTML = ""

  for(const usuario of usuarios) {
    const avatar = document.createElement('img');
    avatar.src = usuario.picture.thumbnail;

    const text = document.createElement('span');
    text.appendChild(document.createTextNode(`${usuario.name.first} ${usuario.name.last}, ${usuario.dob.age} anos`));

    const item = document.createElement("li");
    item.appendChild(avatar);
    item.appendChild(text);

    listaUsuarios.appendChild(item);
  }
}

function montarDadosEstatisticos(estatistica) {
  document.querySelector('#sexoMasculino').innerHTML = estatistica.sexoMasculino
  document.querySelector('#sexoFeminino').innerHTML = estatistica.sexoFeminino
  document.querySelector('#somaIdades').innerHTML = estatistica.somaIdades
  document.querySelector('#mediaIdades').innerHTML = estatistica.mediaIdades
}

function montarDadosVazios(usuarios) {
  if(usuarios.length > 0) {
    document.querySelector('#semDadosEstatisticas').style.display = 'none'
    document.querySelector('#semDadosUsuarios').style.display = 'none'
    document.querySelector('#dadosEstatisticas').style.display = 'block'
    document.querySelector('#dadosUsuarios').style.display = 'block'
  } else {
    document.querySelector('#semDadosEstatisticas').style.display = 'block'
    document.querySelector('#semDadosUsuarios').style.display = 'block'
    document.querySelector('#dadosEstatisticas').style.display = 'none'
    document.querySelector('#dadosUsuarios').style.display = 'none'
  }
}

function calcularDadosEstatisticas(usuarios) {
  estatistica = {
    sexoMasculino: 0,
    sexoFeminino: 0,
    somaIdades: 0,
    mediaIdades: 0
  }

  if(usuarios.length === 0) {
    return
  }

  for(const usuario of usuarios) {
    if(usuario.gender === 'female') {
      estatistica.sexoFeminino++
    } else {
      estatistica.sexoMasculino++
    }
    estatistica.somaIdades += usuario.dob.age
  }

  estatistica.mediaIdades = estatistica.somaIdades / usuarios.length
  console.log(estatistica)
}

function registarEventosCampoBusca() {
  var buscarInput = document.querySelector('#buscarInput')
  var buscarButton = document.querySelector('#buscarButton')

  buscarInput.addEventListener('input', function (event) {
    buscarButton.disabled = !event.target.value
  })
  buscarInput.addEventListener('keyup', function (event) {
    if (event.keyCode === 13) {
      filtarDados(buscarInput.value)
    }
  })

  buscarButton.addEventListener('click', function (event) {
    filtarDados(buscarInput.value)
  })
}

async function start() {
  registarEventosCampoBusca()
  usuarios = await buscarUsuarios()
  calcularDadosEstatisticas(usuarios)
  montarListaUsuarios(usuarios)
  montarDadosEstatisticos(estatistica)
  montarDadosVazios(usuarios)
  console.log(usuarios)
}

window.addEventListener('load', start)
