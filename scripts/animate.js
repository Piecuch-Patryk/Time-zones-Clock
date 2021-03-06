// count degree and rotate clock hands;
const rotateHands = function(str, num){
    let hands = document.getElementsByClassName('hand-clock'),
          dateContainer = document.querySelector('.date-box'),
          // count current degree;
          seconds = 6 * Number(str.split(':').splice(2, 1)) - 90,
          minutes = 6 * Number(str.split(':').splice(1, 1)) - 90,
          hours = 30 * ((str.split(':').splice(0, 1) % 12) + str.split(':').splice(1, 1) / 60) - 90,
          date = num.split('/').splice(0, 1);
    // rotate each hand;
    hands[0].style.transform = 'rotate(' + seconds + 'deg)';
    hands[1].style.transform = 'rotate(' + minutes + 'deg)';
    hands[2].style.transform = 'rotate(' + hours + 'deg)';
    dateContainer.innerHTML = date;
}

