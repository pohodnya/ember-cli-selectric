/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const Merge = require('broccoli-merge-trees');
const fastbootTransform = require('fastboot-transform');
const path = require('path');
const existSync = require('exists-sync');

module.exports = {
  name: 'ember-cli-selectric',

  treeForVendor(tree) {
    let trees = [];

    if (tree) {
      trees.push(tree);
    }

    const app = this._findHost();
    const assetDir = path.join(this.project.root, app.bowerDirectory, 'jquery-selectric', 'public');

    if (existSync(assetDir)) {
      const browserTrees = fastbootTransform(new Funnel(assetDir, {
        files: ['jquery.selectric.js'],
        destDir: 'jquery-selectric'
      }));
      trees.push(browserTrees);
    }

    return new Merge(trees);
  },


  included: function(app) {
    this._super.included(app);

    app.import(`${app.bowerDirectory}/jquery-selectric/public/selectric.css`);
    app.import('vendor/jquery-selectric/jquery.selectric.js');
  }
};
