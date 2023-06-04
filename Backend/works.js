
// async function generateGallery() {
//     let data = await fetch('http://localhost:5678/api/works');
//     let jsonData = await data.json();

// const { response } = require("express");

    
//    return jsonData;
// }
// let newArray = generateGallery();
// console.log(newArray);

// const data = await fetch('http://localhost:5678/api/works');
// let jsonData = await data.json();

// const reponse = await fetch("http://localhost:5678/api/works");
// const avis = await reponse.json();


// déclare les éléments du Dom


// 
// 
// const figCaption = document.createElement('figcaption')
// image.src = 'assets/images/abajour-tahina.png';  /* ajouter element de l'objet*/
// gallery.appendChild(thumbnail);
// thumbnail.appendChild(image);
// thumbnail.appendChild(figCaption);


// const data = await fetch('http://localhost:5678/api/works');
// const jsonData = await data.json();


async function fetchWorks () {
    const works = await fetch('http://localhost:5678/api/works');
    const jsonData = await works.json();
    return jsonData;
}

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
// generateWorks();



// const buttons = document.querySelectorAll('.btn')
const btnAll = document.getElementById('all');
const btnObjects = document.querySelector('.objects');
const btnApartments = document.querySelector('.apartments');
const btnHotel = document.querySelector('.hotel');


//  function setSelected() {
//     buttons.forEach(button => {
//         button.classList.remove('selected');
//     });
    
// }
// setSelected();

// fetch('http://localhost:5678/api/works')
//     .then(response => response.json())
//     .then(data => {
//              for(let i = 0; i < data.length; i++) {
//             //  console.log(data[i].categoryId)
//     }

// })

 

async function fetchCats () {
    const cats = await fetch('http://localhost:5678/api/categories');
    const jsonData = await cats.json();
    const catAll = new Set;
    catAll.add(jsonData[1]);
    console.log(catAll);
    
}
fetchCats();

// async function generateCats() { 
//         const cats = await fetchCats();
//         let htmlContent = '';
//         cats.forEach(cat => {
//             let data =  `<figure>
//                             <img src="${cat.imageUrl}">
//                             <figcaption>${cat.title}</figcaption>
//                             </figure>`;
                            
//         htmlContent += data;
//         console.log(htmlContent);
//     })  
//  }    
    
// generateCats();
  



// function buttonClicked() {
    
    //     e.target.nodeName === 'BUTTON';
    //     console.log(truc) ;
    // }
    
const buttons = document.getElementById('group');



const buttonClicked = (e) => {
    e.target.nodeName === 'BUTTON';
    // console.log(e.target.id);
    return e.target.id;
}
buttons.addEventListener("click", buttonClicked);






const buttonValue = buttonClicked;
console.log(buttonValue);
// switch(buttonValue) {
//     case 'objects':
//         /*gallery -> objectslist */
//         break;
//     case 'apartments':
//     /*gallery -> apartmentslist */
//     break;
//     case 'hotel':
//     /*gallery -> hotelslist */
//     break;
//     default:
//     /*gallery -> allList */

// } 


/* categories : 
liste des categories(id,name):
-> tous(0), objets(1),appartements(2),hôtels et restaurants(3) 
 sortir un tableau works ?
generateworks ? generateCat ? if works.cat1,2,3..

document.querySelector('.gallery').innerHtml = "";
generateCat

*/


// const gallery = document.querySelector('.gallery');
// const thumbnail = document.createElement('figure');
// const image = document.createElement('img');
// image.src = works[i].imageUrl;