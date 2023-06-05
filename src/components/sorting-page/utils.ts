import { Dispatch, SetStateAction } from "react";
import { TIndexedColumn } from "../../types/data";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { getDelay } from "../../utils/utils";



//Основная логика. Сортировка "выбором".
export const getSelectionSortedArray = async (array: TIndexedColumn[],
    sortDirection: Direction,
    setStateAction: Dispatch<SetStateAction<TIndexedColumn[]>>,
    delayAmount: number,
    setProgressAction?: Dispatch<SetStateAction<boolean>>) => {

    if (array.length > 0) {

        setStateAction(setDefaultElementState(array));

        for (let i = 0; i < array.length; i++) {
            let index = i;

            array[i].state = ElementStates.Changing;

            for (let j = i + 1; j < array.length; j++) {
                array[j].state = ElementStates.Changing;

                if (sortDirection === Direction.Ascending) {
                    if (array[j].index < array[index].index)
                        index = j;
                } else {
                    if (array[j].index > array[index].index)
                        index = j;
                }

                setStateAction([...array]);

                await getDelay(delayAmount);

                array[j].state = ElementStates.Default;
            }

            if (index !== i)
                swap(array, i, index, ElementStates.Default);

            array[i].state = ElementStates.Modified;
        }

        setStateAction([...array]);
    }

    if (setProgressAction) {
        setProgressAction(false);
    }
}

//Основная логика. Сортировка методом "пузырька".
export const getBubbleSortedArray = async (array: TIndexedColumn[],
    sortDirection: Direction,
    setStateAction: Dispatch<SetStateAction<TIndexedColumn[]>>,
    delayAmount: number,
    setProgressAction?: Dispatch<SetStateAction<boolean>>) => {

    if (array.length > 0) {
        setStateAction(setDefaultElementState(array));

        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - 1 - i; j++) {
                array[j].state = ElementStates.Changing;
                array[j + 1].state = ElementStates.Changing;

                if (sortDirection === Direction.Ascending) {
                    if (array[j].index > array[j + 1].index) {
                        swap(array, j, j + 1);
                    }
                } else {
                    if (array[j].index < array[j + 1].index) {
                        swap(array, j, j + 1);
                    }
                }

                setStateAction([...array]);

                await getDelay(delayAmount);

                array[j].state = ElementStates.Default;
                array[j + 1].state = ElementStates.Default;
            }

            array[array.length - 1 - i].state = ElementStates.Modified;
        }

        array[0].state = ElementStates.Modified;

        setStateAction([...array]);
    }

    if (setProgressAction) {
        setProgressAction(false);
    }
}



export const setDefaultElementState = (array: TIndexedColumn[]) => {
    if (array && array[0].state !== ElementStates.Default) {
        for (let i = 0; i < array.length; i++) {
            array[i].state = ElementStates.Default;
        }
    }

    return array;
}

//Функция меняет местами два элемента массива. 
//Если задано значение нового статуса - устанавливает его обоим элементам.
export const swap = (array: TIndexedColumn[], firstIndex: number, SecondIndex: number, newState: ElementStates | null = null) => {
    let buffer = array[firstIndex];

    array[firstIndex] = array[SecondIndex];
    array[SecondIndex] = buffer;

    if (newState) {
        array[firstIndex].state = newState;
        array[SecondIndex].state = newState;
    }
}