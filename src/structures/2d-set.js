class TwoDeeSet{
    constructor(settings, generator){
        this.amount = 1;
        this.minX = 0;
        this.maxX = 10;
        this.minY = 0;
        this.maxY = 10;

        if(settings){
            this.amount = settings["amount"] ? settings["amount"] : this.amount;
            this.minX = settings["minX"] ? settings["minX"] : this.minX;
            this.maxX = settings["maxX"] ? settings["maxX"] : this.maxX;
            this.minY = settings["minY"] ? settings["minY"] : this.minY;
            this.maxY = settings["maxY"] ? settings["maxY"] : this.maxY;
        }

        this.generator = generator;
        this.generateResponse();
    }
    generateResponse(){
        this.listX = [];
        for(var i=0;i<this.amount;i++){
            this.listX.push(this.minMax(this.generator.request(), this.minX, this.maxX));
        }
        this.listY = [];
        for(i=0;i<this.amount;i++){
            this.listY.push(this.minMax(this.generator.request(), this.minY, this.maxY));
        }
    }

    minMax(val, min, max){
        return val * (max - min) + min;
    }

    request(){
        return JSON.stringify({ X:this.listX, Y:this.listY });
    }
}

module.exports = TwoDeeSet;
