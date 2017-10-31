'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

class TreeSearcher {
    constructor() {
        this.findInTree = this.findInTree.bind(this);
    }
    findInTree(data, path = '') {
        const { normalizedSearch, findInTree } = this;

        if (!data) return;
        if (!(0, _lodash.isArray)(data) && !(0, _lodash.isObject)(data)) {
            let item = data;
            if (item.toString) {
                item = item.toString();
            }
            const normalizedText = item.toLowerCase ? item.toLowerCase() : item;
            const foundString = normalizedSearch.reduce((found, searchedString) => {
                if (found) return true;
                return normalizedText.indexOf(searchedString) !== -1;
            }, false);
            if (foundString) {
                this.foundPaths.push({
                    path: `${path}`,
                    value: data
                });
            }
        } else if ((0, _lodash.isArray)(data)) {
            data.forEach((value, index) => {
                findInTree(value, `${path}[${index}]`);
            });
        } else if ((0, _lodash.isObject)(data)) {
            Object.keys(data).forEach(key => {
                const value = data[key];
                findInTree(value, `${path}.${key}`);
            });
        }
    }
    find(data, searchFor, path = '') {
        this.foundPaths = [];
        this.searchFor = searchFor;
        this.normalizedSearch = Object.keys(searchFor).map(key => searchFor[key].toLowerCase());
        this.findInTree(data, path);
        // console.log(util.inspect(this.foundPaths, { showHidden: false, depth: null }));
        return this.foundPaths;
    }
}
exports.default = TreeSearcher;