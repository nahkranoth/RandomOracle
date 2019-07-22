import Plotly from "plotly.js-dist";

class App{
    constructor(){
        this.postData().then(data => this.displayData(data)) // JSON-string from `response.json()` call
            .catch(error => console.error(error));
    }

    displayData(data){
        let dataList = JSON.parse(data);

        let dataIndexList = [];
        for(var i=0;i<dataList.length;i++){
            dataIndexList.push(i);
        }

        var trace1 = {
            x: dataIndexList,
            y: dataList,
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

        let postData = {
            "generator":"pseudo",
            "generator_settings":{},
            "structure":"set",
            "structure_settings": {"amount":440, "min":0, "max":40},
            "method":"gaussian",
            "method_settings": {"mean":0.5, "standard_deviation":0.1}
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
