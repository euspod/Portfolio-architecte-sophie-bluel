export {fetchWorks, fetchCats};

 let works = [];
async function fetchWorks () {
   const res = await fetch('http://localhost:5678/api/works');
   works = await res.json();
   return works;
}
 let cats = [];
async function fetchCats () {
    const data = await fetch('http://localhost:5678/api/categories');
    cats = await data.json();
    return cats;
 }
 
