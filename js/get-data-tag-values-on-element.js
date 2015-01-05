(function($, filterByTag) {
    "use strict";

    var config = filterByTag.config;

    filterByTag.getDataTagValuesOnElement = function (elem) {
        var regExp = /\s*,\s*/,
            str = elem.dataset[config.TAG_EXPR_NO_PREFIX];

        if (!str) { return null; }  // a 'data-tag' is present but does not contain any value(s)

        return str.split(regExp);
    };

})(window.jQuery, window.filterByTag = window.filterByTag || {});