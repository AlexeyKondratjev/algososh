import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import commonStyles from '../common.module.css';
import styles from './stack-page.module.css';
import { Circle } from "../ui/circle/circle";
import { TIndexedLetter } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { getDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "../../utils/dataStructures";



export const StackPage: React.FC = () => {
  const [dataString, setDataString] = useState('');
  const [stack, setStack] = useState(new Stack<TIndexedLetter<string>>());
  const [isAddition, setIsAddition] = useState(false);
  const [isDelition, setIsDelition] = useState(false);
  const [isResetting, setIsResetting] = useState(false);


  //Добавление элемента в стек.
  const addElementToStack = async () => {
    setIsAddition(true);

    const newItem = { symbol: dataString, index: stack.getSize(), state: ElementStates.Changing };

    stack.push(newItem);
    setStack(stack);
    setDataString('');

    await getDelay(SHORT_DELAY_IN_MS);

    stack.peak()!.state = ElementStates.Default;
    setStack(stack);

    setIsAddition(false);
  }

  //Удаление элемента из стека.
  const deleteElementFromStack = async () => {
    setIsDelition(true);

    stack.peak()!.state = ElementStates.Changing;
    setStack(stack);

    await getDelay(SHORT_DELAY_IN_MS);

    stack.pop();
    setStack(stack);

    setIsDelition(false);
  }

  //Очистка стека.
  const resetStack = async () => {
    setIsResetting(true);

    await getDelay(SHORT_DELAY_IN_MS);

    stack.reset();
    setStack(stack);

    setIsResetting(false);
  }


  return (
    <SolutionLayout title="Стек">
      <form className={`${commonStyles.controlContainer} ${styles.form}`} >
        <Input
          type='text'
          placeholder='Введите значение'
          extraClass={`${styles.input} mr-6`}
          maxLength={4}
          isLimitText={true}
          value={dataString}
          disabled={isAddition || isDelition || isResetting}
          onChange={e => setDataString(e.currentTarget.value)}
        />
        <Button
          type='button'
          extraClass={`${styles.buttonAdd} mr-6`}
          text='Добавить'
          isLoader={isAddition}
          disabled={!dataString.length || isDelition || isResetting}
          onClick={addElementToStack}
        />
        <Button
          type='button'
          extraClass={`${styles.buttonDelete} mr-40`}
          text='Удалить'
          isLoader={isDelition}
          disabled={!stack.getSize() || isAddition || isResetting}
          onClick={deleteElementFromStack}
        />
        <Button
          type='button'
          extraClass={`${styles.buttonReset}`}
          text='Очистить'
          isLoader={isResetting}
          disabled={!stack.getSize() || isAddition || isDelition}
          onClick={resetStack}
        />
      </form>

      <ul className={`${commonStyles.list} ${styles.list}`}>
        {stack.getSize() > 0 && [...stack.getElements()].map((item, index) => {
          return (<li className={commonStyles.listItem} key={index}>
            <Circle
              extraClass='pl-4 pr-4'
              letter={item.symbol}
              state={item.state}
              index={item.index}
              head={index === stack.getSize() - 1 ? 'top' : ''}
            />
          </li>);
        })}
      </ul>
    </SolutionLayout>
  );
};
