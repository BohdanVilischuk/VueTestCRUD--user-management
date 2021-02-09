
export const state = () => ({
  counter: 0,
  list: [{ ava: 1 }],
  users: [
    { id: 1, avatar: 'https://gravatar.com/avatar/8c30649fc1292542673b0878017a30ab?s=400&d=retro&r=x', firstName: 'Billy', lastName: 'Herrington', title: 'Dungeon Master', year: '2020-02-03', phone: '3213321312', email: 'some@mail.com', bio: 'Lorem ipsum dolor, sit the most powerful leatherman amet consectetur adipisicing elit. Excepturi delectus adipisci possimus neque quis provident recusandae esse unde facere suscipit.' },
    { id: 2, avatar: 'https://gravatar.com/avatar/32f7281160d8564d70e1b9fee1fd6ebb?s=400&d=retro&r=x', firstName: 'Van', lastName: 'Darkholme', title: 'Dungeon Dev', year: '2018-09-01', phone: '32131231231', email: 'some@mail.com', bio: 'Lorem ipsum dolor, sit amet boss of this gym consectetur adipisicing elit. Excepturi delectus adipisci possimus neque quis provident recusandae esse unde facere suscipit.' },
    { id: 3, avatar: 'https://gravatar.com/avatar/5ce11485b1ac7bf1a2e9beb03bef3c06?s=400&d=retro&r=x', firstName: 'Danny', lastName: 'Lee', title: 'Boss', year: '2017-04-02', phone: '11123211', email: 'some@mail.com', bio: 'Lorem ipsum dolor, sit amet consectetur  elit. Excepturi   possimus neque quis provident recusandae esse unde facere suscipit.' },
  ],
  text: ['text']
});

export const getters = {
  users: (state) => {
    return state.users
  },
}

export const mutations = {
  SET_USERS: (state, payload) => {
    state.users = payload
  },
  ADD_USER: (state, payload) => {
    state.users.push(payload);
  },
  REMOVE_USER: (state, payload ) => {
    state.users = payload
  },
  // UPDATE_USER (state, payload) {
  //   let user = state.users.find(user => user.id === user.id);
  // },
  UPDATE_USER(state, payload) {
    state.users.forEach((item, index) => {
      if (item.id === Number(payload.id)) {
        state.users.splice(index, 1, payload)
      }
    })
  },
  //   REDIT_CHANGED(state, payload) {
  //     let user = state.users.find(user => user.id === payload.userid);
  //     user.credits = payload.newcredits;
  //  }
}

export const actions = {
  addUser: (context, payload) => {
    context.commit('ADD_USER', payload)
  },
  removeUser: (context, payload) => {
    context.commit('REMOVE_USER', payload)
  },
  updateUser: (context, payload) => {
    context.commit('UPDATE_USER', payload)
  }
}































































// export const mutations = {
//   increment() {
//     state.counter++
//   },
//   setUser(state, payload) {
//     state.users = payload
//   },
//   ADD_USER(state, payload) {
//     state.users.push(payload)
//   },
//   EDIT_USER(state, payload) {
//     state.users = state.users.map((i) => {
//       if (i.id == payload.id) {
//         return payload;
//       }
//       return i;
//     });
//   },
//   REMOVE_USER(state, index) {
//     if (index > -1) {
//       state.users.splice(index, 1);
//     }
//   },

//   newUser: (state, payload) => {
//     let newuser = {
//       avatar: payload.avatar,
//       firstName: payload.firstName,
//       lastName: payload.lastName,
//       title: payload.title,
//       year: payload.year,
//       email: payload.email,
//       phone: payload.phone,
//       bio: payload.bio,
//     }
//     state.users.unshift(newuser)
//   },
//   delUser: (state, payload) => {
//     let index = state.users.findIndex(user => user.id === payload);
//     state.users.splice(index, 1);
//   },
//   ////// 
//   ADD_LINK: (state, text) => {
//     state.text.push(text)
//   },
//   ////// Examples

//   /// Set
//   setList(state, data) {
//     state.list = data
//   },
//   /// Create
//   create(state, data) {
//     state.list.push(data)
//   },
//   /// Update
//   update(state, data) {
//     state.list.forEach((item, index) => {
//       if (item.id === Number(data.id)) {
//         state.list.splice(index, 1, data)
//       }
//     })
//   },
//   /// Delete
//   delete(state, id) {
//     state.list.forEach((item, index) => {
//       if (item.id === Number(id)) {
//         state.list.splice(index, 1)
//       }
//     })
//   },
//   //////
// }
// export const actions = {
//   deleteUser: (context,payload) => {
//     context.commit("delUser", payload)
//   },
//   removeUser({ state, commit }, id) {
//     try {
//       let index = state.users
//         .map((i) => {
//           if (id == i.id) return true;
//           return false;
//         })
//         .indexOf(true);

//       if (index != -1) {
//         commit("REMOVE_USER", index);
//         return true;
//       } else {
//         return false;
//       }
//     } catch (error) {
//       return false;
//     }
//   },
//   addUser({ commit }, payload) {
//     commit("newUser", payload);
//   },
//   editUser({ commit }, payload) {
//     commit("EDIT_USER", payload);
//   },
//   // editUser({ commit }, payload) {
//   //   commit("EDIT_USER", {
//   //     id: payload.id,
//   //     avatar: payload.avatar,
//   //     firstName: payload.firstName,
//   //     lastName: payload.lastName,
//   //     title: payload.title,
//   //     phone: payload.phone,
//   //     email: payload.email,
//   //     year: payload.year,
//   //     bio: payload.bio
//   //   });
//   // },
// }