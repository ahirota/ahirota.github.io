---
next: false
---

# Preapp Virtual Office
When the pandemic hit, our company immediately instituted Work From Home and Hybrid schedules. However, we wanted a way to stay connected as though we were in the office. Initially we tried Google Meets, Zoom, and other systems combined with our chats but we were unsatisfied. We decided to build our own platform that would be able to facilitate our work.

The main tools and technologies used are:
- Vue.js
- Nuxt.js
- Firebase

## Design
The main issue we wanted to solve was a visual representation of yourself when you were working, and grouped users by who was working, and who was offline. Using Nuxt and Firebase we were able to leverage client side state management with the cloud database to ensure that updates were happening in real time.

![Diagram of Firebase and Preapp Virtual Office](/assets/preapp/preappvo.png)

## Example Code for User Fetching
The main office breakdown template is below, with the main user on the sidebar, and other users broken down by type in the main wrap section, and then looped through by the Vuex Store getter.

```vue{12,14,20,25}
<template>
  <div class="page-wrap">
    <!-- User Block -->
    <div class="sidebar-wrap">
      <UserBlock ref="userBlockComponent" />
    </div>

    <!-- Office Block by Type -->
    <div class="main-wrap">
      <div class="main-content-wrap">
        <!-- In Office Users -->
        <div v-if="$store.getters['members/filteredInOffice'].length > 0" class='content-section'>
            <!-- Loop Through Users and Display -->
            <div class='user' v-for="member in $store.getters['members/filteredInOffice']" :style="checkSearchFilter(member) ? '':'display: none;'">
                <!-- Member Details -->
            </div>
        </div>

        <!-- Remote Users -->
        <div v-if="$store.getters['members/filteredOutOfOffice'].length > 0" class="content-section">
          ...
        </div>

        <!-- Offline Users -->
        <div v-if="$store.getters['members/filteredOffline'].length > 0" class='content-section'>
          ...
        </div>
      </div>
  </div>
</template>
```

Thanks to Vuex, we're able to add reactivity to each of the getters, filtering the collection of users in realtime and displaying the appropriate users.

```js{2,17,32,40}
export const getters = {
  filteredInOffice(state, getters, rootState) {
    const filtered = state.availableUsers.filter((user) => {
      if (user.loggedIn === true) {
        if (user.inOffice === undefined || user.inOffice === true) {
          return user;
        }
      }
    });
    return filtered.filter((user) => {
      if (user.uid !== rootState.user.uid) {
        return user;
      }
    });
  },

  filteredOutOfOffice(state, getters, rootState) {
    const filtered = state.availableUsers.filter((user) => {
      if (user.loggedIn === true) {
        if (user.inOffice !== undefined && user.inOffice === false) {
          return user;
        }
      }
    });
    return filtered.filter((user) => {
      if (user.uid !== rootState.user.uid) {
        return user;
      }
    });
  },
  
  filteredOffline(state, getters, rootState) {
    return state.availableUsers.filter((user) => {
      if (user.loggedIn === false) {
        return user;
      }
    });
  },

  filteredSelf(state, getters, rootState) {
    const filtered = state.availableUsers.filter((user) => {
      if (user.loggedIn !== false && user.uid === rootState.user.uid) {
        return user;
      }
    });

    if (filtered.length > 0) {
      return filtered[0]
    } else {
      return {
        // Empty User Object
      }
    }
  }
};
```
Here's some code for using a Snapshot on the Users collection in Firestore to real time update the list of users as they come online or go offline, which then gets parsed and commited to the store variables with commits, and then displayed thanks to the reactivity of the getters.

```js{2,5,18,20}
export const actions = {
  getUsers({ state, commit }, { vm }) {
    const unsubscribe = this.$fireStore.collection('users')
      // Listener that updates checks in realtime
      .onSnapshot((querySnapshot) => {
        let users = [];
        querySnapshot.forEach(function(doc) {
            users.push({
              uid: doc.id,
              // Add all the necessary data
              ...
            });
          },
          (error) => {
            // Log Errors
          }
        );
        commit('setAvailableUsers',users)
      });
    commit('SET_LISTENER_UNSUBSCRIBE', unsubscribe);
  }
};
```

## Outcomes
We then went on to implement Office Wide notifications, end-to-end encrypted chats between users, Calendar integration, Office Layouts, and more.

When doing research for how I was going to talk about my experiences working on this project, I came across this new SaaS product being offered by the company. Preapp Virtual Office became this service called "Flexii".

You can see it [here](https://flexii.jp/).

<ContactCard />