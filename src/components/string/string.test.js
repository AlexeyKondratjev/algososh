import { ElementStates } from '../../types/element-states';
import { reverseArray } from './utils';


describe('Тестирование алгоритма разворота строки.', () => {
    it('Корректно разворачивает строку с чётным количеством символов', async () => {
        const initArray = [
            { symbol: 'a', state: ElementStates.Default },
            { symbol: 'b', state: ElementStates.Default },
            { symbol: 'c', state: ElementStates.Default },
            { symbol: 'd', state: ElementStates.Default }
        ];
        const reversedArray = [
            { symbol: 'd', state: ElementStates.Modified },
            { symbol: 'c', state: ElementStates.Modified },
            { symbol: 'b', state: ElementStates.Modified },
            { symbol: 'a', state: ElementStates.Modified }
        ];

        const func = jest.fn();

        await reverseArray(initArray, func);

        expect(func).toHaveBeenLastCalledWith(reversedArray);
        expect(func).toBeCalledTimes(3);
    });

    it('Корректно разворачивает строку с нечётным количеством символов', async () => {
        const initArray = [
            { symbol: 'a', state: ElementStates.Default },
            { symbol: 'b', state: ElementStates.Default },
            { symbol: 'c', state: ElementStates.Default },
            { symbol: 'd', state: ElementStates.Default },
            { symbol: 'e', state: ElementStates.Default }
        ];
        const reversedArray = [
            { symbol: 'e', state: ElementStates.Modified },
            { symbol: 'd', state: ElementStates.Modified },
            { symbol: 'c', state: ElementStates.Modified },
            { symbol: 'b', state: ElementStates.Modified },
            { symbol: 'a', state: ElementStates.Modified }
        ];

        const func = jest.fn();

        await reverseArray(initArray, func);

        expect(func).toHaveBeenLastCalledWith(reversedArray);
        expect(func).toBeCalledTimes(4);
    });

    it('Корректно разворачивает строку с одним символом', async () => {
        const initArray = [{ symbol: 'a', state: ElementStates.Default }];
        const func = jest.fn();

        await reverseArray(initArray, func);

        expect(func).toHaveBeenLastCalledWith(initArray);
        expect(func).toBeCalledTimes(2);
    });

    it('Корректно разворачивает пустую строку', async () => {
        const initArray = [];
        const func = jest.fn();

        await reverseArray(initArray, func);

        expect(func).toBeCalledTimes(0);
    });
});
