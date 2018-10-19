export default {
    namespace: 'setting',
    state: {
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {},
}