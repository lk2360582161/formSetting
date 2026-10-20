import { describe, it, expect } from 'vitest'
import { formatAmount } from './format'

describe('金额格式化', () => {
  it('正数要加千分位和小数点', () => {
    const result = formatAmount(1234.5)
    expect(result).toBe('1,234.50')
  })

  it('负数也要格式化', () => {
    const result = formatAmount(-1234.5)
    expect(result).toBe('-1,234.50')
  })

  it('空值返回 -', () => {
    expect(formatAmount(null)).toBe('-')
    expect(formatAmount(undefined)).toBe('-')
  })

  it('零要显示 0.00', () => {
    expect(formatAmount(0)).toBe('0.00')
  })
})