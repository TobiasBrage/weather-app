document.addEventListener('DOMContentLoaded', function (event) {

    let posLat = 55.41001576413402;
    let posLon = 11.347551014304575;

    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${posLat}&lon=${posLon}&units=metric&appid=4db57a3839044b1c32184aa9a00d6007`)
    .then((response) => {
        return response.json();
    })
    .then((json) => {
        let wDescConTrans = [
            {id: 200, translation: 'Tordenvejr med regn', icon: 'thunderRain.svg', iconNight: 'thunderNight.svg'},
            {id: 201, translation: 'Tordenvejr med regn', icon: 'thunderRain.svg', iconNight: 'thunderNight.svg'},
            {id: 202, translation: 'Tordenvejr med regn', icon: 'thunderRain.svg', iconNight: 'thunderNight.svg'},
            {id: 210, translation: 'Let Tordenvejr', icon: 'thunder.svg', iconNight: 'thunderNight.svg'},
            {id: 211, translation: 'Tordenvejr', icon: 'thunder.svg', iconNight: 'thunderNight.svg'},
            {id: 212, translation: 'Voldsomt tordenvejr', icon: 'thunder.svg', iconNight: 'thunderNight.svg'},
            {id: 221, translation: 'Tordenvejr', icon: 'thunder.svg', iconNight: 'thunderNight.svg'},
            {id: 230, translation: 'Tordenvejr med regn', icon: 'thunderRain.svg', iconNight: 'thunderNight.svg'},
            {id: 231, translation: 'Tordenvejr med regn', icon: 'thunderRain.svg', iconNight: 'thunderNight.svg'},
            {id: 232, translation: 'Tordenvejr med regn', icon: 'thunderRain.svg', iconNight: 'thunderNight.svg'},
            {id: 300, translation: 'Let regn', icon: 'drizzle.svg', iconNight: 'drizzleNight.svg'},
            {id: 301, translation: 'Støvregn', icon: 'drizzle.svg', iconNight: 'drizzleNight.svg'},
            {id: 302, translation: 'Regn', icon: 'rain.svg', iconNight: 'rainNight.svg'},
            {id: 310, translation: 'Regn', icon: 'rain.svg', iconNight: 'rainNight.svg'},
            {id: 311, translation: 'Støvregn', icon: 'drizzle.svg', iconNight: 'drizzleNight.svg'},
            {id: 312, translation: 'Let regn', icon: 'drizzle.svg', iconNight: 'drizzleNight.svg'},
            {id: 313, translation: 'Let regn', icon: 'drizzle.svg', iconNight: 'drizzleNight.svg'},
            {id: 314, translation: 'Regn', icon: 'rain.svg', iconNight: 'rainNight.svg'},
            {id: 321, translation: 'Let regn', icon: 'drizzle.svg', iconNight: 'drizzleNight.svg'},
            {id: 500, translation: 'Let regn', icon: 'drizzle.svg', iconNight: 'drizzleNight.svg'},
            {id: 501, translation: 'Regn', icon: 'rain.svg', iconNight: 'rainNight.svg'},
            {id: 502, translation: 'Kraftig regn', icon: 'heavyRain.svg', iconNight: 'heavyRainNight.svg'},
            {id: 503, translation: 'Kraftig regn', icon: 'heavyRain.svg', iconNight: 'heavyRainNight.svg'},
            {id: 504, translation: 'Kraftig regn', icon: 'heavyRain.svg', iconNight: 'heavyRainNight.svg'},
            {id: 511, translation: 'Kraftig regn', icon: 'heavyRain.svg', iconNight: 'heavyRainNight.svg'},
            {id: 520, translation: 'Regn', icon: 'rain.svg', iconNight: 'rainNight.svg'},
            {id: 521, translation: 'Regn', icon: 'rain.svg', iconNight: 'rainNight.svg'},
            {id: 522, translation: 'Regn', icon: 'rain.svg', iconNight: 'rainNight.svg'},
            {id: 531, translation: 'Regn', icon: 'rain.svg', iconNight: 'rainNight.svg'},
            {id: 600, translation: 'Let sne', icon: 'snow.svg', iconNight: 'snowNight.svg'},
            {id: 601, translation: 'Sne', icon: 'snow.svg', iconNight: 'snowNight.svg'},
            {id: 602, translation: 'Kraftig sne', icon: 'snow.svg', iconNight: 'snowNight.svg'},
            {id: 611, translation: 'Slud', icon: 'snow.svg', iconNight: 'snowNight.svg'},
            {id: 612, translation: 'Slud', icon: 'snow.svg', iconNight: 'snowNight.svg'},
            {id: 615, translation: 'Slud med regn', icon: 'snow.svg', iconNight: 'snowNight.svg'},
            {id: 616, translation: 'Slud med regn', icon: 'snow.svg', iconNight: 'snowNight.svg'},
            {id: 620, translation: 'Slud med regn', icon: 'snow.svg', iconNight: 'snowNight.svg'},
            {id: 621, translation: 'Sne', icon: 'snow.svg', iconNight: 'snowNight.svg'},
            {id: 622, translation: 'Sne', icon: 'snow.svg', iconNight: 'snowNight.svg'},
            {id: 701, translation: 'Tåge', icon: 'mist.svg', iconNight: 'mistNight.svg'},
            {id: 711, translation: 'Røg', icon: 'mist.svg', iconNight: 'mistNight.svg'},
            {id: 721, translation: 'Tåge', icon: 'mist.svg', iconNight: 'mistNight.svg'},
            {id: 731, translation: 'Blæst med sand', icon: 'mist.svg', iconNight: 'mistNight.svg'},
            {id: 741, translation: 'Tåge', icon: 'mist.svg', iconNight: 'mistNight.svg'},
            {id: 751, translation: 'Sand', icon: 'mist.svg', iconNight: 'mistNight.svg'},
            {id: 761, translation: 'Støv', icon: 'mist.svg', iconNight: 'mistNight.svg'},
            {id: 771, translation: 'Byger', icon: 'mist.svg', iconNight: 'mistNight.svg'},
            {id: 800, translation: 'Klar himmel', icon: 'sky.svg', iconNight: 'skyNight.svg'},
            {id: 801, translation: 'Let skyet himmel', icon: 'cloudy.svg', iconNight: 'cloudyNight.svg'},
            {id: 802, translation: 'Skyet', icon: 'cloudy.svg', iconNight: 'cloudyNight.svg'},
            {id: 803, translation: 'Spredte skyer', icon: 'cloudy.svg', iconNight: 'cloudyNight.svg'},
            {id: 804, translation: 'Skyet', icon: 'cloudy.svg', iconNight: 'cloudyNight.svg'},
            {id: 902, translation: 'Orkan', icon: 'heavyWind.svg', iconNight: 'heavyWindNight.svg'},
            {id: 905, translation: 'Blæst', icon: 'wind.svg', iconNight: 'windNight.svg'},
            {id: 951, translation: 'Brise', icon: 'wind.svg', iconNight: 'windNight.svg'},
            {id: 952, translation: 'Brise', icon: 'wind.svg', iconNight: 'windNight.svg'},
            {id: 953, translation: 'Let blæsevejr', icon: 'wind.svg', iconNight: 'windNight.svg'},
            {id: 954, translation: 'Blæst', icon: 'wind.svg', iconNight: 'windNight.svg'},
            {id: 955, translation: 'Blæst', icon: 'wind.svg', iconNight: 'windNight.svg'},
            {id: 956, translation: 'Blæst', icon: 'wind.svg', iconNight: 'windNight.svg'},
            {id: 957, translation: 'Blæst', icon: 'wind.svg', iconNight: 'windNight.svg'},
            {id: 958, translation: 'Blæst', icon: 'wind.svg', iconNight: 'windNight.svg'},
            {id: 959, translation: 'Storm', icon: 'heavyWind.svg', iconNight: 'heavyWindNight.svg'},
            {id: 960, translation: 'Storm', icon: 'heavyWind.svg', iconNight: 'heavyWindNight.svg'},
            {id: 961, translation: 'Storm', icon: 'heavyWind.svg', iconNight: 'heavyWindNight.svg'},
            {id: 962, translation: 'Orkan', icon: 'heavyWind.svg', iconNight: 'heavyWindNight.svg'}
        ]; 
        let wWindDir = ['n','nv','v','sv','s','sø','e','nø'];
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
                    return dateTimeDigit(wSunUUnix.getHours())+'.'+dateTimeDigit(wSunUUnix.getMinutes());
                },
                sunriseUnix: function() {
                    return new Date(1000*json.sys.sunrise);
                },
                sunset: function() {
                    let wSunDUnix = new Date(1000*json.sys.sunset);
                    return dateTimeDigit(wSunDUnix.getHours())+'.'+dateTimeDigit(wSunDUnix.getMinutes());
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
                iconId: function() {
                    let wConTransIconId = weatherConData(weather.description()).id;
                    return wConTransIconId;
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

        // today weather data
        document.getElementById("descriptionTitle").innerHTML = weather.descriptionTranslated();
        document.getElementById("tempTitle").innerHTML = weather.temperature.current()+'°';
        document.getElementById("cityTitle").innerHTML = weather.location();
        document.getElementById("dayTitle").innerHTML = weather.date.weekday()+' i dag';
        document.getElementById("tempMinTitle").innerHTML = weather.temperature.min();
        document.getElementById("tempMaxTitle").innerHTML = weather.temperature.max();

        // 5 day forecast
        fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${posLat}&lon=${posLon}&units=metric&appid=4db57a3839044b1c32184aa9a00d6007`)
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            let forecastDescription = '';
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
            forecastDescription = `I dag ${weather.descriptionTranslated().toLowerCase()} og ${weather.temperature.current()}°. `;
            if(weather.temperature.min() == weather.temperature.max()) {
                forecastDescription +=  `Højeste og laveste temperatur vil være ${weather.temperature.max()}°.`;
            } else {
                forecastDescription +=  `Højeste temperatur vil være ${weather.temperature.max()}° og laveste temperatur ${weather.temperature.min()}°.`;
            }
            document.getElementById("weatherForecast").innerHTML += `<li id="weatherDescription">${forecastDescription}</li>`;
            document.getElementById("weatherForecast").innerHTML += `<li id="weatherDetails"><ul class="wDetailContainer"><li class="wDetailItem"><p class="wDetailTitle">Sol op</p><p class="wDetailInfo">${weather.sunrise()}</p></li><li class="wDetailItem"><p class="wDetailTitle">Sol ned</p><p class="wDetailInfo">${weather.sunset()}</p></li><li class="wDetailItem"><p class="wDetailTitle">Vindstyrke</p><p class="wDetailInfo">${weather.wind.direction()} ${weather.wind.speed()} m/s</p></li><li class="wDetailItem"><p class="wDetailTitle">Luftfugtighed</p><p class="wDetailInfo">${weather.humidity()}%</p></li></ul></li><li id="footer">Data fra OpenWeatherMap</li>`;

            // hour forecast
            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${posLat}&lon=${posLon}&units=metric&appid=4db57a3839044b1c32184aa9a00d6007`)
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
                        let fcNowIcon = '';
                        if(weatherConData(weather.iconId()).iconNight != null) {
                            fcNowIcon = weatherConData(weather.iconId()).iconNight;
                        } else {
                            fcNowIcon = weatherConData(weather.iconId()).icon;
                        }
                        document.getElementById("weatherHourList").innerHTML += `<li class="weatherHourItem" id="weatherHourItemNow"><h2 class="weatherHourTitle">Nu</h2><h2 class="weatherHourTime" id="weatherHourTime${elementId}">${weather.temperature.current()}°</h2></li>`;
                        document.getElementById("weatherHourItemNow").style.backgroundImage = `url(icons/${fcNowIcon})`;
                        weatherNow++;
                    }
                    if(weatherCounter < forecastAhead) {
                        document.getElementById("weatherHourList").innerHTML += `<li class="weatherHourItem" id="weatherHourItem${elementId}"><h2 class="weatherHourTitle">${fcHour}</h2><h2 class="weatherHourTime" id="weatherHourTime${elementId}">${fcTemp}°</h2></li>`;
                        document.getElementById("weatherHourItem"+elementId).style.backgroundImage = `url(icons/${fcIcon})`;
                    }
                });
            })
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
    let weatherForecastheight = weatherForecast.offsetHeight;
    let weatherInfoFade = 0, wInfofadeStop = headerInfoHeight, wInfoElement = $('#weatherInfo');
    let tempTitleFade = 0, tempTitleStop = headerTempHeight+headerInfoHeight, tempTitleElement = $('#tempTitle');
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

    weatherInfo.style.marginTop += headerHeight;
    weatherHour.style.marginTop += headerHeight+headerInfoHeight;
    weatherForecast.style.marginTop = headerHeight+headerInfoHeight+headerHourHeight;
    weatherHeaderBG.style.height = headerHeight-headerTempHeight;
});

