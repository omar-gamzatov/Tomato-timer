$('.menu-button').on('click', function(e) {
  e.preventDefault();
  $('.menu').toggleClass('menu-active');
  $('.content').toggleClass('content-active');
  $('.menu-button').toggleClass('menu-button-active');
});
let alert_minus = "Cant be lower then 1 min";
let alert_plus = "Too much numbers!";

//обработка события нажатия на + и - в параметрах
$('.minus-work-time').on('click', function() {
  var a = $('.to-input-worktime').val();
  if (a > 1) {$('.to-input-worktime').val(a - 1);}
  else {alert(alert_minus);}
  if (is_work_time) {
    document.getElementById('invis').value = document.getElementById('work-id').value*60;
    document.getElementById('minutes').innerHTML = (("0" + Math.floor(document.getElementById('work-id').value)).slice(-2));
  }
});

$('.plus-work-time').on('click', function() {
  var a = $('.to-input-worktime').val();
  if (a < 99) {$('.to-input-worktime').val(-(-a - 1));}
  else {alert(alert_plus);}
  if (is_work_time) {
    document.getElementById('invis').value = document.getElementById('work-id').value*60;
    document.getElementById('minutes').innerHTML = (("0" + Math.floor(document.getElementById('work-id').value)).slice(-2));
  }
});

$('.minus-chill').on('click', function() {
  var a = $('.to-input-chill').val();
  if (a > 1) {$('.to-input-chill').val(a - 1);}
  else {alert(alert_minus);}
  if (!is_work_time) {
    document.getElementById('minutes').innerHTML = (("0" + Math.floor(document.getElementById('chill-id').value)).slice(-2));
  }
});

$('.plus-chill').on('click', function() {
  var a = $('.to-input-chill').val();
  if (a < 99) {$('.to-input-chill').val(-(-a - 1));}
  else {alert(alert_plus);}
  if (!is_work_time) {
    document.getElementById('minutes').innerHTML = (("0" + Math.floor(document.getElementById('chill-id').value)).slice(-2));
  }
});

let buffer, interval, min, sec;
var is_work_time = true;
var alarm = new Audio();
alarm.src = 'audio/alarm.mp3';
const input = document.getElementById('invis');
buffer = 0;
input.value = document.getElementById('invis').value;

if (is_work_time) {
  document.getElementById('invis').value = document.getElementById('work-id').value*60;
} else if (!is_work_time) {
  document.getElementById('invis').value = document.getElementById('chill-id').value*60;
}

//start
document.getElementById('start').addEventListener('click', () => {
  if (input.value < 0) {
    input.value = 0;
    buffer = 0;
  }
  buffer = input.value;
  clearInterval(interval);
  interval = setInterval(subtractTime, 1000);
});

//pause
document.getElementById('pause').addEventListener('click', () => {
  clearInterval(interval);
});

//reset
document.getElementById('reset').addEventListener('click', () => {
  if (!is_work_time) {
    document.getElementById('invis').value = document.getElementById('work-id').value*60;
  } else if (is_work_time) {
    document.getElementById('invis').value = document.getElementById('chill-id').value*60;
  }
  input.value = document.getElementById('invis').value;
  buffer = 0;
  let min_buf, sec_buf;
    is_work_time = !is_work_time;
  if (is_work_time) {
    min_buf = Math.floor(document.getElementById('work-id').value);
    sec_buf = Math.round(((document.getElementById('work-id').value) - min_buf) * 60);
  } else {
    min_buf = Math.floor(document.getElementById('chill-id').value);
    sec_buf = Math.round(((document.getElementById('chill-id').value) - min_buf) * 60);
  }
  document.getElementById("minutes").textContent = ("0" + min_buf).slice(-2);
  document.getElementById("seconds").textContent = ("0" + sec_buf).slice(-2);

});

function subtractTime() {
  if (buffer > 0) {
    buffer--;
    input.value--;
    min = Math.floor(input.value / 60);
    sec = Math.round(((input.value / 60) - min) * 60);
    document.getElementById("minutes").innerHTML = ("0" + min).slice(-2);
    document.getElementById("seconds").innerHTML = ("0" + sec).slice(-2);
    if (input.value < 0 || buffer == 0) {
      input.value = 0;
      buffer = 0;
      if (document.getElementById('sound-id').checked) {
        alarm.play();
      }
      if (is_work_time && document.getElementById('message-id').checked) {
        alert("Время отдохнуть");
        //var chillNotify = new Notification("Пора отдохнуть!");
      } else if (!is_work_time && document.getElementById('message-id').checked) {
        alert("Пора поработать");
        //var workNotify = new Notification("Пора Поработать!");
      }
      document.getElementById('reset').click();
      document.getElementById('start').click();
    }
  } else {
    clearInterval(interval);
  }
}
