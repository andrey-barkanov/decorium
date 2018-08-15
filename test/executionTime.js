const mocha =require('mocha');
const chai = require('chai');
const executionTime = require('../dist').executionTime;

mocha.describe('Execution time decorator', () => {
  const now = Date.now();

  function functionToWrap() {
    return now;
  }

  mocha.it('Initial function return correct result', () => {
    chai.assert.equal(functionToWrap(), now);
  });

  mocha.it('Wrapper function return correct result', () => {
    chai.assert.equal(executionTime(functionToWrap)(), now);
  });
});