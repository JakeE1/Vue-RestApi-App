export default {
    state: {
        message: 'hello from store'
    },
    mutations: {
        setMessage(state, payload){
            state.message = payload
        }
    },
    actions: {
        setMessage({commit}, payload) {
            commit('setMessage', payload)
        }
    },
    getters: {
        getMessage (state) {
            return state.message
        }
    },
}