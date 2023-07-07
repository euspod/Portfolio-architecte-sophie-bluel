

let works = [];
async function fetchWorks () {
   const res = await fetch('http://localhost:5678/api/works');
   works = await res.json();
   console.log(works);

   return works;
}

let cats= [];
async function fetchCats () {
    const data = await fetch('http://localhost:5678/api/categories');
    cats = await data.json();
    console.log(cats);

    return cats;
 }



 
 export {fetchWorks, fetchCats,works};