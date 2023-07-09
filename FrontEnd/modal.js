
import {works,cats } from "./fetches.js";
import {generateWorks} from "./works.js";

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
const addImageform = document.querySelector('#validate_form');
const display = document.querySelector('.modal_upload-1');
const submit_btn = document.getElementById('submit');
const submitTitle = document.getElementById('title');
const formSelectCat = document.getElementById('category');
let newWork = [];


/* affiche la modale et crée la galerie de miniatures des travaux */  

btn.addEventListener('click', (e) => {     
    e.preventDefault();
    modal.style.display = 'block';
    generateThumbnails();
    
    } 
);


 /* prépare le contenu de la galerie de miniatures et l'affiche dans le DOM */

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



 
/* applique/retire un style à l'icône flèches lorsqu'une miniature est selectionnée */

modal_gal.addEventListener('focusin', (e)=> { 
   const arrowIcon = e.target.firstElementChild;
   if(e.target.id === arrowIcon.id ) { 
       arrowIcon.style.display = 'block';
       e.target.children[2].style.border = '1px solid yellow';
    };
    
});

modal_gal.addEventListener('focusout', (e)=> {
   const arrowIcon = e.target.firstElementChild;
   if(e.target.id === arrowIcon.id ) { 
       arrowIcon.style.display = 'none';
       e.target.children[2].style.border = '1px solid transparent';
    };
});



/* crée l'interface de chargement d'images */

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


/* crée dynamiquement les options select du formulaire */

const generateSelectOptions = function() {
  let newOptions = {};
  newOptions = `<option label="&nbsp;"></option>`
  cats.splice(0, 1, '&nbsp;');

    for(let i = 1 ; i < (cats.length ); i++){
      let option = `<option value="${cats[i].id}">${cats[i].name}</option>`;
      newOptions += option;
    }
  formSelectCat.innerHTML = newOptions;
};


/* affiche la fenêtre de chargement d'images et masque la galerie de miniatures */
/* réinitialise le conteneur de l'interface avant d'en afficher le contenu en appelant */
/* la fonction décrite ci-dessus */

btn_Add.addEventListener('click',function(e) {
    e.preventDefault();
   modal_box_1.style.display = 'none';    
   modal_box_2.style.display = 'block';   
   modal_return.style.display = 'block';  
   display.innerHTML='';
   submit_btn.setAttribute('disabled','');
   setUploadUI();
   generateSelectOptions();
}
);



/* si l'icône de suppression est cliquée on récupère son id qui correspond à celle 
 de l'image qu'on souhaite supprimer. A partir de la réponse du positive serveur 
 on supprime l'élèment parent conteneur de l'image, on rafraichit les travaux */   

modal_gal.addEventListener('click', async (e)=> {
  e.preventDefault;
  if (e.target.classList.contains('fa-trash-can')) {  
    let id = e.target.id;                                                    
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
            generateWorks();

         }};
    
    });



/* on donne une taille maximale au fichier à charger ainsi qu'une méthode filereader pour */
/*  pouvoir le lire. On vérifie la taille du fichier et affiche un message à l'utilisateur 
 en cas de dépassement de taille, si c ok on affiche la miniature. 
 On vérifie que les options sont selectionnées 
 On rend le bouton cliquable, pour soumettre la demande.  */

addImageform.addEventListener('change', (e) => { 
  e.preventDefault();                            
  let fileSize = upload.files[0].size; 
  let category = document.getElementById('category');  
  let file = upload.files[0];
  let title = document.getElementById('title');              
  const maxSize = 4 * 1024 * 1024;                           
  let reader = new FileReader();                             
  reader.readAsDataURL(upload.files[0]);
    reader.addEventListener('load', (o) => {
     o.preventDefault();
      try 
        {
          if(fileSize > maxSize) throw `Fichier trop volumineux, veuillez choisir un fichier d'une taille de 4mo maximum.`;
          display.innerHTML = `<img src=${reader.result} alt=''/>`;
          submit_btn.setAttribute('disabled','');
          while ( title.value === ''&& file.index !== null && category.value !=='') throw 'Veuillez indiquer un titre';
          while ( title.value !== ''&& file.index !== null && category.value =='') throw 'Choisissez une catégorie.';
          if( title.value !== ''&& file.index !== null && category.value !=='') {

            submit_btn.removeAttribute('disabled');
          }
        }catch(error)
        {
          alert(error);
        
        };      
      });
});




/* on envoie les données du formulaire sous forme d'objet formdata et on ajoute 
au tableau works (la galerie principale) le nouvel élément renvoyé par le serveur, on rafraichit les travaux
on réinitialise le formulaire, l'interface de chargement et on efface la miniature de preview */

addImageform.addEventListener('submit', async (e) => {  
  e.preventDefault();                               
  const formData = new FormData(addImageform);      
    const fetchNewWorks = fetch ('http://localhost:5678/api/works',{
      method: "POST",
      headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
      },
      body: formData,
        });
        const response = await fetchNewWorks;
        newWork = await response.json();
        works.push(newWork);
        generateWorks();
        addImageform.reset();
        display.innerHTML='';
        setUploadUI();       
  });


/* flèche retour: affiche et cache les fenêtres,reset form */

 modal_return.addEventListener('click', async function(e) { 
  e.preventDefault();
  modal_box_2.style.display = 'none';
  modal_box_1.style.display = 'block';
  addImageform.reset();
  upload.files.value = "";
  generateThumbnails();
});


/* détecte les évènement de click sur la modale et boutons; reset form */
/* ferme la fenêtre */

document.addEventListener('click',function(e) {    
                                                   
  for(let i= 0; i< closes.length; i++) {         

    if(e.target === modal || e.target === closes[i] ) {  
      modal.style.display ='none';    
      addImageform.reset();
      display.innerHTML ='';
      setUploadUI();       

  

       };

    }
});



