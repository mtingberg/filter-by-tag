(function($, filterByTag) {
    "use strict";

    var config = filterByTag.config;

    filterByTag.createButtonItem = function (id, label) {
        var $tagItemElem = $('<div>', {'class' : config.TAG_BUTTON_CLASS});

        var $tagItemLink = $('<a>', {'id' : id, href: '#', html : label});
        $tagItemLink.appendTo($tagItemElem);

        return $tagItemElem;
    };

})(window.jQuery, window.filterByTag = window.filterByTag || {});