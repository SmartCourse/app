
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

export function resetStateFactory(initialState) {
  const propStrings = {}
  for (let prop in initialState) {
    propStrings[prop] = JSON.stringify(initialState[prop])
  }
  return function({commit, state}) {
    commit('RESET_STATE', propStrings)
  }
}

// mutations

export function RESET_STATE (state, propStrings) {
  for (let prop in propStrings) {
    state[prop] = JSON.parse(propStrings[prop])
  }
}

