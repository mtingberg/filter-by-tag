describe('TagButton', function() {
    'use strict';

    var filterByTag = window.filterByTag;

    describe('isPressed', function() {
        var tb1;

        beforeEach(function() {
            tb1 = new filterByTag.TagButton({
                label : 'link1',
                buttonPressed : false,
                position : 1,
                domElement : null
            });
        });

        it('should return true if button is pressed', function() {
            expect(tb1.isPressed()).to.equal(false);
        });
    });
});