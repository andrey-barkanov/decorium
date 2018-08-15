const mocha = require('mocha');
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

  mocha.it('Wrapped function return correct result', () => {
    const wrapped = executionTime(functionToWrap);
    chai.assert.equal(wrapped(), now);
  });

  mocha.it('New wrapped function has no history', () => {
    const wrapped = executionTime(functionToWrap);
    chai.assert.doesNotHaveAnyKeys(wrapped, ['history']);
  });

  mocha.it('Wrapped function after 1 execution got history', () => {
    const wrapped = executionTime(functionToWrap);
    wrapped();
    chai.assert.hasAnyKeys(wrapped, ['history']);
    chai.assert.equal(wrapped.history.callCount, 1);
  });
});