import React, { useState } from "react";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import commonStyles from '../common.module.css';
import styles from './list-page.module.css';
import { Button } from "../ui/button/button";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";
import { getDelay } from "../../utils/utils";
import { LinkedList } from "../../utils/dataStructures";
import { TLetter } from "../../types/data";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { nanoid } from "nanoid";



export const ListPage: React.FC = () => {
  const DELAY_AMOUNT = DELAY_IN_MS;

  const [dataString, setDataString] = useState('');
  const [dataIndex, setDataIndex] = useState<number>(0);

  const [isAdditionToHead, setIsAdditionToHead] = useState(false);
  const [isAdditionToTail, setIsAdditionToTail] = useState(false);
  const [isDelitionFromHead, setIsDelitionFromHead] = useState(false);
  const [isDelitionFromTail, setIsDelitionFromTail] = useState(false);
  const [isAdditionByIndex, setIsAdditionByIndex] = useState(false);
  const [isDelitionByIndex, setIsDelitionByIndex] = useState(false);

  const getInitialLinkedList = () => {
    const arr: TLetter[] = [];

    for (let i = 0; i < 4; i++) {
      arr.push({ symbol: Math.floor(Math.random() * 100).toString(), state: ElementStates.Default });
    }

    return new LinkedList<TLetter>(arr);
  }

  const [list, setList] = useState<LinkedList<TLetter>>(getInitialLinkedList());
  //****************************************************************************************************************
  //Здесь я столкнулся с тем, что при применении сеттера setList() - Реакт почему-то в некоторых случаях
  // не инициировал ререндер и, следовательно, не получалось сделать пошаговую анимацию.
  //Я потратил кучу времени, пытаясь разобраться, но так и не смог. Не придумал ничего лучшего, кроме как 
  //изменять вспомогательный стейт для инициации ререндера(( 
  //****************************************************************************************************************
  const [initRender, setInitRender] = useState('');



  const addElementToHead = async () => {
    setIsAdditionToHead(true);

    //1st action
    let currHeadElement = list.getHeadElement();

    if (currHeadElement) {
      const candidateToAddition = <Circle
        letter={dataString}
        state={ElementStates.Changing}
        isSmall
      />;

      currHeadElement.head = candidateToAddition;
      setList(list);
    }

    setInitRender(nanoid());
    await getDelay(DELAY_AMOUNT);

    //2nd action
    if (currHeadElement) {
      currHeadElement.head = null;
    }

    const newHeadElement = { symbol: dataString, state: ElementStates.Modified, head: null, tail: null };
    list.prepend(newHeadElement);
    setList(list);

    setInitRender(nanoid());
    await getDelay(DELAY_AMOUNT);

    //3rd action
    newHeadElement.state = ElementStates.Default;

    setList(list);

    setInitRender(nanoid());
    await getDelay(DELAY_AMOUNT);

    setDataString('');

    setIsAdditionToHead(false);
  }


  const addElementToTail = async () => {
    setIsAdditionToTail(true);

    //1st action
    let currTailElement = list.getTailElement();

    if (currTailElement) {
      const candidateToAddition = <Circle
        letter={dataString}
        state={ElementStates.Changing}
        isSmall
      />;

      currTailElement.head = candidateToAddition;
      setList(list);
    }

    setInitRender(nanoid());
    await getDelay(DELAY_AMOUNT);

    //2nd action
    if (currTailElement) {
      currTailElement.head = null;
    }

    const newTailElement = { symbol: dataString, state: ElementStates.Modified, head: null, tail: null };
    list.append(newTailElement);
    setList(list);

    setInitRender(nanoid());
    await getDelay(DELAY_AMOUNT);

    //3rd action
    newTailElement.state = ElementStates.Default;

    setList(list);

    setInitRender(nanoid());
    await getDelay(DELAY_AMOUNT);

    setDataString('');

    setIsAdditionToTail(false);
  }


  const deleteElementFromHead = async () => {
    setIsDelitionFromHead(true);

    const currHeadElement = list.getHeadElement();

    if (currHeadElement) {
      const candidateToDelition = <Circle
        letter={currHeadElement.symbol}
        state={ElementStates.Changing}
        isSmall
      />;

      currHeadElement.tail = candidateToDelition;
      currHeadElement.symbol = '';

      setList(list);
    }

    await getDelay(DELAY_AMOUNT);

    list.deleteFromHead();
    setList(list);

    await getDelay(DELAY_AMOUNT);

    setIsDelitionFromHead(false);
  }


  const deleteElementFromTail = async () => {
    setIsDelitionFromTail(true);

    const currTailElement = list.getTailElement();

    if (currTailElement) {
      const candidateToDelition = <Circle
        letter={currTailElement.symbol}
        state={ElementStates.Changing}
        isSmall
      />;

      currTailElement.tail = candidateToDelition;
      currTailElement.symbol = '';

      setList(list);
    }

    await getDelay(DELAY_AMOUNT);

    list.deleteFromTail();
    setList(list);

    await getDelay(DELAY_AMOUNT);

    setIsDelitionFromTail(false);
  }


  const addElementByIndex = async () => {
    if (dataIndex < 0 || dataIndex > list.getSize() - 1) {
      console.log('Введено некорректное значение индекса!');
      return;
    }

    setIsAdditionByIndex(true);

    //1st action (in cycle)
    let currIndex = 0;
    let prevElement: TLetter | undefined = undefined;
    let currElement: TLetter | undefined = undefined;
    const arrPassedElements: (TLetter | undefined)[] = [];

    while (currIndex <= dataIndex!) {
      if (prevElement) {
        prevElement.head = null;
        prevElement.state = ElementStates.Changing;
      }

      currElement = list.getElementByIndex(currIndex);

      const candidateToAddition = <Circle
        letter={dataString}
        state={ElementStates.Changing}
        isSmall
      />;

      currElement!.head = candidateToAddition;

      setList(list);
      setInitRender(nanoid());
      await getDelay(DELAY_AMOUNT);

      prevElement = currElement;
      arrPassedElements.push(prevElement);
      currIndex++;
    }

    //2nd action
    if (currElement) {
      currElement.head = null;
    }

    const newElement = { symbol: dataString, state: ElementStates.Modified, head: null, tail: null };

    list.insertByIndex(newElement, dataIndex!);

    arrPassedElements.forEach((item) => {
      if (item) {
        item.state = ElementStates.Default;
      }
    });

    setList(list);

    setInitRender(nanoid());
    await getDelay(DELAY_AMOUNT);

    //3rd action
    newElement.state = ElementStates.Default;
    setList(list);

    setInitRender(nanoid());
    await getDelay(DELAY_AMOUNT);

    setDataString('');
    setDataIndex(0);

    setIsAdditionByIndex(false);
  }


  const deleteElementByIndex = async () => {
    if (dataIndex < 0 || dataIndex > list.getSize() - 1) {
      console.log('Введено некорректное значение индекса!');
      return;
    }

    setIsDelitionByIndex(true);

    //1st action (in cycle)
    let currIndex = 0;
    let currElement: TLetter | undefined = undefined;
    const arrPassedElements: (TLetter | undefined)[] = [];

    while (currIndex <= dataIndex!) {
      currElement = list.getElementByIndex(currIndex);

      if (currElement) {
        currElement.state = ElementStates.Changing;
      }

      setList(list);
      setInitRender(nanoid());
      await getDelay(DELAY_AMOUNT);

      arrPassedElements.push(currElement);
      currIndex++;
    }

    //2nd action
    const candidateToDeletion = <Circle
      letter={currElement?.symbol}
      state={ElementStates.Changing}
      isSmall
    />;

    currElement!.tail = candidateToDeletion;
    currElement!.symbol = '';
    currElement!.state = ElementStates.Default;

    setList(list);

    setInitRender(nanoid());
    await getDelay(DELAY_AMOUNT);

    //3rd action
    list.deleteByIndex(dataIndex);

    arrPassedElements.forEach((item) => {
      if (item) {
        item.state = ElementStates.Default;
      }
    });

    setList(list);

    setInitRender(nanoid());
    await getDelay(DELAY_AMOUNT);

    setDataString('');
    setDataIndex(0);

    setIsDelitionByIndex(false);
  }


  return (
    <SolutionLayout title="Связный список">
      <form className={`${commonStyles.controlContainer} ${styles.form}`} >
        <fieldset className={`${commonStyles.fieldset} ${styles.fieldset} pb-5`}>
          <Input
            type='text'
            placeholder='Введите значение'
            extraClass={styles.input}
            maxLength={4}
            isLimitText={true}
            value={dataString}
            disabled={isAdditionToHead || isAdditionToTail || isDelitionFromHead || isDelitionFromTail || isAdditionByIndex || isDelitionByIndex}
            onChange={e => setDataString(e.currentTarget.value)}
          />

          <Button
            type='button'
            text='Добавить в head'
            extraClass={styles.buttonNormal}
            isLoader={isAdditionToHead}
            disabled={!dataString.length || isAdditionToTail || isDelitionFromHead || isDelitionFromTail || isAdditionByIndex || isDelitionByIndex}
            onClick={addElementToHead}
          />
          <Button
            type='button'
            text='Добавить в tail'
            extraClass={styles.buttonNormal}
            isLoader={isAdditionToTail}
            disabled={!dataString.length || isAdditionToHead || isDelitionFromHead || isDelitionFromTail || isAdditionByIndex || isDelitionByIndex}
            onClick={addElementToTail}
          />
          <Button
            type='button'
            text='Удалить из head'
            extraClass={styles.buttonNormal}
            isLoader={isDelitionFromHead}
            disabled={list.isEmpty() || isAdditionToHead || isAdditionToTail || isDelitionFromTail || isAdditionByIndex || isDelitionByIndex}
            onClick={deleteElementFromHead}
          />
          <Button
            type='button'
            text='Удалить из tail'
            extraClass={styles.buttonNormal}
            isLoader={isDelitionFromTail}
            disabled={list.isEmpty() || isAdditionToHead || isAdditionToTail || isDelitionFromHead || isAdditionByIndex || isDelitionByIndex}
            onClick={deleteElementFromTail}
          />
        </fieldset>

        <fieldset className={`${commonStyles.fieldset} ${styles.fieldset}`}>
          <Input
            type='number'
            placeholder='Введите индекс'
            extraClass={styles.input}
            min={0}
            max={list.getSize() - 1}
            /* maxLength={4} */
            isLimitText={true}
            value={dataIndex}
            disabled={isAdditionToHead || isAdditionToTail || isDelitionFromHead || isDelitionFromTail || isAdditionByIndex || isDelitionByIndex}
            onChange={e => setDataIndex(Number(e.currentTarget.value))}
          />

          <Button
            type='button'
            text='Добавить по индексу'
            extraClass={styles.buttonWide}
            isLoader={isAdditionByIndex}
            disabled={dataIndex === undefined || dataIndex > list.getSize() - 1 || !dataString || isAdditionToHead || isAdditionToTail || isDelitionFromHead || isDelitionFromTail || isDelitionByIndex}
            onClick={addElementByIndex}
          />
          <Button
            type='button'
            text='Удалить по индексу'
            extraClass={styles.buttonWide}
            isLoader={isDelitionByIndex}
            disabled={dataIndex === undefined || dataIndex > list.getSize() - 1 || isAdditionToHead || isAdditionToTail || isDelitionFromHead || isDelitionFromTail || isAdditionByIndex}
            onClick={deleteElementByIndex}
          />
        </fieldset>
      </form>

      <ul className={`${commonStyles.list} ${styles.list}`}>
        {list.getElements().map((item, index) => {
          return (<li className={`${commonStyles.listItem} ${styles.list}`} key={index}>
            <Circle
              extraClass='pl-8 pr-8'
              letter={item?.symbol}
              state={item?.state}
              index={index}
              head={item?.head ? item?.head : index === 0 ? 'head' : ''}
              tail={item?.tail ? item?.tail : index === list.getSize() - 1 ? 'tail' : ''}
            />
            {index !== list.getSize() - 1 && <ArrowIcon />}
          </li>);
        })}
      </ul>
    </SolutionLayout>
  );
};
