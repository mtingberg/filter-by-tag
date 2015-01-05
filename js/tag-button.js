// ------------------------------------------------------------------------
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

})(window.jQuery, window.filterByTag = window.filterByTag || {});