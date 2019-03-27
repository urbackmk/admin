import { createSelector } from 'reselect';
import { map } from 'lodash';

export const getAllMocsIds = state => state.mocs.allMocIds;
export const getAllMocNames = createSelector([getAllMocsIds], (mocIdObjs) => {
    return map(mocIdObjs, 'nameEntered');
})
