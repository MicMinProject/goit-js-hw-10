

import '../../node_modules/simplelightbox/dist/simple-lightbox.min.js';

// Add imports above this line
import { galleryItems } from './gallery-items.js';
// Change code below this line


const gallery=document.querySelector('.gallery');

galleryItems.forEach(item=>
  gallery.insertAdjacentHTML('beforeend',`
  <div class="gallery__item">
  <a class="gallery__link" href=${item.original}>
    <img
      class="gallery__image"
      src=${item.preview}
      alt=${item.description}
    />
  </a>
</div>`));

gallery.addEventListener('click',(event=>{
  if(event.target.nodeName !== "IMG") {return;}
  event.preventDefault();

  const instance= new SimpleLightbox('.gallery a', {captionsData: 'alt',
  captionDelay: '250'  });
    console.log(instance)
}));
