const reportAction = {
  action: 'report',
  label: 'Report'
}

const ACTIONS_MAP = {
  question: {
    canDelete: {
      action: 'deleteQuestion',
      label: 'Delete'
    },
    canEdit: {
      action: 'editQuestion',
      label: 'Edit'
    }
  },
  review: {
    canDelete: {
      action: 'deleteReview',
      label: 'Delete'
    },
    canEdit: {
      action: 'editReview',
      label: 'Edit'
    }
  },
  comment: {
    canDelete: {
      action: 'deleteComment',
      label: 'Delete'
    },
    canEdit: {
      action: 'editComment',
      label: 'Edit'
    }
  }
}

/**
 * Given a parent component type ['review', 'question', 'comment]
 * Map callback handlers and labels for menu to set types.
 * @param {object} options
 * @param {string} options.type     The type of the card being interacted with
 * @param {object} options.thisArg  The vue component
 * @param {object} options.meta     The meta object provided in the response
 */
export function menuInteractionsMapper({
  type,
  thisArg,
  meta
}) {
  if (!meta) return []

  const ACTION_MAP = ACTIONS_MAP[type]

  return [...Object.entries(meta)
    .map(([key, value]) => {
      if (value && ACTION_MAP[key]) {
        const { label, action } = ACTION_MAP[key]
        return {
          label,
          action: thisArg[action]
        }
      }
    }).filter(Boolean),
  {
    label: reportAction.label,
    action: thisArg[reportAction.action]
  }
  ]
}

const colors = [
  'black',
  'green',
  'purple',
  'red',
  'orange',
  'blue',
  'dark-blue'
]

/**
 * @param   {number} id
 * @returns {string} color
 */
export function colorFromId(id = 0) {
  return colors[id % colors.length]
}

// Below functions are used to manage the pre-boot loading
export const endLoad = () => {
  if (window && window.__loader) window.__loader.endLoad()
}

export const startLoad = (parent) => {
  if (window && window.__loader) window.__loader.startLoad(parent)
}
