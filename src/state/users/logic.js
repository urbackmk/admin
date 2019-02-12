import { createLogic } from "redux-logic"
import {
  concat,
  mapValues,
  reduce,
} from "lodash";

import { 
  REQUEST_USER_BY_ID, 
  RECEIVE_USER, 
  REQUEST_RESEARCHER,
  REMOVE_ASSIGNMENT,
  REMOVE_ASSIGNMENT_SUCCESS,
  ASSIGN_MOC_TO_USER,
  ASSIGN_MOC_TO_USER_SUCCESS,
  ADD_AND_ASSIGN_TO_USER,
  ADD_AND_ASSIGN_TO_USER_SUCCESS,
  USER_REQUEST_FAILED,
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
        let totalUsers = usersSnap.numChildren();
        const researchers = [];
        let checked = 0;
        usersSnap.forEach((user) => {
          const userData = user.val();
          if (user.val().mocs && !user.val().isAdmin) {
            userData.id = user.key;
            const mocs = mapValues(user.val().mocs, (moc) => {
              return {
                ...moc,
                id: moc.govtrack_id || moc.thp_id,
                id_key: moc.govtrack_id ? 'govtrack_id' : moc.thp_id ? 'thp_id' : null,
              }
            });
            userData.mocs = mocs;
            researchers.push(userData);
            const promises = reduce(mocs, (acc, moc) => {
              if (moc.id_key === 'govtrack_id') {
                acc.push(firebasedb.ref(`mocData/${moc.govtrack_id}`).once('value'))
              } else if (moc.id_key === 'thp_id') {
                // AZ-SD-06-00
                const state = moc.thp_id.match(/^\w{2}/g) ? moc.thp_id.match(/^\w{2}/g)[0] : null;
                if (state) {
                  acc.push(firebasedb.ref(`state_legislators_data/${state}/${moc.thp_id}`).once('value'))
                }
              }
              return acc;
            }, [])
            Promise.all(promises)
            .then((snapshotList) => {
              return concat(snapshotList)
            }).then((snapshot) => {
              const toUpdateList = []
              snapshot.forEach(mocSnap => {
                if (mocSnap && mocSnap.exists()) {
                  const mocData = mocSnap.val();
                  if (!mocData.in_office) {
                    if (user.val().mocs[mocSnap.key].isAssigned) {
                      console.log(`users/${user.key}/mocs/${mocSnap.key}`)
                      const ref = firebasedb.ref(`users/${user.key}/mocs/${mocSnap.key}`)
                      return ref.update({
                        isAssigned: false
                      })
                    }
                    console.log('not in office')
                    return;
                  }
                  const mocToUpdate = {
                    name: mocData.displayName,
                    district: mocData.district,
                    state: mocData.state,
                    userId: user.key,
                    id: mocSnap.key,
                    id_key: mocData.govtrack_id ? 'govtrack_id' : mocData.thp_id ? 'thp_id' : null,
                  }
                  toUpdateList.push(mocToUpdate)
                }
              })
              return toUpdateList;
            }).then(list => {
                dispatch(updateUserMocs(list))
                return checked = checked + 1;
            }).then((numChecked) => {
              if (numChecked === totalUsers){
                console.log('done');
                done()
              }
            })
          } else {
            totalUsers = totalUsers - 1;
          }
        })
        return dispatch(getUsersSuccess(researchers))
      });
  }
});

const fetchUser = createLogic({
  process(deps) {
    return deps.firebasedb.ref(`users/${deps.action.payload}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val()
      }
    })
  },
  processOptions: {
    failType: USER_REQUEST_FAILED,
    successType: RECEIVE_USER,
  },
  type: REQUEST_USER_BY_ID,
});

const removeAssignmentLogic = createLogic({
  process(deps) {
    const {
      action,
      firebasedb,
    } = deps;
    console.log(`users/${action.payload.userId}/mocs/${action.payload.mocId}`)
    const ref = firebasedb.ref(`users/${action.payload.userId}/mocs/${action.payload.mocId}`)
    return ref.update({isAssigned : false})
    .then(() => {
      return {
        mocId: action.payload.mocId,
        userId: action.payload.userId,
      }
    })
    
  },
  processOptions: {
    failType: USER_REQUEST_FAILED,
    successType: REMOVE_ASSIGNMENT_SUCCESS,
  },
  type: REMOVE_ASSIGNMENT,
});

const addAssignmentLogic = createLogic({
  process(deps) {
    const {
      action,
      firebasedb,
    } = deps;
    
    console.log(`users/${action.payload.userId}/mocs/${action.payload.mocId}`)
    const ref = firebasedb.ref(`users/${action.payload.userId}/mocs/${action.payload.mocId}`)
    return ref.update({
      isAssigned: true
    })
    .then(() => {
      return {
        mocId: action.payload.mocId,
        userId: action.payload.userId,
      }
    })
    
  },
  processOptions: {
    failType: USER_REQUEST_FAILED,
    successType: ASSIGN_MOC_TO_USER_SUCCESS,
  },
  type: ASSIGN_MOC_TO_USER,
});

const addAndAssignmentLogic = createLogic({
  type: ADD_AND_ASSIGN_TO_USER,
  processOptions: {
    successType: ADD_AND_ASSIGN_TO_USER_SUCCESS,
    failType: USER_REQUEST_FAILED,
  },
  process(deps) {
    const {
      action,
      firebasedb,
    } = deps;

    const ref = firebasedb.ref(`users/${action.payload.userId}/mocs/${action.payload.mocId}`)
    console.log(action.payload.mocId, action.payload.name)
    return ref.update({
        govtrack_id: action.payload.mocId,
        isAssigned: true,
      })
      .then(() => {
        return firebasedb.ref(`mocData/${action.payload.mocId}`).once('value')
      })
      .then((snapshot) => {
        const mocInfo = snapshot.val();
        const mocData = {
          district: mocInfo.district,
          id: action.payload.mocId,
          id_key: 'govtrack_id',
          mocName: action.payload.name,
          name: mocInfo.displayName,
          state: mocInfo.state,
          userId: action.payload.userId,
        }
        return mocData
      })

  }
});

export default [
  fetchUsers, 
  fetchUser,
  removeAssignmentLogic,
  addAssignmentLogic,
  addAndAssignmentLogic
];