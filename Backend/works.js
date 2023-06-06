

                /*afficher projets ---> */

const gallery = document.querySelector('.gallery');

let dataWorks = [];

async function fetchWorks () {
    const works = await fetch('http://localhost:5678/api/works');
    const jsonData = await works.json();
    dataWorks = jsonData;
    return dataWorks;
}


async function fetchCats () {
    const cats = await fetch('http://localhost:5678/api/categories');
    const jsonData = await cats.json();
    return jsonData;
}
fetchCats();


 async function generateWorks() { 
    const works = await fetchWorks();
    let htmlContent = '';
    works.forEach(work => {
        let data =  `<figure>
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

let newArray =[];
async function generateButtons() {
    newArray = await fetchCats();
    let newEntry = { "id": 0,
                        "name": "Tous"
                };
    newArray.unshift(newEntry);
    for (let i = 0; i <= newArray.length; i++) {
        const button = document.createElement('button');
        const filters = document.querySelector('.filters');
        button.innerHTML = newArray[i].name;
        button.setAttribute('id','idName');
        button.id = newArray[i].name;
        filters.appendChild(button);  
    }
    
}
 
generateButtons();

                /* <--- génerer boutons */

                
                

//  function setSelected() {
//     buttons.forEach(button => {
//         button.classList.remove('selected');
//     });
    
// }
// setSelected();




    
const buttons = document.getElementById('filters');
console.log('buttons', buttons);

let currentFilter = '';

const buttonClicked = (e) => {
    let value = e.target.id;
    filterWorks(value);
    console.log('value is', value);
}

buttons.addEventListener("click", buttonClicked);

const filterWorks = (currentCat) => {
    // gallery.innerHTML = '';
    
    // trier le tableau dataWorks avec la bonne catégorie
    // afficher les works dans galerie
    // console.log('filterWorks', currentCat);
 }




