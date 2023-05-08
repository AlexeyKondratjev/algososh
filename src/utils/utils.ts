//Создает задержку на заданное время delay.
export const getDelay = (delay: number): Promise<null> => {
    return new Promise(resolve => setTimeout(resolve, delay));
}

//Возвращает случайный массив целых положительных чисел в количестве от minQty до maxQty 
//со значением от minValue до maxValue.
export const getRandomArr = (minQty:number, maxQty: number, minValue: number, maxValue: number) => {
    const arr: number[] = [];

    const elementsQty = Math.floor(minQty + Math.random() * (maxQty + 1 - minQty));

    if (elementsQty <= 0) {
        return arr;
    } else {
        for (let i = 0; i < elementsQty; i++) {
            arr.push(Math.floor(minValue + Math.random() * (maxValue + 1 - minValue)));
        }
    }

    return arr;
}