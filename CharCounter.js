const getResponse = async (endpoint) => {
    const res = await fetch(endpoint);
    if (res.ok) {
        const resJSON = await res.json();
        return resJSON;
    }
};

const getAllResults = async (baseURL, endpoint, query, value) => {
    let mergedArray = [];
    urlStr = baseURL + endpoint;
    if (query && value) {
        urlStr += "?" + query + "=" + value;
    }
    let res = await getResponse(urlStr);
    mergedArray.push(...res.results);
    while (res.info.next) {
        res = await getResponse(res.info.next);
        mergedArray.push(...res.results);
    }

    return { info: res.info, results: mergedArray };
};

const charCounter = async () => {
    const locations = await getResponse(
        "https://rickandmortyapi.com/api/location?name=L"
    );
    const episodes = await getResponse(
        "https://rickandmortyapi.com/api/episode?name=E"
    );
    const characters = await getResponse(
        "https://rickandmortyapi.com/api/character?name=C"
    );
    return [locations.info.count, episodes.info.count, characters.info.count];
};

export default charCounter;