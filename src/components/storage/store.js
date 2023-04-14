import { createStore } from 'redux'
import reducer from './reducer'

const initialState = {
  isAuth: false,
  activeTariff: '',
  user: {
    info: {
      accessToken: '',
      expire: ''
    },
    eventFiltersInfo: {
      usedCompanyCount: 0,
      companyLimit: 0
    }
  },
  searchingResults: {
    histograms: [],
    publicationsIds: [],
    publications: {}
  }
}

const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store;