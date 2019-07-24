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
    }
    generateResponse(){
        this.listX = [];
        this.listY = [];

        return new Promise((resolve) => {
            for(var i=0;i<this.amount;i++){
                this.generator.request().then(
                    (value) =>{
                        this.listX.push(this.minMax(value, this.minX, this.maxX));
                    }
                ).then(() =>{ this.isResponseReady(resolve) });
            }

            for(i=0;i<this.amount;i++){
                this.generator.request().then(
                    (value) =>{
                        this.listY.push(this.minMax(value, this.minY, this.maxY));
                    }
                ).then(() =>{ this.isResponseReady(resolve) });
            }
        });
    }

    isResponseReady(resolve){
        if(this.listX.length === this.amount && this.listY.length === this.amount){
            resolve();
        }
    }

    minMax(val, min, max){
        return val * (max - min) + min;
    }

    request(){
        return new Promise((resolve, reject) => {
            this.generateResponse().then(() => {
                resolve( JSON.stringify({ X:this.listX, Y:this.listY }) )
            });
        });
    }
}

module.exports = TwoDeeSet;
