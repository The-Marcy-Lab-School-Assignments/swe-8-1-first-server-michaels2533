const path = require('path')

require('dotenv').config({ path:'../.env'  });

const handleJokeFetch = async () => {
 try {
    const response = await fetch('https://api.api-ninjas.com/v1/jokes', {
        method: 'GET', 
        headers: { 
         // Insert your API key here. 
            'X-API-Key': process.env.API_KEY,
            'contentType' :'application/json'
         }
    })
    const {ok, status, statusText, headers} = response; 
    if(!ok) throw new Error(`Fetch failed with status - ${status}, ${statusText}`);

    // figure out the type of response (JSON or non-JSON)
    const isJson = (headers.get('content-type') || '').includes('application/json');

    // use response.json() for JSON responses and response.text() for all other content types
    const jokeData = await (isJson ? response.json() : response.text());

    return [jokeData, null];
 } catch(error) {

    console.warn(error)
    return [null, error];
 }
}


module.exports = handleJokeFetch