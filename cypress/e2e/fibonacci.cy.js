import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { calculateButtonText, circlesCollection } from "../constants/constants";

const delayAmount = SHORT_DELAY_IN_MS;



describe('Тестирование работы страницы Последовательность Фибоначчи.', () => {
    beforeEach(() => {
        cy.visit('/fibonacci');
    });

    it('Если в инпуте пусто, то кнопка добавления должна быть недоступна', () => {
        cy.get('input').should('have.value', '');
        cy.contains(calculateButtonText).should('be.disabled');
    });

    it('Числа должны генерироваться корректно.', () => {
        cy.get('input').type('6');

        cy.contains(calculateButtonText).click();

        cy.wait(delayAmount);
        cy.get(circlesCollection).children().should('have.length', '1').should('have.text', '1');

        cy.wait(delayAmount);
        cy.get(circlesCollection).children().should('have.length', '2').should('have.text', '11');

        cy.wait(delayAmount);
        cy.get(circlesCollection).children().should('have.length', '3').should('have.text', '112');

        cy.wait(delayAmount);
        cy.get(circlesCollection).children().should('have.length', '4').should('have.text', '1123');

        cy.wait(delayAmount);
        cy.get(circlesCollection).children().should('have.length', '5').should('have.text', '11235');

        cy.wait(delayAmount);
        cy.get(circlesCollection).children().should('have.length', '6').should('have.text', '112358');

        cy.wait(delayAmount);
        cy.get(circlesCollection).children().should('have.length', '7').should('have.text', '11235813');
    });

});