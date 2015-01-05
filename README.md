# Filter by Tag

`filter-by-tag.js` generates a filter toolbar on the fly from data tags found in the html content.

For implementation details, please see: [CONTRIBUTING](https://github.com/mtingberg/filter-by-tag/CONTRIBUTING.md)

An example of how to use the component in your own pages can be found in the `example` directory,
or live [here](http://mtingberg.github.io/filter-by-tag).


## Install

Download from the [project page](https://github.com/mtingberg/filter-by-tag/).

Drop `filter-by-tag.js` into your scripts folder.


## How to use it

Include `jquery.js` and `underscore.js` in your html page. (Using a CDN and specific versions
is, of course, optional).

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script>window.jQuery || document.write('<script src="js/vendor/jquery.min.js"><\/script>')</script>

<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min.js"></script>
<script>window._ || document.write('<script src="js/vendor/underscore.min.js"><\/script>')</script>
```

Include the script (or the minified .min version):

```html
<script src="js/filter-by-tag.js"></script>
```

Tag the elements in your html that should be managed by a filtering toolbar, e.g.:

```html
<section id="link1" data-filterer="bar1" data-tag="link 1">
    <header>
        <h1>Title 1</h1>
        <time datetime="2014-10-24">Last updated: 2014-10-24</time>
    </header>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
        do eiusmod tempor incididunt.</p>
</section>
```

In this example `data-filterer="bar1` indicates that the section element should
be managed by the toolbar named `bar1`. Each element can be assigned one or many tags:
`data-tag="tag 1, tag 2, tag 3"` describing the item. Each one separated by a comma sign.


Call the script:

```html
<script>
    var bar1 = new filterByTag.Filterer({
        buttonLabelShowAll : 'Show all',
        tagLabelHeading : 'Tags:',
        whichFilterer : 'bar1',
        placeAfterElem : '#container-1-heading'
    });

    var bar2 = new filterByTag.Filterer({
        buttonLabelShowAll : 'Visa alla',
        tagLabelHeading : 'Taggar:',
        whichFilterer : 'bar2',
        placeAfterElem : '#container-2-heading'
    });
</script>
```
For an example using two toolbars (as per above), please see the [demo page](http://mtingberg.github.io/filter-by-tag)


The current parameters for customization are:

```
buttonLabelShowAll : string (text label on the 'show all' button)
tagLabelHeading : string    (text label in front of the tags found on a specific item)
whichFilterer : string	    (indicates which toolbar a tagged item belongs to)
placeAfterElem : string     (id of the html element to put the toolbar after)
```


## Acknowledgements

Filter by Tag is a project by [Magnus Tingberg](https://github.com/mtingberg).
