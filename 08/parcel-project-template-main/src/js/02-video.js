import Player from '@vimeo/player';
import throttle from 'lodash/throttle';

 const iframe=document.querySelector('iframe');
const player=new Vimeo.Player(iframe);
const LOCALSTORAGE_KEY="videoplayer-current-time";
const onPlay=e=>{
  try{
  localStorage.setItem(LOCALSTORAGE_KEY,`${e.seconds}`);
  console.log(localStorage.getItem(LOCALSTORAGE_KEY));
  
  }catch(error){
    console.log(error.name);
    console.log(error.message);
  }
}


player.on('timeupdate', throttle(onPlay, 2000));
player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY))




