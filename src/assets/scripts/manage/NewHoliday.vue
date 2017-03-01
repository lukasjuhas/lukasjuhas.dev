<template>
    <div class="container">
        <div class="editor">
            <div class="editor__header">
                <h1 class="editor__title editable"></h1>
            </div>
            <div class="editor__content editable"></div>
            <button v-if="showSave" v-on:click="save" type="button" name="button" class="button button--primary">Save</button>
        </div>
    </div>
</template>

<script>
  import MediumEditor from 'medium-editor';

  export default {
    name: 'manage-new-holiday',

    data() {
      return {
        editor: null,
        title: null,
        showSave: false,
      }
    },

    mounted() {
      this.initEditor();
    },

    methods: {
      initEditor() {
        // TODO: Rewrite this to handle images
        const AddMediaExtension = MediumEditor.Extension.extend({
          name: 'add-media',

          init: function () {
            this.getEditorElements().forEach(function (element) {
              this.on(element, 'contextmenu', this.handleContextmenu.bind(this));
            }, this);

            this.subscribe('editableKeydown', this.handleKeydown.bind(this));
          },

          handleContextmenu: function (event) {
            if (!event.currentTarget.getAttribute('data-allow-context-menu')) {
              event.preventDefault();
            }
          },

          handleKeydown: function (event, editable) {
            // If the user hits escape, toggle the data-allow-context-menu attribute
            if (MediumEditor.util.isKey(event, MediumEditor.util.keyCode.ESCAPE)) {
              if (editable.hasAttribute('data-allow-context-menu')) {
                editable.removeAttribute('data-allow-context-menu');
              } else {
                editable.setAttribute('data-allow-context-menu', true);
              }
            }
          }
        });

        // init editor
        const elements = document.querySelectorAll('.editable', {
          extensions: {
            'add-media': new AddMediaExtension(),
          }
        });
        this.editor = new MediumEditor(elements);

        this.editor.subscribe('editableInput', (event) => {
          this.sectionChange(event);
        });
      },

      sectionChange(event) {
        this.showSave = true;
      },

      save() {
        const title = this.editor.elements[0].innerHTML;
        const content = this.editor.elements[1].innerHTML;

        if(!content || !title) {
          return false;
        }

        // handle saving
      }
    }
  }
</script>

<style lang="scss">
    @import '../../../node_modules/medium-editor/src/sass/medium-editor';
    @import '../../../node_modules/medium-editor/src/sass/themes/beagle';

    .editable {
      outline: 0 none;
    }

    .editor__content {
      font-family: $serif-font-family;
    }
</style>
