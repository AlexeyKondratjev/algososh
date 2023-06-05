import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from './button';
import { render, screen, fireEvent } from '@testing-library/react';


describe('Тесты компонента Button.', () => {
    it('Кнопка с текстом рендерится без ошибок', () => {
        const button = renderer.create(<Button text="Выполнить" />).toJSON();
        expect(button).toMatchSnapshot();
    });

    it('Кнопка без текста рендерится без ошибок', () => {
        const button = renderer.create(<Button />).toJSON();
        expect(button).toMatchSnapshot();
    });

    it('Заблокированная кнопка рендерится без ошибок', () => {
        const button = renderer.create(<Button disabled />).toJSON();
        expect(button).toMatchSnapshot();
    });

    it('Кнопка с индикацией загрузки рендерится без ошибок', () => {
        const button = renderer.create(<Button isLoader />).toJSON();
        expect(button).toMatchSnapshot();
    });

    it('Корректно отрабатывает колбек при клике на кнопку', () => {
        window.alert = jest.fn();

        render(<Button text='Выполнить' onClick={alert('Кнопка была нажата!')} />);

        const button = screen.getByText("Выполнить");

        fireEvent.click(button);

        expect(window.alert).toHaveBeenCalledWith('Кнопка была нажата!');
    });
});
