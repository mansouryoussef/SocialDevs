Cypress.Commands.add('login', () => {
	cy.request({
		method: 'POST',
		url: 'localhost:5000/api/auth',
		body: {
			email: 'demo@guest.fi',
			password: '123456'
		}
	}).then(res => {
		window.localStorage.setItem('socialDevsUserToken', res.body.token);
	});
});
