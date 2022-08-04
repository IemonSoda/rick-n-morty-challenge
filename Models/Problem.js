class ProblemFormat {
    exercise = {
        exercise_name: "",
        time: "",
        in_time: true,
        results: [
            {
                char: "",
                count: 0,
                resource: "",
            }
        ]
    }
    constructor(name, time, results) {
        this.exercise.exercise_name = name;
        this.exercise.time = time;
        this.exercise.inTime = this.#executedInTime(time);
        this.exercise.results = results;
    }
    #executedInTime(time){
        return time < 3000;
    }
}
export default ProblemFormat;