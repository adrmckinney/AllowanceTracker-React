export const handleCheckboxSelectedValues = (
  condition: boolean,
  arrayOfValues: number[],
  checkedValue: number
) => {
  let newValuesCopy = [...arrayOfValues]
  if (condition) {
    const valueIdx = arrayOfValues?.indexOf(checkedValue)
    newValuesCopy?.splice(valueIdx, 1)
    return newValuesCopy
  } else {
    newValuesCopy?.push(checkedValue)
    return newValuesCopy
  }
}
