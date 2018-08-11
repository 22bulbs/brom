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
      return '#CCB44D'
    case "POST":
      return '#999686'
    case "PATCH":
      return '#FFCB7A'
    case "DELETE":
      return '#BAF2FF'
    case "PUT":
      return '#4DCCC3'
    default:
      return nameToGrey(name);
  }
}

export default colorMap;