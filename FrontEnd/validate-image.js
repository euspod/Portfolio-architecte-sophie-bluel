const validate_form = document.querySelector('#validate_form');
const input = document.querySelector('#upload');
const token = localStorage.getItem('token');


// async function fetchPostForm({url,formData}) {
//     const fetchOptions = {

//         method: "POST",
// 		headers: {
// 			// "Content-Type": "multipart/form-data",
// 			"Accept": "*/*",
//             "Authorization": `Bearer ${token}`,
// 		},
// 		body: formData,
//     };
//     const res = await fetch(url, fetchOptions);
//     console.log(res);
//     if (!res.ok) {
// 		alert('oops');
// 	return;
//     }else {
//         alert('yeahyyhh !');
//     }};




// validate_form.addEventListener('submit', async function(e) {
//     e.preventDefault();
//    const url = 'http://localhost:5678/api/works';

//     const formData = new FormData(validate_form);
//     const response = await fetchPostForm({url , formData});
//     console.log(formData);
// });

// async function fetchPostForm({url,formData}) {
//     const fetchOptions = {

//         method: "POST",
// 		headers: {
// 			// "Content-Type": "multipart/form-data",
// 			"Accept": "*/*",
//             "Authorization": `Bearer ${token}`,
// 		},
// 		body: formData,
//     };
//     };




validate_form.addEventListener('submit', async function(e) {

e.preventDefault();
const url = 'http://localhost:5678/api/works';
   
const formData = new FormData(validate_form);

let fileName = input.files[0].name;
formData.set('image', fileName);
    
const fetchOptions = {

method: "POST",
headers: {
    // "Content-Type": "multipart/form-data",
    "Accept": "application/json",
    "Authorization": `Bearer ${token}`,
},
body: formData,
};
const res = await fetch(url, fetchOptions);
const resJson = res.json();


console.log(resJson);
if (!resJson.ok) {
    alert('oops');
return;
}else {
    alert('yeahyyhh !');
    
}
    
});


	
   
