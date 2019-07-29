import Plotly from "plotly.js-dist";

class App{
    constructor(){
        this.postData().then(data => this.displayData(data)) // JSON-string from `response.json()` call
            .catch(error => console.error(error));
    }

    displayData(data){
        let dataList = JSON.parse(data);
        var trace1 = {
            x: dataList.X,
            y: dataList.Y,
            mode: 'markers',
            type: 'scatter',
            name: 'Team A',
            text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
            marker: { size: 4 }
        };

        var layout = {
            xaxis: {
                range: [0, 100]
            },
            yaxis: {
                range: [0, 100]
            },
            title:'Data Labels Hover'
        };
        Plotly.newPlot('gd', [trace1], layout);
    }

    postData() {

        // let postData = {
        //     "generator":"pseudo",
        //     "generator_settings":{},
        //     "method":"gaussian",
        //     "method_settings": {"mean":0.5, "standard_deviation":0.05},
        //     "structure":"2d-set",
        //     "structure_settings": {"amount":940, "minX":0, "maxX":100, "minY":0, "maxY":100}
        // };

        let postData = {
            "generator":"weather",
            "generator_settings":{},
            "method":"none",
            "method_settings": {},
            "structure":"set",
            "structure_settings": {"amount":10, "min":-99999, "max":99999}
        };

        // Default options are marked with *
        return fetch('http://localhost:3000/', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer',
            body: JSON.stringify(postData)
        })
            .then(response => response.json()); // parses JSON response into native JavaScript objects
    }

}

var app = new App();
