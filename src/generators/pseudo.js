class Pseudo{
    constructor(settings){
    }

    request(){
        return new Promise((resolve, reject) => {
            resolve(Math.random())
        });
    }
}
module.exports = Pseudo;
