class PseudoInteger{
    constructor(settings){
        this.min = settings["min"] ? settings["min"] : 0;
        this.max = settings["max"] ? settings["max"] : 1;
    }

    request(){
        return this.requestMinMax()
    }

    requestMinMax(){
        let mi = Math.ceil(this.min);
        let ma = Math.floor(this.max);
        return Math.floor(Math.random() * (ma - mi)) + mi;
    }

}
module.exports = PseudoInteger;
