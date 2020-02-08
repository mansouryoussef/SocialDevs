context('Post page', () => {
	before(() => {
		cy.login(); // Custom command
		cy.visit('/');
		cy.create_post(); // Custom command
		cy.contains('Test post')
			.parentsUntil('[data-cy=post_card]')
			.find('[data-cy=comments_btn]')
			.click();
	});

	it('Should be on a post page', () => {
		cy.location('pathname').should('contain', '/post/');
	});

	it('Should display ( No comments yet. )', () => {
		cy.get('[data-cy=comment_note]').should('contain', 'No comments yet.');
	});

	it('Should have the correct post', () => {
		cy.get('[data-cy=post_card] p')
			.contains('Test post')
			.should('be.visible');
	});

	it('Should have the correct name', () => {
		cy.get('[data-cy=post_card]')
			.contains('Guest')
			.should('be.visible');
	});
	it('Should have a like button', () => {
		cy.get('[data-cy=post_card] [data-cy=like_post_btn]').should('be.visible');

		cy.get('[data-cy=post_card] [data-cy=unlike_post_btn]').should('not.exist');

		cy.get('[data-cy=post_card] button')
			.contains('Delete')
			.should('be.visible');
	});

	it('Should not be liked', () => {
		cy.get('[data-cy=post_card] [data-cy=unlike_post_btn]').should('not.exist');

		cy.get('[data-cy=post_card] button')
			.contains('Delete')
			.should('be.visible');
	});

	it('Should have delete button', () => {
		cy.get('[data-cy=post_card] button')
			.contains('Delete')
			.should('be.visible');
	});

	it('Should create a comment', () => {
		cy.get('textarea[placeholder="What\'s on your mind?"]').type(
			'Test comment'
		);

		cy.get('button')
			.contains('Comment it!')
			.click();

		cy.get('textarea[placeholder="What\'s on your mind?"]').should('be.empty');

		cy.get('[data-cy=name]').should('contain', 'Guest');

		cy.get('[data-cy=comment_text]')
			.contains('Test comment')
			.should('be.visible');
	});

	it('Should display ( All comments: )', () => {
		cy.get('[data-cy=comment_note]').should('contain', 'All comments:');
	});

	it('Should delete created comment ', () => {
		cy.get('[data-cy=comment_card] button')
			.contains('Delete')
			.click();

		cy.get('[data-cy=comment_card] [data-cy=comment_text]')
			.contains('Test comment')
			.should('not.exist');

		cy.get('[data-cy=comment_note]').should('contain', 'No comments yet.');
	});

	it('Should like post from post page', () => {
		cy.get('[data-cy=like_post_btn]').click();

		cy.get('[data-cy=unlike_post_btn]').should('be.visible');
	});
	it('Should have 1 like', () => {
		cy.get('[data-cy=likes_count]').should('contain', 1);
	});
	it('Should unlike post from post page', () => {
		cy.get('[data-cy=unlike_post_btn]').click();

		cy.get('[data-cy=like_post_btn]').should('be.visible');
	});

	it('Should have 0 likes', () => {
		cy.get('[data-cy=likes_count]').should('contain', 0);
	});

	it('Should delete post from post page', () => {
		cy.get('[data-cy=post_card] button')
			.contains('Delete')
			.click();

		cy.location('pathname').should('eq', '/feed');
	});
	it('Should not have deleted post in the feed', () => {
		cy.get('[data-cy=post_card] p')
			.contains('Test post')
			.should('not.exist');
	});
});
