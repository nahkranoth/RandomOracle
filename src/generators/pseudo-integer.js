class PseudoInteger{
    constructor(settings){
        this.min = 0;
        this.max = 10;
        if(settings){
            this.min = settings["min"] ? settings["min"] : this.min;
            this.max = settings["max"] ? settings["max"] : this.max;
        }
    }

    request(){
        let mi = Math.ceil(this.min);
        let ma = Math.floor(this.max);
        return Math.floor(Math.random() * (ma - mi)) + mi;
    }
}
module.exports = PseudoInteger;
