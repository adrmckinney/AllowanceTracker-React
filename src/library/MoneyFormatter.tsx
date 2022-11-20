class MoneyFormatter {
  toDollars(money: number | string, noCents = false) {
    const cleanMoney = typeof money === 'string' ? this.cleanMoney(money) : money
    const dollars = money !== null ? cleanMoney / 100 : 0

    const isNegative = Math.sign(cleanMoney) === -1 ?? false

    return (
      `${isNegative ? '-' : ''}` +
      Math.abs(dollars).toLocaleString(undefined, {
        minimumFractionDigits: noCents ? 0 : 2,
        maximumFractionDigits: noCents ? 0 : 2,
      })
    )
  }

  toPennies(money: number | string) {
    const cleanMoney = typeof money === 'string' ? this.cleanMoney(money) : money
    return Math.round(100 * cleanMoney)
  }

  cleanMoney(money: string): number {
    return parseFloat(typeof money === 'string' ? money.replace(/[$,]/g, '') : money)
  }

  convertMoneyStringToPennies(value: string) {
    const valueNoPeriods = value?.toString().replace(/[.]/g, '')
    return valueNoPeriods !== '' ? this.cleanMoney(valueNoPeriods) : value
  }

  negativableMoneyToPennies(value: string) {
    let pennies = this.convertMoneyStringToPennies(value?.replace(/[-$,]/g, ''))
    return value?.toString()?.indexOf('-') > -1 ? `-${pennies}` : pennies
  }

  forceDecimals(money: number | string) {
    const cleanMoney = typeof money === 'string' ? this.cleanMoney(money) : money
    const dollars = money !== null ? cleanMoney : 0

    return dollars.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }
}

export default new MoneyFormatter()
