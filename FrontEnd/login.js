
async function fetchPost(url, formData ) {
	const rawData = Object.fromEntries(formData.entries()); /* convertit données de connexion de l'utilisateur dans un tableau paire clé/valeur,*/
	const data = JSON.stringify(rawData);					/*puis en chaine de caractère, ajoute ces données aux optins de fetch, vérifie la réponse */
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

	try {												/* récupère les données de fetch, stocke le token reçu, redirige vers index.html */
        const formData = new FormData(submitBtn);
        const responseData = await fetchPost( url, formData );
		localStorage.setItem('token', responseData.token);
        window.location.href='index.html';
	} catch (err) {
		console.log('Erreur: '+ err);
        
	}
}

const submitBtn = document.querySelector(".form");


submitBtn.addEventListener("submit", submit);     


