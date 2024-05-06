// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

const app = express()
const baseUrl = 'https://fdnd-agency.directus.app/'
const likes = [] 

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

// GET Route voor de homepagina
app.get('/', function(request, response) {
	fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((HallenDataUitDeAPI) => {
		response.render('home', {
			hallenData: HallenDataUitDeAPI.data,
			likes: likes
		})
	})
})

// POST Route voor de homepagina
app.post('/', function (request, response) {
	likes.push(request.body.like)
	
	response.redirect(303, '/')
})

// GET Route voor de initiatiefpagina
app.get('/initiatief/:initiatief', function(request, response) {
	fetchJson('https://fdnd-agency.directus.app/items/dh_services?filter={"id":' + request.params.initiatief + '}').then((HallenDataUitDeAPI) => {
		response.render('initiatief', {
			hallenData: HallenDataUitDeAPI.data[0]
		})
	})
})

// POST Route voor de initiatiefpagina
app.post('/initiatief/:id', function (request, response) {
	fetchJson(`${baseUrl}items/dh_services/${request.params.id}`).then(({ data }) => {
	  fetch(`${baseUrl}items/dh_services/${request.params.id}`, {
		method: 'PATCH',
		body: JSON.stringify({
		  likes: data.likes + 1,
		}),
		headers: {
		  'Content-type': 'application/json; charset=UTF-8',
		},
	  }).then((patchResponse) => {
		if (request.body.enhanced) {
			response.render('partials/likes', {hallenData: {likes: data.likes + 1}})
		} else {
			response.redirect(303, '/initiatief/' + request.params.id)
		}
	  })
   })
})

// GET Route voor de aanvraagpagina
app.get('/aanvraag', function(request, response) {
	fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((HallenDataUitDeAPI) => {
		response.render('aanvraag', {
			hallenData: HallenDataUitDeAPI.data,
		})
	})
})

// GET Route voor de contactpagina
app.get('/contact', function(request, response) {
	fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((HallenDataUitDeAPI) => {
		response.render('contact', {
			hallenData: HallenDataUitDeAPI.data,
		})
	})
})

// GET Route voor de FAQ pagina
app.get('/faq', function(request, response) {
	fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((HallenDataUitDeAPI) => {
		response.render('faq', {
			hallenData: HallenDataUitDeAPI.data,
		})
	})
})

// Poortnummer voor de LocalHost
app.set('port', process.env.PORT || 8000)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function() {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})