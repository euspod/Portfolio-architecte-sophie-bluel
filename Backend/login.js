


async function fetchPost({ url, formData }) {
	const rawData = Object.fromEntries(formData.entries());
	const data = JSON.stringify(rawData);
	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: data,
	};

	const response = await fetch(url, fetchOptions);
    let dataStore = JSON.stringify({response});

	if (!response.ok) {
		alert('Email ou mot de passe invalide(s).')
	}
    dataStore = localStorage.setItem('id', 'token');
    // console.log("token",response);
	return response.json();
}


async function submit(e) {
	e.preventDefault();

	const form = event.currentTarget;
    const url = 'http://localhost:5678/api/users/login';
	
    
	try {
        const formData = new FormData(form);
        const responseData = await fetchPost({ url, formData });
        window.open('index.html');
		console.log(responseData);
	} catch (error) {
		alert(`La requête n'/a pu aboutir`);
        return;
	}
    console.log('token',body.access_token);
}

const submitBtn = document.querySelector(".form");
submitBtn.addEventListener("submit", submit);