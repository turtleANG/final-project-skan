import { ACTIONS } from "./actions"

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN:
      return { ...state, isAuth: true, activeTariff: 'beginner' }
    case ACTIONS.LOGOUT:
      return { ...state, isAuth: false, activeTariff: '' }
    case ACTIONS.ADD_USER_INFO:
      return {
        ...state, user: {
          ...state.user, info: {
            ...state.info,
            accessToken: action.accessToken,
            expire: action.expire
          }
        }
      }
    case ACTIONS.ADD_USER_FILTERS_INFO:
      return {
        ...state, user: {
          ...state.user, eventFiltersInfo: {
            ...state.eventFiltersInfo,
            usedCompanyCount: action.usedCompanyCount,
            companyLimit: action.companyLimit
          }
        }
      }
    case ACTIONS.ADD_HISTOGRAMS:
      return {
        ...state, searchingResults: {
          ...state.searchingResults, histograms: action.items
        }
      }
    case ACTIONS.ADD_PUBLICATIONS_IDS:
      return {
        ...state, searchingResults: {
          ...state.searchingResults, publicationsIds: action.ids
        }
      }
    case ACTIONS.ADD_PUBLICATIONS:
      return {
        ...state, searchingResults: {
          ...state.searchingResults, publications: action.items
        }
      }
    case ACTIONS.ADD_NEW_PUBLICATIONS:
      return {
        ...state, searchingResults: {
          ...state.searchingResults, publications: [
            ...state.searchingResults.publications, ...action.items]
        }
      }
    default:
      return state
  }
}

export default reducer