// Tabular does not reactively respond to selector changes and this causes
// fatal errors when the same datatable is used with varying selectors
// https://github.com/aldeed/meteor-tabular/issues/94

var timeoutHandle, waiting = new ReactiveVar('false');

forceReRender = function() {

    timeoutHandle && Meteor.clearTimeout(timeoutHandle);

    waiting.set(true);

    timeoutHandle = Meteor.setTimeout(function() {
        waiting.set(false);
        timeoutHandle = null;
    }, 100); // Wait for 100 ms
};

Template.registerHelper('forceReRender', function() {
    return !waiting.get();
});
