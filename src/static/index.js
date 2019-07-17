import Plotly from "plotly.js-dist";

class App{
    constructor(){
        console.log(CONFIG);
        Plotly.plot("gd", [{ x: [0, 1], y: [0, 1] }]);
        console.log("App initialized");
        this.postData().then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
            .catch(error => console.error(error));;
    }

    postData(url = '', data = {}) {

        let data = {
            "generator":"pseudo",
            "generator_settings":{},
            "structure":"set",
            "structure_settings":{"amount":44, "min":0, "max":44},
            "method":"monte-carlo",
            "method_settings":{"weight":0.1}
        };

        // Default options are marked with *
        return fetch('http://localhost:3000/', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                //'Content-Type': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: data, // body data type must match "Content-Type" header
        })
            .then(response => response.json()); // parses JSON response into native JavaScript objects
    }

}

var app = new App();