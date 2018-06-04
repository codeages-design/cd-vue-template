<template>
  <transition name="modal" v-if="show">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog">
          <div class="modal-header" :class="modalSize">
            <slot name="close">
              <i class="groupon-icon groupon-icon-guanbi" @click="closeClickListener"></i>
            </slot>
            <slot name="header">
              default header
            </slot>
          </div>
          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>
          <div class="modal-footer clearfix">
            <slot name="footer">
              <a href="javascript:;" class="modal-default-button" @click="closeClickListener">
                知道了
              </a>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  props: ['closeBtn', 'size'],
  methods: {
    closeClickListener() {
      this.closeModal();
    },
    closeModal() {
      this.show = false;
      document.body.style.position = '';
      this.$emit('close');
    },
    showModal() {
      this.show = true;
      document.body.style.position = 'fixed';
      this.$emit('open');
    }
  },
  computed: {
    modalSize() {
      if (!this.size) {
        return;
      }
      return `modal-${this.size}`;
    },
  }
}
</script>

<style lang="less">
  .modal-mask {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-dialog {
    width: 600px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header {
    position: relative;
    h3 {
      margin-top: 0;
      font-weight: 400;
    }
    .groupon-icon {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .modal-body {
    margin: 20px 0;
  }

  .modal-default-button {
    float: right;
    font-size: .875rem;
  }

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .modal-header {
    padding: 15px 20px;
  }

  .modal-body {
    word-wrap: break-word;
    overflow: hidden;
    padding-left: 20px;
    padding-right: 20px;
  }

  .modal-body img {
    max-width: 100%;
    height: auto;
  }

  .modal-backdrop.in {
    opacity: 0.8;
  }

  .modal-dialog.modal-lg {
    width: 900px;
    margin-top: 20px;
  }

  .modal-md {
    width: 800px;
  }

  .modal-sm {
    width: 520px;
  }



</style>