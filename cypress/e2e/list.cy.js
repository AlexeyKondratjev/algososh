import { DELAY_IN_MS } from "../../src/constants/delays";
import {
    addButtonText,
    deleteButtonText,
    clearButtonText,
    circlesCollection,
    circlesSmallCollection,
    circleStateDefault,
    circleStateChanging,
    headTextContent,
    tailTextContent,
    addToHeadButtonText,
    addToTailButtonText,
    addByIndexButtonText,
    deleteByIndexButtonText,
    valueInput,
    circleStateModified,
    indexInput,
    deleteFromHeadButtonText,
    deleteFromTailButtonText
} from "../constants/constants";

const delayAmount = DELAY_IN_MS;



describe('Тестирование работы страницы Связный список.', () => {


    beforeEach(() => {
        cy.visit('/list');
    });

    it('Если в инпуте пусто, то кнопки добавления, добавления в head и добавления по индексу должны быть недоступны', () => {
        cy.get(valueInput).should('have.value', '');

        cy.contains(addToHeadButtonText).should('be.disabled');
        cy.contains(addToTailButtonText).should('be.disabled');
        cy.contains(addByIndexButtonText).should('be.disabled');
    });

    it('Корректно отрисовывается дефолтный список.', () => {
        cy.get(circlesCollection).spread((circle1, circle2, circle3, circle4) => {
            cy.get(circle1).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
            cy.get(circle1).siblings('div').contains(headTextContent);
            cy.get(circle2).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
            cy.get(circle3).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
            cy.get(circle4).invoke('attr', 'class').then(classList => expect(classList).contains(circleStateDefault));
            cy.get(circle4).siblings('div').contains(tailTextContent);
        });
    });

    it('Элемент добавляется в head корректно.', () => {
        cy.get(valueInput).type('A');
        cy.contains(addToHeadButtonText).click();

        cy.get(circlesSmallCollection).contains('A').parent().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );

        cy.wait(delayAmount);

        cy.get(circlesCollection).first().contains('A').parent().siblings('div').contains(headTextContent);
        cy.get(circlesCollection).contains('A').parent().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateModified)
        );

        cy.wait(delayAmount);

        cy.get(circlesCollection).contains('A').parent().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateDefault)
        );

        cy.get(circlesCollection).should('have.length', 5);
    });

    it('Элемент добавляется в tail корректно.', () => {
        cy.get(valueInput).type('A');
        cy.contains(addToTailButtonText).click();

        cy.get(circlesSmallCollection).contains('A').parent().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );

        cy.wait(delayAmount);

        cy.get(circlesCollection).last().contains('A').parent().siblings('div').contains(tailTextContent);
        cy.get(circlesCollection).contains('A').parent().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateModified)
        );

        cy.wait(delayAmount);

        cy.get(circlesCollection).contains('A').parent().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateDefault)
        );

        cy.get(circlesCollection).should('have.length', 5);
    });

    it('Элемент добавляется по индексу корректно.', () => {
        cy.get(valueInput).type('A');
        cy.get(indexInput).type('2');
        cy.contains(addByIndexButtonText).click();

        cy.get(circlesSmallCollection).contains('A').parent().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );

        cy.wait(delayAmount);

        cy.get(circlesSmallCollection).contains('A').parent().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );
        cy.get(circlesCollection).first().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );

        cy.wait(delayAmount);

        cy.get(circlesSmallCollection).contains('A').parent().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );
        cy.get(circlesCollection).eq(1).invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );

        cy.wait(delayAmount);

        cy.get(circlesCollection).contains('A').parent().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateModified)
        );
        cy.get(circlesCollection).contains('A').parent().siblings().contains('2');

        cy.wait(delayAmount);

        cy.get(circlesCollection).contains('A').parent().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateDefault)
        );
        cy.get(circlesCollection).contains('A').parent().siblings().contains('2');

        cy.get(circlesCollection).should('have.length', 5);
    });

    it('Элемент удаляется из head корректно.', () => {
        cy.contains(deleteFromHeadButtonText).click();

        cy.get(circlesSmallCollection).invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );
        cy.get(circlesCollection).first().children('.text_type_circle').should('have.value', '');

        cy.wait(delayAmount);

        cy.get(circlesCollection).should('have.length', 3);
    });

    it('Элемент удаляется из tail корректно.', () => {
        cy.contains(deleteFromTailButtonText).click();

        cy.get(circlesSmallCollection).invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );
        cy.get(circlesCollection).eq(3).children('.text_type_circle').should('have.value', '');

        cy.wait(delayAmount);

        cy.get(circlesCollection).should('have.length', 3);
    });

    it('Элемент удаляется по индексу корректно.', () => {
        cy.get(indexInput).type('2');
        cy.contains(deleteByIndexButtonText).click();

        cy.get(circlesCollection).first().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );

        cy.wait(delayAmount);

        cy.get(circlesCollection).first().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );
        cy.get(circlesCollection).eq(1).invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );

        cy.wait(delayAmount);

        cy.get(circlesCollection).first().invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );
        cy.get(circlesCollection).eq(1).invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );
        cy.get(circlesCollection).eq(2).invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );

        cy.wait(delayAmount);

        cy.get(circlesSmallCollection).invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateChanging)
        );
        cy.get(circlesCollection).eq(2).invoke('attr', 'class').then(
            classList => expect(classList).contains(circleStateDefault)
        );
        cy.get(circlesCollection).eq(2).children('.text_type_circle').should('have.value', '');

        cy.wait(delayAmount);

        cy.get(circlesCollection).should('have.length', 3);
    });
});