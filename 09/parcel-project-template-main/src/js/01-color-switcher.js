import throttle from 'lodash/throttle';
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};
const start=document.querySelector('button[data-start]');
const stop=document.querySelector('button[data-stop]');
const body=document.querySelector('body');
let timerId=null;

const onStart=e=>{
  stop.disabled=false;
  start.disabled=true;
  timerId=setInterval(()=>body.style.backgroundColor=getRandomHexColor(),1000);
  
};

const onStop=e=>{
  stop.disabled=true;
  start.disabled=false;
  clearInterval(timerId)
}

start.addEventListener('click', onStart);
stop.addEventListener('click', onStop)