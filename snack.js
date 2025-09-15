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
    const [destinations, weathers, airports] = await Promise.all(promises);

    const destination = destinations[0];
    const weather = weathers[0];
    const airport = airports[0];
    // OPPURE
    //   const results = await Promise.all(promises)
    //   const destinations = results[0]
    //   const weather = results[1]
    //   const airport = results[2]

    return {
      city: destination ? destination.name : null, 
      country: destination ? destination.country : null,
      temperature: weather ? weather.temperature : null,
      weather: weather ? weather.weather_description : null,
      airport: airport ? airport.name : null,
    };
  } catch (error) {
    throw new Error(`Errore nel recupero dei dati: ${error.message}`);
  }
}

getDashboardData("london")
  .then((data) => {
    console.log("Dasboard data:", data);
    let frase = "";
    if (data.city !== null && data.country !== null) {
      frase += `${data.city} is in ${data.country}.\n`;
    }
    if (data.temperature !== null && data.weather !== null) {
      frase += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
    }
    if (data.airport !== null) {
      frase += `The main airport is ${data.airport}.\n`;
    }
    console.log(frase);
  })
  .catch((error) => console.error(error));
  
// 🎯  Bonus 1 - Risultato vuoto
// Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione, semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata. Testa la funzione con la query “vienna” (non trova il meteo).

// 🎯 Bonus 2 - Chiamate fallite
// Attualmente, se una delle chiamate fallisce, **Promise.all()** rigetta l'intera operazione.

// Modifica `getDashboardData()` per usare **Promise.allSettled()**, in modo che:
// Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
// Stampa in console un messaggio di errore per ogni richiesta fallita.
// Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it)
