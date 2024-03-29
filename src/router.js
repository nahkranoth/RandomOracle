var express = require('express');
var cors = require('cors');
var MustacheExpress = require('mustache-express');

var bodyParser = require('body-parser');
var Pseudo = require('./generators/pseudo');
var Weather = require('./generators/weather');
var GaussianMethod = require('./methods/gaussian');
var SetStructure = require('./structures/set');
var TwoDeeSetStructure = require('./structures/2d-set');

class Router{
    constructor(app){

        app.engine('html', MustacheExpress());
        app.set('view engine', 'html');
        app.set('views', __dirname + '/dist');
        app.use(cors());
        app.use(express.static(__dirname + '/dist'));
        app.get('/favicon.ico', (req, res) => res.status(204));
        app.use(express.json());

        //APP GET ROUTE
        app.get('/', (req, res) => {
            //let config = JSON.stringify({a:"test", b:"test2"});
            res.render("main.html");
        });

        //API POST ROUTE
        app.post('/*', (req, res) => { this.buildResponse(req, res) });
    }

    //TODO: This info and code should not be part of the router for now it's good

    // Generators generate a single number from a specific source.
    // Methods manipulate that number
    // Structures represent the numbers, in a data format. This can be as a single number, sequence of numbers, or specific data structure.
    // Note that these parameters are sent as a x-www-form-url-encoded Body in the HTTP(S) calls.
    // Without this it's not going to do anything

    // All values until structures are normalized
    // In structure settings you specify how you want the data to be specified

    // A POST Call can have the following body params:
    // generator:           specify generator
    // generator_settings:  specific generator config
    // method:              specify manipulator
    // method_settings:     specify manipulator settings
    // structure:           specify structure
    // structure_settings:  specific structure settings

    buildResponse(req, res){
        let params = req.body;
        let generator = params.generator;
        let generator_settings = params.generator_settings ? params.generator_settings : undefined;
        let method = params.method;
        let method_settings = params.method_settings ? params.method_settings : undefined;
        let structure = params.structure;
        let structure_settings = params.structure_settings;

        let activeGenerator;
        let activeMethod;
        let activeStructure;

        //TODO: Make mapping dictionary for generators, structures and methods

        //Order matters, one feeds into the other

        //Generators are always returning normalized values
        if(generator === "pseudo"){
            activeGenerator = new Pseudo(generator_settings);
        }else if(generator === "weather"){
            activeGenerator = new Weather(generator_settings);
        }

        //Methods are always returning normalized values
        if(method === "gaussian"){
            activeMethod = new GaussianMethod(method_settings, activeGenerator);
        }else{
            activeMethod = activeGenerator;
        }

        //Structures structure and reformat the raw normalized values back into a domain
        if(structure === "set"){
            activeStructure = new SetStructure(structure_settings, activeMethod);
        }else if(structure === "2d-set"){
            activeStructure = new TwoDeeSetStructure(structure_settings, activeMethod);
        }

        activeStructure.request().then((data) => {
            return res.json( data );
        });
    }
}

module.exports = Router;
