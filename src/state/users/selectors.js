import { createSelector } from 'reselect';
import {
  map,
  find,
} from 'lodash';

export const getAllResearchers = state => state.users.allResearchers;
export const getUser = state => state.users.user;
export const getAllResearchedMocData = state => state.users.allResearchedMocs;

export const combineMocNamesWithResearchers = createSelector([getAllResearchers, getAllResearchedMocData], (allResearchers, allResearchedMocs) => {
  
  return map(allResearchers, (researcher) => {
      const mocs = map(researcher.mocs, (moc) => {
        const mocData = find(allResearchedMocs, (mocData) => (mocData.id === moc.govtrack_id || mocData.id === moc.thp_id))
        if (!mocData) {
            return moc;
        }
        return {
          ...moc,
          ...mocData,
        };
      })
    return {
        ...researcher,
        mocs,
    }
  })
})