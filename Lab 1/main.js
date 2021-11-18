function GetRandomHexadecimalNumber () {
  return Math.random().toString(16)
}
console.log(GetRandomHexadecimalNumber())

function InsertStringIntoAnother (/* string */stringToInsertInto, /* string */stringToInsert, /* number */position) {
  return stringToInsertInto.slice(0, position) + stringToInsert + stringToInsertInto.slice(position)
}
console.log(InsertStringIntoAnother('a b c d e f g h i k j', 'Hello there!', 5))

const arr = [10, 9, 43, 56, 72, 9, 3, 12, 8, 8, 8]
function InsertSort (/* [number] */arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) continue
    const insertValue = arr[i]
    arr.splice(i, 1)
    for (let j = 0; j < i; j++) {
      if (insertValue < arr[j]) {
        arr.splice(j, 0, insertValue)
        break
      }
    }
  }
  return arr
}
console.log(InsertSort(arr))

function FindMostDuplicates (/* array */arr) {
  let maxCounter = 0
  let maxCountedElement
  for (let i = 0; i < arr.length; i++) {
    if (maxCounter > arr.length - i - maxCounter) break
    if (arr[i] == null) continue
    const currElement = arr[i]
    arr[i] = null
    let currElementCounter = 1
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] === currElement) {
        currElementCounter++
        arr[j] = null
      }
    }
    if (maxCounter < currElementCounter) {
      maxCounter = currElementCounter
      maxCountedElement = currElement
    }
  }
  return maxCountedElement
}
console.log(FindMostDuplicates(arr))

const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
function DaysFromYearBeginning () {
  const date = new Date()
  const reducer = (previousValue, currentValue) => previousValue + currentValue
  return months.slice(0, date.getMonth()).reduce(reducer) + date.getDate() + (date.getMonth() > 2 && date.getMonth() % 4 === 0)
}
console.log(DaysFromYearBeginning())

class TreeNode {
  constructor (value) {
    this.value = value
    this.descendants = []
  }

  forEachChild (/* function(any) */action, /* boolean */executeOnlyOnLeaf) {
    const result = []
    if (executeOnlyOnLeaf) { if (this.descendants.length === 0) return [action(this.value)] } else {
      if (this.descendants.length === 0) return [action(this.value)]
      else result.push(action(this.value))
    }
    this.descendants.forEach((node) => result.push(node.forEachChild(action, executeOnlyOnLeaf)))
    return result
  }
}
const abe = new TreeNode('Abe')
const homer = new TreeNode('Homer')
const bart = new TreeNode('Bart')
const lisa = new TreeNode('Lisa')
const maggie = new TreeNode('Maggie')
abe.descendants.push(homer)
homer.descendants.push(bart, lisa, maggie)
console.log(abe.forEachChild(value => value, false))
