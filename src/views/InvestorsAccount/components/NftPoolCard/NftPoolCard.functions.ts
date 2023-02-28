const CLAIM_APPROVAL_DAY = 28
const TRIGGER_DAY = 21

const month = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
}

const dateEmulator = (addDays: number) => {
  const today = new Date()
  const emulated = new Date()
  emulated.setDate(today.getDate() + addDays)
  return emulated
}

const parseDate = (timestamp: string) => {
  return new Date(parseInt(`${timestamp}000`, 10))
}

export const getTimeFormatNft = (timestamp: string | undefined) => {
  if (timestamp === '0') {
    return 'completed'
  }
  if (timestamp) {
    const date = parseDate(timestamp)
    return `${date.getDate()}th ${month[date.getMonth()]} ${date.getFullYear()}`
  }
  return 'loading'
}

// Когда наступает 21 число клейм переводится на след месяц 21 числом
// Функция проверяет наличие анлока, включает проверку прошлым месяцем и текущим
// Если месяц анлока совпал с текущим/прошлым, также есть баланс и дата >= 28 разрешаем анлок
const checkoutTempCondition = (timestamp: string, unlockBalance: string) => {
  if (timestamp === '0') {
    return true
  }
  if (timestamp) {
    // dates
    const date = new Date()
    // const date = dateEmulator(36)
    const dateByTimestamp = parseDate(timestamp)
    // months
    const currentMonth = month[date.getMonth()]
    const prevUnlockMonth = month[dateByTimestamp.getMonth() - 1]
    const nextUnlockMonth = month[dateByTimestamp.getMonth()]
    // day
    const currentDay = date.getDate()
    // balance
    const balanceExist = !!Number(unlockBalance)
    // condition
    const canClaimOfPrevMonth = balanceExist && prevUnlockMonth === currentMonth && currentDay >= CLAIM_APPROVAL_DAY
    const canClaimByCurrentMonth = balanceExist && currentMonth === nextUnlockMonth && currentDay >= CLAIM_APPROVAL_DAY

    return Boolean(canClaimOfPrevMonth || canClaimByCurrentMonth)
  }
  return false
}

export const getExtensionUpToAWeekTimeStamp = (original_timestamp: string, unlockBalance: string) => {
  const formattedTime = getTimeFormatNft(original_timestamp)
  const TEMP_CONDITION_21 = formattedTime.includes(`${TRIGGER_DAY}th`)
  const addingAWeek = Number(original_timestamp) + 604800
  return {
    // Original date or date + week
    extensionUpToAWeekTimeStamp: TEMP_CONDITION_21 ? addingAWeek.toString() : original_timestamp,
    // Validate month, date >= 28 and balance
    canClaim: checkoutTempCondition(original_timestamp, unlockBalance),
    // If month includes 21 true
    TEMP_CONDITION_21,
  }
}
