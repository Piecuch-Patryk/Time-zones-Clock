// declare interval variable; *** Global Scope ***
var newInterval;
// increase time locally and calibrate with server every minute;
const increaseTime = function(el){
    const array = el[2].split(':'),
          timeContainer = document.getElementById('time'),
          // hidden DOM element shows interval on/off;
          intervalHiddenEl = document.getElementById('interval-info');
    var hours = Number(array[0]),
        minutes = Number(array[1]),
        seconds = Number(array[2]),
        // increase time;
        counter = function(){
            // these variables are cleared every second, important;
            let h = '',
                m = '',
                s = '';
            if(seconds < 60){
                seconds++
                s = seconds;
            }
            if(minutes < 60 && seconds === 60){
                seconds = 0;
                s = '00';
                minutes++
                m = minutes;
            }
            if(seconds <= 9){
                s = `0${seconds}`;
            }
            if(minutes <= 9){
                m = `0${minutes}`;
            }else {
                m = minutes;
            }
            if(hours < 24 && minutes === 60){
                minutes = 0;
                m = '00';
                hours++;
                h = hours;
            }
            if(hours <= 9){
                h = `0${hours}`;
            }else {
                h = hours;
            }
            if(hours === 23 && minutes === 60){
                // get new date at midnight;
                actualTimeDate('date');
                h = '00';
            }
            // create current time to display;
            const actualTime = `${h}:${m}:${s}`;
            // place time in DOM;
            timeContainer.innerHTML = actualTime;
            // animate clock hands; rotate depending on given time;
            rotateHands(actualTime, el[1]);
        }
    // start interval if it's off;
    if(intervalHiddenEl.value === 'off'){
        intervalHiddenEl.value = 'on';
        newInterval = setInterval(function(){
            counter();
        },1000);
    }else {
        // restart current interval;
        clearInterval(newInterval);
        newInterval = setInterval(function(){
            counter();
        },1000);
    }
    // server calibration every minute;
    setTimeout(function calibrateTime(){
        // current time zone name;
        const zoneName = document.querySelector('.active-nav').textContent;
        // stop increasing;
        clearInterval(counter)
        // get time and start increasing from there;
        actualTimeDate('both', zoneName);
    }, 60000);
}
// set current time zone title and subtitle;
const setZoneTitle = function(str){
    const titleContainer = document.getElementById('zone-title'),
          subtitle = document.getElementById('zone-subtitle');
    let subtitleText = '';
    titleContainer.innerHTML = str;
    switch(str){
        case 'London':
            subtitleText = 'UTC+(00:00)';
            break;
        case 'New York':
            subtitleText = 'UTC-(04:00)';
            break;
        case 'Tokyo':
            subtitleText = 'UTC+(09:00)';
            break;
        case 'Moscow':
            subtitleText = 'UTC+(03:00)';
            break;
    }
    // set current subtitle;
    subtitle.textContent = subtitleText;
    // get current time&date depending on given time zone;
    actualTimeDate('both', str);
}



