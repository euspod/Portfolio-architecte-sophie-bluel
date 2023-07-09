import { fetchCats,fetchWorks} from "./fetches.js";

                /*afficher projets ---> */

const gallery = document.querySelector('.gallery');
const buttons = document.getElementById('filters');
const token = localStorage.getItem('token');



const button = document.getElementsByClassName('btn');



/* génère les travaux à partir de la réponse de l'API  */

async function generateWorks() { 
    const works = await fetchWorks();
    let htmlContent = '';
    
    works.forEach(work => {
        let data =  `<figure class=" ${work.category.name}">
                        <img src="${work.imageUrl}">
                        <figcaption>${work.title}</figcaption>
                    </figure>`;
                                       
    htmlContent += data;
    }) 

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = htmlContent;
    
}
generateWorks();
                /*<---fin afficher projets*/


                /*génerer boutons ---> */
/* ajoute une cat:'tous les projets' à categories*/   
/*création des boutons en fonction des cats */         
/*ajoute les contenus, id,class, attache à  */
/*la div filters */
/*initialise le bouton 'tous' en mode selectionné */

async function generateButtons() {
   
    const categories = await fetchCats();

    let newEntry = { "id": 0,        
                "name": "Tous"
                };
    categories.unshift(newEntry); 

    for (let i = 0; i <= (categories.length -1); i++) {   
        const button = document.createElement('button'); 
        const filters = document.querySelector('.filters'); 
        button.innerHTML = categories[i].name;
        button.setAttribute('class','btn');
        button.id = categories[i].name;
        filters.appendChild(button);  
    }   
    button[0].classList.add('selected'); 
}   
generateButtons();

                /* <--- fin génerer boutons */



            /*detecter clic ajout classe selected boutons ---> */
/*détecte l'evènement boutons cliqué 
supprime le mode selectionné sur tout autre bouton qui n'est pas le bouton actif
on stocke la valeur de l'id de la cible =nom de catégorie 
on ajoute le mode selected au bouton cliqué  
ap l'avoir supprimé sur tout autre bouton */

const buttonClicked = (e) => { 
    const btns = document.querySelectorAll('.btn');
    let value = e.target.id; 
    console.log('e.target.id',e.target.id);
    let currentBtn = e.target;/*on stocke la cible */
    filterWorks(value);
    btns.forEach(btn => {   
        if(btn !== value) {         
            btn.classList.remove('selected'); 
            currentBtn.classList.add('selected'); 
        }   
    });                                   
}

buttons.addEventListener("click", buttonClicked);

            /* <--- fin detecter clic ajout classe selected boutons */



             /*update gallery ---> */

/*réiinitialise la galerie 
vérifie que la galerie n'affiche pas déjà tous les projets
actualise la galerie avec les projets filtrés 
si la première condition n'est pas respectée, on affiche la galerie par défaut */

const filterWorks = async (currentCat) => {
    gallery.innerHTML = ''; 
    
    if (currentCat !== 'Tous') {    
        
        const works = await fetchWorks();
        let result = works.filter( cat => cat.category.name === currentCat);
        let htmlContent = '';
        
        result.forEach(work => {        
            let data =  `<figure id=" ${work.category.name}">
                            <img src="${work.imageUrl}">
                            <figcaption>${work.title}</figcaption>
                        </figure>`;
                                        
        htmlContent += data;
    }) 
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = htmlContent;
        
    } else {
        generateWorks(); 
        
    }
        
 }
            /* <--- fin update gallery */

            /* <--- set admin mode */
const login = document.getElementById('logout');
const setAdmin = function() {
const adminEl = document.getElementsByClassName('admin');
    if(token !== null) {
        Array.from(adminEl).forEach( (el) => {
            el.style.visibility ='visible';
            
        });
        login.innerHTML ='logout';
    };
}
setAdmin();
            /* <--- fin set admin mode */
     

            /* <--- log out */

const logOut = function(e) {
	if(login.innerHTML === 'logout') {
	   localStorage.removeItem('token');
	}
}

login.addEventListener('click', logOut);

            /* <--- fin log out */

export {generateWorks};