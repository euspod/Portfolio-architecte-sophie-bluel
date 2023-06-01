
// async function generateGallery() {
//     let data = await fetch('http://localhost:5678/api/works');
//     let jsonData = await data.json();
    
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

// 
async function fetchWorks () {
    const works = await fetch('http://localhost:5678/api/works');
    const jsonData = await works.json();
    return await jsonData;
}

async function generateWorks() { 
    const works = await fetchWorks();
    let html = '';
    works.forEach(work => {
        let content =  `<figure>
                        <img src="${work.imageUrl}">
                        <figcaption>${work.title}</figcaption>
                        </figure>`;
                        
    html += content;
})
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = html;

}
generateWorks();

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