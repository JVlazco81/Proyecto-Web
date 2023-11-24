let botonRandom
let botonRaza
let imagen
let selectorRaza
let etiquetaContadora
let contador = 0
let tabla
let botonLike
let imagenID = 0

function init(){
	botonRandom = document.getElementById('botonPerroAleatorio')
	imagen = document.getElementById('imgRandom')
	selectorRaza = document.getElementById('selectorRaza')
	etiquetaContadora = document.getElementById('contador')
	tabla = document.querySelector('#tabla > tbody')
	botonLike = document.getElementById('like')
	botonRandom.addEventListener('click',getSelectorValue)
	botonLike.addEventListener('click',darLike)
}

async function getDataRandom(){
	try{
		const promise = await fetch('https://dog.ceo/api/breeds/image/random')
		const perro = await promise.json()
		imagen.src = perro.message
		contarVistas()

	}catch(err){
		alert('Ocurrió un error ' + err)
	}
	playAudio('pulsar')
	imagenID++
	gestorLikes = false
}

async function getDataRaza(){
	try{
		const promise = await fetch(`https://dog.ceo/api/breed/${selectorRaza.value}/images/random`)
		const perro = await promise.json()
		imagen.src = perro.message
		contarVistas()
	}catch(err){
		alert('Ocurrió un error ' + err)
	}
	playAudio('pulsar')
	imagenID++
	gestorLikes = false
}

function playAudio(opcion){
	let audio = document.createElement('audio')
	
	if(opcion === 'like'){
		audio.setAttribute('src','recursos/like.mpeg')
		audio.play()
	}else if(opcion === 'pulsar'){
		audio.setAttribute('src','recursos/pulsar.mpeg')
		audio.play()
	}else if(opcion === 'eliminar'){
		audio.setAttribute('src','recursos/eliminar.mpeg')
		audio.play()
	}
}

function contarVistas(){
	contador++
	etiquetaContadora.innerText = contador
}

function darLike(){
	var html = ''
	html = `
	<tr>
		<td>${imagen.src}</td>
		<td>
			<img src="${imagen.src}" class="mediano" data-id="${imagenID}">
		</td>
		<td>
			<button class="btn-eliminar btn btn-danger" title="Eliminar de los likes" data-id="${imagenID}">X</button>
		</td>
	</tr>
	`
	tabla.innerHTML += html

	document.querySelectorAll(".btn-eliminar").forEach(boton => {
		boton.addEventListener("click",() => {
			playAudio('eliminar')
			fila = document.querySelector(`button[data-id='${boton.dataset.id}']`)
			fila.closest('tr').remove()
		})
	})
	playAudio('like')
	imagenID++
}

function getSelectorValue(){
	if(selectorRaza.value === 'random'){
		getDataRandom()
	}else{
		getDataRaza()
	}
}
window.addEventListener('load', init)