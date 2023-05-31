import { BigIntLiteral } from "typescript"
import { ElementStates } from "./element-states"



export type TLetter = {
  symbol: string,
  state: ElementStates,
  head?: string | React.ReactElement | null;
  tail?: string | React.ReactElement | null;
}

export type TIndexedLetter<T> = {
  symbol: T,
  state: ElementStates,
  index: number
}

export type TIndexedColumn = {
  state: ElementStates,
  index: number
}

export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getElements: () => T[];
  reset: () => void;
  getSize: () => number;
}

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  getElements: () => (T | null)[];
  reset: () => void;
  getHeadElement: () => T | null;
  getTailElement: () => T | null;
  getHeadIndex: () => number;
  getTailIndex: () => number;
  isEmpty: () => boolean;
  isFull: () => boolean;
}

export interface ILinkedList<T> {
  append: (element: T) => void;
  prepend: (element: T) => void;
  deleteFromTail: () => void;
  deleteFromHead: () => void;
  insertByIndex: (element: T, position: number) => void;
  deleteByIndex: (position: number) => void;
  getSize: () => number;
  isEmpty: () => boolean;
  getElements: () => T[]; 
  getHeadElement: () => T | undefined;
  getTailElement: () => T | undefined;
  getElementByIndex: (position: number) => T | undefined;
}