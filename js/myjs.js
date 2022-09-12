//анимация панели параметров слева
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
  document.getElementById('invis').value = document.getElementById('work-id').value*60;
});
$('.plus-work-time').on('click', function() {
  var a = $('.to-input-worktime').val();
  if (a < 99) {$('.to-input-worktime').val(-(-a - 1));}
  else {alert(alert_plus);}
  document.getElementById('invis').value = document.getElementById('work-id').value*60;
});
$('.minus-chill').on('click', function() {
  var a = $('.to-input-chill').val();
  if (a > 1) {$('.to-input-chill').val(a - 1);}
  else {alert(alert_minus);}
});
$('.plus-chill').on('click', function() {
  var a = $('.to-input-chill').val();
  if (a < 99) {$('.to-input-chill').val(-(-a - 1));}
  else {alert(alert_plus);}
});
$('.minus-big-chill').on('click', function() {
  var a = $('.to-input-bigchill').val();
  if (a > 1) {$('.to-input-bigchill').val(a - 1);}
  else {alert(alert_minus);}
});
$('.plus-big-chill').on('click', function() {
  var a = $('.to-input-bigchill').val();
  if (a < 99) {$('.to-input-bigchill').val(-(-a - 1));}
  else {alert(alert_plus);}
});
$('.minus-count').on('click', function() {
  var a = $('.to-input-count').val();
  if (a > 1) {$('.to-input-count').val(a - 1);}
  else {alert(alert_minus);}
});
$('.plus-count').on('click', function() {
  var a = $('.to-input-count').val();
  if (a < 99) {$('.to-input-count').val(-(-a - 1));}
  else {alert(alert_plus);}
});
//таймер
document.getElementById('invis').value = document.getElementById('work-id').value*60;
const input = document.getElementById('invis');
let buffer, interval, min, sec;
buffer = 0;
input.value = document.getElementById('invis').value;

document.getElementById('start').addEventListener('click', () => {
  if (input.value < 0) {
    input.value = 0;
    buffer = 0;
  }
  buffer = input.value;
  clearInterval(interval);
  interval = setInterval(subtractTime, 1000);
});
document.getElementById('pause').addEventListener('click', () => {
  clearInterval(interval);
})
document.getElementById('reset'). addEventListener('click', () => {
  document.getElementById('invis').value = document.getElementById('work-id').value*60;
  input.value = document.getElementById('invis').value;
  buffer = 0;
  document.getElementById("minutes").innerHTML = ("00");
  document.getElementById("seconds").innerHTML = ("00");
})

function subtractTime() {
  if (buffer > 0) {
    buffer--;
    input.value--;
    min = Math.floor(input.value / 60);
    sec = Math.round(((input.value / 60) - min) * 60);
    console.log(sec);
    document.getElementById("minutes").innerHTML = ("0" + min).slice(-2);
    document.getElementById("seconds").innerHTML = ("0" + sec).slice(-2);
    if (input.value < 0 || buffer == 0) {
      input.value = 0;
      buffer = 0;
    }
  } else {
    clearInterval(interval);
  }
}
