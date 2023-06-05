import { Dispatch, SetStateAction } from "react";
import { DELAY_IN_MS } from "../../constants/delays";
import { TLetter } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { getDelay } from "../../utils/utils";



export const reverseArray = async (array: TLetter[], setStateAction: Dispatch<SetStateAction<TLetter[]>>) => {
    if (array.length > 0) {
        for (let i = 0; i <= Math.ceil(array.length / 2); i++) {
            const firstIndex = i;
            const secondIndex = array.length - i - 1;

            if (firstIndex < secondIndex) {
                //Помечаем к обмену очередную пару.
                array[firstIndex].state = ElementStates.Changing;
                array[secondIndex].state = ElementStates.Changing;
            } else if (firstIndex === secondIndex) {
                //Если это центральный элемент - он автоматически переходит в статус "Modified".
                array[firstIndex].state = ElementStates.Modified;
            }

            //Меняем местами элементы, помеченные в прошлой итерации.
            if (i > 0) {
                let buffer = array[firstIndex - 1];
                array[firstIndex - 1] = array[secondIndex + 1];
                array[secondIndex + 1] = buffer;

                array[firstIndex - 1].state = ElementStates.Modified;
                array[secondIndex + 1].state = ElementStates.Modified;
            }

            setStateAction([...array]);
            await getDelay(DELAY_IN_MS);
        }
    }
};
