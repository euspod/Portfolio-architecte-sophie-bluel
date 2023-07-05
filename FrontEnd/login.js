
async function submit(e) {    
	e.preventDefault();
	const formData = new FormData(submitBtn);
    const url = 'http://localhost:5678/api/users/login';
	const rawData = Object.fromEntries(formData.entries()); 
	const data = JSON.stringify(rawData);					
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"Accept": "application/json",		
		},										/* à partir des données du formulaire crée un objet formData, transforme c données en tableau clé/val */
		body: data,								/* convertit l'objet en json, récupère la réponse de fetch,vérifie les erreurs de statut de la réponse et renvoie des messages à l'utilisateur */
	};                              			/*  stocke le token reçu, redirige vers index.html  */
	const response = await fetch(url, fetchOptions);
	
	try {												
	if(response.status === 404) throw `L'adresse email saisie est invalide.`;
	if(response.status === 401) throw `Le mot de passe que vous avez indiqué n'est pas reconnu.`;
		localStorage.setItem('token', response.token);      
        window.location.href='index.html';
	} catch (err) {
		alert('Erreur: '+ err);
        
	}
}

const submitBtn = document.querySelector(".form");


submitBtn.addEventListener("submit", submit);     


