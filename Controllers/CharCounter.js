import ProblemFormat from "../Models/Problem.js";
import ProblemOneResult from "../Models/ProblemOneResults.js";

const getResponse = async (endpoint) => {
    const res = await fetch(endpoint);
    if (res.ok) {
        const resJSON = await res.json();
        return resJSON;
    }
};
//falta hacer más automático esta función
const charCounter = async () => {
    const startTime = performance.now();
    const locations = await getResponse(
        "https://rickandmortyapi.com/api/location?name=L"
    );
    const episodes = await getResponse(
        "https://rickandmortyapi.com/api/episode?name=E"
    );
    const characters = await getResponse(
        "https://rickandmortyapi.com/api/character?name=C"
    );
    const endTime = performance.now();

    const time = endTime - startTime;
    console.log(locations);
    const formattedSolution = new ProblemFormat("Char counter", time, [
        new ProblemOneResult("l", locations.info.count, "location"),
        new ProblemOneResult("e", episodes.info.count, "episode"),
        new ProblemOneResult("c", characters.info.count, "character"),
    ]);

    return formattedSolution;
};

export default charCounter;
