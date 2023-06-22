


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
	if (!response.ok) {
		alert('Email ou mot de passe invalide(s).');
		return;
	}
	return response.json();
	
}


async function submit(e) {
	e.preventDefault();

    const url = 'http://localhost:5678/api/users/login';

	try {
        const formData = new FormData(submitBtn);
        const responseData = await fetchPost({ url, formData });
		localStorage.setItem('token', responseData.token);
        window.location.href='index.html';
	} catch (error) {
		alert(`La requête n'/a pu aboutir`);
        return;
	}
}

const submitBtn = document.querySelector(".form");
submitBtn.addEventListener("submit", submit);

