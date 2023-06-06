

                /*afficher projets ---> */
let dataWorks = [];

async function fetchWorks () {
    const works = await fetch('http://localhost:5678/api/works');
    const jsonData = await works.json();
    dataWorks = jsonData;
    console.log('dataWorks', dataWorks);
    return jsonData;
}


async function fetchCats () {
    const cats = await fetch('http://localhost:5678/api/categories');
    const jsonData = await cats.json();
    console.log('dataCategories', jsonData);
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


                

  async function generateButtons() {
    let cats = await fetchCats();
    
    console.log('testing',cats);
    for (category of cats) {    
        let categ = new Set();
        categ.add(category.name);
    }
    const button = document.createElement('button');
    const filters = document.querySelector('.filters');
    button.innerHTML = category.name;
    filters.appendChild(button);
    console.log('test', category);
    
     
}
generateButtons();

                /* <--- génerer boutons */



                
                
                

//  function setSelected() {
//     buttons.forEach(button => {
//         button.classList.remove('selected');
//     });
    
// }
// setSelected();




    
const buttons = document.getElementById('group');


let currentFilter = '';

const buttonClicked = (e) => {
    let value = e;
    filterWorks(value);
    console.log('value is', value);
}
buttons.addEventListener("click", buttonClicked);

const filterWorks = (currentCat) => {
    // vider la galerie
    // trier le tableau dataWorks avec la bonne catégorie
    // afficher les works dans galerie
    console.log('filterWorks', currentCat);
 }





const buttonValue = buttonClicked;
console.log(currentFilter);

