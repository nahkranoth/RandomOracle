class PseudoInteger{
    constructor(){
    }

    request(res){
        return res.json(Math.round(Math.random()*10));
    }

    requestMinMax(res, min, max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return res.json(Math.floor(Math.random() * (max - min)) + min);
    }

}
module.exports = PseudoInteger;
