
                /*afficher projets ---> */

const gallery = document.querySelector('.gallery');
const buttons = document.getElementById('filters');
const token = localStorage.getItem('token');
// const adminEl = document.getElementsByClassName('admin');
// const log = document.querySelector('li:nth-child(3)> a');



let jsonData = [];
// import fetchWorks from "./fetches";
async function fetchWorks () {
    const works = await fetch('http://localhost:5678/api/works');
    const jsonData = await works.json();
    return jsonData;
}

fetchWorks();

let cats = [];
async function fetchCats () {
    const data = await fetch('http://localhost:5678/api/categories');
    cats = await data.json();
    return cats;
}


const button = document.getElementsByClassName('btn');

async function generateWorks() { 
    const works = await fetchWorks();
    let htmlContent = '';
    
    works.forEach(work => {
        let data =  `<figure id=" ${work.category.name}">
                        <img src="${work.imageUrl}">
                        <figcaption>${work.title}</figcaption>
                    </figure>`;
                                       
    htmlContent += data;
    }) 

    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = htmlContent;
    
}
generateWorks();
                /*<---afficher projets*/


                /*génerer boutons ---> */

async function generateButtons() {
   
    const categories = await fetchCats();
    let newEntry = { "id": 0,        /* crée une cat:'tous les projets' à categories*/
                "name": "Tous"
                };
    categories.unshift(newEntry); /* ajoute la cat:'tous les projets' à la collection de categories*/

    for (let i = 0; i <= (categories.length -1); i++) {   /*création des boutons en fonction des cats */
        const button = document.createElement('button'); /*ajoute les contenus, id,class, attache à  */
        const filters = document.querySelector('.filters'); /*la div filters */
        button.innerHTML = categories[i].name;
        button.setAttribute('id','idName');
        button.setAttribute('class','btn');
        button.id = categories[i].name;
        filters.appendChild(button);  
    }   
    button[0].classList.add('selected'); /*initialise le bouton 'tous' en mode selectionné */
}   
generateButtons();

                /* <--- génerer boutons */



            /*detecter clic ajout classe selected boutons ---> */

const buttonClicked = (e) => { /*détecte l'evènement boutons cliqué */
    const btns = document.querySelectorAll('.btn');
    let value = e.target.id; /*on stocke la valeur de l'id de la cible */
    console.log(value);
    let currentBtn = e.target;/*on stocke la cible */
    filterWorks(value);
    btns.forEach(btn => {   /*supprime le mode selectionné sur tout autre bouton qui n'est pas le bouton actif*/
        if(btn !== value) {         /*on ajoute le mode selected au bouton cliqué  */
            btn.classList.remove('selected'); /*ap l'avoir supprimé sur tout autre bouton qui */
            currentBtn.classList.add('selected'); 
        }   
    });                                   
}

buttons.addEventListener("click", buttonClicked);

            /* <--- detecter clic ajout classe selected boutons */



             /*update gallery ---> */

 const filterWorks = async (currentCat) => {
    gallery.innerHTML = ''; /*réiinitialise la galerie */
    
    if (currentCat !== 'Tous') {    /*vérifie que la galerie n'affiche pas déjà tous les projets*/
        
        const works = await fetchWorks();
        let result = works.filter( cat => cat.category.name === currentCat);
        let htmlContent = '';
        
        result.forEach(work => {        /*actualise la galerie avec les projets filtrés */
            let data =  `<figure id=" ${work.category.name}">
                            <img src="${work.imageUrl}">
                            <figcaption>${work.title}</figcaption>
                        </figure>`;
                                        
        htmlContent += data;
    }) 
        const gallery = document.querySelector('.gallery');
        gallery.innerHTML = htmlContent;
        
    } else {
        generateWorks(); /*si la première condition n'est pas respectée, on affiche la galerie par défaut */
        
    }
        
 }
            /* <--- update gallery */



           
function setAdmin() {
    const adminEl = document.getElementsByClassName('admin');
    const log = document.querySelector('li:nth-child(3)> a');
    if(token !== null) {
        Array.from(adminEl).forEach( (el) => {
            el.style.visibility ='visible';
        });
        log.innerHTML ='logout';
    } 
}
setAdmin();


const logOut = (e) => {
    if(log.innerHTML === 'logout') {
    //    localStorage.removeItem('token');
    }
}

const log = document.querySelector('li:nth-child(3)> a');


log.addEventListener('click', logOut());


     
// logout.addEventListener('click',(e) => {
//     const log = document.querySelector('li:nth-child(3)> a');

//     const adminEl = document.getElementsByClassName('admin');

    
//     }else {
        
        
//     };

// })

    
    

        
       



            





    
        
    
        
        
    
    


