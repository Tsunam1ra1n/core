const rule = require('../../../lib/validation/rules/address')

describe('Address Rule', () => {
  it('should be a function', () => {
    expect(rule).toBeFunction()
  })

  it('should be true', () => {
    expect(rule('PDsnvZA1SKcFLw68X9oDXYAa6b1BiPoDhZ').passes).toBeTrue()
  })

  it('should be false', () => {
    expect(rule('_PDsnvZA1SKcFLw68X9oDXYAa6b1BiPoDhZ_').passes).toBeFalse()
  })
})
