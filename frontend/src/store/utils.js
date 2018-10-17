
// factories
export function doRequestFactory(REQUEST, COMMITS) {
  return async function ({ commit }, { action, args, load = 'TOGGLE_LOADING' }) {
    commit(load, true)
    try {
      const data = await REQUEST[action](...args)
      commit(COMMITS[action], data)
    } catch (e) {
      commit('API_ERROR', e)
    } finally {
      commit(load, false)
    }
  }
}
