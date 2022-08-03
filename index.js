const getResponse = async endpoint => {
    const res = await fetch(endpoint);
    if (res.ok) {
        const resJSON = await res.json();
        return resJSON;
    }
}

const getAllResults = async (baseURL, endpoint, query, value) => {
    let mergedArray = [];
    let res = await getResponse(baseURL + endpoint + "?" + query + "=" + value);
    mergedArray.push(...res.results);
    while (res.info.next){
        res = await getResponse(res.info.next);
        mergedArray.push(...res.results);
    }
    console.log(`Total ${endpoint}s with ${value} in their name: ${mergedArray.length}`);
}
getResponse("https://rickandmortyapi.com/api/location?name=L")
    .then(res => console.log(`Locations with L in their name: ${res.info.count}`));
getResponse("https://rickandmortyapi.com/api/episode?name=E")
    .then(res => console.log(`Episodes with E in their name: ${res.info.count}`));
getResponse("https://rickandmortyapi.com/api/character?name=C")
    .then(res => console.log(`Characters with C in their name: ${res.info.count}`));

/* getAllResults("https://rickandmortyapi.com/api/", "location", "name", "L");
getAllResults("https://rickandmortyapi.com/api/", "episode", "name", "E");
getAllResults("https://rickandmortyapi.com/api/", "character", "name", "C"); */

