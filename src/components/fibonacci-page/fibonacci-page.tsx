import React, { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import commonStyles from '../common.module.css';
import styles from './fibonacci-page.module.css';
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TIndexedLetter } from "../../types/data";
import { getDelay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";



export const FibonacciPage: React.FC = () => {
  const [dataNumber, setDataNumber] = useState<number>();
  const [resultArray, setResultArray] = useState<TIndexedLetter<number>[]>([]);
  const [isFibonacciGenerate, setIsFibonacciGenerate] = useState(false);
  const [iteration, setIteration] = useState<number>(-1);

  //Инициация процесса.
  const formOnSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Первые два члена последовательности Фибоначчи.
    setResultArray([]);

    setIsFibonacciGenerate(true);
    setIteration(0);
  }

  //Управление процессом.
  const fibonacciSequence = async () => {
    if (iteration < 0) {
      return;
    } else if (iteration > dataNumber!) {
      setIsFibonacciGenerate(false);
    } else {
      setResultArray(await generateFibonacciNumber(resultArray, iteration));
      setIteration(iteration + 1);
    }
  }

  //Основная логика.
  const generateFibonacciNumber = async (array: TIndexedLetter<number>[], iteration: number) => {
    if (iteration < 2) {
      array.push({ symbol: 1, state: ElementStates.Default, index: iteration });
    } else {
      const newNumber = array[iteration - 2].symbol + array[iteration - 1].symbol;
      array.push({ symbol: newNumber, state: ElementStates.Default, index: iteration });
    }

    //Создаем задержку на заданное время.  
    await getDelay(SHORT_DELAY_IN_MS);

    return array;
  }


  useEffect(() => {
    fibonacciSequence();
  }, [iteration]);



  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={commonStyles.controlContainer} onSubmit={formOnSubmitHandler}>
        <Input
          type='number'
          extraClass={`mr-6 ${commonStyles.input}`}
          min={1}
          max={19}
          isLimitText={true}
          value={dataNumber}
          onChange={e => setDataNumber(Number(e.currentTarget.value))}
        />
        <Button
          type='submit'
          extraClass={commonStyles.button}
          text='Рассчитать'
          disabled={!dataNumber || dataNumber > 19}
          isLoader={isFibonacciGenerate}
        />
      </form>

      <ul className={`${commonStyles.list} ${styles.list}`}>
        {resultArray && resultArray.map((item, index) => {
          return (<li className={commonStyles.listItem} key={index}>
            <Circle extraClass='pl-4 pr-4' letter={String(item.symbol)} state={item.state} index={item.index} />
          </li>);
        })}
      </ul>
    </SolutionLayout>
  );
};
