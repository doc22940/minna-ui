/* eslint-env browser */
/* eslint-disable security/detect-eval-with-expression */

import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';
import { process } from '../svelte.js';

// eslint-disable-next-line security/detect-non-literal-fs-filename
const readFile = promisify(fs.readFile);
const sourcePath = join(__dirname, '../../fixtures/TestComponent.svelte');

let source = '';

beforeAll(async () => {
  source = await readFile(sourcePath, 'utf8');
});

describe('Svelte transform', () => {
  it.skip('compiles and mounts a component', () => {
    expect.assertions(2);
    let SvelteComponent = process(source, sourcePath);
    expect(typeof SvelteComponent.code).toEqual('string');
    SvelteComponent = eval(SvelteComponent.code); // eslint-disable-line no-eval

    const target = document.createElement('div');
    // @ts-ignore
    new SvelteComponent({ target });
    expect(target.innerHTML).toMatchSnapshot();
  });

  it.skip('has access to Svelte component internals when mounted', () => {
    expect.assertions(13);
    let SvelteComponent = process(source, sourcePath);
    SvelteComponent = eval(SvelteComponent.code); // eslint-disable-line no-eval
    const target = document.createElement('div');

    // @ts-ignore
    const component = new SvelteComponent({ target });

    // svelte component internals
    expect(component.$$).toHaveProperty('fragment');
    expect(component.$$).toHaveProperty('ctx');
    expect(component.$$).toHaveProperty('update');
    expect(component.$$).toHaveProperty('on_mount');
    expect(component.$$).toHaveProperty('on_destroy');
    expect(component.$$).toHaveProperty('before_render');
    expect(component.$$).toHaveProperty('after_render');
    expect(component.$$).toHaveProperty('context');
    expect(component.$$).toHaveProperty('callbacks');

    expect(component.$$.ctx.name).toEqual('Elon Musk');
    expect(component.$$.ctx.reversed).toEqual('ksuM nolE');

    component.name = 'Vladimir Putin';

    // refs
    expect(component.$$.ctx.target.textContent).toEqual('test Vladimir Putin');
    expect(component.$$.ctx.nameReversed.textContent).toEqual('test nituP rimidalV');
  });

  // XXX: Uses require() instead of process() + eval() so imports are relative
  it('mounts components which import ES6 modules', () => {
    expect.assertions(5);
    function wrapper(): void {
      // eslint-disable-next-line global-require
      const ComponentImports = require('../../fixtures/TestComponentImports.svelte').default;
      const target = document.createElement('div');
      const component = new ComponentImports({ target });
      expect(target.innerHTML).toEqual('Elon Musk ELON MUSK elon musk');
      expect(component.$$.ctx.loud).toEqual('ELON MUSK');
      expect(component.$$.ctx.quiet).toEqual('elon musk');
      expect(target.innerHTML).toMatchSnapshot();
    }
    expect(wrapper).not.toThrow();
  });
});
