// ------------------------------------------------------------------------
// Filterer
// ------------------------------------------------------------------------

(function($, filterByTag) {
    "use strict";

    var config = filterByTag.config;


    var Filterer = function (userSpecifiedOptions) {
        this.tagButtonsList = {};
        this.BUTTON_SHOW_ALL_ID = config.BUTTON_SHOW_ALL_ID;

        this.defaults = {
            buttonLabelShowAll: config.DEFAULT_BUTTON_LABEL_SHOW_ALL,
            tagLabelHeading: config.DEFAULT_TAG_LABEL_HEADING,
            debugMode: false
        };
        this.options = {};

        this.init(userSpecifiedOptions);
    };


    Filterer.prototype.init = function (userSpecifiedOptions) {
        var taggedItemList;     // all elements in the html page with [data-tag] tags
        var tagButtonBar;

        // update default option values with parameters specified for the script
        this.options = _.extend(this.defaults, userSpecifiedOptions);

        // start by creating a list of DOM elements containing tags
        taggedItemList = new filterByTag.TaggedItemList(this.findHtmlElementsWithTags());

        // add UI 'labels' for the tags found to the corresponding DOM elements
        taggedItemList.addTagsToDOMElements(this.options);

        // create a toolbar with the unique set of tags found
        tagButtonBar = new filterByTag.TagButtonBar(taggedItemList.getUniqueTags(), this.options);
        tagButtonBar.addToPage(this.options.placeAfterElem);

        tagButtonBar = tagButtonBar;    // silence jshint 'unused variable warning'
    };


    Filterer.prototype.findHtmlElementsWithTags = function () {
        var selectorStr = '[data-filterer="' + this.options.whichFilterer + '"]';

        return $(selectorStr);
    };


    filterByTag.Filterer = Filterer;

})(window.jQuery, window.filterByTag = window.filterByTag || {});