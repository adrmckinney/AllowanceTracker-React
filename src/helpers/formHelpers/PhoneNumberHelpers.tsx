export function formatStringPhoneNumber(value: string) {
  if (!value) return value

  const cleanPhoneNumber = value.replace(/[^\d]/g, '')
  const phoneNumberLength = cleanPhoneNumber.length

  // we need to return the value with no formatting if its less than four digits
  // this is to avoid weird behavior that occurs if you format the area code too early
  if (phoneNumberLength < 4) return cleanPhoneNumber

  if (phoneNumberLength < 7) {
    return `(${cleanPhoneNumber.slice(0, 3)}) ${cleanPhoneNumber.slice(3)}`
  }

  return `(${cleanPhoneNumber.slice(0, 3)}) ${cleanPhoneNumber.slice(
    3,
    6
  )}-${cleanPhoneNumber.slice(6, 10)}`
}
