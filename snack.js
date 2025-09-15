// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).
// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).
// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.

// Note del docente

// Scrivi la funzione getDashboardData(query), che deve:
// Essere asincrona (async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london"

const API_URL = "http://localhost:3333";

async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

async function getDashboardData(query) {
  try {
    console.log(`Caricando la dashboard per la query: ${query}`);
    const destinationPromise = fetchJson(`${API_URL}/destinations?search=${query}`);
    console.log(destinationPromise);
    const weatherPromise = fetchJson(`${API_URL}/weathers?search=${query}`);
    console.log(weatherPromise);
    const airportPromise = fetchJson(`${API_URL}/airports?search=${query}`);
    console.log(airportPromise);

    const promises = [destinationPromise, weatherPromise, airportPromise];
    const [destination, weather, airport] = await Promise.all(promises);
    console.log([destination, weather, airport]);
    // OPPURE
    //   const results = await Promise.all(promises)
    //   const destinations = results[0]
    //   const weather = results[1]
    //   const airport = results[2]

    return {
      city: destination[0].name,
      country: destination[0].country,
      temperature: weather[0].temperature,
      weather: weather[0].weather_description,
      airport: airport[0].name,
    };
  } catch (error) {
    throw new Error(`Errore nel recupero dei dati: ${error.message}`);
  }
}

getDashboardData("london")
  .then((data) => {
    console.log("Dasboard data:", data);
    console.log(`${data.city} is in ${data.country}.\n` + `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` + `The main airport is ${data.airport}.\n`);
  })
  .catch((error) => console.error(error));
