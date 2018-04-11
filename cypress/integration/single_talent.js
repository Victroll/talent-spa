'use strict';

describe('Single talent', () => {
  var talentTreeList = { trees: {}};
  beforeEach(() => {
    // Load data for the tests
    cy.fixture('talent_data').as('talent');
  });

  it('Creates 1 talent and complete its data', function() {
    // Open the app
    cy.visit('/');
    cy.contains('Welcome to the Talent Tree Creator app!');

    // Go to the creation page
    cy.get('#nav-create').click();

    // Add new talent
    cy.get('#add-talent').click();

    // Open the config for that talent
    cy.get('.talent').click();

    // Insert a new name
    cy.get('#talent-name')
      .type(`{selectall}${this.talent.name}`)
      .should('have.value', this.talent.name);

    // Insert a new description
    cy.get('#talent-desc')
      .type(`{selectall}${this.talent.desc}`)
      .should('have.value', this.talent.desc);

    // Open icon modal
    cy.get('#icon-canvas').click();

    // Wait for the modal to show
    cy.wait(1000)

    // Scroll the modal and select a new icon
    cy.get('.modal-icon')
      .scrollTo(140 * this.talent.posX, 140 * this.talent.posY)
      .click(10, 10);

    // Activate the checkbox 'Has points?'
    cy.get('.talent-hasPoints').click();

    // Set maximum points
    cy.get('#talent-max-points')
      .type(`{selectall}${this.talent.maxPoints}`)
      .should('have.value', '' + this.talent.maxPoints);

    // Save talent info
    cy.get('#save-talent').click();

    // Confirm that the talent data is correct through the tooltip
    checkTooltipData(this.talent);

  });

  it('Check that the talent works as intended', function() {
    // Click the play button
    cy.get('#play-talents').click();

    // Check that the rest of the button are disabled
    cy.get('#config-talents').should('have.attr', 'disabled');
    cy.get('#save-talents').should('have.attr', 'disabled');
    cy.get('#load-talents').should('have.attr', 'disabled');
    cy.get('#add-talent').should('have.attr', 'disabled');
    cy.get('#remove-talent').should('have.attr', 'disabled');

    // The activation and increase/decrease of the talents is pure internal, so
    // there is no way of checking this except visually

    // Click the creation button
    cy.get('#play-talents').click();
  });

  it('Saves the talent', function() {
    // Prepare the mocked request
    cy.server();
    cy.route({
      method: 'POST', 
      url: '**/saveTalentTree',
      onRequest: (xhr) => {
        talentTreeList.trees[xhr.request.body.name]= xhr.request.body.tree;
      },
      response: {
        result: 'ok',
        talentTreeList: talentTreeList
      }
    });

    // Click the save button
    cy.get('#save-talents').click();

    // Input a name for saving
    cy.get('#talent-tree-name')
      .type(`{selectall}${this.talent.saveName}`)
      .should('have.value', this.talent.saveName);

    // Save it
    cy.get('#save-talent-tree').click();
  });

  it('Check that the talent is removed', function() {
    // Click the remove button
    cy.get('#remove-talent').click();

    // Click on the talent to remove it
    cy.get('.talent').click();

    // Check that the talent is no more
    cy.get('.talent').should('not.exist');
  });

  it('Loads the previous removed talent', function() {
    // Mock the requests
    cy.server();

    cy.route({
      method: 'GET',
      url: '**/getTalentTreeList',
      response: {
        list: Object.keys(talentTreeList.trees)
      }
    }).as('getTalentTreeList');

    cy.route({
      method: 'GET',
      url: `**/getTalentTree/${this.talent.saveName}`,
      response: {
        result: 'ok',
        talentTree: talentTreeList.trees[this.talent.saveName]
      }
    });

    // Click the load talent button
    cy.get('#load-talents').click();

    // Wait for the response
    cy.wait('@getTalentTreeList');

    // Check that the list contains the name of the saved talent tree
    cy.contains(this.talent.saveName).click();

    // Check that there is a talent and its tooltip has the right data
    cy.get('.talent');
    checkTooltipData(this.talent);
  });

  function checkTooltipData(talent) {
    // Show the tooltip
    cy.get('.talent').trigger('mouseover');
    cy.wait(1000);

    cy.get('.talent-tooltip')
      .contains(talent.name);
    cy.get('.talent-tooltip')
      .contains(talent.desc);
    cy.get('.talent-tooltip')
      .contains(`Max. points: ${talent.maxPoints}`);
  }
});