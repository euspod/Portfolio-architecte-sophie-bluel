const modal = document.getElementById('modal');
const btn = document.getElementById('btn_proj');
const close = document.querySelector('.modal_close');
const modal_gal = document.querySelector('.modal_gallery');



const openModal = btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
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

const generateThumbnail = function() {
    
    const thumbnails = document.querySelector('.gallery').getElementsByTagName('img');
    // console.log('thumbnails',thumb);
   Array.from(thumbnails).forEach(thumb => {
         console.log('thumb',thumb);
         modal_gal.appendChild(thumb);
    })
}
generateThumbnail();



