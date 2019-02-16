// https://github.com/kangax/html-minifier

'use strict';

const merge = require('deepmerge');
const htmlMinifier = require('html-minifier');

/**
 * Minna UI svelte markup preprocessor.
 * Removes excessive whitespace from Svelte output.
 * @param {Object} options User defined options.
 * @returns {Object}
 */
module.exports = (options = {}) => ({ content }) => {
  const { level } = options;

  if (level === 0) return { code: content };

  // optimisation levels (level 1 is the default)
  const ol2 = level >= 2;
  const ol3 = level >= 3;
  const ol4 = level >= 4;

  try {
    const opts = merge(
      {
        // XXX: Bad options:
        // - removeAttributeQuotes
        // - removeOptionalTags
        // - customAttrCollapse
        // - customAttrSurround
        // XXX: Unnecessary options:
        // - removeComments
        // - removeTagWhitespace

        caseSensitive: true,
        collapseWhitespace: true,
        conservativeCollapse: !ol2, // leaves space between elements
        html5: true,
        ignoreCustomFragments: [
          // svelte {...} tags and attributes
          /\{.*?\}/msu,

          // sapper %...% template tags
          /%.*%/su,
        ],
        keepClosingSlash: true,
        quoteCharacter: '"',

        // potentially dangerous
        // eslint-disable-next-line sort-keys
        collapseBooleanAttributes: ol3,
        collapseInlineTagWhitespace: ol3,
        decodeEntities: ol3,
        includeAutoGeneratedTags: !ol3,
        removeRedundantAttributes: ol3,
        removeScriptTypeAttributes: ol3,
        removeStyleLinkTypeAttributes: ol3,
        sortAttributes: ol3,
        sortClassName: ol3,

        // will break components without special workarounds
        /**
         * Removes remaining " " textNodes but can break components if
         * it removes spaces around attributes so in these cases use:
         * <!-- htmlmin:ignore -->
         */
        trimCustomFragments: ol4,
      },
      options, // user options
    );

    const code = htmlMinifier.minify(content, opts);

    return { code };
  } catch (error) {
    process.stderr.write(error);
    return content;
  }
};
