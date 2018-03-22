describe('Basic talent tree creation', function() {
    it('Creates and fill 1 talent', function() {
        const Talent1Desc = 'Talent 1 description. This is a test for the description of the talent 1.'
        // Open app
        cy.visit('http://localhost:3000/');

        // Add new talent
        cy.get('#add-talent').click();

        // Open the config for that talent
        cy.get('.talent').click();

        // Insert a new name
        cy.get('#talent-name')
          .type('{selectall}Talent 1')
          .should('have.value', 'Talent 1');

        // Insert a new description
        cy.get('#talent-desc')
          .type('{selectall}' + Talent1Desc)
          .should('have.value', Talent1Desc);

        // Open icon modal
        cy.get('#iconCanvas').click();

        // Wait for the modal to show
        cy.wait(1500);

        // Scroll the modal and select a new icon
        cy.get('.modal-icon').scrollTo(100, 200).click(20, 50);

        // Before clicking the checkbox, shouldn't exist the components
        cy.get('#talent-initial-points').should('not.exist');

        // Check the 'Has points?' checkbox
        cy.get('.talent-hasPoints').click();

        // Write maximum points and try to input a higher number in 'InitialPoints'
        cy.get('#talent-max-points').type('{selectall}5').should('have.value', '5');
        cy.get('#talent-initial-points').type('{selectall}6').should('have.value', '0');

        // Save talent info
        cy.get('#save-talent').click();

        // Show the tooltip
        cy.get('.talent').trigger('mouseover');
        cy.wait(2000);

        // Confirm that the info is correct
        cy.get('.talent-tooltip').contains('Talent 1');
        cy.get('.talent-tooltip').contains(Talent1Desc);
        cy.get('.talent-tooltip').contains('Max. points: 5');

        // Hide the tooltip
        cy.get('.talent').trigger('mouseout');
        cy.get('.talent-tooltip').should('not.exist');
    })
})