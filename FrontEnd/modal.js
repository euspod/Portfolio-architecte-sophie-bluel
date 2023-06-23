
import {fetchWorks} from "./fetches.js";


const modal = document.getElementById('modal');
const btn = document.getElementById('btn_proj');
const close = document.querySelector('.modal_close');
const modal_box = document.querySelector('modal_box');



const openModal = btn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    modal.style.display = 'block';
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal','true');
    generateThumbnails();
} );

document.addEventListener("click", (e) => {
		if (e.target === close || e.target === modal) {
			closeModal();
		}
	} 
);

function closeModal() {
	modal.style.display = "none";
}


const generateThumbnails = async function() {
    const works = await fetchWorks();
    let htmlContent = '';
    
    works.forEach(work => {
        let data =  `<figure id="${work.id}" tabindex="${work.id}">
                        <i id="${work.id}"class="fa-solid fa-arrows-up-down-left-right"></i>
                        <i id="${work.id}" class="fa-solid fa-trash-can"></i>
                        <img src="${work.imageUrl}">
                    </figure>`;
                                       
    htmlContent += data;
    });
    const modal_gal = document.querySelector('.modal_gallery');
    modal_gal.innerHTML = htmlContent;
}
  
const focused = addEventListener('focusin', (e)=> {
   const arrowIcon = e.target.firstElementChild;
   console.log(e.target.id);
   if(e.target.id === arrowIcon.id) {

       arrowIcon.style.display = 'block';
   }else if(e.target.id !== arrowIcon.id){
    arrowIcon.style.display = none;
   }
});