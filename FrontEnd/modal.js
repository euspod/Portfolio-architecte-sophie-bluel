
import {fetchWorks} from "./fetches.js";


const modal = document.getElementById('modal');
const btn = document.getElementById('btn_proj');
const close = document.querySelector('.modal_close');
const modal_box = document.querySelector('modal_box');



const openModal = btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
    generateThumbnail();
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


//  const generateThumbnail = async function() {
//     const works = await fetchWorks();
//     const modal_gal = document.querySelector('.modal_gallery');
//     works.forEach(work =>{
//         const figures = modal_gal.createElement('figure');
//         const thumbnail = figures.createElement('img');
//         thumbnail.src = work;
//     });
//     figures.appendChild(thumbnail);
//     modal_gal.appendChild(work);
// }
  
// generateThumbnail();

const generateThumbnail = async function() {
    const works = await fetchWorks();
    let htmlContent = '';
    works.forEach(work => {  
    let data =  `<figure">
                <img src="${work.imageUrl}">
                </figure>`;
                
    htmlContent += data;
    }); 
    const modal_gal = document.querySelector('.modal_gallery');
    modal_gal.innerHTML = htmlContent;
}
