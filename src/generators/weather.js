const https = require('https');

class Weather{
    request(res){
        https.get("https://weerlive.nl/api/json-data-10min.php?key=demo&locatie=Amsterdam", (resp) => {
            let response = '';
            resp.on('data', (chunk) => {
                response += chunk;
            });

            resp.on('end', () => {
                let main = JSON.parse(response)["liveweer"][0];
                let temp = main["temp"];
                res.json( temp );
            });
        });
    }
}
module.exports = Weather;
