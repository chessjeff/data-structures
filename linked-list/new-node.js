export default function newNode(value) {
  value = value ? value : null;
  let next = null;
  return { value, next };
}
