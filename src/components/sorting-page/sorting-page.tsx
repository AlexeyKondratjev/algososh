import React, { FormEvent, useEffect, useState } from "react";
import { TIndexedColumn } from "../../types/data";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import commonStyles from '../common.module.css';
import styles from './sorting-page.module.css';
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { getDelay, getRandomArr } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { SortMethod } from "../../types/sort-method";
import { DELAY_IN_MS } from "../../constants/delays";



export const SortingPage: React.FC = () => {
  const [resultArray, setResultArray] = useState<TIndexedColumn[]>([]);
  const [isSorting, setIsSorting] = useState(false);
  const [sortMethod, setSortMethod] = useState(SortMethod.selectionSort);
  const [sortDirection, setSortDirection] = useState(Direction.Ascending);


  //Инициация процесса.
  const formOnSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSorting(true);

    if (sortMethod === SortMethod.selectionSort) {
      getSelectionSortedArray();
    } else if (sortMethod === SortMethod.bubbleSort) {
      getBubbleSortedArray();
    }
  }

  //Основная логика. Сортировка "выбором".
  const getSelectionSortedArray = async () => {
    setResultArray(setDefaultElementState(resultArray));

    for (let i = 0; i < resultArray.length; i++) {
      let index = i;

      resultArray[i].state = ElementStates.Changing;

      for (let j = i + 1; j < resultArray.length; j++) {
        resultArray[j].state = ElementStates.Changing;

        if (sortDirection === Direction.Ascending) {
          if (resultArray[j].index < resultArray[index].index)
            index = j;
        } else {
          if (resultArray[j].index > resultArray[index].index)
            index = j;
        }

        setResultArray([...resultArray]);

        await getDelay(DELAY_IN_MS);

        resultArray[j].state = ElementStates.Default;
      }

      if (index !== i)
        swap(resultArray, i, index, ElementStates.Default);

      resultArray[i].state = ElementStates.Modified;
    }

    setResultArray([...resultArray]);

    setIsSorting(false);
  }

  //Основная логика. Сортировка методом "пузырька".
  const getBubbleSortedArray = async () => {
    setResultArray(setDefaultElementState(resultArray));

    for (let i = 0; i < resultArray.length - 1; i++) {
      for (let j = 0; j < resultArray.length - 1 - i; j++) {
        resultArray[j].state = ElementStates.Changing;
        resultArray[j + 1].state = ElementStates.Changing;

        if (sortDirection === Direction.Ascending) {
          if (resultArray[j].index > resultArray[j + 1].index) {
            swap(resultArray, j, j + 1);
          }
        } else {
          if (resultArray[j].index < resultArray[j + 1].index) {
            swap(resultArray, j, j + 1);
          }
        }

        setResultArray([...resultArray]);

        await getDelay(DELAY_IN_MS);

        resultArray[j].state = ElementStates.Default;
        resultArray[j + 1].state = ElementStates.Default;
      }

      resultArray[resultArray.length - 1 - i].state = ElementStates.Modified;
    }

    resultArray[0].state = ElementStates.Modified;

    setResultArray([...resultArray]);

    setIsSorting(false);
  }

  const setDefaultElementState = (array: TIndexedColumn[]) => {
    if (array && array[0].state !== ElementStates.Default) {
      for (let i = 0; i < array.length; i++) {
        array[i].state = ElementStates.Default;
      }

    }

    return array;
  }

  //Функция меняет местами два элемента массива. 
  //Если задано значение нового статуса - устанавливает его обоим элементам.
  const swap = (array: TIndexedColumn[], firstIndex: number, SecondIndex: number, newState: ElementStates | null = null) => {
    let buffer = array[firstIndex];

    array[firstIndex] = array[SecondIndex];
    array[SecondIndex] = buffer;

    if (newState) {
      array[firstIndex].state = newState;
      array[SecondIndex].state = newState;
    }
  }

  //Генерация массива случайных чисел.
  const newArrayButtonOnClickHandler = () => {
    const randArray = getRandomArr(3, 17, 0, 100);
    setResultArray(randArray.map(item => { return { index: item, state: ElementStates.Default } }));
  }

  //Формирование исходного массива чисел.
  useEffect(() => {
    newArrayButtonOnClickHandler();
  }, []);



  return (
    <SolutionLayout title="Сортировка массива">
      <form className={`${commonStyles.controlContainer} ${styles.form}`} onSubmit={formOnSubmitHandler}>
        <fieldset className={commonStyles.fieldset}>
          <RadioInput
            label="Выбор"
            name="sorting_method"
            value='selectionSort'
            disabled={isSorting}
            checked={sortMethod === 'selectionSort'}
            onChange={() => setSortMethod(SortMethod.selectionSort)}
          />
          <RadioInput
            extraClass={styles.radioInputMargined}
            label="Пузырёк"
            name="sorting_method"
            value='bubbleSort'
            checked={sortMethod === 'bubbleSort'}
            disabled={isSorting}
            onChange={() => setSortMethod(SortMethod.bubbleSort)}
          />
        </fieldset>

        <Button
          type='submit'
          extraClass={`${commonStyles.button} ${styles.button} mr-6`}
          text='По возрастанию'
          sorting={Direction.Ascending}
          disabled={isSorting}
          isLoader={isSorting && sortDirection === Direction.Ascending}
          onClick={() => setSortDirection(Direction.Ascending)}
        />
        <Button
          type='submit'
          extraClass={`${commonStyles.button}  ${styles.button} mr-40`}
          text='По убыванию'
          sorting={Direction.Descending}
          disabled={isSorting}
          isLoader={isSorting && sortDirection === Direction.Descending}
          onClick={() => setSortDirection(Direction.Descending)}
        />
        <Button
          type='button'
          extraClass={`${commonStyles.button}  ${styles.button}`}
          text='Новый массив'
          disabled={isSorting}
          onClick={newArrayButtonOnClickHandler}
        />
      </form>

      <ul className={`${commonStyles.list} ${styles.list}`}>
        {resultArray && resultArray.map((item, index) => {
          return (<li className={styles.listItem} key={index}>
            <Column index={item.index} state={item.state} />
          </li>);
        })}
      </ul>
    </SolutionLayout>
  );
};
