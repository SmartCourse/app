
// factories
export function doRequestFactory(REQUEST, COMMITS) {
  return async function ({commit}, {action, args}) {
    commit('TOGGLE_LOADING', true)
    try {
      const data = await REQUEST[action](...args)
      commit(COMMITS[action], data)
    } catch (e) {
      commit('API_ERROR', e)
    } finally {
      commit('TOGGLE_LOADING', false)
    }
  }
}
