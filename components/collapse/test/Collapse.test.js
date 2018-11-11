'use strict';

const Collapse = require('../src/Collapse.html');

describe('Collapse component', () => {
  it('renders correctly with no props', () => {
    expect.assertions(3);
    function wrapper() {
      const target = document.createElement('div');
      new Collapse({ target });
      expect(target.querySelector('.collapse-hide')).not.toBeNull();
      expect(target.innerHTML).toMatchSnapshot();
    }
    expect(wrapper).not.toThrow();
  });

  it('collapsed content shows and hides on click', () => {
    expect.assertions(4);
    const target = document.createElement('div');
    const component = new Collapse({ target });
    expect(component.get()._isOpen).toBeFalsy();
    const button = target.querySelector('button');
    button.click();
    expect(component.get()._isOpen).toBeTruthy();
    button.click();
    expect(component.get()._isOpen).toBeFalsy();
    expect(document.querySelector('collapse-hide')).toBeNull();
  });
});