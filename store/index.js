// Copyright (C) 2022 Theros [SvalTek|MisModding]
//
// This file is part of miscord-dashboard.
//
// miscord-dashboard is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// miscord-dashboard is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with miscord-dashboard.  If not, see <http://www.gnu.org/licenses/>.

//
// ────────────────────────────────────────────────────────────────────── I ──────────
//   :::::: G L O B A L   S E T T I N G S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
//
export const state = () => ({
  ProjectName: 'Projects @ SvalTek',
  ProjectVersion: '1.0.0',
  ProjectRepository: 'https://github.com/SvalTek/svaltek-projects',
  FooterText: 'Various Projects from SvalTek',

  /** Active toasts:
   * id: Unique ID for the toast
   * time: Time the toast was created, used for timeout (in unix time)
   * icon can be either a url or base64 image data, this will be resized to fit the toast (32x32)
   * message: The message to display, this must be provided or the toast will not be displayed
   * duration is the time the toast will be displayed for, in seconds, 0 = no timeout
   * type can be either 'success', 'info', 'warning', 'error'
   * { id: '', icon: '', message: '', duration: 0, type: '' }
   */
  AllToasts: [],
  AllNotifications: []
})

export const mutations = {
  // Adds a toast to the state
  addToast(state, toast) {
    // add the toast to the state
    state.AllToasts.push(toast)
  },
  // Removes a toast from the state
  removeToast(state, id) {
    // find the toast in the state
    const index = state.AllToasts.findIndex((t) => t.id === id)
    // remove the toast from the state
    state.AllToasts.splice(index, 1)
  },
  // Adds a notification to the state
  addNotification(state, notification) {
    // add the notification to the state
    state.AllNotifications.push(notification)
  },
  // Removes a notification from the state
  removeNotification(state, id) {
    // find the notification in the state
    const index = state.AllNotifications.findIndex((n) => n.id === id)
    // remove the notification from the state
    state.AllNotifications.splice(index, 1)
  }
}

export const getters = {
  // gets the total number of toasts
  getToastCount: (state) => state.AllToasts.length,
  // get all toasts
  getAllToasts: (state) => state.AllToasts
}

export const actions = {
  /**
   * CreateToast(toast)
   * @param {object} toastSchema - Object defining the toast to create
   * @param {string} toastSchema.icon - optional: icon to display, can be either a url or base64 image data, will allways be rendered as a square @ 32x32.
   * @param {string} toastSchema.title - title to display
   * @param {string} toastSchema.message - required: message to display, toast will not be shown if not provided
   * @param {number} toastSchema.duration - required: duration in milliseconds, can be 0 for no timeout
   * @param {string} toastSchema.type - optional: type of toast, can be:
   * 'primary', 'secondary', 'info', 'success',  'warning', 'danger'. Defaults to 'info'
   */
  CreateToast: ({ state, commit }, toastSchema) => {
    // do nothing if the message is not provided
    if (!toastSchema.message) return
    // we ignore any provided id, the id is allways AllToasts.length + 1
    const id = (state.AllToasts.length + 1).toString()

    const toast = {
      id,
      icon: toastSchema.icon || null,
      title: toastSchema.title,
      message: toastSchema.message,
      duration: toastSchema.duration || 0,
      type: toastSchema.type || 'info'
    }
    // add the toast to the state
    commit('addToast', toast)
    if (typeof toastSchema.duration === 'number' && toastSchema.duration > 0) {
      // set a timeout to remove the toast
      setTimeout(() => {
        commit('removeToast', id)
      }, toastSchema.duration)
    }
  },
  /**
   * RemoveToast(id)
   * @param {number} id - id of the toast to remove
   * @example
   * store.dispatch('RemoveToast', 1) // removes the toast with id 1
   */
  RemoveToast: ({ state, commit }, id) => {
    // we dont want to cause a commit if the toast is not found, so we check first
    // toastHandler has listeners on `removeToast` we dont want it trying to destroy a non existent toast.
    if (state.AllToasts.find((toast) => toast.id === id)) {
      commit('removeToast', id)
    }
  },
  /**
   * ClearToasts(types[])
   * @param {array} types - array of types to clear, if empty all toasts will be cleared
   * @example
   * store.dispatch('ClearToasts') // removes all toasts
   * store.dispatch('ClearToasts', ['error']) // removes all toasts of type 'error'
   * store.dispatch('ClearToasts', ['success', 'error']) // removes all toasts of type 'success' or 'error'
   */
  ClearToasts: ({ state, commit }, types) => {
    if (Array.isArray(types)) {
      // clear only toasts of the specified types
      state.AllToasts.forEach((toast) => {
        if (types.includes(toast.type)) {
          commit('removeToast', toast.id)
        }
      })
    } else {
      // if types is empty, clear all toasts
      state.AllToasts.forEach((toast) => {
        commit('removeToast', toast.id)
      })
    }
  },
  /**
   * CreateNotification(notification)
   * @param {object} notificationSchema - Object defining the notification to create
   * @param {string} notificationSchema.title - title to display
   * @param {string} notificationSchema.message - required: message to display, toast will not be shown if not provided
   * @param {number} notificationSchema.duration - optional: duration in milliseconds
   * @param {string} notificationSchema.type - optional: type of toast, can be:
   * 'primary', 'secondary', 'info', 'success',  'warning', 'danger'. Defaults to 'info'
   * @example
   * store.dispatch('CreateNotification', { title: 'Title', message: 'Message', type: 'info' })
   */
  CreateNotification: ({ state, commit }, notificationSchema) => {
    // do nothing if the message is not provided
    if (!notificationSchema.message) return
    // we ignore any provided id, the id is allways AllToasts.length + 1
    const id = (state.AllNotifications.length + 1).toString()

    const notification = {
      id,
      title: notificationSchema.title,
      message: notificationSchema.message,
      type: notificationSchema.type || 'info'
    }
    // add the notification to the state
    commit('addNotification', notification)
    if (
      typeof notificationSchema.duration === 'number' &&
      notificationSchema.duration > 0
    ) {
      // set a timeout to remove the notification
      setTimeout(() => {
        commit('removeNotification', id)
      }, notificationSchema.duration)
    }
  },

  /**
   * dismissNotification(id)
   * @param {number} id - id of the notification to remove
   * @example
   * store.dispatch('dismissNotification', 1) // removes the notification with id 1
   * store.dispatch('dismissNotification', 'all') // removes all notifications
   */
  dismissNotification: ({ state, commit }, id) => {
    if (id === 'all') {
      // if id is 'all', remove all notifications
      state.AllNotifications.forEach((notification) => {
        commit('removeNotification', notification.id)
      })
    } else {
      // if id is not 'all', remove the notification with the id
      const index = state.AllNotifications.findIndex((n) => n.id === id)
      if (index > -1) {
        commit('removeNotification', id)
      }
    }
  }
}
