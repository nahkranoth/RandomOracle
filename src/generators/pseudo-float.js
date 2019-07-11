class PseudoFloat{
    constructor(settings){
        this.min = 0;
        this.max = 10;
        if(settings){
            this.min = settings["min"] ? settings["min"] : this.min;
            this.max = settings["max"] ? settings["max"] : this.max;
        }
    }

    request(){
        let mi = this.min;
        let ma = this.max;
        return Math.random() * (ma - mi) + mi;
    }
}
module.exports = PseudoFloat;
