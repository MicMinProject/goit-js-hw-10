


const input=document.querySelector('input');
const textarea=document.querySelector('textarea');
const button=document.querySelector('buttton');
const LOCALSTORAGE_KEY="feedback-form-state";
const data={
  email: "",
  message: ""
}

const onInput=e=>{
e.preventDefault();

data.email=e.value;
localStorage.setItem(LOCALSTORAGE_KEY,JSON.stringify(data));
console.log(localStorage.getItem(LOCALSTORAGE_KEY));
}

const onTextarea=e=>{
e.preventDefault();

data.message=e.value;
localStorage.setItem(LOCALSTORAGE_KEY,JSON.stringify(data));
console.log(localStorage.getItem(LOCALSTORAGE_KEY));
}

input.addEventListener('input', onInput);
textarea.addEventListener('input', onTextarea);
