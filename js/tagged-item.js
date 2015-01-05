// ------------------------------------------------------------------------
// TaggedItem
// ------------------------------------------------------------------------

(function($, filterByTag) {
    "use strict";

    var config = filterByTag.config;


    var TaggedItem = function (props) {
        this.domElement = props.domElement;
        this.tags = props.tags;
    };


    TaggedItem.prototype.getTags = function () {
        return this.tags;
    };


    TaggedItem.prototype.hide = function () {
        if ($(this.domElement).is(':visible')) {
            $(this.domElement).hide();
        }
    };


    TaggedItem.prototype.show = function () {
        if ($(this.domElement).is(':hidden')) {
            $(this.domElement).show();
        }
    };


    TaggedItem.prototype.addTagsFoundToDOMElement = function (options) {
        $(this.domElement).append(this._tagsToLabelElements(this.tags, options));
    };


    // Create DOM elements using vanilla js, instead of jQuery, to facilitate unit
    // testing. Creating elements using jQuery returns an object structure which
    // might be likely to change internally.
    TaggedItem.prototype._tagsToLabelElements = function (tags, options) {
        var footerElem = document.createElement('footer'),
            containerElem;

        if (!tags) { return null; }

        // if 'tags' contains one tag only and it is 'ALWAYS_HIDE_VALUE' then do not
        // create a footer element
        if ((tags.length === 1) && (tags[0] === config.ALWAYS_HIDE_VALUE)) { return null; }

        footerElem.className = config.TAG_LABEL_CONTAINER_CLASS;

        containerElem = filterByTag.createTextElementContainer({
            containerType: 'div',
            containerClass: config.TAG_LABEL_HEADING_CLASS,
            containerText: options.tagLabelHeading
        });
        footerElem.appendChild(containerElem);

        // if 'ALWAYS_HIDE_VALUE' is mistakenly included among other tags do not add
        // it to the footer element
        tags = _.without(tags, config.ALWAYS_HIDE_VALUE);

        _.each(tags, function (elem) {
            containerElem = filterByTag.createTextElementContainer({
                containerType: 'div',
                containerClass: config.TAG_LABEL_CLASS,
                containerText: elem
            });
            footerElem.appendChild(containerElem);
        });

        return footerElem;
    };


    filterByTag.TaggedItem = TaggedItem;

})(window.jQuery, window.filterByTag = window.filterByTag || {});