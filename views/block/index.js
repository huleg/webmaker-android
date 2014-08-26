var Make = require('../../lib/make');
var templates = require('../../lib/templates.json');
var view = require('../../lib/view');

var id = null;
var index = null;
var target = null;
var block = null;

module.exports = view.extend({
    id: 'block',
    template: require('./index.html'),
    components: {
       'string-editor': require('../../components/block-editors/string')
    },
    data: {
        title: 'Edit',
        back: true
    },
    created: function () {
        var self = this;

        // Fetch app
        id = self.$parent.$data.params.id;
        index = self.$parent.$data.params.index;
        target = new Make(id);
        block = target.meta.blocks[index];
        // Bind app
        self.$data = block;
        self.$data.getEditor = function (type) {
            var editorKey = type + '-editor';
            var defaultEditor = 'string-editor';
            var legalComponents = this.$compiler.options.components;
            if (legalComponents[editorKey]) {
                return editorKey;
            }
            return defaultEditor;
        };
        self.$data.remove = function (e) {
            e.preventDefault();
            target.remove(index);
            global.history.back();
        };
    },
    detached: function () {
        var self = this;
        target.update(index, self.$data.attributes);
    }
});
