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

})(window.filterByTag = window.filterByTag || {});;(function($, filterByTag) {
    "use strict";

    filterByTag.createTextElementContainer = function (containerProperties) {
        var cp = containerProperties;

        var containerElement = document.createElement(cp.containerType);
        var textElement = document.createTextNode(cp.containerText);

        containerElement.appendChild(textElement);
        containerElement.className = cp.containerClass;

        return containerElement;
    };

})(window.jQuery, window.filterByTag = window.filterByTag || {});;(function($, filterByTag) {
    "use strict";

    var config = filterByTag.config;

    filterByTag.getDataTagValuesOnElement = function (elem) {
        var regExp = /\s*,\s*/,
            str = elem.dataset[config.TAG_EXPR_NO_PREFIX];

        if (!str) { return null; }  // a 'data-tag' is present but does not contain any value(s)

        return str.split(regExp);
    };

})(window.jQuery, window.filterByTag = window.filterByTag || {});;(function($, filterByTag) {
    "use strict";

    var config = filterByTag.config;

    filterByTag.createButtonItem = function (id, label) {
        var $tagItemElem = $('<div>', {'class' : config.TAG_BUTTON_CLASS});

        var $tagItemLink = $('<a>', {'id' : id, href: '#', html : label});
        $tagItemLink.appendTo($tagItemElem);

        return $tagItemElem;
    };

})(window.jQuery, window.filterByTag = window.filterByTag || {});;// ------------------------------------------------------------------------
// TagButton
// ------------------------------------------------------------------------

(function($, filterByTag) {
    "use strict";

    var config = filterByTag.config;


    var TagButton = function (params) {
        this.label = params.label || '';
        this.buttonPressed = params.buttonPressed || false;
        this.position = params.position || 0;
        this.domElement = params.domElement || null;
    };


    TagButton.prototype.setPressedState = function (isPressed) {
        this.buttonPressed = isPressed;
        $(this.domElement).toggleClass(config.BUTTON_PRESSED_CLASS, isPressed);
    };


    TagButton.prototype.isPressed = function () {
        return this.buttonPressed;
    };


    TagButton.prototype.setDomElementLink = function (elementLink) {
        this.domElement = elementLink;
    };


    filterByTag.TagButton = TagButton;

})(window.jQuery, window.filterByTag = window.filterByTag || {});;// ------------------------------------------------------------------------
// TagButtonBar
// ------------------------------------------------------------------------

