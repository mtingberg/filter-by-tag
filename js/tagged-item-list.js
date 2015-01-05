// ------------------------------------------------------------------------
// TaggedItemList
// ------------------------------------------------------------------------

(function($, filterByTag) {
    "use strict";

    var config = filterByTag.config;


    var TaggedItemList = function (contentItemsWithTags) {
        this.taggedItems = this._createTagsFromContentItems(contentItemsWithTags);
    };


    // returns a list of 'TaggedItem' objects from 'contentItemsWithTags' (created by
    // a jquery selector)
    TaggedItemList.prototype._createTagsFromContentItems = function (contentItemsWithTags) {
        var itemList = [];

        _.each(contentItemsWithTags, function (elem) {
            var tagsOnContentItem = filterByTag.getDataTagValuesOnElement(elem);

            // exit if element did not contain any tags
            if (!tagsOnContentItem) { return; }

            var item = new filterByTag.TaggedItem({ domElement: elem, tags: tagsOnContentItem });
            itemList.push(item);
        });

        return itemList;
    };


    TaggedItemList.prototype.getUniqueTags = function () {
        var allDataTags = [];

        _.each(this.taggedItems, function (elem) {
            var tagsOnItem = elem.getTags();    // e.g. 'link 1'
            allDataTags.push(tagsOnItem);
        });

        allDataTags = _.flatten(allDataTags);   // remove nested arrays caused by pushing 'getTags' result
        allDataTags = _.without(allDataTags, config.ALWAYS_HIDE_VALUE);
        allDataTags.sort();

        return _.uniq(allDataTags, true);
    };


    TaggedItemList.prototype.addTagsToDOMElements = function (options) {
        _.each(this.taggedItems, function (taggedItem) {
            taggedItem.addTagsFoundToDOMElement(options);
        });
    };


    TaggedItemList.prototype.getItemsWithSpecificTags = function (tagsRequested) {
        var itemsFound = [];

        _.each(this.taggedItems, function (elem) {
            var tagsOnItem = elem.getTags();
            var intersectedTags = _.intersection(tagsOnItem, tagsRequested);

            if (intersectedTags.length > 0) { itemsFound.push(elem); }
        });

        return itemsFound;
    };


    TaggedItemList.prototype.getItemsWithoutSpecificTags = function (tagsNotRequested) {
        var itemsFound = [];

        _.each(this.taggedItems, function (elem) {
            var tagsOnItem = elem.getTags(),
                intersectedTags = _.intersection(tagsOnItem, tagsNotRequested);

            if (intersectedTags.length === 0) { itemsFound.push(elem); }
        });

        return itemsFound;
    };


    TaggedItemList.prototype.showSpecific = function (items) {
        _.each(items, function (elem) {
            elem.show();
        });
    };


    TaggedItemList.prototype.hideSpecific = function (items) {
        _.each(items, function (elem) {
            elem.hide();
        });
    };


    filterByTag.TaggedItemList = TaggedItemList;

})(window.jQuery, window.filterByTag = window.filterByTag || {});