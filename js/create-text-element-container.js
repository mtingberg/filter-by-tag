(function($, filterByTag) {
    "use strict";

    filterByTag.createTextElementContainer = function (containerProperties) {
        var cp = containerProperties;

        var containerElement = document.createElement(cp.containerType);
        var textElement = document.createTextNode(cp.containerText);

        containerElement.appendChild(textElement);
        containerElement.className = cp.containerClass;

        return containerElement;
    };

})(window.jQuery, window.filterByTag = window.filterByTag || {});