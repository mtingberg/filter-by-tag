describe('TaggedItemList', function() {
    'use strict';

    var filterByTag = window.filterByTag,
        mockTaggedItems = [];


    mockTaggedItems = (function () {
        var elem1, elem2, elem3, elem4, taggedItems = [];

        elem1 = document.createElement('section');
        elem1.dataset.filterer = 'bar1';
        elem1.dataset.tag = 'link 1';
        elem1.id = 'link1';
        taggedItems.push(elem1);

        elem2 = document.createElement('section');
        elem2.dataset.filterer = 'bar1';
        elem2.dataset.tag = 'link 1, link 2';
        elem2.id = 'link2';
        taggedItems.push(elem2);

        elem3 = document.createElement('header');
        elem3.dataset.filterer = 'bar1';
        elem3.dataset.tag = 'always-hide';
        taggedItems.push(elem3);

        elem4 = document.createElement('section');
        elem4.dataset.filterer = 'bar1';
        elem4.dataset.tag = 'link 2, link 3';
        elem4.id = 'link3';
        taggedItems.push(elem4);

        return taggedItems;
    })();

    describe('_createTagsFromContentItems', function () {
        var taggedItemList = new filterByTag.TaggedItemList({});

        beforeEach(function () {
        });

        it('should return a nested array structure according to input', function () {
            taggedItemList.taggedItems = taggedItemList._createTagsFromContentItems(mockTaggedItems);

            expect(taggedItemList.taggedItems[0].tags).to.deep.equal(['link 1']);
            expect(taggedItemList.taggedItems[1].tags).to.deep.equal(['link 1', 'link 2']);
            expect(taggedItemList.taggedItems[2].tags).to.deep.equal(['always-hide']);
            expect(taggedItemList.taggedItems[3].tags).to.deep.equal(['link 2', 'link 3']);
        });
    });

    describe('getUniqueTags', function () {
        var taggedItemList = new filterByTag.TaggedItemList({});

        beforeEach(function () {
        });

        it('should return a list of unique tags', function () {
            taggedItemList.taggedItems = taggedItemList._createTagsFromContentItems(mockTaggedItems);

            expect(taggedItemList.getUniqueTags()).to.deep.equal(['link 1', 'link 2', 'link 3']);
        });
    });

    describe('getItemsWithSpecificTags', function () {
        var taggedItemList = new filterByTag.TaggedItemList({});

        beforeEach(function () {
        });

        it('should return the number of elements with the specified tags', function () {
            var taggedItems;

            taggedItemList.taggedItems = taggedItemList._createTagsFromContentItems(mockTaggedItems);
            taggedItems = taggedItemList.getItemsWithSpecificTags(['link 2', 'link 3']);

            expect(taggedItems.length).to.equal(2);
        });
    });

    describe('getItemsWithoutSpecificTags', function () {
        var taggedItemList = new filterByTag.TaggedItemList({});

        beforeEach(function () {
        });

        it('should return the number of elements without the specified tags', function () {
            var taggedItems;

            taggedItemList.taggedItems = taggedItemList._createTagsFromContentItems(mockTaggedItems);
            taggedItems = taggedItemList.getItemsWithoutSpecificTags(['link 2', 'link 3']);

            expect(taggedItems.length).to.equal(2);
        });
    });
});