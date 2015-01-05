describe('getDataTagValuesOnElement', function () {
    'use strict';

    var filterByTag = window.filterByTag;
    var elem;

    beforeEach(function () {
        elem = document.createElement('section');
        elem.dataset.filterer = 'bar1';
    });

    it('should return a single array element for a single value data-tag attribute', function () {
        elem.dataset.tag = 'link 1';
        elem.id = 'link1';

        expect(filterByTag.getDataTagValuesOnElement(elem)).to.deep.equal(['link 1']);
    });

    it('should return several array elements for a multi value data-tag attribute', function () {
        elem.dataset.tag = 'link 1, link 2';
        elem.id = 'link2';

        expect(filterByTag.getDataTagValuesOnElement(elem)).to.deep.equal(['link 1', 'link 2']);
    });
});
