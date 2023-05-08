import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import commonStyles from '../common.module.css';
import styles from './quene-page.module.css';
import { Input } from "../ui/input/input";
import { getDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Queue } from "../../utils/dataStructures";
import { TLetter } from "../../types/data";
import { ElementStates } from "../../types/element-states";


export const QueuePage: React.FC = () => {
  const [dataString, setDataString] = useState('');
  const [queue, setQueue] = useState(new Queue<TLetter>(7));
  const [isAddition, setIsAddition] = useState(false);
  const [isDelition, setIsDelition] = useState(false);
  const [isResetting, setIsResetting] = useState(false);


  //Добавление элемента в очередь.
  const addElementToQueue = async () => {
    setIsAddition(true);

    const newItem = { symbol: dataString, state: ElementStates.Changing };
    queue.enqueue(newItem);
    setQueue(queue);

    setDataString('');

    await getDelay(SHORT_DELAY_IN_MS);

    queue.getTailElement()!.state = ElementStates.Default;
    setQueue(queue);

    setIsAddition(false);
  }

  //Удаление элемента из очереди.
  const deleteElementFromQueue = async () => {
    setIsDelition(true);

    queue.getHeadElement()!.state = ElementStates.Changing;
    setQueue(queue);

    await getDelay(SHORT_DELAY_IN_MS);

    queue.dequeue();

    if (queue.isEmpty())
      queue.reset();
    setQueue(queue);

    setIsDelition(false);
  }

  //Очистка очереди.
  const resetQueue = async () => {
    setIsResetting(true);

    queue.reset();

    await getDelay(SHORT_DELAY_IN_MS);

    setIsResetting(false);
  }


  return (
    <SolutionLayout title="Очередь">
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
          disabled={!dataString.length || queue.isFull() || isDelition || isResetting}
          onClick={addElementToQueue}
        />
        <Button
          type='button'
          extraClass={`${styles.buttonDelete} mr-40`}
          text='Удалить'
          isLoader={isDelition}
          disabled={queue.isEmpty() || isAddition || isResetting}
          onClick={deleteElementFromQueue}
        />
        <Button
          type='button'
          extraClass={`${styles.buttonReset}`}
          text='Очистить'
          isLoader={isResetting}
          disabled={queue.isEmpty() || isAddition || isDelition}
          onClick={resetQueue}
        />
      </form>

      <ul className={`${commonStyles.list} ${styles.list}`}>
        {[...queue.getElements()].map((item, index) => {
          return (<li className={commonStyles.listItem} key={index}>
            <Circle
              extraClass='pl-4 pr-4'
              letter={item?.symbol}
              state={item?.state}
              index={index}
              head={!queue.isEmpty() && index === queue.getHeadIndex() ? 'head' : ''}
              tail={!queue.isEmpty() && index === queue.getTailIndex() ? 'tail' : ''}
            />
          </li>);
        })}
      </ul>
    </SolutionLayout>
  );
};
