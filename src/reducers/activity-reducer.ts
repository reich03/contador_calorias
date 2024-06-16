import { Activities } from './../types/index';


export type ActivityActions =
    { type: 'save-activity', payload: { newActivity: Activities } } |
    { type: 'set-activedId', payload: { id: Activities['id'] } } |
    { type: 'delete-activity', payload: { id: Activities['id'] } } |
    { type: 'restart-app' }




export type ActivityState = {

    activities: Activities[],
    activeId: Activities['id']
}


const isEmptyActivities = (): Activities[] => {
    const activites = localStorage.getItem('items');
    return activites ? JSON.parse(activites) : []
}
export const initialState: ActivityState = {
    activities: isEmptyActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if (action.type === 'save-activity') {
        let updateActivities: Activities[] = []
        if (state.activeId) {
            updateActivities = state.activities.map((act) => act.id === state.activeId ? action.payload.newActivity : act)
        } else {
            updateActivities = [...state.activities, action.payload.newActivity]
        }
        return {
            ...state,
            activities: updateActivities,
            activeId: ''

        }
    }

    if (action.type === 'set-activedId') {
        return {
            ...state,
            activeId: action.payload.id,
        }
    }

    if (action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter((activity) => activity.id !== action.payload.id)
        }
    }


    if (action.type === 'restart-app') {
        return {
            ...state,
            activities: [],
            activeId: ''
        }
    }
    return state
}
