import v from '../voca';
import { expect } from 'chai';
//import { PRINTABLE_ASCII } from '../utils/string/ascii';

describe('sprintf', function() {

  it('should return a string according to string type formatting', function shouldReturnStringBasedOnFormatting() {
    expect(v.sprintf('%s', 'string')).to.be.equal('string');
    expect(v.sprintf('Hello %s!', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('%s %s!', 'Hello', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('%s %s!', '%s', '%s')).to.be.equal('%s %s!');
    expect(v.sprintf('Hello %5s!', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('Hello %3s!', 'World')).to.be.equal('Hello World!');
    expect(v.sprintf('Hello %8s!', 'World')).to.be.equal('Hello    World!');
    expect(v.sprintf('%s%s%s%s%s', 'Alexander', ' ', 'the', ' ', 'Great')).to.be.equal('Alexander the Great');
    expect(v.sprintf('Alexander the %08s', 'Great')).to.be.equal('Alexander the 000Great');
    expect(v.sprintf('Alexander the % 8s', 'Great')).to.be.equal('Alexander the    Great');
    expect(v.sprintf("%'-10s the %s", 'Alexander', 'Great')).to.be.equal('-Alexander the Great');
    expect(v.sprintf("%'.12s the %09s", 'Alexander', 'Great')).to.be.equal('...Alexander the 0000Great');
    expect(v.sprintf('%-12s', 'Alexander')).to.be.equal('Alexander   ');
    expect(v.sprintf('%+-12s', 'Alexander')).to.be.equal('Alexander   ');
    expect(v.sprintf('%.4s the Great', 'Alexander')).to.be.equal('Alex the Great');
    expect(v.sprintf('%.9s the Great', 'Alexander')).to.be.equal('Alexander the Great');
    expect(v.sprintf('%.0s the Great', 'Alexander')).to.be.equal(' the Great');
    expect(v.sprintf('%10.8s the Great', 'Alexander')).to.be.equal('  Alexande the Great');
    expect(v.sprintf('%\'-10.6s %\'1-12.4s', 'Persian', 'Empire')).to.be.equal('----Persia Empi11111111');
    expect(v.sprintf('%2$s the %1$s', 'Great', 'Alexander')).to.be.equal('Alexander the Great');
    expect(v.sprintf('%2$s', 'Great', 'Alexander')).to.be.equal('Alexander');
    expect(v.sprintf('%2$\'012s the %1$.4s', 'Great', 'Alexander')).to.be.equal('000Alexander the Grea');
    expect(v.sprintf('%%%1$\'q-12.4s%%s', 'Alexander')).to.be.equal('%Alexqqqqqqqq%s');
    expect(v.sprintf('%2$s the %s', 'Great', 'Alexander')).to.be.equal('Alexander the Great');
    expect(v.sprintf('%1$s the %s', 'Great')).to.be.equal('Great the Great');
  });

  it('should return a string according to decimal integer type formatting', function shouldReturnDecimalIntegerBasedOnFormatting() {
    expect(v.sprintf('%d', 1)).to.be.equal('1');
    expect(v.sprintf('%i', 1)).to.be.equal('1');
    expect(v.sprintf('%d %d %d', 1, 0, -100)).to.be.equal('1 0 -100');
    expect(v.sprintf('%+d %+d', 10, -10)).to.be.equal('+10 -10');
    expect(v.sprintf("%+'t4d %4d", 9, 0)).to.be.equal('tt+9    0');
    expect(v.sprintf("%010i", 90)).to.be.equal('0000000090');
    expect(v.sprintf("%+ 8d", 88)).to.be.equal('     +88');
    expect(v.sprintf("%d+%d=%d", 9, 1, 10)).to.be.equal('9+1=10');
    expect(v.sprintf("%3$04d-%2$04d=%1$04d", 9, 1, 10)).to.be.equal('0010-0001=0009');
    expect(v.sprintf("%+'T-5d", 15)).to.be.equal('+15TT');
    expect(v.sprintf("%d", 1.5e+3)).to.be.equal('1500');
    expect(v.sprintf("%d", '15NN')).to.be.equal('15');
    expect(v.sprintf("%d", '1.6')).to.be.equal('1');
    expect(v.sprintf("%d", '1.5e+3')).to.be.equal('1');
    expect(v.sprintf("%d", 'NN15')).to.be.equal('0');
    expect(v.sprintf("%d %d", '', 15)).to.be.equal('0 15');
    expect(v.sprintf("%d", '+')).to.be.equal('0');
  });

  it('should ignore specifiers with double percent characters', function shouldIgnoreSpecifiersWithDoublePercent() {
    expect(v.sprintf('%%s')).to.be.equal('%s');
    expect(v.sprintf('%%s %s', 'Persian')).to.be.equal('%s Persian');
    expect(v.sprintf('%% %%')).to.be.equal('% %');
    expect(v.sprintf('%%%% %%%%%s', 'Babylon')).to.be.equal('%% %%Babylon');
  });

  it('should throw exceptions when the formatter is not valid or not enough arguments', function shouldThrowException() {
    expect(v.sprintf.bind(v, '%s')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%s %s')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%s %s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%2$s %1$s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%2$s %1$s', 'Alexander')).to.throw(Error, 'sprintf(): Too few arguments');
    expect(v.sprintf.bind(v, '%a', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, '%s the %y', 'Alexander', 'Great')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, '%', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, '%%%%% %%', 'Alexander')).to.throw(Error, 'sprintf(): Unknown type specifier');
    expect(v.sprintf.bind(v, '%0$s', 'Alexander')).to.throw(Error, 'sprintf(): Argument number must be greater than zero');
  });

  it('should return an unmodified string for missing formatting specifiers', function shouldNotModifyString() {
    expect(v.sprintf('Without formatting')).to.be.equal('Without formatting');
    expect(v.sprintf('')).to.be.equal('');
  });

});