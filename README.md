jquery-ctrlenter is a jQuery plugin that makes it easy to allow submitting a form with textareas using a press on ```'Ctrl+Enter' / '⌘+Enter'```. Additionally a hint is shown.

Usage:
------

To use this plug-in just add ```jquery.ctrlenter.js``` and ```jquery.ctrlenter.css``` to your document and attach it to your textareas:

    $(document).ready(function() {
        $('textarea').ctrlenter();
    });

See ```example.html``` for an example usage.


Settings:
---------

    settings: {
        focusClass: 'ctrlenter',
        inactiveClass: 'ctrlenterInactive',
        hint: '<kbd class="ctrlenter">Ctrl - ↵</kbd> or <kbd class="ctrlenter">⌘ - ↵</kbd> for submit',
        pseudoPadding: '0 10' // Pseudo-padding to work around webkit/firefox4 resize handler being hidden, follows the CSS padding style
    },

You can adjust the style in ```jquery.ctrlenter.css```


Other things you might want to use along with jquery-ctrlenter:

  * elastic (http://unwrongest.com/projects/elastic/) for growing and shrinking your content.
  * jquery-resize (http://benalman.com/projects/jquery-resize-plugin/) if you plan on doing some special resizing on the textarea.


Changelog:
----------

  * 0.0.6: switch to use ```'Ctrl+Enter' / '⌘+Enter'``` for submit form
  * 0.0.5: fork from https://github.com/cburgmer/jquery-shiftenter

Licensed under the MIT-License
