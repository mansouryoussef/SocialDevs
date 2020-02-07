// <reference types="Cypress" />

context('Login page', () => {
	before(() => {
		cy.visit('/');
		cy.contains('Log in').click();
	});

	context('Validation', () => {
		it('Should be on the /login route', () => {
			cy.location('pathname').should('eq', '/login');
		});

		it('Should view "Email is required!" error when email is empty', () => {
			cy.get('form button')
				.contains('Log in')
				.click();

			cy.get('#auth_form_error').should('contain', 'Email is required!');
		});

		it('Should view "Please enter a valid email!" error when email is valid', () => {
			cy.get("input[name='email']").type('invalid@');

			cy.get('form button')
				.contains('Log in')
				.click();

			cy.get('#auth_form_error').should(
				'contain',
				'Please enter a valid email!'
			);
		});

		it('Should view "Password is required!" error when password is empty', () => {
			cy.get("input[name='email']").type('test.fi');

			cy.get('form button')
				.contains('Log in')
				.click();

			cy.get('#auth_form_error').should('contain', 'Password is required!');
		});

		it('Should view "Wrong email or password!" error on wrong password', () => {
			cy.get("input[name='email']")
				.clear()
				.type('demo@guest.fi');
			cy.get("input[name='password']").type('123');

			cy.get('form button')
				.contains('Log in')
				.click();

			cy.get('#auth_form_error').should('contain', 'Wrong email or password!');
		});

		it('Should view "Wrong email or password!" error on wrong email', () => {
			cy.get("input[name='email']").type('i');
			cy.get("input[name='password']").type('456');

			cy.get('form button')
				.contains('Log in')
				.click();

			cy.get('#auth_form_error').should('contain', 'Wrong email or password!');
		});
	});

	context('Logging in', () => {
		it('Should log in user through the form', () => {
			cy.get("input[name='email']")
				.clear()
				.type('demo@guest.fi');

			cy.get("input[name='password']")
				.clear()
				.type('123456');

			cy.get('form button')
				.contains('Log in')
				.click();

			cy.location('pathname').should('eq', '/feed');
		});

		it('Should log user in as a guest', () => {
			cy.contains('Sign out').click();

			cy.location('pathname').should('eq', '/');

			cy.contains('Log in').click();

			cy.contains('Auto Login as a guest.').click();

			cy.location('pathname').should('eq', '/feed');
		});
	});
});
