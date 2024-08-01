import newNode from "./new-node.js";

export default function LinkedList() {
  let HEAD = null;
  let length = 0;

  const append = (value) => {
    const node = newNode(value);
    length++;
    if (HEAD === null) return (HEAD = node);
    let pointer = HEAD;
    while (pointer.next !== null) {
      pointer = pointer.next;
    }
    pointer.next = node;
  };

  const prepend = (value) => {
    const node = newNode(value);
    length++;
    if (HEAD === null) {
      HEAD = node;
    } else {
      node.next = HEAD;
      HEAD = node;
    }
  };

  const size = () => {
    return length;
  };

  const head = () => {
    if (length === 0) return undefined;
    return HEAD.value;
  };

  const tail = () => {
    if (length === 0) return undefined;
    let pointer = HEAD;
    for (let i = 1; i <= length; i++) {
      if (pointer.next === null) return pointer.value;
      pointer = pointer.next;
    }
  };

  const at = (index) => {
    if (HEAD === null || index > length - 1) return undefined;
    let pointer = HEAD;
    for (let i = 0; ; i++) {
      if (i === index) return pointer.value;
      pointer = pointer.next;
    }
  };

  const pop = () => {
    if (HEAD === null) return undefined;
    let pointer = HEAD;
    let penUltimate = null;
    for (let i = 1; i <= length; i++) {
      if (pointer.next === null) {
        penUltimate.next = null;
        length--;
        return;
      }
      penUltimate = pointer;
      pointer = pointer.next;
    }
  };

  const contains = (value) => {
    if (HEAD === null) return false;
    let pointer = HEAD;
    for (let i = 0; i < length; i++) {
      if (pointer.value === value) return true;
      pointer = pointer.next;
    }
    return false;
  };

  const find = (value) => {
    if (HEAD === null) return null;
    let pointer = HEAD;
    for (let i = 0; i < length; i++) {
      if (pointer.value === value) return i;
      pointer = pointer.next;
    }
    return null;
  };

  const toString = () => {
    if (HEAD === null) return undefined;
    let pointer = HEAD;
    let string = "";
    for (let i = 0; i < length; i++) {
      string += `( ${pointer.value} ) -> `;
      pointer = pointer.next;
    }
    string += "null";
    return string;
  };

  const insertAt = (value, index) => {
    const node = newNode(value);
    length++;
    if (HEAD === null) {
      HEAD = node;
      return;
    }
    if (index > length || index < 0) index = length - 1;
    let pointer = HEAD;
    let prev = null;
    for (let i = 0; i < length; i++) {
      if (index === 0) {
        node.next = HEAD;
        HEAD = node;
        return;
      }
      if (i === index) {
        prev.next = node;
        node.next = pointer;
        return;
      }
      prev = pointer;
      pointer = pointer.next;
    }
  };

  const removeAt = (index) => {
    if (index > length - 1 || index < 0) return undefined;
    let pointer = HEAD;
    let prev = null;
    for (let i = 0; i < length; i++) {
      if (index === 0) {
        HEAD = pointer.next;
        length--;
        return;
      }
      if (i === index) {
        prev.next = pointer.next;
        length--;
        return;
      }
      prev = pointer;
      pointer = pointer.next;
    }
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contains,
    find,
    toString,
    insertAt,
    removeAt,
  };
}
