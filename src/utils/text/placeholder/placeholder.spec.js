import placeholder from './placeholder'

describe('placeholder', () => {
  it('works', () => {
    expect(placeholder('first name: {firstName}, last name: {lastName}', {
      firstName: 'Mike',
      lastName: 'Mighty'
    })).toBe('first name: Mike, last name: Mighty')
  })
  it('without data', () => {
    expect(placeholder('first name: {firstName}, last name: {lastName}'))
      .toBe('first name: {firstName}, last name: {lastName}')
  })
})
