/* eslint-disable no-redeclare */
declare function index(...args: any[]): any;
declare namespace index {
  const postcss: any;
  function process(css: any, processOpts: any, pluginOpts: any): any;
}
export = index;
