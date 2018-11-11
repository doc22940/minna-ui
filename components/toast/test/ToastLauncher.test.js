'use strict';

const ToastLauncher = require('../src/ToastLauncher.html');

describe('ToastLauncher component', () => {
  it('renders correctly with defaults', () => {
    const target = document.createElement('div');
    new ToastLauncher({ target });
    expect(target.innerHTML).toMatchSnapshot();
  });
});