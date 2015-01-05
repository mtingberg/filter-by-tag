describe('TaggedItem', function() {
    'use strict';

    var filterByTag = window.filterByTag,
        config = filterByTag.config;


    describe('getTagStrings', function () {
        var taggedItem,
            props = {domElement: '#section1', tags: ['link1', 'link2', 'link3']};

        beforeEach(function () {
            taggedItem = new filterByTag.TaggedItem(props);
        });


        it('returns the strings expected', function () {
            expect(taggedItem.getTags()).to.deep.equal(props.tags);
        });
    });

    describe('_tagsToLabelElements', function () {
        var taggedItem,
            props = {domElement: '#section1', tags: ['link1', 'link2', 'link3']},
            expectedHtml = '<footer class="tag-label-list"><div class="tag-label-heading">Tags:</div>' +
                '<div class="tag-label-item">link1</div><div class="tag-label-item">link2</div>' +
                '<div class="tag-label-item">link3</div></footer>';

        beforeEach(function () {
            taggedItem = new filterByTag.TaggedItem(props);
        });

        it('returns the html fragment expected', function () {
            expect(taggedItem._tagsToLabelElements(props.tags,
                { tagLabelHeading : config.DEFAULT_TAG_LABEL_HEADING }).outerHTML).to.equal(expectedHtml);
        });

        it('removes config.ALWAYS_HIDE_VALUE elements from the output', function () {
            props = {domElement: '#section1', tags: ['link1', config.ALWAYS_HIDE_VALUE, 'link2', 'link3']};

            expect(taggedItem._tagsToLabelElements(props.tags,
                { tagLabelHeading : config.DEFAULT_TAG_LABEL_HEADING }).outerHTML).to.equal(expectedHtml);
        });
    });
});