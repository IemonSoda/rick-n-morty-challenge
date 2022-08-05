import millisecondFormatter from "../utils/TimeFormatter.js";
class ProblemFormat {
    exercise_name = "";
    time = "";
    in_time = false;
    results = [];
    constructor(name, time, results) {
        this.exercise_name = name;
        this.time = millisecondFormatter(time);
        this.in_time = this.#executedInTime(time);
        this.results = results;
    }
    #executedInTime(time) {
        return time < 3000;
    }
}
export default ProblemFormat;
