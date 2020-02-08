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

Cypress.Commands.add('create_post', () => {
	cy.get('textarea[placeholder="What\'s on your mind?"]').type('Test post');

	cy.get('button')
		.contains('Post it!')
		.click();

	cy.get('textarea[placeholder="What\'s on your mind?"]').should('be.empty'); // For cypress to wait for the textarea to be empty.
});
