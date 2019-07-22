class Set{
    constructor(settings, method){
        this.amount = 1;
        this.min = 0;
        this.max = 10;
        if(settings){
            this.amount = settings["amount"] ? settings["amount"] : this.amount;
            this.min = settings["min"] ? settings["min"] : this.min;
            this.max = settings["max"] ? settings["max"] : this.max;
        }
        this.method = method;
        this.generateResponse();
    }

    generateResponse(){
        this.list = [];
        for(var i=0;i<this.amount;i++){

            let num = this.method.request(); //TODO: should be ALL be a promise

            this.list.push(this.minMax(num));
        }
    }

    minMax(val){
        return val * (this.max - this.min) + this.min;
    }

    request(){
        return JSON.stringify(this.list);
    }
}

module.exports = Set;
