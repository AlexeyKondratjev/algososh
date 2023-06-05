import { DELAY_IN_MS } from "../../src/constants/delays";
import {
    circlesCollection,
    circleStateDefault,
    circleStateChanging,
    circleStateModified,
    reverseButtonText
} from '../constants/constants';

const delayAmount = DELAY_IN_MS;



describe('Тестирование работы страницы Строка.', () => {
    beforeEach(() => {
        cy.visit('/recursion');
    });

    it('Если в инпуте пусто, то кнопка добавления должна быть недоступна', () => {
        cy.get('input').should('have.value', '');
        cy.contains(reverseButtonText).should('be.disabled');
    });

    it('Строка должна разворачиваться корректно.', () => {
        cy.get('input').type('ABCDE');
        cy.contains('Развернуть').click();

        cy.get(circlesCollection).spread((circle1, circle2, circle3, circle4, circle5) => {
            cy.get(circle1).children().should('have.text', 'A');
            cy.get(circle1).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateChanging))
            cy.get(circle2).children().should('have.text', 'B');
            cy.get(circle2).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault))
            cy.get(circle3).children().should('have.text', 'C');
            cy.get(circle3).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault))
            cy.get(circle4).children().should('have.text', 'D');
            cy.get(circle4).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault))
            cy.get(circle5).children().should('have.text', 'E');
            cy.get(circle5).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateChanging))
        });

        cy.wait(delayAmount);

        cy.get(circlesCollection).spread((circle1, circle2, circle3, circle4, circle5) => {
            cy.get(circle1).children().should('have.text', 'E');
            cy.get(circle1).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateModified))
            cy.get(circle2).children().should('have.text', 'B');
            cy.get(circle2).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateChanging))
            cy.get(circle3).children().should('have.text', 'C');
            cy.get(circle3).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault))
            cy.get(circle4).children().should('have.text', 'D');
            cy.get(circle4).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateChanging))
            cy.get(circle5).children().should('have.text', 'A');
            cy.get(circle5).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateModified))
        });

        cy.wait(delayAmount);

        cy.get(circlesCollection).spread((circle1, circle2, circle3, circle4, circle5) => {
            cy.get(circle1).children().should('have.text', 'E');
            cy.get(circle1).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateModified))
            cy.get(circle2).children().should('have.text', 'D');
            cy.get(circle2).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateModified))
            cy.get(circle3).children().should('have.text', 'C');
            cy.get(circle3).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateModified))
            cy.get(circle4).children().should('have.text', 'B');
            cy.get(circle4).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateModified))
            cy.get(circle5).children().should('have.text', 'A');
            cy.get(circle5).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateModified))
        });
    });
});

