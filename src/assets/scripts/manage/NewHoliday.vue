<template>
    <div class="container">
        <div class="editable">
            <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna. Curabitur blandit tempus porttitor. Cras mattis consectetur purus sit amet fermentum. Vestibulum id ligula porta felis euismod semper. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>

            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec id elit non mi porta gravida at eget metus. Aenean lacinia bibendum nulla sed consectetur. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>

            <p>Nullam id dolor id nibh ultricies vehicula ut id elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Maecenas faucibus mollis interdum.</p>

            <p>Curabitur blandit tempus porttitor. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec sed odio dui. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>
        </div>
        <textarea class="editable medium-editor-textarea">&lt;p&gt;Textarea is now supported&lt;/p&gt;</textarea>
    </div>
</template>

<script>
  import MediumEditor from 'medium-editor';

  export default {
    name: 'manage-new-holiday',

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
        const editor = new MediumEditor(elements);
      }
    }
  }
</script>

<style lang="scss">
    @import '../../../node_modules/medium-editor/src/sass/medium-editor';
    @import '../../../node_modules/medium-editor/src/sass/themes/beagle';
</style>
