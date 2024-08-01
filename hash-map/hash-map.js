import LinkedList from "../linked-list/methods.js";

export default function HashMap() {
  let buckets = new Array(16);
  const loadFactor = 0.75;

  const hash = function(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }
    hashCode = hashCode % buckets.length;
    return hashCode;
  }

  function set(key, value) {
    const index = hash(key);
    const pair = { key: key, value: value };
    let list = LinkedList();

    // Check for value or object {value: null} in linked list head
    if (!buckets[index] || !buckets[index].value) {
      buckets[index] = list.append(pair);
    } else {
      buckets[index].next = list.append(pair);
    }

    // Expand buckets
    let entries = [];
    for (let i = 0; i < buckets.length; i++) {
      let pointer = buckets[i]
      while (pointer !== undefined && pointer !== null) {
        entries.push([pointer.value.key, pointer.value.value])
        pointer = pointer.next
      }
    }

    // Reset buckets
    if (entries.length >= buckets.length * loadFactor) {
      buckets = new Array(buckets.length * 2);
      entries.forEach((entry) => {
        set(entry[0], entry[1]);
      });
    }
  }

  function get(key) {
    const index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound.");
    }
    let bucket = buckets[index]
    while (bucket.value.key !== key && bucket.next) {
      bucket = bucket.next;
    }
    if (bucket.value.key === key) return bucket.value.value;
    return null;
  }

  function has(key) {
    const index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound.");
    }
    let bucket = buckets[index];
    while (bucket.value.key !== key && bucket.next) {
      bucket = bucket.next;
    }
    if (bucket.value.key === key) return true;
    return false;
  }

  function remove(key) {
    const index = hash(key);
    if (index < 0 || index >= buckets.length) {
      throw new Error("Trying to access index out of bound.");
    }
    let bucket = buckets[index];
    let prev = undefined;
    while (bucket.value.key !== key && bucket.next) {
      prev = bucket;
      bucket = bucket.next;
    }
    if (bucket.value.key === key) {
      if (prev) prev.next = bucket.next;
      bucket.value = null;
      return true;
    }
    return null;
  }

  function size() {
    let count = 0;
    for (let i = 0; i < buckets.length; i++) {
      let pointer = buckets[i]
      while (pointer !== undefined && pointer !== null) {
        count++;
        pointer = pointer.next
      }
    }
    return count;
  }

  function clear() {
    buckets = new Array(16);
  }

  function keys() {
    let keys = [];
    for (let i = 0; i < buckets.length; i++) {
      let pointer = buckets[i]
      while (pointer !== undefined && pointer !== null) {
        keys.push(pointer.value.key)
        pointer = pointer.next
      }
    }
    return keys;
  }

  function values() {
    let values = [];
    for (let i = 0; i < buckets.length; i++) {
      let pointer = buckets[i]
      while (pointer !== undefined && pointer !== null) {
        values.push(pointer.value.value)
        pointer = pointer.next
      }
    }
    return values;
  }

  function entries() {
    let entries = [];
    for (let i = 0; i < buckets.length; i++) {
      let pointer = buckets[i]
      while (pointer !== undefined && pointer !== null) {
        entries.push([pointer.value.key, pointer.value.value])
        pointer = pointer.next
      }
    }
    return entries;
  }

  return { set, get, has, remove, size, clear, keys, values, entries };
}
