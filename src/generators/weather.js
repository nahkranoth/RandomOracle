const https = require('https');

//Weather data is taken from https://agrodatacube.wur.nl/
//There is an authentication key involved
//TODO: More info on the settings should be added

class Weather{
    constructor(settings){
        this.meteostation = 240;//Schiphol
        this.fromdate = "20180101";//YYYYMMDD
        this.todate = "20180130";

        if (settings) {
            //this.mean = settings["mean"] ? settings["mean"] : this.mean;
        }
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

        var req = https.request(options, function (res) {
            var chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function (chunk) {
                let body = Buffer.concat(chunks);
                let json_obj = JSON.parse(body.toString());
                let mean_temp = json_obj["features"][0]["properties"]["mean_temperature"];
                return mean_temp;
            });

            res.on("error", function (error) {
                console.error(error);
            });
        });

        req.end();
    }
}
module.exports = Weather;
