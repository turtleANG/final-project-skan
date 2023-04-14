export const ACTIONS = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	ADD_USER_INFO: 'ADD_USER_INFO',
	ADD_USER_FILTERS_INFO: 'ADD_USER_FILTERS_INFO',
	ADD_HISTOGRAMS: 'ADD_HISTOGRAMS',
	ADD_PUBLICATIONS_IDS: 'ADD_PUBLICATIONS_IDS',
	ADD_PUBLICATIONS: 'ADD_PUBLICATIONS',
	ADD_NEW_PUBLICATIONS: 'ADD_NEW_PUBLICATIONS',
}

export const login = () => {
	return {
		type: ACTIONS.LOGIN,
	}
}

export const logout = () => {
	return {
		type: ACTIONS.LOGOUT,
	}
}

export const addUserInfo = (accessToken, expire) => {
	return {
		type: ACTIONS.ADD_USER_INFO,
		accessToken,
		expire,
	}
}

export const addUserFiltersInfo = (usedCompanyCount, companyLimit) => {
	return {
		type: ACTIONS.ADD_USER_FILTERS_INFO,
		usedCompanyCount,
		companyLimit,
	}
}

export const addHistograms = (items) => {
	return {
		type: ACTIONS.ADD_HISTOGRAMS,
		items
	}
}

export const addPublicationsIds = (ids) => {
	return {
		type: ACTIONS.ADD_PUBLICATIONS_IDS,
		ids
	}
}

export const addPublications = (items) => {
	return {
		type: ACTIONS.ADD_PUBLICATIONS,
		items
	}
}

export const addNewPublications = (items) => {
	return {
		type: ACTIONS.ADD_NEW_PUBLICATIONS,
		items
	}
}