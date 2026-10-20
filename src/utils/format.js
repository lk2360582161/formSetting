// utils/format.js
export const formatAmount = (amount) => {
    if (amount === undefined || amount === null) return '-'
    return amount.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }