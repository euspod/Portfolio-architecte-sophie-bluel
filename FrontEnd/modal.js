
import {works } from "./fetches.js";

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
let newWork = [];

const openModal = btn.addEventListener('click', (e) => { /* affiche la modale et crée la galerie de miniatures des travaux */      
    e.preventDefault();
    modal.style.display = 'block';
    generateThumbnails();
    
    } 
);





const generateThumbnails = async function() {
    let htmlContent = '';
    works.forEach(work => {
        let data =  `<figure id="${work.id}" tabindex="${work.id}">
                        <i id="${work.id}"class="fa-solid fa-arrows-up-down-left-right"></i>
                        <i id="${work.id}" class="fa-solid fa-trash-can"></i>
                        <img id="${work.id}" src="${work.imageUrl}">
                        <p>éditer</p>
                    </figure>`;           /* prépare le contenu de la galerie de miniatures et l'affiche dans le DOM */
                                       
    htmlContent += data;
    });
    modal_gal.innerHTML = htmlContent;
}
  
const focusedIn = modal_gal.addEventListener('focusin', (e)=> { /* applique/retire un style à l'icône flèches lorsqu'une miniature est selectionnée */
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

function setUploadUI() {                          /* crée l'interface de chargement d'images */
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
   modal_box_1.style.display = 'none';    /* affiche la fenêtre de chargement d'images et masque la galerie de miniatures */
   modal_box_2.style.display = 'block';   /* réinitialise le conteneur de l'interface avant d'en afficher le contenu en appelant */
   modal_return.style.display = 'block';  /* la fonction décrite ci-dessus */
   display.innerHTML='';
   submit_btn.setAttribute('disabled','');
   setUploadUI();
}
);
   
const deleteFile = modal_gal.addEventListener('click', async (e)=> {
  e.preventDefault;
  if (e.target.classList.contains('fa-trash-can')) {  /* si l'icône de suppression est cliquée on récupère son id qui correspond à celle */
    let id= e.target.id;                              /* de l'image qu'on souhaite supprimer. A partir de la réponse du positive serveur */ 
    const token = localStorage.getItem('token');      /* on supprime l'élèment parent conteneur de l'image */
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


addImageform.addEventListener('change', (e) => { /* on donne une taille maximale au fichier à charger ainsi qu'une méthode filereader pour */
  e.preventDefault();                            /* pouvoir le lire. On vérifie la taille du fichier et affiche un message à l'utilisateur */
  let fileSize = upload.files[0].size; 
  let category = document.getElementById('category');  
  let file = upload.files[0];
  let title = document.getElementById('title');              /* en cas de dépassement de taille, si c ok on affiche la miniature. */ 
  const maxSize = 4 * 1024 * 1024;                           /* On vérifie que les options sont selectionnées */
  let reader = new FileReader();                             /*  On rend le bouton cliquable, pour soumettre la demande. */
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





addImageform.addEventListener('submit', async (e) => { /* on envoie les données du formulaire sous forme d'objet formdata et on ajoute */ 
  e.preventDefault();                               /* au tableau works (la galerie principale) le nouvel élément renvoyé par le serveur */
  const formData = new FormData(addImageform);      /* on réinitialise le formulaire, l'interface de chargement et on efface la miniature de preview */
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
        addImageform.reset();
        display.innerHTML='';
        setUploadUI();       
  });




 const modal_previous = modal_return.addEventListener('click', async function(e) { /* flèche retour: affiche et cache les fenêtres,reset form */
  e.preventDefault();
  modal_box_2.style.display = 'none';
  modal_box_1.style.display = 'block';
  addImageform.reset();
  upload.files.value = "";
  generateThumbnails();
});




document.addEventListener('click',function(e) {    /* détecte les évènement de click sur la modale et boutons FileSystemDirectoryReader, reset form */
                                                   /* ferme la fenêtre */
  for(let i= 0; i< closes.length; i++) {         

    if(e.target === modal || e.target === closes[i] ) {  
      modal.style.display ='none';    
      addImageform.reset();
      display.innerHTML ='';
      setUploadUI();       

  console.log('test',upload.files.value)

       };

    }
});



