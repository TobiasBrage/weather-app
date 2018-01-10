document.addEventListener('DOMContentLoaded', function (event) {

    fetch('http://api.openweathermap.org/data/2.5/weather?q=Slagelse&units=metric&appid=4db57a3839044b1c32184aa9a00d6007')
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        let mainTranslation = [{main: 'Rain', translation: 'Regn'}];
        let weatherData = function () {
            return {
                location: function() {
                    return json.name;
                },
                temperature: {
                    current: Math.round(json.main.temp),
                    min: Math.round(json.main.temp_min),
                    max: Math.round(json.main.temp_max)
                },
                humidity: function() {
                    return Math.round(json.main.humidity);
                },
                sunrise: function() {
                    let wSunUUnix = new Date(1000*json.sys.sunrise);
                    return dateTimeDigit(wSunUUnix.getHours())+':'+dateTimeDigit(wSunUUnix.getMinutes());
                },
                sunset: function() {
                    let wSunDUnix = new Date(1000*json.sys.sunset);
                    return dateTimeDigit(wSunDUnix.getHours())+':'+dateTimeDigit(wSunDUnix.getMinutes());
                },
                main: function() {
                    return json.weather[0].main;
                },
                description: function() {
                    return json.weather[0].description;
                }
            }
        }

        let weather = weatherData();

        console.log(mainTranslation.find(weather.main).translation);
        // console.log(mainTranslation[0].test);

        document.getElementById("tempTitle").innerHTML = weather.temperature.current+'°';
        document.getElementById("cityTitle").innerHTML = weather.location();
        document.getElementById("descriptionTitle").innerHTML = 'Regn';

    })

    function dateTimeDigit(dateTime) {
        dateTime = dateTime.toString();
        if(dateTime.length == 1) {
            return '0'+dateTime;
        } else {
            return dateTime;
        }
    }

});