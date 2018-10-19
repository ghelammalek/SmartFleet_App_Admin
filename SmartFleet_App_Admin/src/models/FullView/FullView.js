export default {
    namespace: 'fullView',
    state: {
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {},
}