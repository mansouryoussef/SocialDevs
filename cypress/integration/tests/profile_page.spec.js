context('Porfile Page', () => {
	before(() => {
		cy.login();
		cy.visit('/profile');
	});
	// it('Should have the title "Profile"', () => {
	// 	cy.get('h1')
	// 		.contains('Profile')
	// 		.should('be.visible');
	// });

	// context('Profile information', () => {
	// 	it('Should have "Profile information:" text', () => {
	// 		cy.get('h2')
	// 			.contains('Profile information:')
	// 			.should('be.visible');
	// 	});

	// 	it('Should not have "Create a profile:" text', () => {
	// 		cy.get('h2')
	// 			.contains('Create a profile:')
	// 			.should('not.exist');
	// 	});
	// 	it('Should have all information items', () => {
	// 		cy.get('[data-cy=profile_info_list]')
	// 			.children()
	// 			.should('have.length', 9);

	// 		cy.get('[data-cy=profile_info_item]')
	// 			.contains('Title:')
	// 			.parent()
	// 			.should('contain', 'Great Title');

	// 		cy.get('[data-cy=profile_info_item]')
	// 			.contains('Skills:')
	// 			.parent()
	// 			.should('contain', 'Awesome Skill, Another Awesome Skill');

	// 		cy.get('[data-cy=profile_info_item]')
	// 			.contains('Location:')
	// 			.parent()
	// 			.should('contain', 'Helsinki, Finland');

	// 		cy.get('[data-cy=profile_info_item]')
	// 			.contains('Website:')
	// 			.parent()
	// 			.should('contain', 'https://youssef.fi');

	// 		cy.get('[data-cy=profile_info_item]')
	// 			.contains('Github:')
	// 			.parent()
	// 			.should('contain', 'https://github.com/mansouryoussef');

	// 		cy.get('[data-cy=profile_info_item]')
	// 			.contains('Linkedin:')
	// 			.parent()
	// 			.should(
	// 				'contain',
	// 				'https://www.linkedin.com/in/youssef-mansour-760b27157/'
	// 			);

	// 		cy.get('[data-cy=profile_info_item]')
	// 			.contains('Twitter:')
	// 			.parent()
	// 			.should('contain', 'https://twitter.com');

	// 		cy.get('[data-cy=profile_info_item]')
	// 			.contains('Bio:')
	// 			.parent()
	// 			.should('contain', "Hello, I'm here to checkout the app!");
	// 	});
	// });

	context('Create profile form', () => {
		it('Should show form and remove list when "Edit info" is clicked', () => {
			cy.get('[data-cy=profile_info_list] button')
				.contains('Edit info')
				.click();

			cy.get('[data-cy=create_profile_form]').should('be.visible');

			cy.get('[data-cy=profile_info_list]').should('not.exist');
		});

		it('Should show list and remove form when "Cancel" is clicked', () => {
			cy.get('[data-cy=create_profile_form] button')
				.contains('Cancel')
				.click();

			cy.get('[data-cy=create_profile_form]').should('not.exist');

			cy.get('[data-cy=profile_info_list]').should('be.visible');
		});

		it('Should update profile', () => {
			cy.get('[data-cy=profile_info_list] button')
				.contains('Edit info')
				.click();

			cy.get('[data-cy=form_field]')
				.contains('Title*')
				.parent()
				.find('input')
				.should('have.value', 'Great Title')
				.type('.');

			cy.get('[data-cy=form_field]')
				.contains('Skills*')
				.parent()
				.find('input')
				.should('have.value', 'Awesome Skill,Another Awesome Skill')
				.type('.');

			cy.get('[data-cy=form_field]')
				.contains('Location')
				.parent()
				.find('input')
				.should('have.value', 'Helsinki, Finland')
				.type('.');

			cy.get('[data-cy=form_field]')
				.contains('Website')
				.parent()
				.find('input')
				.should('have.value', 'https://youssef.fi')
				.type('.');

			cy.get('[data-cy=form_field]')
				.contains('Githubusername')
				.parent()
				.find('input')
				.should('have.value', 'https://github.com/mansouryoussef')
				.type('.');

			cy.get('[data-cy=form_field]')
				.contains('Linkedin')
				.parent()
				.find('input')
				.should(
					'have.value',
					'https://www.linkedin.com/in/youssef-mansour-760b27157/'
				)
				.type('.');

			cy.get('[data-cy=form_field]')
				.contains('Twitter')
				.parent()
				.find('input')
				.should('have.value', 'https://twitter.com')
				.type('.');

			cy.get('[data-cy=form_field]')
				.contains('Bio')
				.parent()
				.find('textarea')
				.should('have.value', "Hello, I'm here to checkout the app!")
				.type('.');

			cy.get('[data-cy=create_profile_form] button')
				.contains('Save')
				.click();
		});
	});

	context('Experience form', () => {
		it('Should toggle edit form when Add/Cencel is clicked', () => {
			cy.get('[data-cy=profile_table_title]')
				.contains('Experience')
				.parent()
				.find('button')
				.contains('Add')
				.click();

			cy.get('[data-cy=add_exp_form]').should('be.visible');

			cy.get('[data-cy=profile_table_title]')
				.contains('Experience')
				.parent()
				.find('button')
				.contains('Cancel')
				.click();
		});
		it('Should add experience', () => {
			cy.get('[data-cy=profile_table_title]')
				.contains('Experience')
				.parent()
				.find('button')
				.contains('Add')
				.click();

			cy.get('[placeholder="Company here"]').type('Test Company');

			cy.get('[placeholder="Title here"]').type('Test Title');

			cy.get('[placeholder="From: MM-DD-YY"]').type('12.07.2000');

			cy.get('[placeholder="To: MM-DD-YY"]').type('11.07.2010');

			cy.get('[data-cy=add_exp_form]')
				.find('button')
				.contains('Save it')
				.click();

			cy.get('[data-cy=table_info_row]')
				.contains('Test Company')
				.should('be.visible');
		});
	});

	context('Education form', () => {
		it('Should toggle edit form when Add/Cencel is clicked', () => {
			cy.get('[data-cy=profile_table_title]')
				.contains('Education')
				.parent()
				.find('button')
				.contains('Add')
				.click();

			cy.get('[data-cy=add_edu_form]').should('be.visible');

			cy.get('[data-cy=profile_table_title]')
				.contains('Education')
				.parent()
				.find('button')
				.contains('Cancel')
				.click();
		});

		it('Should add Education', () => {
			cy.get('[data-cy=profile_table_title]')
				.contains('Education')
				.parent()
				.find('button')
				.contains('Add')
				.click();

			cy.get('[placeholder="School here"]').type('Test School');

			cy.get('[placeholder="Degree here"]').type('Test Degree');

			cy.get('[placeholder="From: MM-DD-YY"]').type('12.07.2000');

			cy.get('[placeholder="To: MM-DD-YY"]').type('11.07.2010');

			cy.get('[data-cy=add_edu_form]')
				.find('button')
				.contains('Save it')
				.click();

			cy.get('[data-cy=table_info_row]')
				.contains('Test School')
				.should('be.visible');
		});
	});

	context('Clear all test changes', () => {
		it('Should remove added dots', () => {
			cy.get('[data-cy=profile_info_list] button')
				.contains('Edit info')
				.click();

			cy.get('[data-cy=form_field]')
				.contains('Title*')
				.parent()
				.find('input')
				.should('have.value', 'Great Title.')
				.type('{backspace}');

			cy.get('[data-cy=form_field]')
				.contains('Skills*')
				.parent()
				.find('input')
				.should('have.value', 'Awesome Skill,Another Awesome Skill.')
				.type('{backspace}');

			cy.get('[data-cy=form_field]')
				.contains('Location')
				.parent()
				.find('input')
				.should('have.value', 'Helsinki, Finland.')
				.type('{backspace}');

			cy.get('[data-cy=form_field]')
				.contains('Website')
				.parent()
				.find('input')
				.should('have.value', 'https://youssef.fi.')
				.type('{backspace}');

			cy.get('[data-cy=form_field]')
				.contains('Githubusername')
				.parent()
				.find('input')
				.should('have.value', 'https://github.com/mansouryoussef.')
				.type('{backspace}');

			cy.get('[data-cy=form_field]')
				.contains('Linkedin')
				.parent()
				.find('input')
				.should(
					'have.value',
					'https://www.linkedin.com/in/youssef-mansour-760b27157/.'
				)
				.type('{backspace}');

			cy.get('[data-cy=form_field]')
				.contains('Twitter')
				.parent()
				.find('input')
				.should('have.value', 'https://twitter.com.')
				.type('{backspace}');

			cy.get('[data-cy=form_field]')
				.contains('Bio')
				.parent()
				.find('textarea')
				.should('have.value', "Hello, I'm here to checkout the app!.")
				.type('{backspace}');

			cy.get('[data-cy=create_profile_form] button')
				.contains('Save')
				.click();
		});

		it('Should delete experience', () => {
			cy.get('[data-cy=table_info_row]')
				.contains('Test Company')
				.parent()
				.find('button')
				.contains('Delete')
				.click();

			cy.get('[data-cy=table_info_row]')
				.contains('Test Company')
				.should('not.be.visible');
		});

		it('Should delete education', () => {
			cy.get('[data-cy=table_info_row]')
				.contains('Test School')
				.parent()
				.find('button')
				.contains('Delete')
				.click();

			cy.get('[data-cy=table_info_row]')
				.contains('Test School')
				.should('not.be.visible');
		});
	});
});
