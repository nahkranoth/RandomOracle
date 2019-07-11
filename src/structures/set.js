class Set{
    constructor(settings, generator){
        this.amount = 1;
        this.min = 0;
        this.max = 10;
        if(settings){
            this.amount = settings["amount"] ? settings["amount"] : this.amount;
            this.min = settings["min"] ? settings["min"] : this.min;
            this.max = settings["max"] ? settings["max"] : this.max;
        }
        this.generator = generator;
        this.generateResponse();
    }
    generateResponse(){
        this.list = [];
        for(var i=0;i<this.amount;i++){
            this.list.push(this.minMax(this.generator.request()));
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
