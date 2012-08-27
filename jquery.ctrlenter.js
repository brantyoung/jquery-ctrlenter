/*
 * ctrlenter: a jQuery plugin
 * tested on jQuery v1.7.2
 *
 * jquery-ctrlenter is a jQuery plugin that makes it easy to allow submitting
 * a form with textareas using a simple press on 'Enter'. Line breaks (newlines)
 * in these input fields can then be achieved by pressing 'Shift+Enter'
 * (alternatively 'Ctrl+Enter'). Additionally a hint is shown.
 *
 * For usage and examples, visit:
 * http://github.com/brantyoung/jquery-ctrlenter
 *
 * Settings:
 *
 * $('textarea').ctrlenter({
 *     focusClass: 'ctrlenter',             // CSS class used on focus
 *     inactiveClass: 'ctrlenterInactive',  // CSS class used when no focus
 *     hint: '^/⌘ + ↵ for submit',   // hint shown
 *     pseudoPadding: '0 10'                 // padding (bottom, right) of hint text
 * });
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2011, Christoph Burgmer (cburgmer -[at]- ira [*dot*] uka [*dot*] de)
 */
/*jslint devel: false, browser: true, vars: true, indent: 4 */
/*global jQuery */
(function ($) {
    "use strict";
    $.extend({
        ctrlenter: {
            settings: {
                focusClass: 'ctrlenter',
                inactiveClass: 'ctrlenterInactive',
                hint: '^/⌘ + ↵ for submit',
                pseudoPadding: '0 10' // Pseudo-padding to work around webkit/firefox4 resize handler being hidden, follows the CSS padding style
            },
            get_padding: function (padding) {
                // Parse padding and return right & bottom padding
                var padding_right = 0,
                    padding_bottom = 0,
                    padding_list = null;
                if (padding) {
                    padding_list = padding.split(/ +/);
                    switch (padding_list.length) {
                    case 1:
                        padding_bottom = padding_right = parseInt(padding_list[0], 10);
                        break;
                    case 2:
                        padding_bottom = parseInt(padding_list[0], 10);
                        padding_right = parseInt(padding_list[1], 10);
                        break;
                    default:
                        padding_right = parseInt(padding_list[1], 10);
                        padding_bottom = parseInt(padding_list[2], 10);
                    }
                }
                return {right: padding_right, bottom: padding_bottom};
            },
            debug: false,
            log: function (msg) {
                if (!$.ctrlenter.debug) { return; }
                msg = "[ShiftEnter] " + msg;
                $.ctrlenter.hasFirebug ?
                        window.console.log(msg) :
                        $.ctrlenter.hasConsoleLog ?
                                window.console.log(msg) :
                                window.alert(msg);
            },
            hasFirebug: window.hasOwnProperty("console") && window.console.hasOwnProperty("firebug"),
            hasConsoleLog: window.hasOwnProperty("console") && typeof window.console.log !== "undefined"
        }

    });
    // plugin code
    $.fn.ctrlenter = function (opts) {
        opts = $.extend({}, $.ctrlenter.settings, opts);

        return this.each(function () {
            var $el = $(this);

            // Our goal only makes sense for textareas where enter does not trigger submit
            if (!$el.is('textarea')) {
                $.ctrlenter.log('Ignoring non-textarea element');
                return;
            }

            // Add hint
            if (opts.hint) {
                $.ctrlenter.log('Registering hint');
                var $hint = $('<div class="' + opts.inactiveClass + '">' + opts.hint + '</div>').insertAfter($el),
                    reposition = function () {
                        var position = $el.position(),
                            padding = $.ctrlenter.get_padding(opts.pseudoPadding);

                        /* Position hint, relative right bottom corner of textarea,
                           add pseudo-padding to workaround hint text with heigher z-index hiding resize handler */
                        $hint.css("left", position.left + $el.outerWidth() - $hint.outerWidth() - padding.right)
                            .css("top", position.top + $el.outerHeight() - $hint.outerHeight() - padding.bottom);
                    };

                reposition();

                // Show & Hide hint
                $el.bind('focus.ctrlenter', function () {
                    $.ctrlenter.log('Gained focus');
                    // Be safe and reposition, size of textarea might have been changed
                    reposition();
                    $hint.removeClass(opts.inactiveClass).addClass(opts.focusClass);
                    /* Reposition hint on user grabbing the webkit/firefox4 textarea resize handler
                       TODO should be only bound on "mousedown", but Chrome currently doesn't issue a mousedown on the resizer */
                    $el.bind('mousemove.ctrlenter', reposition);
                });
                $el.bind('blur.ctrlenter', function () {
                    $.ctrlenter.log('Lost focus');
                    $hint.removeClass(opts.focusClass).addClass(opts.inactiveClass);
                    // Stop repositioning
                    $el.unbind('mousemove.ctrlenter');
                });
                /* Resize wrap (needs jquery-resize, http://benalman.com/projects/jquery-resize-plugin/),
                   only needed for cases where javascript-triggered resize happens while textarea has focus
                   (e.g. autogrow) */
                $el.bind('resize', function () {
                    reposition();
                });
            }

            // Catch return key without shift to submit form
            $el.bind('keydown.ctrlenter', function (event) {
                if (event.keyCode === 13) {
                    if (event.metaKey || event.ctrlKey) {
                        $.ctrlenter.log('Got Ctrl/Meta + Enter, submitting');

                        // Submit form
                        event.preventDefault();
                        $el.blur();
                        $el.parents('form').submit();
                        return false;

                    } else {
                        $.ctrlenter.log('Got Enter, do nothing');

                        $el.trigger('mousemove.ctrlenter');
                        return true;
                    }
                }
            });

        });
    };
}(jQuery));
