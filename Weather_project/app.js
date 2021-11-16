const { json } = require('body-parser');
const { response } = require('express');
const express = require('express');
const https = require('https');

const app = express();

app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{

    res.sendFile(__dirname+'/index.html');
})

app.post('/', (req,res)=>{

    const city = req.body.cityName
    const appId = "9c302417bb3c538bbccae27b096e0fa1"
    const unit = "metric"
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&units=${unit}`;

    https.get(url, (response)=>{
        console.log(response.statusCode);
        response.on('data', (data)=>{
            let weatherData = JSON.parse(data);
            let temp = weatherData.main.temp;
            let weatherIcon = weatherData.weather[0].icon
            let iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`
            weatherDes = weatherData.weather[0].description
            res.write(`<p>Current Weather Condition in <strong> ${city} </strong> is ${weatherDes}.</p>`);
            res.write(`<h1>Current Temprature in New Delhi is ${temp} degrees celcius</h1>`);
            res.write(`<img src="${iconUrl}">`);

            res.send();
         })
    })
})

app.listen(3000, ()=>{
    console.log("we are running on port:3000");
})
