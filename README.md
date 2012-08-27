jquery-ctrlenter is a jQuery plugin that makes it easy to allow submitting a form with textareas using a simple press on ```'Enter'```. Line breaks (newlines) in these input fields can then be achieved by pressing ```'Shift+Enter'``` (alternatively ```'Ctrl+Enter'```). Additionally a hint is shown.

Usage:
------

To use this plug-in just add ```jquery.ctrlenter.js``` and ```jquery.ctrlenter.css``` to your document and attach it to your textareas:

    $(document).ready(function() {
        $('textarea').ctrlenter();
    });

See ```example.html``` for an example usage.


Settings:
---------

    $('textarea').ctrlenter({
        focusClass: 'ctrlenter',             /* CSS class used on focus */
        inactiveClass: 'ctrlenterInactive',  /* CSS class used when no focus */
        hint: 'Shift+Enter for line break',   /* hint shown */
        metaKey: 'shift',                     /* meta key that triggers a line-break, allowed values: 'shift', 'ctrl' */
        pseudoPadding: '0 10'                 /* padding (bottom, right) of hint text */
    });

You can adjust the style in ```jquery.ctrlenter.css```


Other things you might want to use along with jquery-ctrlenter:

  * elastic (http://unwrongest.com/projects/elastic/) for growing and shrinking your content.
  * jquery-resize (http://benalman.com/projects/jquery-resize-plugin/) if you plan on doing some special resizing on the textarea.


Unit tests:
-----------

Point your browser to ```test/index.html``` to start the QUnit tests. ![current build status](https://secure.travis-ci.org/cburgmer/jquery-ctrlenter.png)

Changelog:
----------

  * MASTER: Fix test cases to work with Firefox 6.0
  * 0.0.4: Also allow for CTRL instead of SHIFT, fix resize for Google Chrome
  * 0.0.3: Change the way how the hint is positioned and improve resize handling.
  * 0.0.2: React to textarea resizes and fix position of hint
  * 0.0.1: Initial release

Licensed under the MIT-License

Report issues to https://github.com/cburgmer/jquery-ctrlenter/issues

Contact me under Christoph Burgmer (cburgmer -[at]- ira [*dot*] uka [*dot*] de)
