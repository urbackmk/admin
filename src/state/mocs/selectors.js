import { createSelector } from 'reselect';
import { map } from 'lodash';

export const getAllMocsIds = state => state.mocs.allMocIds;
export const get116thCongressIds = state => state.mocs[116];
export const get115thCongressIds = state => state.mocs[115];


export const getAllMocNames = createSelector([getAllMocsIds], (mocIdObjs) => {
    return map(mocIdObjs, 'nameEntered');
})

