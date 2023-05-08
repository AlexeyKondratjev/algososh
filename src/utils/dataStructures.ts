import { ILinkedList, IQueue, IStack } from "../types/data";



export class Stack<T extends Record<string, any>> implements IStack<T> {
    private container: T[] = [];

    push = (item: T): void => {
        this.container.push(item);
    };

    pop = (): void => {
        if (this.container.length)
            this.container.pop();
    };

    peak = (): T | null => {
        if (this.container.length)
            return this.container[this.container.length - 1]
        else
            return null;
    };

    getElements = (): T[] => {
        return this.container;
    };

    reset = (): void => {
        this.container = [];
    };

    getSize = () => this.container.length;
}

export class Queue<T> implements IQueue<T> {
    private container: (T | null)[] = [];
    private head = 0;
    private tail = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size);
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        }

        if (!this.isEmpty()) {
            this.tail = (this.tail + 1) % this.size;
        }

        this.container[this.tail % this.size] = item;
        this.length++;
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        this.container[this.head % this.size] = null;
        this.head = (this.head + 1) % this.size;
        this.length--;
    };

    getElements = (): (T | null)[] => {
        return this.container;
    };

    reset = (): void => {
        this.container = Array.from({ length: this.size }, () => null);
        this.head = 0;
        this.tail = 0;
        this.length = 0;
    }

    getHeadElement = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        return this.container[this.head];
    };

    getTailElement = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }

        return this.container[this.tail];
    };

    getHeadIndex = () => {
        return this.head;
    };

    getTailIndex = () => {
        return this.tail;
    };

    isEmpty = () => this.length === 0;

    isFull = () => this.length === this.size;
}

export class Node<T> {
    value: T
    next: Node<T> | null

    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next);
    }
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;

    constructor(initialList?: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0;

        if (initialList) {
            initialList.forEach((item) => this.append(item));
        }
    }

    append(element: T) {
        const node = new Node(element);

        if (this.head === null || this.tail === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.size++;
    }

    prepend(element: T) {
        const node = new Node(element, this.head);

        this.head = node;

        if (this.tail === null) {
            this.tail = node;
        }

        this.size++;
    }

    deleteFromTail() {
        if (this.isEmpty()) {
            console.log('List is empty.');
            return;
        }

        if (!this.head?.next) {
            this.head = null;
        } else {
            let curr = this.head.next;
            let prev = this.head;

            while (curr?.next) {
                prev = curr;
                curr = curr.next;
            }

            this.tail = prev; //?
            prev.next = null;
        }

        this.size--;
    }

    deleteFromHead() {
        if (this.head) {
            this.head = this.head.next;
            this.size--;
        }
    }

    insertByIndex(element: T, index: number) {
        if (index < 0 || index > this.size) {
            console.log('Enter a valid index');
            return;
        } else {
            const node = new Node(element);

            if (index === 0) {
                node.next = this.head;
                this.head = node;
            } else {
                let curr = this.head;
                let currIndex = 0;
                let prev = null;

                while (currIndex !== index) {
                    prev = curr;
                    curr = curr ? curr.next : null;
                    currIndex++;
                }

                node.next = curr;
                if (prev) {
                    prev.next = node;
                }
            }

            this.size++;
        }
    }

    deleteByIndex(index: number) {
        if (this.head && index >= 0 && index < this.size) {
            let curr = this.head;
            let prev = curr;
            let currIndex = 0;

            if (index === 0) {
                this.head = curr.next;
            } else {
                while (currIndex < index) {
                    if (curr.next) {
                        prev = curr;
                        curr = curr.next;
                    }

                    currIndex++;
                }

                prev.next = curr.next;
                //this.tail ??
            }

            this.size--;
        }
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    getElements() {
        const arr: T[] = [];

        let curr;

        if (this.head) {
            curr = this.head;

            arr.push(curr.value);

            while (curr.next) {
                curr = curr.next;
                arr.push(curr.value);
            }
        }

        return arr;
    }

    getHeadElement() {
        return this.head?.value;
    }

    getTailElement() {
        return this.tail?.value;
    }

    getElementByIndex(index: number) {
        if (this.head && index >= 0 && index < this.size) {
            let curr = this.head;
            //let prev = curr;
            let currIndex = 0;

            if (index === 0) {
                return this.head.value;
            } else {
                while (currIndex < index) {
                    if (curr.next) {
                        curr = curr.next;
                    }

                    currIndex++;
                }

                return curr.value;
            }
        } else return undefined;
    }
}