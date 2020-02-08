context('Feed page', () => {
	before(() => {
		cy.login(); // Custom command at ../support/commands.js
		cy.visit('/');
	});

	it('Should load /feed route', () => {
		cy.location('pathname').should('eq', '/feed');
	});

	it('Should create a post', () => {
		cy.get('textarea[placeholder="What\'s on your mind?"]').type('Test post');

		cy.get('button')
			.contains('Post it!')
			.click();

		cy.get('textarea[placeholder="What\'s on your mind?"]').should('be.empty');

		cy.get('[data-cy=post_card]')
			.contains('Test post')
			.should('be.visible');
	});

	it('Should like created post', () => {
		cy.contains('Test post')
			.parentsUntil('[data-cy=post_card]')
			.find('[data-cy="like_post_btn"]')
			.click();
	});

	it('Should unlike created post', () => {
		cy.contains('Test post')
			.parentsUntil('[data-cy=post_card]')
			.find('[data-cy="unlike_post_btn"]')
			.click();
	});

	it('Should delete created post', () => {
		cy.contains('Test post')
			.parentsUntil('[data-cy=post_card]')
			.find('[data-cy="delete_post_btn"]')
			.click();

		cy.contains('Test post').should('not.exist');
	});
});
