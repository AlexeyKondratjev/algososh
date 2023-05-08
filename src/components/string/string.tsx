import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import commonStyles from '../common.module.css';
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";



export const StringComponent: React.FC = () => {
  const [dataString, setDataString] = useState('');
  const [isReverse, setIsReverse] = useState(false);

  //let content: any = <Circle extraClass='pl-4 pr-4' letter="H" state={ElementStates.Default} />;

  const onButtonClick = () => {
    setIsReverse(true);
    //Если во входной строке всего один символ - ничего делать не нужно.
    //Просто отображаем его в состоянии "modified". 
    /*     if (dataString.length === 0) {
          content = null;
        } else if (dataString.length === 1) {
          content = <Circle extraClass='pl-4 pr-4' letter="E" state={ElementStates.Changing} />;
        } */
  }

/*   useEffect(() => {
    console.log('>>>');
    //const content = null;

  }, [isReverse]); */

  return (
    <SolutionLayout title="Строка">
      <div className={commonStyles.controlContainer}>
        <Input
          extraClass={`mr-6 ${commonStyles.input}`}
          type='text'
          maxLength={11}
          isLimitText={true}
          value={dataString}
          onChange={e => setDataString(e.currentTarget.value)}
        />
        <Button extraClass={commonStyles.button} text='Развернуть' onClick={onButtonClick} disabled={!dataString.length} isLoader={isReverse} />
      </div>

      <div className={commonStyles.visualizationContainer}>
        {/* <Circle extraClass='pl-4 pr-4' letter="H" state={ElementStates.Default} /> */}
        {isReverse && <Circle extraClass='pl-4 pr-4' letter="H" state={ElementStates.Default} />}
      </div>
    </SolutionLayout>
  );
};
