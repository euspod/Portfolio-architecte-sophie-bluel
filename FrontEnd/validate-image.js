const validate_form = document.querySelector('#validate_form');
const input = document.querySelector('#upload');
const token = localStorage.getItem('token');


async function fetchPostForm({url,formData}) {
    const fetchOptions = {

        method: "POST",
		headers: {
			// "Content-Type": "multipart/form-data",
			"Accept": "*/*",
            "Authorization": `Bearer: ${token}`,
		},
		body: formData,
    };
    const res = await fetch(url, fetchOptions);
    console.log(res);
    if (!res.ok) {
		alert('oops');
	return;
}else {
    alert('yeahyyhh !');
}};




validate_form.addEventListener('submit', async function(e) {
    e.preventDefault();
   const url = 'http://localhost:5678/api/works';

    const formData = new FormData(validate_form);
    formData.append('image',input.files[0]);
    const response = await fetchPostForm({url , formData});
    console.log(response);
    

});


	
   
