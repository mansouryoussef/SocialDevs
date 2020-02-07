context('Signup page', () => {
	before(() => {
		cy.visit('/signup');
	});

	context('Validation', () => {
		it('Should view "Name is required!" error when name is empty', () => {
			cy.get('form button')
				.contains('Sign up')
				.click();

			cy.get('#auth_form_error').should('contain', 'Name is required!');
		});

		it('Should view "Email is required!" error when email is empty', () => {
			cy.get("input[name='name']").type('Super Mario');

			cy.get('form button')
				.contains('Sign up')
				.click();

			cy.get('#auth_form_error').should('contain', 'Email is required!');
		});

		it('Should view "Email is invalid!" error when email is invalid', () => {
			cy.get("input[name='email']").type('super@mario');

			cy.get('form button')
				.contains('Sign up')
				.click();

			cy.get('#auth_form_error').should('contain', 'Email is invalid!');
		});

		it('Should view "Password 6+ characters" error on empty or short password', () => {
			cy.get("input[name='email']")
				.clear()
				.type('super@mario.fi');

			cy.get('form button')
				.contains('Sign up')
				.click();

			cy.get('#auth_form_error').should('contain', 'Password 6+ characters');

			cy.get("input[name='password']").type('123');

			cy.get('#auth_form_error').should('contain', 'Password 6+ characters');
		});

		it('Should view "Passwords don\'t match, please try again." error on wrong email', () => {
			cy.get("input[name='password']").type('1234456');

			cy.get("input[name='confirmPassword']").type('7654321');

			cy.get('form button')
				.contains('Sign up')
				.click();

			cy.get('#auth_form_error').should(
				'contain',
				"Passwords don't match, please try again."
			);
		});
		it('Should view "User already exists" error', () => {
			cy.get("input[name='name']")
				.clear()
				.type('Test User');

			cy.get("input[name='email']")
				.clear()
				.type('contact@youssef.fi');
			cy.get("input[name='password']")
				.clear()
				.type('123456');

			cy.get("input[name='confirmPassword']")
				.clear()
				.type('123456');

			cy.get('form button')
				.contains('Sign up')
				.click();

			cy.get('#auth_form_error').should('contain', 'User already exists');
		});
	});

	context('Signing up & logging in', () => {
		it('Should sign up user', () => {
			cy.get("input[name='name']")
				.clear()
				.type('Super Mario');

			cy.get("input[name='email']")
				.clear()
				.type('super@mario.fi');

			cy.get("input[name='password']")
				.clear()
				.type('123456');

			cy.get("input[name='confirmPassword']")
				.clear()
				.type('123456');

			cy.get('form button')
				.contains('Sign up')
				.click();

			cy.location('pathname').should('eq', '/feed');

			cy.get('ul span')
				.contains('Profile')
				.click();

			cy.get('button')
				.contains('Delete my account')
				.click();

			cy.location('pathname').should('eq', '/');
		});

		it('Should auto login user', () => {
			cy.visit('/signup');

			cy.contains('Auto Login as a guest.').click();

			cy.location('pathname').should('eq', '/feed');
		});
	});
});
