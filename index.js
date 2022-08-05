import charCounter from "./Controllers/CharCounter.js";
import getAllEpisodes from "./Controllers/EpisodeLocations.js";

const doExercises = async () => {
    // corre la función que ejecuta el primer ejercicio
    const solution1 = await charCounter();

    // corre la función que ejecuta el segundo ejercicio
    const solution2 = await getAllEpisodes();

    // arma la respuesta final del desafío
    const objResFinal = [solution1, solution2];

    return JSON.stringify(objResFinal);
};

const resultado = await doExercises();
console.log(resultado);
