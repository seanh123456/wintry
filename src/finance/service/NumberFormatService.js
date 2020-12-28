class NumberFormatService {
  getColorClass(n) {
    if (n > 0) {
      return "positive"
    } else if (n < 0) {
      return "negative"
    }
  }

  toNumber(s) {
    return Number(String(s).replace(/[^0-9.-]+/g,""))
  }

  toNegNumber(s) {
    var number = this.toNumber(s)
    return (number > 0) ? number * -1.0 : number
  }

  toCurrency(num) {
    var options = {
      maximumFractionDigits : 2,
      currency              : "USD",
      style                 : "currency",
      currencyDisplay       : "symbol"
    }

    return this.toNumber(num).toLocaleString(undefined, options)
  }

  toEntry(num) {
    if (num === 0) return ''
    return num
  }
}

export default new NumberFormatService()
