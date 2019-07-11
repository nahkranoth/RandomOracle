var bodyParser = require('body-parser');
var PseudoInteger = require('./generators/pseudo-integer');
var WeatherInteger = require('./generators/weather-integer');
var SetStructure = require('./structures/set');

class Router{
    constructor(app){
       /* app.get("/pseudo-int", (req, res) => { new PseudoInteger().request(res); });
        app.get("/pseudo-int/:minrange/:maxrange", (req, res) => { new PseudoInteger().requestMinMax(res, req.params.minrange, req.params.maxrange) });
        app.get("/weather-int", async (req, res) => { new WeatherInteger().request(res) });*/

        app.get('/favicon.ico', (req, res) => res.status(204));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.post('/*', (req, res) => { this.buildResponse(req, res) });
    }


    // A POST Call can have the following body params:

    // generator:           specify generator
    // generator_settings:  specific generator config
    // structure:           specify structure
    // structure_settings:  specific structure settings

    //TODO: Should not be part of the router for now it's good
    buildResponse(req, res){
        //deconstruct option parameters
        //handle options
            //init generator with data
            //get structure
            //let it retrieve data from generator

        let params = req.body;
        let generator = params.generator;
        let generator_settings = params.generator_settings ? JSON.parse(params.generator_settings) : null;
        let structure = params.structure;
        let structure_settings = JSON.parse(params.structure_settings);

        let activeGenerator;
        let activeStructure;

        console.log(generator);

        if(generator === "pseudo-int"){
            activeGenerator = new PseudoInteger(generator_settings);
        }

        if(structure === "set"){
            activeStructure = new SetStructure(structure_settings, activeGenerator);
        }

        return res.json( activeStructure.request() );
    }
}

module.exports = Router;
