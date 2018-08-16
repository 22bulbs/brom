const nameToGrey = (name) => {
  let val = name.split('').reduce((a, b) => {
    return a + b.charCodeAt(0)
  }, 0)
  val = (val % 127) * 2
  val = val.toString(16);
  return `#${val}${val}${val}`;
}
const colorMap = (name) => {
  switch (name) {
    case "GET":
      return '#AB92B5'
    case "POST":
      return '#649CFF'
    case "PATCH":
      return '#CCC0B8'
    case "DELETE":
      return '#D15F5C'
    case "PUT":
      return '#665C97'
    default:
      return nameToGrey(name);
  }
}

export default colorMap;