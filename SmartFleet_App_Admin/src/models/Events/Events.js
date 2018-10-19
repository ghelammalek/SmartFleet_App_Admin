export default {
    namespace: 'event',
    state: {
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {},
}