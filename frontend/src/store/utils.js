
// factories
export function doRequestFactory(REQUEST, COMMITS) {
  return async function ({ commit }, { action, args, load = 'TOGGLE_LOADING' }) {
    if (load) commit(load, true)
    try {
      const data = await REQUEST[action](...args)
      commit(COMMITS[action], data)
    } catch (e) {
      commit('API_ERROR', e)
    } finally {
      if (load) commit(load, false)
    }
  }
}

// return a new list ordered by 'hotness' - i.e. likes/log(time since posted)
// objects in list must have a timestamp (Date) and likes (Number) field
export function sortByHotness(list) {
  // clone list
  const ordered = list.map(a => a)
  // this number, added to all likes, fixes negative likes which reverses the ordering
  const absMinLikes = Math.abs(Math.min(...ordered.map(({ likes }) => likes)))
  // add 1 more to make the sort still sort by time when likes == 0
  const likesInc = absMinLikes + 1
  // we need the current time to get 'time since' rather than just time...
  const d = Date.now()
  ordered.sort(
    ({ likes: l1, timestamp: t1 }, { likes: l2, timestamp: t2 }) =>
      (l2 + likesInc) / Math.log(d - t2 + 1000) - (l1 + likesInc) / Math.log(d - t1 + 1000)
  )
  // debugging
  // const ordered2 = ordered.map(({ likes, timestamp, ...rest }) => ({ hotness: (likes+likesInc)/Math.log(d - timestamp.getTime()), likes, timestamp, ...rest }))
  // ordered2.sort(({ hotness:h1 }, { hotness:h2 }) => h1 < h2)
  return ordered
}
