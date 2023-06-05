import React, { useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import commonStyles from '../common.module.css';
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { TLetter } from "../../types/data";
import { reverseArray } from "./utils";



export const StringComponent: React.FC = () => {
  const [dataString, setDataString] = useState('');
  const [resultArray, setResultArray] = useState<TLetter[]>([]);
  const [isReverseProcess, setIsReverseProcess] = useState(false);


  const buttonOnClickHandler = async () => {
    setIsReverseProcess(true);

    const initArray = dataString.split('').map((item) => {
      return { symbol: item, state: ElementStates.Default }
    });

    setResultArray(initArray);
    await reverseArray(initArray, setResultArray);
    setIsReverseProcess(false);
  };


  return (
    <SolutionLayout title="Строка">
      <form className={commonStyles.controlContainer} >
        <Input
          type='text'
          extraClass={`mr-6 ${commonStyles.input}`}
          maxLength={11}
          isLimitText={true}
          value={dataString}
          onChange={e => setDataString(e.currentTarget.value)}
        />
        <Button
          extraClass={commonStyles.button}
          text='Развернуть'
          disabled={!dataString.length}
          isLoader={isReverseProcess}
          onClick={() => buttonOnClickHandler()}
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
