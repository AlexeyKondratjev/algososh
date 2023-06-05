import React, { FormEvent, useEffect, useState } from "react";
import { TIndexedColumn } from "../../types/data";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import commonStyles from '../common.module.css';
import styles from './sorting-page.module.css';
import { RadioInput } from "../ui/radio-input/radio-input";
import { Direction } from "../../types/direction";
import { getRandomArr } from "../../utils/utils";
import { ElementStates } from "../../types/element-states";
import { SortMethod } from "../../types/sort-method";
import { getBubbleSortedArray, getSelectionSortedArray } from "./utils";
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
      getSelectionSortedArray(resultArray, sortDirection, setResultArray, DELAY_IN_MS, setIsSorting);
    } else if (sortMethod === SortMethod.bubbleSort) {
      getBubbleSortedArray(resultArray, sortDirection, setResultArray, DELAY_IN_MS, setIsSorting);
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
