const map = {
    state: {
        mapState: false
    },
    mutations: {
        REFRESH_INFO: state => {
            console.log('---', state)
            state.mapState = !state.mapState
        }
    },
    actions: {
        changeMapState: context => {
            context.commit('REFRESH_INFO')
        },
        changeMapStateF: context => {
            context.commit('REFRESH_INFO')
        }
    }
}
export default map
