import React from 'react';
import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';



describe('Тесты компонента Circle.', () => {
    it('Элемент без буквы рендерится без ошибок', () => {
        const circle = renderer.create(<Circle />).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it('Элемент с буквами рендерится без ошибок', () => {
        const circle = renderer.create(<Circle letter='ABC'/>).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it('Элемент с head рендерится без ошибок', () => {
        const circle = renderer.create(<Circle head='head'/>).toJSON();
        expect(circle).toMatchSnapshot();
    });
    
    it('Элемент с react-элементом в head рендерится без ошибок', () => {
        const circle = renderer.create(<Circle head={<Circle isSmall={true} />} />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    
    it('Элемент с tail рендерится без ошибок', () => {
        const circle = renderer.create(<Circle tail='tail'/>).toJSON();
        expect(circle).toMatchSnapshot();
    });
    
    it('Элемент с react-элементом в tail рендерится без ошибок', () => {
        const circle = renderer.create(<Circle tail={<Circle isSmall={true} />} />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    
    it('Элемент с index рендерится без ошибок', () => {
        const circle = renderer.create(<Circle index={1} />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    
    it('Элемент с пропом "isSmall === true" рендерится без ошибок', () => {
        const circle = renderer.create(<Circle isSmall={true} />).toJSON();
        expect(circle).toMatchSnapshot();
    });
    
    it('Элемент в состоянии default рендерится без ошибок', () => {
        const circle = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it('Элемент в состоянии changing рендерится без ошибок', () => {
        const circle = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
        expect(circle).toMatchSnapshot();
    });

    it('Элемент в состоянии modified рендерится без ошибок', () => {
        const circle = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
        expect(circle).toMatchSnapshot();
    });
});