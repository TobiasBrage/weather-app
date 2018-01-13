document.addEventListener('DOMContentLoaded', function (event) {

    console.log(document.getElementById("tempTitle").offsetHeight);

    let weatherLat = 55.6256460;
    let weatherLon = 12.0860530;
    let scrollTop = 0;
    let scrollEff = 0;
    let weatherInfoHeight = 0;
    let wInfoOffset;
    let tempOffset;
    let weatherHeader = document.getElementById("weatherHeader");
    let weatherForecast = document.getElementById("weatherForecast");
    let weatherHeaderBG = document.getElementById("weatherHeaderBG");
    let weatherHour = document.getElementById("weatherHour");
    let weatherInfo = document.getElementById("weatherInfo");
    let tempTitle = document.getElementById("tempTitle");
    let headerHeight= weatherHeader.offsetHeight;
    let headerInfoHeight= weatherInfo.offsetHeight;
    let headerHourHeight= weatherHour.offsetHeight;
    let headerTempHeight = tempTitle.offsetHeight;
    let weatherInfoFade = 0, wInfofadeStop = headerInfoHeight, wInfoElement = $('#weatherInfo');
    let tempTitleFade = 0, tempTitleStop = headerTempHeight+headerInfoHeight, tempTitleElement = $('#tempTitle');
    weatherInfo.style.marginTop += headerHeight;
    weatherHour.style.marginTop += headerHeight+headerInfoHeight;
    weatherForecast.style.marginTop = headerHeight+headerInfoHeight+headerHourHeight;
    weatherHeaderBG.style.height = headerHeight-headerTempHeight;
    $(window).on('scroll', function() {
        scrollTop = $(window).scrollTop();
        scrollEff = Math.round(scrollTop/headerInfoHeight*100);
        weatherInfoHeight = headerInfoHeight - scrollEff;
        weatherInfo.style.height = weatherInfoHeight;
        weatherHour.style.marginTop = headerHeight+headerInfoHeight-scrollEff;
        wInfoOffset = $(document).scrollTop(), wInfoOpacity = 0;
        tempOffset = $(document).scrollTop(), tempOpacity = 0;
        if(wInfoOffset <= weatherInfoFade){
            wInfoOpacity = 1;
        } else if(wInfoOffset <= wInfofadeStop) {
            wInfoOpacity = 1-wInfoOffset/wInfofadeStop;
        }
        if(tempOffset <= tempTitleFade){
            tempOpacity = 1;
        } else if(tempOffset <= tempTitleStop) {
            tempOpacity = 1-tempOffset/tempTitleStop;
        }
        wInfoElement.css('opacity', wInfoOpacity);
        tempTitleElement.css('opacity', tempOpacity);
        if(scrollTop >= headerInfoHeight+headerTempHeight) {
            $('#weatherHour').css({"position":"fixed","top":"0", "margin":headerHeight-headerTempHeight+"px 0 0 0"});
        } else if(scrollTop <= headerInfoHeight+headerTempHeight) {
            $('#weatherHour').css({"position":"absolute", "margin":headerHeight+headerInfoHeight+"px 0 0 0"});
        }
    });

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${weatherLat}&lon=${weatherLon}&units=metric&appid=4db57a3839044b1c32184aa9a00d6007`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        let wDescConTrans = [
            {id: 500, translation: 'Let regn', icon: 'rain.svg'},
            {id: 520, translation: 'Støvregn', icon: 'rain.svg'},
            {id: 701, translation: 'Tåge', icon: 'cloudy.svg'},
            {id: 310, translation: 'Støvregn', icon: 'rain.svg'},
            {id: 601, translation: 'Sne', icon: 'snow.png'},
            {id: 600, translation: 'Let sne', icon: 'snow.svg'},
            {id: 804, translation: 'Skyet', icon: 'cloudy.svg'},
            {id: 800, translation: 'Klar himmel', icon: 'sky.svg', iconNight: 'skyNight.svg'},
            {id: 801, translation: 'Let skyet himmel', icon: 'cloudy.svg'},
            {id: 802, translation: 'Skyet', icon: 'cloudy.svg'},
            {id: 803, translation: 'Spredte skyer', icon: 'cloudy.svg'}
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
                sunriseUnix: function() {
                    return new Date(1000*json.sys.sunrise);
                },
                sunset: function() {
                    let wSunDUnix = new Date(1000*json.sys.sunset);
                    return dateTimeDigit(wSunDUnix.getHours())+':'+dateTimeDigit(wSunDUnix.getMinutes());
                },
                sunsetUnix: function() {
                    return new Date(1000*json.sys.sunset);
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
                    },
                    minute: function() {
                        return dateTimeDigit(Curdate.getMinutes());
                    }
                }
            }
        }

        let weather = weatherData();

        document.getElementById("descriptionTitle").innerHTML = weather.descriptionTranslated();
        document.getElementById("tempTitle").innerHTML = weather.temperature.current()+'°';
        document.getElementById("cityTitle").innerHTML = weather.location();
        document.getElementById("dayTitle").innerHTML = weather.date.weekday()+' i dag';
        document.getElementById("tempMinTitle").innerHTML = weather.temperature.min();
        document.getElementById("tempMaxTitle").innerHTML = weather.temperature.max();

        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${weatherLat}&lon=${weatherLon}&units=metric&appid=4db57a3839044b1c32184aa9a00d6007`)
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

        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${weatherLat}&lon=${weatherLon}&units=metric&appid=4db57a3839044b1c32184aa9a00d6007`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            let fcConId = 0;
            let fcDate = 0;
            let fcTemp = 0;
            let fcHour = 0;
            let fcDay = 0;
            let fcMinute = 0;
            let fcIcon = '';
            let weatherCounter = 0;
            let weatherNow = 0;
            let forecastAhead = 10;
            let SDDT = 1815;
            let SUDT = dateTimeDigit(weather.sunriseUnix().getHours())+dateTimeDigit(weather.sunriseUnix().getMinutes());
            let fcDT = 0;
            let dayNight = 0;
            json.list.forEach(function(element, elementId) {
                fcConId = element.weather[0].id;
                fcDate = new Date(1000*element.dt);
                fcTemp = Math.round(element.main.temp);
                fcHour = dateTimeDigit(fcDate.getHours());
                fcDay = fcDate.getDate();
                fcMinute = dateTimeDigit(fcDate.getMinutes());
                fcDT = fcHour+fcMinute;
                dayNight = 0;
                weatherCounter++;
                if(element.sys.pod == 'n') {
                    if(weatherConData(fcConId).iconNight != null) fcIcon = weatherConData(fcConId).iconNight;
                } else {
                    fcIcon = weatherConData(fcConId).icon;
                }
                if(weatherNow == 0) {
                    document.getElementById("weatherHourList").innerHTML += `<li class="weatherHourItem" id="weatherHourItemNow"><h2 class="weatherHourTitle">Nu</h2><h2 class="weatherHourTime" id="weatherHourTime${elementId}">${weather.temperature.current()}°</h2></li>`;
                    document.getElementById("weatherHourItemNow").style.backgroundImage = `url(icons/${weather.icon()})`;
                    weatherNow++;
                }
                if(weatherCounter < forecastAhead) {
                    document.getElementById("weatherHourList").innerHTML += `<li class="weatherHourItem" id="weatherHourItem${elementId}"><h2 class="weatherHourTitle">${fcHour}</h2><h2 class="weatherHourTime" id="weatherHourTime${elementId}">${fcTemp}°</h2></li>`;
                    document.getElementById("weatherHourItem"+elementId).style.backgroundImage = `url(icons/${fcIcon})`;
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
            if(wDay==1) return weekDayName[0];
            if(wDay==2) return weekDayName[1];
            if(wDay==3) return weekDayName[2];
            if(wDay==4) return weekDayName[3];
            if(wDay==5) return weekDayName[4];
            if(wDay==6) return weekDayName[5];
            if(wDay==0) return weekDayName[6];
        }

    })

});
