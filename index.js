import charCounter from "./CharCounter.js";
import getAllEpisodes from "./EpisodeLocations.js";

const doExercises = async () => {
    // corre la función que ejecuta el primer ejercicio
    const startTimeEx1 = performance.now();
    const charCountArray = await charCounter();
    const endTimeEx1 = performance.now();
    // calcula el tiempo que se demora la ejecución
    const ex1timeInMs = endTimeEx1 - startTimeEx1;

    // corre la función que ejecuta el segundo ejercicio
    const startTimeEx2 = performance.now();
    // getAllEpisodes retorna un array donde cada objeto es un episodio con la siguiente forma:
    // {
    //     name
    //     episode
    //     locations: [
    //         {
    //             origin { name }
    //         }
    //     ]
    // }
    const allEpisodes = await getAllEpisodes();
    // se modifica el array locations de cada objeto en el array para que quede como un array de strings
    // con el nombre de la location y al final se usa [...new Set(array)] para quitar los repetidos
    allEpisodes.forEach(
        (ep) =>
            (ep.locations = [
                ...new Set(
                    ep.locations.map((location) => location.origin.name)
                ),
            ])
    );
    const endTimeEx2 = performance.now();
    // calcula el tiempo que se demora la ejecución
    const ex2timeInMs = endTimeEx2 - startTimeEx2;

    const objResFinal = [
        {
            exercise_name: "Char counter",
            time: `${Math.floor(ex1timeInMs / 1000)}s ${ex1timeInMs % 1000}ms`,
            in_time: ex1timeInMs < 3000,
            results: [
                {
                    char: "l",
                    count: charCountArray[0],
                    resource: "location",
                },
                {
                    char: "e",
                    count: charCountArray[1],
                    resource: "episode",
                },
                {
                    char: "c",
                    count: charCountArray[2],
                    resource: "character",
                },
            ],
        },
        {
            exercise_name: "Episode locations",
            time: `${Math.floor(ex2timeInMs / 1000)}s ${ex2timeInMs % 1000}ms`,
            in_time: ex2timeInMs < 3000,
            results: allEpisodes,
        },
    ];
    return JSON.stringify(objResFinal);
};

const resultado = await doExercises();
console.log(resultado);