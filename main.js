document.addEventListener('DOMContentLoaded', function (event) {

    let weatherCity = 'Roskilde';

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${weatherCity}&units=metric&appid=4db57a3839044b1c32184aa9a00d6007`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        let wDescConTrans = [
            {id: 500, translation: 'Regn', icon: 'rain.svg'},
            {id: 520, translation: 'Let regn', icon: 'rain.svg'},
            {id: 701, translation: 'Tåge', icon: 'cloudy.svg'},
            {id: 310, translation: 'Støvregn', icon: 'rain.svg'},
            {id: 601, translation: 'Sne', icon: 'snow.png'},
            {id: 600, translation: 'Let sne', icon: 'snow.png'},
            {id: 804, translation: 'Skyet', icon: 'cloudy.svg'},
            {id: 800, translation: 'Klar himmel', icon: 'sun.svg'},
            {id: 801, translation: 'Let skyet himmel', icon: 'cloudy.svg'},
            {id: 802, translation: 'Skyet', icon: 'cloudy.svg'}
        ]; 
        let wWindDir = ['N','NV','V','SV','S','SØ','E','NØ'];
        let weekDayName = ['mandag','tirsdag','onsdag','torsdag','fredag','lørdag','søndag'];
        let Curdate = new Date(); 
        let weatherData = function () {
            return {
                location: function() {
                    return json.name;
                },
                temperature: {
                    current: function () {
                        return Math.round(json.main.temp);
                    },
                    min: function () {
                        return Math.round(json.main.temp_min);
                    },
                    max: function () {
                        return Math.round(json.main.temp_max);
                    }
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
                description: function() {
                    return json.weather[0].id;
                },
                descriptionTranslated: function() {
                    let wConTrans = weatherConData(weather.description()).translation;
                    return wConTrans;
                },
                icon: function() {
                    let wConTransIcon = weatherConData(weather.description()).icon;
                    return wConTransIcon;
                },
                wind: {
                    speed: function () {
                        return json.wind.speed;
                    },
                    direction: function () {
                        let windDirection = json.wind.deg;
                        if (windDirection>337.5) return wWindDir[0];
                        if (windDirection>292.5) return wWindDir[1];
                        if(windDirection>247.5) return wWindDir[2];
                        if(windDirection>202.5) return wWindDir[3];
                        if(windDirection>157.5) return wWindDir[4];
                        if(windDirection>122.5) return wWindDir[5];
                        if(windDirection>67.5) return wWindDir[6];
                        if(windDirection>22.5){return wWindDir[7];}
                        return 'N/A';
                    }
                },
                date: {
                    day: function() {
                        return Curdate.getDate();
                    },
                    weekday: function () {
                        return curWeekDay(Curdate.getDay());
                    },
                    hour: function() {
                        return dateTimeDigit(Curdate.getHours());
                    }
                }
            }
        }

        let weather = weatherData();

        console.log(weather.description();

        document.getElementById("descriptionTitle").innerHTML = weather.descriptionTranslated();
        document.getElementById("tempTitle").innerHTML = weather.temperature.current()+'°';
        document.getElementById("cityTitle").innerHTML = weather.location();
        document.getElementById("dayTitle").innerHTML = weather.date.weekday()+' i dag';

        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${weatherCity}&units=metric&appid=4db57a3839044b1c32184aa9a00d6007`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            json.list.forEach(function(element, i) {
                let fcDate = new Date(1000*element.dt);
                let fcConId = element.weather[0].id;
                let fcTemp = Math.round(element.main.temp);
                let fcHour = fcDate.getHours();
                let fcDay = fcDate.getDate();
                let fcWeekDay = curWeekDay(fcDate.getDay());
                if(weather.date.day() != fcDay) {
                    if(fcHour == 13) {
                        let fcIcon = weatherConData(fcConId).icon;
                        document.getElementById("weatherForecast").innerHTML += `<li class="fcDayContainer" id="fcDayContainer${i}"><p class="fcDayTitle">${fcWeekDay}</p><p class="fcDayTemp">${fcTemp}</p></li>`;
                        document.getElementById("fcDayContainer"+i).style.backgroundImage = `url(icons/${fcIcon})`;
                    }
                }
            });
        })

        function weatherConData(wConId) {
            let wConData = wDescConTrans.find(o => o.id === wConId);
            return wConData;
        }

        function dateTimeDigit(dateTime) {
            dateTime = dateTime.toString();
            if(dateTime.length == 1) {
                return '0'+dateTime;
            } else {
                return dateTime;
            }
        }

        function curWeekDay(wDay) {
            wDay = wDay.toString();
            if (wDay==1) return weekDayName[0];
            if (wDay==2) return weekDayName[1];
            if(wDay==3) return weekDayName[2];
            if(wDay==4) return weekDayName[3];
            if(wDay==5) return weekDayName[4];
            if(wDay==6) return weekDayName[5];
            if(wDay==0) return weekDayName[6];
        }

    })

});