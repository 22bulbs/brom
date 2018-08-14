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
      return '#A29EB5'
    case "POST":
      return '#649CFF'
    case "PATCH":
      return '#AC9BFF'
    case "DELETE":
      return '#D15F5C'
    case "PUT":
      return '#9E9555'
    default:
      return nameToGrey(name);
  }
}

export default colorMap;