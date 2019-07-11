var WeatherInteger = require('../generators/weather-integer.js');

class Set{
    constructor(settings, generator){
        this.amount = settings["amount"];
        this.generator = generator;
        this.generateResponse();
    }
    generateResponse(){
        this.list = [];
        for(var i=0;i<this.amount;i++){
            this.list.push(this.generator.request());
        }
    }
    request(){
        return JSON.stringify(this.list);
    }
}

module.exports = Set;
