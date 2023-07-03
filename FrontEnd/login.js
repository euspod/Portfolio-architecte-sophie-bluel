


async function fetchPost({ url, formData }) {
	const rawData = Object.fromEntries(formData.entries());
	const data = JSON.stringify(rawData);
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",
		},
		body: data,
	};
	const response = await fetch(url, fetchOptions);
	try {
		
		if(response.status === 404) throw `L'adresse email saisie est invalide.`;
		if(response.status === 401) throw `Le mot de passe que vous avez indiqué n'est pas reconnu.`;
		return response.json();

	}catch(error) {

		alert('Erreur: '+ error);
		return;
	};
		
}


async function submit(e) {
	e.preventDefault();
    const url = 'http://localhost:5678/api/users/login';

	try {
        const formData = new FormData(submitBtn);
        const responseData = await fetchPost({ url, formData });
		localStorage.setItem('token', responseData.token);
        window.location.href='index.html';
	} catch (err) {
		console('Erreur: '+ err);
        
	}
}

const submitBtn = document.querySelector(".form");
submitBtn.addEventListener("submit", submit);

