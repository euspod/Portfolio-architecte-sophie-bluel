import { works} from "./fetches.js";

const token = localStorage.getItem('token');
const input = document.querySelector('#upload');



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
//     const response = await fetchPostForm({url , formData});thumbnailt
//     console.log(formData);
// });



// async function fetchPostForm(formValues) {

//     const response = await fetch('http://localhost:5678/api/works', {
//     method: "POST",
//     headers: {
//     "Content-Type": "multipart/form-data",
//     "Accept": "*/*",
//     "Authorization": `Bearer ${token}`,
//     },
//     body: formValues,
//     });
    
    
// };

// validate_form.addEventListener('submit', async function(e) {

// e.preventDefault();
// const formData = new FormData(validate_form);
// let fileName = input.files[0].name;
// formData.set('image', fileName);
//    fetchPostForm(formData);
// });


  





// async function fetchPostForm({ url, formData }) {
//     const token = localStorage.getItem('token');
// 	const fetchOptions = {
// 		method: "POST",
// 		headers: {
// 			// "Content-Type": "multipart/form-data",
// 			"Accept": "application/json",
//             "Authorization": `Bearer ${token}`,
// 		},
// 		body: formData,
// 	};

// 	const response = await fetch(url, fetchOptions);
//     console.log('response',response);
// 	// if (!response.ok) {
// 	// 	alert('alerte!.');
// 	// 	return;
// 	// }
// 	return response.json();
	
// }


// async function submitForm(e) {
// 	e.preventDefault();

//     const url = 'http://localhost:5678/api/works';
// 	try {
//         const formData = new FormData(validate_form);
//         let fileName = input.files[0].name;
//         formData.set('image', fileName);
//         console.log(formData);
//         const responseData = await fetchPostForm({ url, formData });
// 	} catch (error) {
// 		alert(`La requête n'/a pu aboutir`);
//         return;
// 	}
// }

// const validate_form = document.querySelector('#validate_form');
// validate_form.addEventListener("submit", submitForm);


   
/* ----------------- */
validate_form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(validate_form);
    fetch ('http://localhost:5678/api/works',{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: formData,
        }).then(res => res.json())
          .then(data => console.log(data))
          .catch(error => console.log(error));

    });


