
import {fetchWorks } from "./fetches.js";
const works = await fetchWorks();


const modal = document.getElementById('modal');
const btn = document.getElementById('btn_proj');
const closes = document.getElementsByClassName('modal_close');
const modal_box_1 = document.querySelector('.modal_box-1');
const modal_box_2 = document.querySelector('.modal_box-2');
const modal_gal = document.querySelector('.modal_gallery');
const btn_Add = document.getElementById('addFile');
const modal_return = document.querySelector('.modal_return');
const token = localStorage.getItem('token');

const upload = document.querySelector('#upload');
const submit_btn = document.querySelector('#submit');
const addImageform = document.querySelector('#validate_form');
const display = document.querySelector('.modal_upload-1');


const openModal = btn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'block';
    generateThumbnails();
    
    } 
);


const closeBtn = function() {
  Array.from(closes).forEach(close => close.addEventListener());
}

document.addEventListener('click',function(e) {

  for(let i= 0; i< closes.length; i++) {

    if(e.target === modal || e.target === closes[i] ) {
      modal.style.display ='none';
  };

  }
});



const generateThumbnails = async function() {
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

function setUploadUI() {
  let classes = 'fa-regular fa-image'.split(' ');
  const fileIcon = document.createElement('i');
  fileIcon.classList.add(...classes);
  const labelAddImage = document.createElement('label');
  labelAddImage.htmlFor = "upload";
  labelAddImage.id = 'add_btn';
  labelAddImage.innerText =' + Ajouter photo';
  const fileIconP = document.createElement('p');
  fileIconP.innerText = 'jpg, png : 4mo max';
  display.append(fileIcon,labelAddImage,fileIconP);
}

const addFile = btn_Add.addEventListener('click',function(e) {
    e.preventDefault();
   modal_box_1.style.display = 'none';
   modal_box_2.style.display = 'block';
   modal_return.style.display = 'block';
   display.innerHTML='';
   setUploadUI();
}
);
   
const deleteFile = modal_gal.addEventListener('click', async (e)=> {
  e.preventDefault;
  if (e.target.classList.contains('fa-trash-can')) {
    let id= e.target.id;
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:5678/api/works/${id}`, {
       method: "DELETE",
       headers: {
              "Content-Type": "application/json",
              "Accept": "*/*",
              "Authorization": `Bearer: ${token}`,
         }});
         if (res.ok) {     
             e.target.parentElement.remove();
         }
        
    }
    
    });


addImageform.addEventListener('change', (e) => {
  e.preventDefault();
  console.log('AddImageform',e);
  let fileSize = upload.files[0].size;
  const maxSize = 8 * 1024 * 1024;
  let reader = new FileReader();
  reader.readAsDataURL(upload.files[0]);
    reader.addEventListener('load', (o) => {
          if(fileSize > maxSize) {
            alert('Ce fichier est trop volumineux.')
          }else{
            display.innerHTML = `<img src=${reader.result} alt=''/>`;
            submit_btn.removeAttribute('disabled');
          }
        });
  
  }); 
     
addImageform.addEventListener('submit', (e) => {
e.preventDefault();
const formData = new FormData(addImageform);  
  fetch ('http://localhost:5678/api/works',{
    method: "POST",
    headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
    },
    body: formData,
      }).then(res => res.json())
        .then(data => { 
        works.push(data);
        addImageform.reset();
        display.innerHTML='';
        setUploadUI();
        
        })
      
      .catch(error => console.log(error));   
} );

 const modal_previous = modal_return.addEventListener('click',function(e) {
  e.preventDefault();
  modal_box_2.style.display = 'none';
  modal_box_1.style.display = 'block';
  generateThumbnails();
});





































 


