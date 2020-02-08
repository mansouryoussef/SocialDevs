context('Navigation', () => {
	context('Not authenticated', () => {
		before(() => {
			cy.visit('/login');
		});
		it('Should navigate though all public routes', () => {
			cy.get('nav button')
				.contains('Sign up')
				.click();

			cy.location('pathname').should('eq', '/signup');

			cy.get('nav button')
				.contains('Log in')
				.click();

			cy.location('pathname').should('eq', '/login');

			cy.get('[data-cy="logo"]').click();

			cy.location('pathname').should('eq', '/');

			cy.get('nav button')
				.contains('View users')
				.click();

			cy.location('pathname').should('eq', '/users');

			cy.get('[data-cy="user_card"]')
				.find('button')
				.contains('View')
				.click();

			cy.location('pathname').should('eq', '/user/5e355eda8c31ecd41aa6a9c1');
		});
	});

	context('Authenticated', () => {
		before(() => {
			cy.login();
		});

		it('Should be on /feed route', () => {
			cy.visit('/');
			cy.location('pathname').should('eq', '/feed');
		});

		it('Should navigate though public & private routes', () => {
			cy.get('nav span')
				.contains('Users')
				.click();

			cy.location('pathname').should('eq', '/users');

			cy.get('nav span')
				.contains('Profile')
				.click();

			cy.location('pathname').should('eq', '/profile');

			cy.get('nav span')
				.contains('Feed')
				.click();

			cy.location('pathname').should('eq', '/feed');

			cy.go('back');

			cy.get('[data-cy="logo"]').click();

			cy.location('pathname').should('eq', '/feed');
		});
	});
});
