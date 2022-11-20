export default function usePreventDecimalTyping(allowNegative: boolean = false) {
  const preventDecimalTyping = e => {
    if (isAcceptedKeys(e)) {
      return
    }

    if (isCopyPaste(e)) {
      return
    }

    e.preventDefault()
  }

  const isAcceptedKeys = e => {
    let numberCodes = [
      48,
      49,
      50,
      51,
      52,
      53,
      54,
      55,
      56,
      57, // keyboard top numbers
      96,
      97,
      98,
      99,
      100,
      101,
      102,
      103,
      104,
      105,
      109, // number pad
    ]
    let specialCharacterCodes = [
      8, // backspace
      9, // tab
      13, // enter
      37, // left arrow
      39, // right arrow
      46, // delete
    ]
    let negativeCode = allowNegative
      ? [
          189, // - dash for negative numbers
        ]
      : []
    let acceptedKeys = [...numberCodes, ...specialCharacterCodes, ...negativeCode]

    return acceptedKeys?.includes(e.which)
  }

  const isCopyPaste = e => {
    const holdingControl = e?.ctrlKey || e?.metaKey
    return holdingControl && [65, 67, 86].includes(e?.which)
  }

  return {
    preventDecimalTyping,
  }
}
