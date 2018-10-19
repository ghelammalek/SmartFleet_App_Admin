export default {
    namespace: 'home',
    state: {
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {},
}