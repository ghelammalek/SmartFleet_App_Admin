export default {
    namespace: 'spalsh',
    state: {
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {},
}