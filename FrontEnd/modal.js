
import {fetchWorks} from "./fetches.js";


const modal = document.getElementById('modal');
const btn = document.getElementById('btn_proj');
const close = document.querySelector('.modal_close');
const modal_box_1 = document.querySelector('.modal_box-1');
const modal_box_2 = document.querySelector('.modal_box-2');
const modal_gal = document.querySelector('.modal_gallery');
const btn_Add = document.getElementById('addFile');
const modal_return = document.querySelector('.modal_return');



const openModal = btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
    generateThumbnails();
    
    } 
);

close.addEventListener("click", (e) => {
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
                        <p>éditer</p>
                    </figure>`;
                                       
    htmlContent += data;
    });
    modal_gal.innerHTML = htmlContent;
}
  
const focusedIn = modal_gal.addEventListener('focusin', (e)=> {
   const arrowIcon = e.target.firstElementChild;
   if(e.target.id === arrowIcon.id ) { 
       arrowIcon.style.display = 'block';
    };
});

const focusedOut = modal_gal.addEventListener('focusout', (e)=> {
   const arrowIcon = e.target.firstElementChild;
   if(e.target.id === arrowIcon.id ) { 
       arrowIcon.style.display = 'none';
    };
});

const addFile = btn_Add.addEventListener('click',function(e) {
    e.preventDefault();
//    const modal_title = document.querySelector('#modal_title');
   const modal_body = document.querySelector('.modal_body');
   modal_box_1.style.display = 'none';
   modal_box_2.style.display = 'block';
   modal_return.style.display = 'block';
   console.log('addfile',e.target);

//    modal_title.textContent = 'Ajout photo';
//    modal_box.style.height = '500px';
}
);

const modal_previous = modal_return.addEventListener('click',function(e) {
    e.preventDefault();
    console.log('return',e.target);
    modal_box_2.style.display = 'none';
    modal_box_1.style.display = 'block';
    }
);