(function ($, filterByTag) {
    "use strict";

    var config = filterByTag.config;


    var TagButtonBar = function (tags, options) {
        this.tagButtonsList = {};
        this.contentTags = tags;
        this.options = options;
        this.tagButtonBarId = this.options.whichFilterer;
        this.tagButtonBarElementLink = null;

        this.tagButtonsList = this._initTagButtonsList(this.contentTags);

        this._addButtonsToNavigationBar();
        this._addTagButtonClickHandler();
    };


    TagButtonBar.prototype._initTagButtonsList = function (contentTags) {
        var tagButtonsList = {},
            tagButton;

        tagButton = new filterByTag.TagButton({
            label: this.options.buttonLabelShowAll,
            buttonPressed: true,
            position: 0,
            domElement: null
        });

        tagButtonsList[config.BUTTON_SHOW_ALL_ID] = tagButton;

        _.each(contentTags, function (tag, index) {
            tagButton = new filterByTag.TagButton({
                label: tag,                // TODO: add 'label' in data tag values
                buttonPressed: false,
                position: (index + 1),
                domElement: null
            });

            tagButtonsList[tag] = tagButton;
        });

        return tagButtonsList;
    };


    TagButtonBar.prototype._addButtonsToNavigationBar = function () {
        var self = this;
        var $navElem = this._createButtonBarContainer();

        // start by adding the 'show all' button (to show up first regardless of buttons sort order)
        var $buttonItem = filterByTag.createButtonItem(config.BUTTON_SHOW_ALL_ID, this.options.buttonLabelShowAll);
        $buttonItem.appendTo($navElem);

        // add the remaining tag buttons to the navigation bar
        _.each(this.contentTags, function (tag) {
            $buttonItem = filterByTag.createButtonItem(tag, tag);
            $buttonItem.appendTo($navElem);
        });

        // add a dom element pointer to each button item (in tagButtonsList) for being able to
        // add/remove css classes on a button element (e.g. add a 'selected' class).
        $($navElem).find('a').each(function (index, elem) {
            var button = self.tagButtonsList[elem.id];
            button.setDomElementLink(elem);
        });

        this.tagButtonBarElementLink = $navElem;
    };


    TagButtonBar.prototype.addToPage = function (placeAfterElem) {
        // add the <nav> (buttonBarContainer) element at same level as 'options.placeAfterElem'
        this.tagButtonBarElementLink.insertAfter(placeAfterElem);

        this._repaintTagButtonBar(this.tagButtonsList);
    };


    // create a <nav> element to hold the individual button elements
    TagButtonBar.prototype._createButtonBarContainer = function () {
        return $('<nav>', {'class': config.BUTTON_BAR_CONTAINER_CLASS,
            'id': this.tagButtonBarId});
    };


    TagButtonBar.prototype._repaintTagButtonBar = function (tagButtonsList) {
        var self = this;

        _.each(tagButtonsList, function (elem) {
            self._setButtonState(elem);
        });
    };


    // set visual state of the button according to 'isPressed'
    TagButtonBar.prototype._setButtonState = function (button) {
        if (button.isPressed()) {
            button.setPressedState(true);
        } else {
            button.setPressedState(false);
        }
    };


    // change visual state of the button to the opposite of 'isPressed'
    TagButtonBar.prototype._toggleButtonState = function (button) {
        if (button.isPressed()) {
            button.setPressedState(false);
        } else {
            button.setPressedState(true);
        }
    };


    TagButtonBar.prototype._addTagButtonClickHandler = function () {
        var self = this;

        $(this.tagButtonBarElementLink).find('a').on('click', function (event) {
            event.preventDefault();

            // handle 'show all' button clicked
            if (self._isShowAllButton(this.id)) {
                self._manageShowAllButtonClicked(self.tagButtonsList, self.tagButtonBarId);

            // handle other button clicked
            } else {
                self._manageOtherButtonClicked(this.id);
            }
        });
    };


    TagButtonBar.prototype._isShowAllButton = function (id) {
        return id === config.BUTTON_SHOW_ALL_ID;
    };


    TagButtonBar.prototype._manageShowAllButtonClicked = function (tagButtonsList, tagButtonBarId) {
        // start by 'un-pressing' all buttons
        _.each(tagButtonsList, function (elem) {
            elem.setPressedState(false);
        });

        // set 'show all' button to pressed
        this._setShowAllButtonState(true);

        this._makeAllPageContentItemsVisible(tagButtonBarId);
    };


    // TODO: _repaintPageContentItems to also handle 'show all'
    TagButtonBar.prototype._makeAllPageContentItemsVisible = function (tagButtonBarId) {
        var selectorStr = '[data-filterer="' + tagButtonBarId + '"]';
        $(selectorStr).show();
    };


    TagButtonBar.prototype._manageOtherButtonClicked = function (buttonId) {
        this._setShowAllButtonState(false);

        var button = this.tagButtonsList[buttonId];
        this._toggleButtonState(button);

        this._repaintPageContentItems(this._getPageContentItemsToRepaint());
    };


    TagButtonBar.prototype._setShowAllButtonState = function (enable) {
        var button = this.tagButtonsList[config.BUTTON_SHOW_ALL_ID];
        button.setPressedState(enable);
    };


    TagButtonBar.prototype._getPageContentItemsToRepaint = function () {
        var selectorStr = '[data-filterer="' + this.tagButtonBarId + '"]';
        var pageContentItemsToRepaint;

        pageContentItemsToRepaint = $(selectorStr);

        return pageContentItemsToRepaint;
    };


    // update what items to display
    TagButtonBar.prototype._repaintPageContentItems = function (pageContentItemsToRepaint) {
        var self = this;

        _.each(pageContentItemsToRepaint, function (elem) {
            var tagsOnContentItem = filterByTag.getDataTagValuesOnElement(elem);
            var found = false;

            // exit if element did not contain any tags
            if (!tagsOnContentItem) {
                return;
            }

            // if the content item contains one tag only and it is 'ALWAYS_HIDE_VALUE' then hide the
            // content item and immediately return (useful for e.g. hiding a header as soon as
            // a tag button is clicked)
            if ((tagsOnContentItem.length === 1) && (tagsOnContentItem[0] === config.ALWAYS_HIDE_VALUE)) {
                $(elem).hide();
                return;
            }

            // iterate over tags found on the current content item
            _.each(tagsOnContentItem, function (tag) {
                if (self.tagButtonsList[tag].buttonPressed) {
                    found = true;
                }
            });

            if (!found) {
                if ($(elem).is(':visible')) {
                    $(elem).hide();
                }
            } else {
                if ($(elem).is(':hidden')) {
                    $(elem).show();
                }
            }
        });
    };


    filterByTag.TagButtonBar = TagButtonBar;

})(window.jQuery, window.filterByTag = window.filterByTag || {});;// ------------------------------------------------------------------------
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

})(window.jQuery, window.filterByTag = window.filterByTag || {});;// ------------------------------------------------------------------------
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

})(window.jQuery, window.filterByTag = window.filterByTag || {});;// ------------------------------------------------------------------------
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