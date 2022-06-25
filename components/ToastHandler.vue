<template>
  <div class="toast-container">
    <div id="toasts-wrapper"></div>
  </div>
</template>

<script>
import MessageIcon from '~/assets/icons/message.png'

export default {
  name: 'ToastHandler',
  mounted() {
    // listen for toast creation events
    this.$store.subscribe((mutation, state) => {
      // if the state has changed
      if (mutation.type === 'addToast') {
        const toast = mutation.payload
        const toastId = state.AllToasts.length.toString()
        toast.id = toastId
        console.log(`creating toast id: ${toastId}`)
        this.makeToast(toast)
      }
    })

    // listen for toast removal events
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'removeToast') {
        const toastId = mutation.payload
        console.log(`removing toast id: ${toastId}`)
        this.destroyToast(toastId)
      }
    })
  },
  methods: {
    makeToast(toast, append = false) {
      const $elem = this.$createElement
      const shouldAutoHide = !(
        typeof toast.duration === 'number' && toast.duration > 0
      )

      const toastHeader = $elem(
        'div',
        { class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2'] },
        [
          $elem('img', {
            class: ['rounded-circle', 'mr-2'],
            attrs: {
              src: toast.icon || MessageIcon,
              alt: 'toast icon',
              width: '32',
              height: '32',
            },
          }),
          $elem('strong', { class: 'mr-2' }, `${toast.title}`),
          $elem(
            'small',
            { class: 'ml-auto text-italics' },
            `${Date.now().toLocaleString()}`
          ),
        ]
      )

      const toastBody = $elem('p', { class: ['text-center', 'mb-0'] }, [
        $elem('span', `${toast.message}`, { class: 'text-center' }),
      ])
      this.$root.$bvToast.toast([toastBody], {
        id: toast.id,
        title: [toastHeader],
        autoHideDelay: toast.duration,
        appendToast: append,
        noAutoHide: shouldAutoHide,
        variant: toast.type,
      })
    },
    destroyToast(toastId) {
      this.$root.$bvToast.hide(toastId)
    },
  },
}
</script>

<style>
</style>