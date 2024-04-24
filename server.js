// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

const baseUrl = 'https://fdnd-agency.directus.app/'

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))

// Deze Array verzamelt berichten
const likes = [] 

// GET Routes voor alle pagina's 
app.get('/', function(request, response) {
	fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((HallenDataUitDeAPI) => {
		response.render('home', {
			hallenData: HallenDataUitDeAPI.data,
			likes: likes
		})
	})
})

app.get('/initiatief/:initiatief', function(request, response) {
	fetchJson('https://fdnd-agency.directus.app/items/dh_services?filter={"id":' + request.params.initiatief + '}').then((HallenDataUitDeAPI) => {
		response.render('initiatief', {
			hallenData: HallenDataUitDeAPI.data[0]
		})
	})
})

app.get('/aanvraag', function(request, response) {
	fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((HallenDataUitDeAPI) => {
		response.render('aanvraag', {
			hallenData: HallenDataUitDeAPI.data,
		})
	})
})

app.get('/contact', function(request, response) {
	fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((HallenDataUitDeAPI) => {
		response.render('contact', {
			hallenData: HallenDataUitDeAPI.data,
		})
	})
})

app.get('/faq', function(request, response) {
	fetchJson('https://fdnd-agency.directus.app/items/dh_services').then((HallenDataUitDeAPI) => {
		response.render('faq', {
			hallenData: HallenDataUitDeAPI.data,
		})
	})
})

// Maak een POST route voor de index
app.post('/', function (request, response) {
	likes.push(request.body.like)
	
	response.redirect(303, '/')
  })

// Als we vanuit de browser een POST doen op de detailpagina van een persoon
app.post('/initiatief/:id', function (request, response) {
	// Stap 1: Haal de huidige data op, zodat we altijd up-to-date zijn, en niks weggooien van anderen
  
	// Haal eerst de huidige gegevens voor dit board op, uit de WHOIS API
	fetchJson(`${baseUrl}items/dh_services/${request.params.id}`).then(({ data }) => {
	  // Stap 2: Sla de nieuwe data op in de API
	  // Voeg de nieuwe lijst messages toe in de WHOIS API, via een PATCH request
	  fetch(`${baseUrl}items/dh_services/${request.params.id}`, {
		method: 'PATCH',
		body: JSON.stringify({
		  likes: data.likes + 1,
		}),
		headers: {
		  'Content-type': 'application/json; charset=UTF-8',
		},
	  }).then((patchResponse) => {
		// Redirect naar de persoon pagina
		response.redirect(303, '/initiatief/' + request.params.id)
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