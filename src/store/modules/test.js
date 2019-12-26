const test = {
    state: {
        info: 1
    },
    mutations: {
        REFRESH_INFO: state => {
            state.info = state.info + 1
        }
    },
    actions: {
        changeInfo: context => {
            context.commit('REFRESH_INFO')
        }
    }
}
export default test
