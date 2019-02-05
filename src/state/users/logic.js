import { createLogic } from "redux-logic"
import { map } from "lodash";

import { 
  GET_USERS, 
  GET_USERS_SUCCESS, 
  GET_USERS_FAILED, 
  REQUEST_USER_BY_ID, 
  RECEIVE_USER, 
  REQUEST_USER_BY_ID_FAILED, 
  REQUEST_RESEARCHER,
} from "./constants";
import { updateUserMocs, getUsersSuccess } from "./actions";

const fetchUsers = createLogic({
  type: REQUEST_RESEARCHER,
  process({
      firebasedb
    }, dispatch, done) {
    return firebasedb.ref(`users`)
      .once('value')
      .then(usersSnap => {
        const researchers = []
        usersSnap.forEach((user) => {
          const userData = user.val();
  
          if (user.val().mocs && !user.val().isAdmin) {
            userData.id = user.key;
            researchers.push(userData);
            researchers.push(userData);
            
            // get moc names
            const { mocs } = user.val();
            map(mocs, (moc) => {
              return firebasedb.ref(`mocData/${moc.govtrack_id}`).once('value')
                .then((mocSnap) => {
                  if (mocSnap.exists()) {
                    const mocData = mocSnap.val();
                    const mocToUpdate = {
                      name: mocData.displayName,
                      govtrack_id: moc.govtrack_id,
                      userId: user.key,
                    }
                    dispatch(updateUserMocs(mocToUpdate))
                  }
                })
            })
          }
        })
        return dispatch(getUsersSuccess(researchers))
      });
  }
});

const fetchUser = createLogic({
  type: REQUEST_USER_BY_ID,
  processOptions: {
    successType: RECEIVE_USER,
    failType: REQUEST_USER_BY_ID_FAILED,
  },
  process(deps) {
    return deps.firebasedb.ref(`users/${deps.action.payload}`)
      .once('value')
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val()
        }
      })
  }
});

export default [fetchUsers, fetchUser];