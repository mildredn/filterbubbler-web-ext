import {createStore, applyMiddleware} from 'redux'
import {createBackgroundStore} from 'redux-webext'
import reducers from './reducers'
import {actions as formActions} from 'redux-form'
import {actionTypes as formActionTypes} from 'redux-form'
import thunk from 'redux-thunk'
import {
    ADD_CORPUS_CLASSIFICATION,
    MAIN_TAB,
    ADD_CLASSIFICATION,
    CHANGE_CLASSIFICATION,
    UI_REQUEST_ACTIVE_URL,
    UI_SHOW_ADD_RECIPE,
    UI_ADD_SERVER,
    ANALYZE_CONTENT,
    UI_LOAD_RECIPE,
    LOAD_RECIPE
} from './constants'
import {
    addCorpusClassification,
    changeMainTab,
    addServer,
    addClassification,
    requestActiveUrl,
    readRecipes,
    uiShowAddRecipe,
    restoreStateFromLocalStorage,
    loadRecipe,
} from './actions'

const actions = {}

// Pass through Redux-Form action types
actions[formActionTypes.INITIALIZE] = (data) => { return { type: formActionTypes.INITIALIZE, ...data }; }
actions[formActionTypes.REGISTER_FIELD] = (data) => { return { type: formActionTypes.REGISTER_FIELD, ...data }; }
actions[formActionTypes.SUBMIT] = (data) => { return { type: formActionTypes.SUBMIT, ...data }; }
actions[formActionTypes.SET_SUBMIT_SUCCEEDED] = (data) => { return { type: formActionTypes.SET_SUBMIT_SUCCEEDED, ...data }; }
actions[formActionTypes.TOUCH] = (data) => { return { type: formActionTypes.TOUCH, ...data }; }
actions[formActionTypes.CHANGE] = (data) => { return { type: formActionTypes.CHANGE, ...data }; }
actions[formActionTypes.BLUR] = (data) => { return { type: formActionTypes.BLUR, ...data }; }
actions[formActionTypes.FOCUS] = (data) => { return { type: formActionTypes.FOCUS, ...data }; }
actions[formActionTypes.UPDATE_SYNC_ERRORS] = (data) => { return { type: formActionTypes.UPDATE_SYNC_ERRORS, ...data }; }
actions[CHANGE_CLASSIFICATION] = (data) => { return { type: CHANGE_CLASSIFICATION, ...data }; }
actions[UI_REQUEST_ACTIVE_URL] = (data) => { return requestActiveUrl(); }
actions[ADD_CLASSIFICATION] = (data) => { return addClassification(data.classification); }
actions[MAIN_TAB] = (data) => { return changeMainTab(data.index); }
actions[ADD_CORPUS_CLASSIFICATION] = (data) => { return addCorpusClassification(data.classification, data.url) }
actions[UI_SHOW_ADD_RECIPE] = (data) => { return uiShowAddRecipe(data.visible) }
actions[UI_ADD_SERVER] = (data) => { return addServer(data.server) }
actions[UI_LOAD_RECIPE] = loadRecipe

const store = createStore(
    reducers,
    applyMiddleware(thunk))

const backgroundStore = createBackgroundStore({
    store,
    actions: actions
})

// Fetch recipes from the current server
store.dispatch(restoreStateFromLocalStorage());

export default backgroundStore
