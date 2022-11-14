// @flow
import { format, parseISO } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'

class DateFormatter {
  standard(timestampMs: string) {
    if (!timestampMs) {
      return '00:00:00'
    }
    let day = new Date(+timestampMs)

    return format(utcToZonedTime(day, 'Europe/London'), 'MMM d, yyyy')
  }

  parseIso(isoString: string) {
    if (!isoString) {
      return '00:00:00'
    }
    let day = parseISO(isoString)

    return format(utcToZonedTime(day, 'Europe/London'), 'MMM d, yyyy')
  }

  humanReadableDateWithSeparator(date: number | string) {
    if (!date || date === 'Invalid Date') {
      return null
    }

    if (typeof date === 'number') {
      return format(date, 'MMM d, y')
    }
  }
}

export default new DateFormatter()
