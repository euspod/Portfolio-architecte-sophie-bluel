

async function fetchWorks () {
   let works = [];
   const res = await fetch('http://localhost:5678/api/works');
   works = await res.json();
   return works;
}
async function fetchCats () {
   let cats = [];
    const data = await fetch('http://localhost:5678/api/categories');
    cats = await data.json();
    return cats;
 }



 
 export {fetchWorks, fetchCats};