const https = require('https');

//Weather data is taken from https://agrodatacube.wur.nl/
//There is an authentication key involved
//TODO: More info on the settings should be added

//TODO: it now does a call for every request to the origin server, change this so it collects the data only once

class Weather{
    constructor(settings){
        this.meteostation = 240;    //Schiphol
        this.fromdate = "20180101"; //YYYYMMDD
        this.todate = "20180130";   //YYYYMMDD
        this.coldest = -90;         //celsius
        this.warmest = 60;          //celsius
    }

    normalizeTemp(temp){
        //normalizes along the coldest and warmest temps measured on planet earth
        //TODO: Change max temperature when global warming increases
        return (temp-this.coldest)/(this.warmest-this.coldest)
    }

    request(res){
        let f_meteo = "meteostation=" + this.meteostation;
        let f_from_date = "fromdate=" + this.fromdate;
        let f_to_date = "todate=" + this.todate;
        let f_path = "/api/v2/rest/meteodata" + "?" + f_meteo + "&" + f_from_date + "&" + f_to_date;

        var options = {
            'method': 'GET',
            'hostname': process.env.WEATHER_URL,
            'path': f_path,
            'headers': {
                'Accept': 'application/json',
                'token': process.env.WEATHER_AUTH
            }
        };

        return new Promise((resolve, reject) => {
            var req = https.request(options, (res) => {
                var chunks = [];

                res.on("data", function (chunk) {
                    chunks.push(chunk);
                });

                res.on("end", (chunk) => {
                    let body = Buffer.concat(chunks);
                    let json_obj = JSON.parse(body.toString());
                    //TODO random mean_temperature between specified dates
                    let mean_temp = json_obj["features"][0]["properties"]["mean_temperature"]; //takes the first mean temp
                    let normalized_mean_temp = this.normalizeTemp(mean_temp);
                    resolve(normalized_mean_temp);
                });

                res.on("error", function (error) {
                    console.error(error);
                });
            });

            req.end();
        });
    }
}
module.exports = Weather;
