import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import commonStyles from '../common.module.css';
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TLetter } from "../../types/data";
import { getDelay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";



export const StringComponent: React.FC = () => {
  const [dataString, setDataString] = useState('');
  const [resultArray, setResultArray] = useState<TLetter[]>([]);
  const [isReverseProcess, setIsReverseProcess] = useState(false);
  const [iteration, setIteration] = useState<number>(-1);


  //Инициация процесса.
  const formOnSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setResultArray(dataString.split('').map((item) => {
      return { symbol: item, state: ElementStates.Default }
    }));

    setIsReverseProcess(true);
    setIteration(0);
  }

  //Управление процессом.
  const reverseString = async () => {
    if (iteration < 0) {
      return;
    } else if (iteration > resultArray.length / 2) {
      setIsReverseProcess(false);
    } else {
      setResultArray(await swapArrayElements(resultArray, iteration));
      setIteration(iteration + 1);
    }
  }

  //Основная логика.
  const swapArrayElements = async (array: TLetter[], iteration: number) => {
    //Если в массиве единственный элемент - ничего менять не нужно, просто устанавливаем статус этого элемента в
    //'Modified'.
    if (array.length === 1) {
      array[0].state = ElementStates.Modified;
      return array; //В данном случае задержка не нужна.
    } else {
      //Если еще есть пара элементов для обмена - устанавливаем их статус в 'Changing'.
      if (iteration < array.length - 1 - iteration) {
        array[iteration].state = ElementStates.Changing;
        array[array.length - 1 - iteration].state = ElementStates.Changing;
      } else if (iteration === array.length - 1 - iteration) {
        //Иначе - если остался всего один необработанный элемент (центральный) - просто 
        //устанавливаем его статус в 'Modified'. Он останется на своем месте.
        array[iteration].state = ElementStates.Modified;
      }

      //Если итерация не первая - меняем местами элементы, намеченные для обмена на предыдущей итерации,
      //устанавливая их статус в 'Modified'.
      if (iteration > 0) {
        let buffer = array[iteration - 1];
        array[iteration - 1] = array[array.length - 1 - (iteration - 1)];
        array[array.length - 1 - (iteration - 1)] = buffer;

        array[iteration - 1].state = ElementStates.Modified;
        array[array.length - 1 - (iteration - 1)].state = ElementStates.Modified;

        //Создаем задержку на заданное время.  
        await getDelay(DELAY_IN_MS);
      }
    }

    return array;
  }

  useEffect(() => {
    reverseString();
  }, [iteration]);



  return (
    <SolutionLayout title="Строка">
      <form className={commonStyles.controlContainer} onSubmit={formOnSubmitHandler}>
        <Input
          type='text'
          extraClass={`mr-6 ${commonStyles.input}`}
          maxLength={11}
          isLimitText={true}
          value={dataString}
          onChange={e => setDataString(e.currentTarget.value)}
        />
        <Button
          type='submit'
          extraClass={commonStyles.button}
          text='Развернуть'
          disabled={!dataString.length}
          isLoader={isReverseProcess}
        />
      </form>

      <ul className={commonStyles.list}>
        {resultArray && resultArray.map((item, index) => {
          return (<li key={index}>
            <Circle extraClass='pl-4 pr-4' letter={item.symbol} state={item.state} />
          </li>);
        })}
      </ul>
    </SolutionLayout>
  );
};
