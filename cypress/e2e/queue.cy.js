import { DELAY_IN_MS } from "../../src/constants/delays";
import {
    addButtonText,
    deleteButtonText,
    clearButtonText,
    circlesCollection,
    circleStateDefault,
    circleStateChanging,
    headTextContent,
    tailTextContent
} from "../constants/constants";

const delayAmount = DELAY_IN_MS;



describe('Тестирование работы страницы Очередь.', () => {
    const addItemToQueue = (item) => {
        cy.get('input').type(item);
        cy.contains(addButtonText).click();

        cy.get(circlesCollection).contains(item).parent().invoke('attr', 'class').then(classList => expect(classList).contains(circleStateChanging));
        
        cy.wait(delayAmount);
    };

    beforeEach(() => {
        cy.visit('/queue');
    });

    it('Если в инпуте пусто, то кнопка добавления должна быть недоступна', () => {
        cy.get('input').should('have.value', '');
        cy.contains(addButtonText).should('be.disabled');
    });

    it('Элемент добавляется в очередь корректно.', () => {
        addItemToQueue('A');

        cy.get(circlesCollection).contains('A').parent().as('circle');
        cy.get('@circle').invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
        cy.get('@circle').siblings('div').contains(headTextContent);
        cy.get('@circle').siblings('div').contains(tailTextContent);

        cy.wait(delayAmount);

        addItemToQueue('B');

        cy.get(circlesCollection).spread((circle1, circle2) => {
            cy.get(circle1).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
            cy.get(circle1).should('have.text', 'A');
            cy.get(circle1).siblings('div').contains(headTextContent);
            cy.get(circle2).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
            cy.get(circle2).should('have.text', 'B');
            cy.get(circle2).siblings('div').contains(tailTextContent);
        });
    });

    it('Элемент удаляется из очереди корректно.', () => {
        addItemToQueue('A');
        addItemToQueue('B');
    
        cy.contains(deleteButtonText).click();
    
        cy.wait(delayAmount);
    
        cy.get(circlesCollection).spread((circle1, circle2) => {
          cy.get(circle2).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
          cy.get(circle2).should('have.text', 'B');
          cy.get(circle2).siblings('div').contains(headTextContent);
          cy.get(circle2).siblings('div').contains(tailTextContent);
        });
    });

    it('Очередь очищается корректно.', () => {
        addItemToQueue('A');
        addItemToQueue('B');
    
        cy.contains(clearButtonText).click();
    
        cy.wait(delayAmount);
    
        cy.get(circlesCollection).contains('A').should('not.exist');
        cy.get(circlesCollection).contains('B').should('not.exist');
    });
});