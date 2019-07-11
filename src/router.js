var bodyParser = require('body-parser');
var PseudoInteger = require('./generators/pseudo-integer');
var PseudoFloat = require('./generators/pseudo-float');
var WeatherInteger = require('./generators/weather-integer');
var SetStructure = require('./structures/set');

class Router{
    constructor(app){
        app.get('/favicon.ico', (req, res) => res.status(204));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({
            extended: true
        }));

        app.post('/*', (req, res) => { this.buildResponse(req, res) });
    }


    //TODO: This info and code should not be part of the router for now it's good

    // Generators generate a single number from a specific source.
    // Manipulators manipulate that number
    // Structures represent the numbers, in a data format. This can be as a single number, sequence of numbers, or specific data structure.
    // Note that these parameters are sent as a x-www-form-url-encoded Body in the HTTP(S) calls.
    // Without this it's not going to do anything

    // A POST Call can have the following body params:

    // generator:               specify generator
    // generator_settings:      specific generator config
    // manipulator:           specify manipulator
    // manipulator_settings:  specify manipulator settings
    // structure:               specify structure
    // structure_settings:      specific structure settings

    buildResponse(req, res){

        let params = req.body;
        let generator = params.generator;
        let generator_settings = params.generator_settings ? JSON.parse(params.generator_settings) : undefined;
        let structure = params.structure;
        let structure_settings = JSON.parse(params.structure_settings);

        let activeGenerator;
        let activeStructure;

        //TODO: Make mapping dictionary for generators, structures and manipulators
        if(generator === "pseudo-int"){
            activeGenerator = new PseudoInteger(generator_settings);
        }else if(generator === "pseudo-float"){
            activeGenerator = new PseudoFloat(generator_settings);
        }

        if(structure === "set"){
            activeStructure = new SetStructure(structure_settings, activeGenerator);
        }

        return res.json( activeStructure.request() );
    }
}

module.exports = Router;
