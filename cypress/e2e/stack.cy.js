import { DELAY_IN_MS } from "../../src/constants/delays";
import {
    addButtonText,
    deleteButtonText,
    clearButtonText,
    circlesCollection,
    circleStateDefault,
    topTextContent,
    circleStateChanging
} from "../constants/constants";

const delayAmount = DELAY_IN_MS;



describe('Тестирование работы страницы Стек.', () => {
    const pushItemToStack = (item) => {
        cy.get('input').type(item);
        cy.contains(addButtonText).click();

        cy.get(circlesCollection).contains(item).parent().invoke('attr', 'class').then(classList => expect(classList).contains(circleStateChanging));
        
        cy.wait(delayAmount);
    };

    beforeEach(() => {
        cy.visit('/stack');
    });

    it('Если в инпуте пусто, то кнопка добавления должна быть недоступна', () => {
        cy.get('input').should('have.value', '');
        cy.contains(addButtonText).should('be.disabled');
    });

    it('Элемент добавляется в стек корректно.', () => {
        pushItemToStack('A');
        cy.get(circlesCollection).contains('A').parent().as('circle');
        cy.get('@circle').invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
        cy.get('@circle').siblings('div').contains(topTextContent);

        cy.wait(delayAmount);

        pushItemToStack('B');
        cy.get(circlesCollection).spread((circle1, circle2) => {
          cy.get(circle1).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
          cy.get(circle1).should('have.text', 'A');
          cy.get(circle2).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
          cy.get(circle2).should('have.text', 'B');
          cy.get(circle2).siblings('div').contains(topTextContent);
        });

        cy.wait(delayAmount);

        pushItemToStack('C');
        cy.get(circlesCollection).spread((circle1, circle2, circle3) => {
          cy.get(circle1).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
          cy.get(circle1).should('have.text', 'A');
          cy.get(circle2).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
          cy.get(circle2).should('have.text', 'B');
          cy.get(circle3).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
          cy.get(circle3).should('have.text', 'C');
          cy.get(circle3).siblings('div').contains(topTextContent);
        });
    });

    it('Элемент удаляется из стека корректно.', () => {
        pushItemToStack('A');
        pushItemToStack('B');
        pushItemToStack('C');
    
        cy.contains(deleteButtonText).click();
    
        cy.wait(delayAmount);
    
        cy.get(circlesCollection).spread((circle1, circle2) => {
          cy.get(circle2).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
          cy.get(circle2).should('have.text', 'B');
          cy.get(circle2).siblings('div').contains(topTextContent);
        });
    });

    it('Нажатие на кнопку Очистить отрабатывает корректно.', () => {
        pushItemToStack('A');
        pushItemToStack('B');
        pushItemToStack('C');

        cy.contains(clearButtonText).click();
    
        cy.wait(delayAmount);
    
        cy.get(circlesCollection).should('have.length', '0');
    });
});