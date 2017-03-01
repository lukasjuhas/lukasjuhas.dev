<template>
    <div class="editor">
        <div class="editor__header">
            <h1 class="editor__title editable">{{ title }}</h1>
        </div>
        <div class="editor__content editable">{{ content }}</div>
        <button v-if="showAddMedia" type="button" name="media" class="media-button">+</button>
        <button v-if="showSave" v-on:click="save" type="button" name="button" class="button button--primary">Save</button>
    </div>
</template>

<script>
  import MediumEditor from 'medium-editor';

  export default {
    name: 'editor',

    props: {
      title: {
        type: String,
        required: false,
        default: null,
      },

      content: {
        type: String,
        required: false,
        default: null,
      },
    },

    data() {
      return {
        editor: null,
        showSave: false,
        showAddMedia: true,
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

        this.editor.subscribe('editableKeypress', (event) => {
          this.onKeypress(event);
        });
      },

      sectionChange(event) {
        this.showSave = true;
        this.showAddMedia = false;
      },

      save() {
        const title = this.editor.elements[0].innerHTML;
        const content = this.editor.elements[1].innerHTML;

        if(!content || !title) {
          return false;
        }

        // if parent has save function, prioritise it
        if (typeof this.$parent.save === 'function') {
            this.$parent.save(title, content);
        } else {
          // TODO: handle saving
        }
      },

      onKeypress(event) {
        if(event.key === 'Enter') {
          // make sure it runs last so sectionChange won't hide it again
          setTimeout(() => {
            this.showAddMedia = true;
          }, 100);
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../../node_modules/medium-editor/src/sass/medium-editor';
  @import '../../../node_modules/medium-editor/src/sass/themes/beagle';

  .editor {
    position: relative;
  }

  .editable {
    outline: 0 none;
  }

  .editor__content {
    font-family: $serif-font-family;
  }

  .media-button {
    width: 26px;
    height: 26px;
    border: 2px solid $col-text;
    border-radius: 50%;
    line-height: 23px;
    font-size: 24px;
    text-align: center;
    text-indent: 1px;
    position: absolute;
    left: -($base-spacing-unit + 26);
  }
</style>
