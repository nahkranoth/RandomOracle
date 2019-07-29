class Set{
    constructor(settings, method) {
        this.amount = 1;
        this.min = 0;
        this.max = 1;

        if(settings){
            this.amount = settings["amount"] ? settings["amount"] : this.amount;
            this.min = settings["min"] ? settings["min"] : this.min;
            this.max = settings["max"] ? settings["max"] : this.max;
        }

        this.method = method;
    }

    async generateResponse(){
        this.list = [];
        for(var i=0;i<this.amount;i++){
            let num = await this.method.request();
            this.list.push(this.minMax(num));
        }
    }

    minMax(val){
        return val * (this.max - this.min) + this.min;
    }

    request(){
        return new Promise((resolve, reject) => {
            this.generateResponse().then(() => {
                let xList = [];
                for(var i=0;i<this.list.length;i++){
                    xList.push(i);
                }
                resolve( JSON.stringify({X: xList, Y:this.list}) );
            });
        });
    }
}

module.exports = Set;
