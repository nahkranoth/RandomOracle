//Guassian normal distribution
class Gaussian{
    constructor(settings){
        this.mean = 1;
        this.standardDev = 0;
        if (settings) {
            this.mean = settings["mean"] ? settings["mean"] : this.mean;
            this.standardDev = settings["standard_deviation"] ? settings["standard_deviation"] : this.standardDev;
        }
    }

    request(){
        return this.gaussianRandAdj(this.mean, this.standardDev);
    }

    gaussianRand() {
        let result;
        this.generate = true;
        this.value0   = 0.0;
        this.value1   = 0.0;

        if(this.generate) {
            var x1 = 0.0;
            var x2 = 0.0;
            var w  = 0.0;

            do {
                // Math.random() gives value on range [0, 1) but
                // the Polar Form expects [-1, 1].
                x1 = (2.0 * Math.random()) - 1.0;
                x2 = (2.0 * Math.random()) - 1.0;
                w  = (x1 * x1) + (x2 * x2);
            } while(w >= 1.0);

            w = Math.sqrt((-2.0 * Math.log(w)) / w);

            this.value0 = x1 * w;
            this.value1 = x2 * w;

            result = this.value0;
        } else {
            result = this.value1;
        }

        this.generate = !this.generate;
        return result;
    }

    gaussianRandAdj(mean, stddev) {
        const value = this.gaussianRand();
        return ((value * stddev) + mean);
    }

}
module.exports = Gaussian;
