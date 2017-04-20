<template>
    <div class="editor">
        <div v-if="showHeader" class="editor__header">
            <h1 class="editor__title editable"></h1>
        </div>
        <div class="editor__content editable"></div>
        <transition name="fade">
            <button v-if="showAddMedia" @click="modal('addMedia')" type="button" name="media" class="media-button"><svg class="media-button__icon"><use xlink:href="#add"></use></svg></button>
        </transition>
        <button v-if="showSave" v-on:click="save" type="button" name="button" class="button button--primary">Save</button>
        <modal ref="addMedia" v-cloak>
            <h3 slot="header">Add Image</h3>
            <form slot="body" method="post" class="form" v-on:submit.prevent="uploadImage">
                <div class="form__group">
                    <input type="file" name="image" accept="image/*">
                </div>
                <button type="submit" name="upload" class="button button--primary">Upload & Insert</button>
            </form>
        </modal>
    </div>
</template>

<script>
  import MediumEditor from 'medium-editor';
  import Modal from './Modal.vue';
  import flash from '../helpers/flash';

  export default {
    name: 'editor',

    props: {
      notitle: {
        type: Boolean,
        required: false,
        default: false,
      },

      saveMethod: {
        type: String,
        required: false,
        default: 'saveEditor',
      },
    },

    components: {
      Modal,
    },

    data() {
      return {
        editor: null,
        showSave: false,
        showAddMedia: true,
        showHeader: true,
        parentSaveMethod: false,
      };
    },

    mounted() {
      this.showHeader = !this.notitle;
      this.parentSaveMethod = this.saveMethod;
      this.initEditor();
    },

    methods: {
      initEditor() {
        // init editor
        const elements = document.querySelectorAll('.editable');

        if (elements[1].innerHTML !== null) {
          this.showAddMedia = false;
        }

        this.editor = new MediumEditor(elements);

        this.editor.subscribe('editableInput', (event) => {
          this.sectionChange(event);
        });

        this.editor.subscribe('editableKeypress', (event) => {
          this.onKeypress(event);
        });
      },

      sectionChange() {
        this.showSave = true;
        this.showAddMedia = false;
      },

      save() {
        const title = this.editor.elements[0].innerHTML;
        const content = this.editor.elements[1].innerHTML;

        if (!content && !title) {
          return false;
        }

        if (!this.parentSaveMethod) {
          return false;
        }

        // if parent is modal, go to grand parent
        let parent;
        if (this.$parent.$el.className === 'modal-mask') {
          parent = this.$parent.$parent;
        } else {
          parent = this.$parent;
        }

        // if parent has save function, prioritise it
        if (typeof parent[this.parentSaveMethod] === 'function') {
          parent[this.parentSaveMethod](title, content);
        } else {
          const errorMessage = 'You probably forgot to define (default) "saveEditor" method on your component or forgot to reference custom method via "saveMethod" prop.';
          flash.showError(errorMessage);
        }

        this.showSave = false;

        return true;
      },

      onKeypress(event) {
        if (event.key === 'Enter') {
          // make sure it runs last so sectionChange won't hide it again
          setTimeout(() => {
            this.showAddMedia = true;
          }, 100);
        }
      },

      modal(ref) {
        this.$refs[ref].toggle = true;
      },

      closeModal(ref) {
        this.$refs[ref].toggle = false;
      },

      uploadImage() {
        // console.log('upload image');
      },
    },
  };

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
    font-weight: $serif-font-weight;
  }

  .media-button {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    position: absolute;
    left: -($base-spacing-unit + 26);
    bottom: 67px;
  }

  .media-button__icon {
    width: 26px;
    height: 26px;
    fill: $col-text;
  }
</style>
