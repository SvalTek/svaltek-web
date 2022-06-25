<template>
  <main>
    <!-- display notifications as cards -->
    <b-row class="justify-content-center slide-up-fade-in">
      <div v-for="notification in notifications" :key="notification.id">
        <b-card no-body>
          <b-card-body>
            <b-row>
              <b-col md="10">
                <b-row>
                  <b-col md="10">
                    <b-card-text>{{ notification.message }}</b-card-text>
                  </b-col>
                  <b-col md="2">
                    <b-button variant="danger" @click="dismiss(notification.id)">
                      <b-icon icon="times" />
                    </b-button>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
        <br />
      </div>
    </b-row>
  </main>
</template>

<script>
export default {
  name: 'NotificationsView',
  components: {},
  data() {
    return {
      notifications: [
        {
          type: 'success',
          message: 'This is a success message!',
          dismiss: () => {},
        },
        {
          type: 'info',
          message: 'This is an info message!',
          dismiss: () => {},
        },
        {
          type: 'warning',
          message: 'This is a warning message!',
          dismiss: () => {},
        },
        {
          type: 'error',
          message: 'This is an error message!',
          dismiss: () => {},
        },
      ],
    }
  },
  computed: {},
  created() {
    this.notifications = this.$store.state.notifications
  },
  mounted() {},
  methods: {
    dismiss(notification) {
      this.$store.dispatch('dismissNotification', notification)
    },
  },
}
</script>

<style lang="sass" scoped>
</style>