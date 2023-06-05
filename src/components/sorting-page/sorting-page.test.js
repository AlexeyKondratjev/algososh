import { ElementStates } from '../../types/element-states';
import { getBubbleSortedArray, getSelectionSortedArray, tempFunc } from './utils';
import { Direction } from '../../types/direction';

let testEmptyArray;
let testOneElementArrayInit;
let testOneElementArraySorted;
let testArrayInit;
let testArraySortedAsc;
let testArraySortedDesc;



describe('Тестирование алгоритмов сортировки выбором и пузырьком.', () => {
    beforeEach(() => {
        testEmptyArray = [];

        testOneElementArrayInit = [{ index: 1, state: ElementStates.Default }];
        testOneElementArraySorted = [{ index: 1, state: ElementStates.Modified }];

        testArrayInit = [
            { index: 10, state: ElementStates.Default },
            { index: 17, state: ElementStates.Default },
            { index: 1, state: ElementStates.Default },
            { index: 14, state: ElementStates.Default },
            { index: 6, state: ElementStates.Default }
        ];

        testArraySortedAsc = [
            { index: 1, state: ElementStates.Modified },
            { index: 6, state: ElementStates.Modified },
            { index: 10, state: ElementStates.Modified },
            { index: 14, state: ElementStates.Modified },
            { index: 17, state: ElementStates.Modified }
        ];

        testArraySortedDesc = [
            { index: 17, state: ElementStates.Modified },
            { index: 14, state: ElementStates.Modified },
            { index: 10, state: ElementStates.Modified },
            { index: 6, state: ElementStates.Modified },
            { index: 1, state: ElementStates.Modified }
        ];
    });


    it('Сортировка выбором корректно сортирует пустой массив (по возрастанию)', async () => {
        const func = jest.fn();

        await getSelectionSortedArray(testEmptyArray, Direction.Ascending, func);

        expect(func).toBeCalledTimes(0);
    });

    it('Сортировка выбором корректно сортирует пустой массив (по убыванию)', async () => {
        const func = jest.fn();

        await getSelectionSortedArray(testEmptyArray, Direction.Descending, func);

        expect(func).toBeCalledTimes(0);
    });

    it('Сортировка выбором корректно сортирует массив из одного элемента (по возрастанию)', async () => {
        const func = jest.fn();

        await getSelectionSortedArray(testOneElementArrayInit, Direction.Ascending, func);

        expect(func).toHaveBeenLastCalledWith(testOneElementArraySorted);
    });

    it('Сортировка выбором корректно сортирует массив из одного элемента (по убыванию)', async () => {
        const func = jest.fn();

        await getSelectionSortedArray(testOneElementArrayInit, Direction.Descending, func);

        expect(func).toHaveBeenLastCalledWith(testOneElementArraySorted);
    });

    it('Сортировка выбором корректно сортирует массив из нескольких элементов (по возрастанию)', async () => {
        const func = jest.fn();

        await getSelectionSortedArray(testArrayInit, Direction.Ascending, func, 0);

        expect(func).toHaveBeenLastCalledWith(testArraySortedAsc);
    });

    it('Сортировка выбором корректно сортирует массив из нескольких элементов (по убыванию)', async () => {
        const func = jest.fn();

        await getSelectionSortedArray(testArrayInit, Direction.Descending, func, 0);

        expect(func).toHaveBeenLastCalledWith(testArraySortedDesc);
    });

    //----------------------------------------------------------------------------------------------------------

    it('Сортировка пузырьком корректно сортирует пустой массив (по возрастанию)', async () => {
        const func = jest.fn();

        await getBubbleSortedArray(testEmptyArray, Direction.Ascending, func);

        expect(func).toBeCalledTimes(0);
    });

    it('Сортировка пузырьком корректно сортирует пустой массив (по убыванию)', async () => {
        const func = jest.fn();

        await getBubbleSortedArray(testEmptyArray, Direction.Descending, func);

        expect(func).toBeCalledTimes(0);
    });

    it('Сортировка пузырьком корректно сортирует массив из одного элемента (по возрастанию)', async () => {
        const func = jest.fn();

        await getBubbleSortedArray(testOneElementArrayInit, Direction.Ascending, func);

        expect(func).toHaveBeenLastCalledWith(testOneElementArraySorted);
    });

    it('Сортировка пузырьком корректно сортирует массив из одного элемента (по убыванию)', async () => {
        const func = jest.fn();

        await getBubbleSortedArray(testOneElementArrayInit, Direction.Descending, func);

        expect(func).toHaveBeenLastCalledWith(testOneElementArraySorted);
    });

    it('Сортировка пузырьком корректно сортирует массив из нескольких элементов (по возрастанию)', async () => {
        const func = jest.fn();

        await getBubbleSortedArray(testArrayInit, Direction.Ascending, func, 0);

        expect(func).toHaveBeenLastCalledWith(testArraySortedAsc);
    });

    it('Сортировка пузырьком корректно сортирует массив из нескольких элементов (по убыванию)', async () => {
        const func = jest.fn();

        await getBubbleSortedArray(testArrayInit, Direction.Descending, func, 0);

        expect(func).toHaveBeenLastCalledWith(testArraySortedDesc);
    });
});