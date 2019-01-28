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
 * Given a parent component type ['review', 'question']
 * Map callback handlers and labels for menu to set types.
 */
export function menuInteractionsMapper({
  type,
  thisArg
}) {
  if (!thisArg.meta) return

  const ACTION_MAP = ACTIONS_MAP[type]

  return [...Object.entries(thisArg.meta)
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
