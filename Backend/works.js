

                /*afficher projets ---> */

const gallery = document.querySelector('.gallery');

let dataWorks = [];

async function fetchWorks () {
    const works = await fetch('http://localhost:5678/api/works');
    const jsonData = await works.json();
    // const result = buttonClicked();
    // dataWorks = jsonData.filter( cat => cat.category.name === '');
    // console.log('fetchWorks', result);
    return jsonData;
}
fetchWorks();

// const filterCat = async () => {
//     const cworks = await fetchWorks();
//     let result = cworks.filter( cat => cat.category.name === currentCat);
//         console.log('TESTEMENT2', result);
//         return result;
// }





async function fetchCats () {
    const cats = await fetch('http://localhost:5678/api/categories');
    const jsonData = await cats.json();
    return jsonData;
}




async function generateWorks() { 
    const works = await fetchWorks();
    console.log('Works', works);
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
    let newEntry = { "id": 0,
                "name": "Tous"
                };
    categories.unshift(newEntry);
        for (let i = 0; i <= categories.length; i++) {
            console.log('TEST', categories);
        const button = document.createElement('button');
        const filters = document.querySelector('.filters');
        button.innerHTML = categories[i].name;
        button.setAttribute('id','idName');
        button.id = categories[i].name;
        filters.appendChild(button);   
    }   
}   
generateButtons();
 


                /* <--- génerer boutons */

            

 function setSelected() {
    const currentGallery = document.body.contains()
}
setSelected();





    
const buttons = document.getElementById('filters');





const buttonClicked = (e) => {
    let value = e.target.id;
    filterWorks(value);
    setSelected(value);
    console.log('value is', value);
    return value;
}

buttons.addEventListener("click", buttonClicked);




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
        console.log('filterworks', currentCat);
    } else {
        generateWorks();
        
    }
        
 }




