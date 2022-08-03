const getResponse = async endpoint => {
    const res = await fetch(endpoint);
    if (res.ok) {
        const resJSON = await res.json();
        return resJSON;
    }
}

const getAllResults = async (baseURL, endpoint, query, value) => {
    let mergedArray = [];
    urlStr = baseURL + endpoint;
    if (query && value){
        urlStr += "?" + query + "=" + value;
    }
    let res = await getResponse(urlStr);
    mergedArray.push(...res.results);
    while (res.info.next){
        res = await getResponse(res.info.next);
        mergedArray.push(...res.results);
    }

    return {info: res.info, results: mergedArray};
}

const charCounter = async () => {
    const locations = await getResponse("https://rickandmortyapi.com/api/location?name=L");
    const episodes = await getResponse("https://rickandmortyapi.com/api/episode?name=E")
    const characters = await getResponse("https://rickandmortyapi.com/api/character?name=C")
    return [locations.info.count, episodes.info.count, characters.info.count]
}

const episodeLocations = async () => {
    //const allCharacters = await getAllResults("https://rickandmortyapi.com/api/", "character");
    const query = `
        query {
            characters(filter: { name: "c" }) {
                info {
                  count
                }
            }
        }
    `;
    const res = await fetch("https://rickandmortyapi.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({query})
    });
    if(res.ok){
        const resJSON = await res.json();
        console.log(resJSON.data.characters.info.count);
    }
    




    const allEpisodes = await getAllResults("https://rickandmortyapi.com/api/", "episode");

    /* console.log(allEpisodes.results.map(({name, episode, characters}) => ({
        name: name, 
        episode: episode, 
        locations: characters})));  */
}


(async () =>{
    const startTimeEx1 = performance.now();
    const charCountArray = await charCounter(); 
    const endTimeEx1 = performance.now();

    const ex1timeInMs = endTimeEx1 - startTimeEx1;

    const startTimeEx2 = performance.now();
    await episodeLocations(); 
    const endTimeEx2 = performance.now();

    const ex2timeInMs = endTimeEx2 - startTimeEx2;

    const objResFinal = [{
        exercise_name: "Char counter",
        time: `${Math.floor(ex1timeInMs/1000)}s ${ex1timeInMs % 1000}ms`,
        in_time: ex1timeInMs < 3000,
        results: [
            {
                char: "l",
                count: charCountArray[0],
                resource: "location"
            },
            {
                char: "e",
                count: charCountArray[1],
                resource: "episode"
            },
            {
                char: "c",
                count: charCountArray[2],
                resource: "character"
            }
        ]
    },
    {
        exercise_name: "Episode locations",
        time: `${ Math.floor(ex2timeInMs / 1000) }s ${ex2timeInMs % 1000}ms`,
        in_time: ex2timeInMs < 3000,
        results: []
    }
]
    console.log(JSON.stringify(objResFinal));
    
    
})()
