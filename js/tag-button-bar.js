// ------------------------------------------------------------------------
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

})(window.jQuery, window.filterByTag = window.filterByTag || {});