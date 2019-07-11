class MonteCarlo{
    constructor(settings){
        this.weight = 1;
        if (settings){
            this.weight = settings["weight"] ? settings["weight"] : this.weight;
        }
    }

    request(){
        while (true) {
            var r1 = Math.random();
            var r2 = Math.random();
            if (r2 < this.weight) {
                return r1;
            }
        }
    }
}
module.exports = MonteCarlo;
