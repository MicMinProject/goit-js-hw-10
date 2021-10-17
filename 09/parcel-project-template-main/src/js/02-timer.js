import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputDate=document.querySelector('input');
const start=document.querySelector('button[data-start]');
const timeDays=document.querySelector('span[data-days]');
const timeHours=document.querySelector('span[data-hours]');
const timeMinutes=document.querySelector('span[data-minutes]');
const timeSeconds=document.querySelector('span[data-seconds]');

start.disabled=true;

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
   let selectedDate= selectedDates[0].getTime();
   let date= new Date();
   let currentDate= date.getTime();

   if(selectedDate<=currentDate){
     alert("Please choose a date in the future");
     start.disabled=true;
   } else{
     start.disabled=false;
     const countdown=e=>{
       e.preventDefault();
       let counter=setInterval(()=>{
         let ms=selectedDate-new Date().getTime();
         start.disabled=true;
         convertMs(ms);

         timeDays.textContent=addLeadingZero(String(convertMs(ms).days));
         timeHours.textContent=addLeadingZero(String(convertMs(ms).hours));
         timeMinutes.textContent=addLeadingZero(String(convertMs(ms).minutes));
         timeSeconds.textContent=addLeadingZero(String(convertMs(ms).seconds));

         if(timeDays.textContent==="00"&&
            timeHours.textContent==='00'&&
            timeMinutes.textContent==='00'&&
            timeSeconds.textContent==='00'){
              console.log('Counting stopped');
              clearInterval(counter)
            }
       },1000)
     }
     start.addEventListener('click',countdown);
   }
  }, 
};


flatpickr(inputDate,options);

function addLeadingZero(value){
  if(value<10) {
   return value.padStart(2,"0")
  } return value;
  
}