const episodeLocations = async (page) => {
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
    }
};

const getAllEpisodes = async () => {
    let mergedArray = [];
    let res = await episodeLocations(1);
    mergedArray.push(...res.data.episodes.results);
    while (res.data.episodes.info.next) {
        res = await episodeLocations(res.data.episodes.info.next);
        mergedArray.push(...res.data.episodes.results);
    }
    return mergedArray;
};
export default getAllEpisodes;