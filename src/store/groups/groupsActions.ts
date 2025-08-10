import { ThunkAction } from 'redux-thunk';
import { RootState } from 'src/store'
import { GroupsActionTypes, GroupsAction } from './groupsTypes'
import { FETCH_PATHS } from 'src/constants/fetchPaths'
import { loadJSON } from 'src/lib/jsonUtilities'
// import { sleepAsync } from 'src/lib/commonUtilities'


// Типизированная ф-я запроса данных с сервера в рамках redux thunk, к-ую можно передать в dispatch
export const fetchGroupsThunk: ThunkAction<void, RootState, null, GroupsAction> = async (dispatch, getState) => {
  // ... логика thunk ...
  // const state = getState();
  // console.log("Current store state:", state);

  dispatch({ type: GroupsActionTypes.GET_GROUPS_PENDING });
  try {
    const data = await loadJSON(FETCH_PATHS.groups);
    
    // await sleepAsync(1000);  // имитация доп. задержки при загрузке

    dispatch({ type: GroupsActionTypes.GET_GROUPS_FULFILLED, payload: data });
  } catch(err) {
    dispatch({ type: GroupsActionTypes.GET_GROUPS_REJECTED, payload: (err as Error).message  });
  }
};

