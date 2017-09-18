
jest.disableAutomock()

describe('includes', () => {
  it('can evaluate includes', () => {
    var str = 'To be, or not to be, that is the question.<b>'
    var string2 = 'To be, or not to be, that is the question. <b> </b>'

    expect(str.includes('To be')).toBeTruthy()       // true
    expect(str.includes('question')).toBeTruthy()    // true
    expect(str.includes('nonexistent')).toBeFalsy() // false
    expect(str.includes('To be', 1)).toBeFalsy()   // false
    expect(str.includes('TO BE')).toBeFalsy()      // false
    expect(str.includes('<b>')).toBeTruthy()
    expect(string2.includes('<b>')).toBeTruthy()
    expect(JSON.stringify(string2).includes('</b>')).toBeTruthy()
  })
})
