// ------------------------------------------------------------------------
// Config
// ------------------------------------------------------------------------

(function(filterByTag) {
    'use strict';

    filterByTag.config = {
        TAG_EXPR : '[data-tag]',
        TAG_EXPR_NO_PREFIX : 'tag',
        FILTERER_ATTR : 'data-filterer',
        BUTTON_BAR_CONTAINER_CLASS : 'tag-list',
        TAG_BUTTON_CLASS : 'tag-list-item',
        TAG_LABEL_CONTAINER_CLASS : 'tag-label-list',
        TAG_LABEL_HEADING_CLASS : 'tag-label-heading',
        TAG_LABEL_CLASS : 'tag-label-item',
        BUTTON_PRESSED_CLASS : 'pressed',
        ALWAYS_HIDE_VALUE : 'always-hide',

        DEFAULT_TAG_LABEL_HEADING : 'Tags:',
        DEFAULT_BUTTON_LABEL_SHOW_ALL : 'Show all',

        BUTTON_LINK_SELECTOR : '.tag-list-item > a',
        BUTTON_SHOW_ALL_ID : '__show_all_items_button'
};

})(window.filterByTag = window.filterByTag || {});