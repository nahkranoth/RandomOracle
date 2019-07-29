class TwoDeeSet{
    constructor(settings, method){
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
        this.method = method;
    }
    
    async generateResponse(){
        this.listX = [];
        this.listY = [];

        for(var i=0;i<this.amount;i++){
            let x = await this.method.request();
            this.listX.push(this.minMax(x, this.minX, this.maxX));
        }

        for(i=0;i<this.amount;i++){
            let y = await this.method.request();
            this.listY.push(this.minMax(y, this.minY, this.maxY));
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
