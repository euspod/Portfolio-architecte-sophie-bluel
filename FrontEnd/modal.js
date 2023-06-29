
import {fetchWorks} from "./fetches.js";


const modal = document.getElementById('modal');
const btn = document.getElementById('btn_proj');
const closes = document.getElementsByClassName('modal_close');
const modal_body = document.querySelector('.modal_body');
const modal_box_1 = document.querySelector('.modal_box-1');
const modal_box_2 = document.querySelector('.modal_box-2');
const modal_gal = document.querySelector('.modal_gallery');
const btn_Add = document.getElementById('addFile');
const modal_return = document.querySelector('.modal_return');
const image_input = document.querySelector('#up_file');



const openModal = btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
    generateThumbnails();
    
    } 
);
Array.from(closes).forEach(close => {

    close.addEventListener("click",closeModal);
});


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
                        <img id="${work.id}" src="${work.imageUrl}">
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
       e.target.children[2].style.border = '1px solid yellow';
    };
    
});

const focusedOut = modal_gal.addEventListener('focusout', (e)=> {
   const arrowIcon = e.target.firstElementChild;
   if(e.target.id === arrowIcon.id ) { 
       arrowIcon.style.display = 'none';
       e.target.children[2].style.border = '1px solid transparent';
    };
});

const addFile = btn_Add.addEventListener('click',function(e) {
    e.preventDefault();
   modal_box_1.style.display = 'none';
   modal_box_2.style.display = 'block';
   modal_return.style.display = 'block';
}
);

const modal_previous = modal_return.addEventListener('click',function(e) {
    e.preventDefault();
    modal_box_2.style.display = 'none';
    modal_box_1.style.display = 'block';
    }
);


const display = document.querySelector('.modal_upload-1');
const input = document.querySelector('#upload');

input.addEventListener('change', () => {
  let reader = new FileReader();
  reader.readAsDataURL(input.files[0]);
  reader.addEventListener('load', () => {
    display.innerHTML = `<img src=${reader.result} alt=''/>`;
  });
});



// let clickEvent = (e) => {
//     e.preventDefault();
//     console.log(e);
//     let id= e.target.id;
//     console.log('e-target.id',e.target.id);
//     console.log('e.target',e.target);
//     const token = localStorage.getItem('token');
// }


//     modal_gal.addEventListener('click', clickEvent)




modal_gal.addEventListener('click', async (e)=> {
  if (e.target.classList.contains('fa-trash-can')) {
    e.preventDefault();
    // console.log(item);
    let id= e.target.id;
    console.log('e-target.id',e.target.id);
    console.log('e.target',e.target);
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5678/api/works/${id}`, {
       method: "DELETE",
    //    'withCredentials': "true",
    //    "credentials": "include",
       headers: {
             "Content-Type": "application/json",
          "Accept": "*/*",
          "Authorization": `Bearer: ${token}`,
         }});
         return;
        
    }
    
    });


 


