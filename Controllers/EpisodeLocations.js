import ProblemFormat from "../Models/Problem.js";
// episodeLocations busca los resultados de la página que se le indique y devuelve el .json() de la respuesta
const episodeLocations = async (page) => {
    //importante, la query debe pedir el obj info para saber la siguiente página y hacer otro request
    const query = `
        query {
            episodes(page: ${page}) {
                info {
                    next
                }
                results {
                    name
                    episode
                    locations: characters{
                        origin{
                            name
                        }
                    }
                }
            }
        }
    `;
    const res = await fetch("https://rickandmortyapi.com/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ query }),
    });
    if (res.ok) {
        const resJSON = await res.json();
        return resJSON;
    } else {
        return "error";
    }
};
// getAllEpisodes retorna un array donde cada objeto es un episodio con la siguiente forma:
// {
//     name:"Pilot",
//     episode:"S01E01",
//     locations:["Earth (C-137)","unknown","Bepis 9","Gromflom Prime","Girvonesk"]
// }
const getAllEpisodes = async () => {
    const startTime = performance.now();
    let mergedArray = [];
    let res = await episodeLocations(1);
    if (typeof res === "string") {
        return res;
    }
    mergedArray.push(...res.data.episodes.results);
    while (res.data.episodes.info.next) {
        res = await episodeLocations(res.data.episodes.info.next);
        mergedArray.push(...res.data.episodes.results);
    }
    // se modifica el array locations de cada objeto en el array para que quede como un array de strings
    // con el nombre de la location y al final se usa [...new Set(array)] para quitar los repetidos
    mergedArray.forEach(
        (ep) =>
            (ep.locations = [
                ...new Set(
                    ep.locations.map((location) => location.origin.name)
                ),
            ])
    );
    const endTime = performance.now();
    const solution2 = new ProblemFormat(
        "Episode locations",
        endTime - startTime,
        mergedArray
    );
    return solution2;
};
export default getAllEpisodes;
