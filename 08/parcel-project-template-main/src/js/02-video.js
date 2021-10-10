import Player from '@vimeo/player';
import {throttle} from 'lodash/throttle';

 const iframe=document.querySelector('iframe');
const player=new Vimeo.Player(iframe);
const onPlay=e=>{
  try{
  localStorage.setItem("videoplayer-current-time",`${e.seconds}`);
  console.log(localStorage.getItem("videoplayer-current-time"))
  }catch(error){
    console.log(error.name);
    console.log(error.message);
  }
}

player.on('timeupdate', onPlay);

