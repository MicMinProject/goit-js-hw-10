import { throttle } from "lodash";

const input=document.querySelector('input');
const textarea=document.querySelector('textarea');
const form=document.querySelector('form');
const button=document.querySelector('button');
const LOCALSTORAGE_KEY="feedback-form-state";

const onInput=e=>{
e.preventDefault();
const feedback={
  email: input.value,
  message: textarea.value
}
localStorage.setItem(LOCALSTORAGE_KEY,JSON.stringify(feedback));
console.log(localStorage.getItem(LOCALSTORAGE_KEY))
}
const onTextarea=e=>{
  e.preventDefault();
  const feedback={
    email: input.value,
    message: textarea.value
  }
  localStorage.setItem(LOCALSTORAGE_KEY,JSON.stringify(feedback));
console.log(localStorage.getItem(LOCALSTORAGE_KEY))
}
const check=e=>{
  localStorage.getItem(LOCALSTORAGE_KEY);
    if(input.value!=="" || textarea.value!==""){
      try{
input.value=JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).email;
textarea.value=JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)).message; 
  }catch{
    console.log('WRONG DATA!')
  }
} else{console.log('ENTER DATA!')}
}

const submit=e=>{
  e.preventDefault();
localStorage.removeItem(LOCALSTORAGE_KEY);
const feedback={
  email: input.value,
  message: textarea.value
}
console.log(feedback);
form.reset()
alert("Nice job, send another one!")
}

// check();
input.addEventListener('input', throttle(onInput,1000));
textarea.addEventListener('input', throttle(onTextarea,1000));
button.addEventListener('click', submit);

