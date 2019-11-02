/* global describe, describe, it */
/* eslint-disable no-undef */

const chai  = window.chai
const expect = chai.expect

describe('hello', () => {
  it('should return "Hello World!" if no argument is passed', () => {
    expect(hello()).to.equal('Hello World!')
  })
  it('should return "Hello <argument>!" if one is passed', () => {
    expect(hello('Mike')).to.equal('Hello Mike!')
  })
})

