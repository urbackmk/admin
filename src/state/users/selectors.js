import { createSelector } from 'reselect';
import {
  map,
  reduce,
  find,
} from 'lodash';
import moment from 'moment';

export const getAllResearchers = state => state.users.allResearchers;
export const getUser = state => state.users.user;
export const getAllResearchedMocData = state => state.users.allResearchedMocs;

export const combineMocNamesWithResearchers = createSelector([getAllResearchers, getAllResearchedMocData], (allResearchers, allResearchedMocs) => {
  return map(allResearchers, (researcher) => {
      const mocs = map(researcher.mocs, (moc) => {
        const mocData = find(allResearchedMocs, {
          govtrack_id: moc.govtrack_id
        })
        if (!mocData) {
            return moc;
        }
        moc.name = mocData.name
        return moc;
      })
    return {
        ...researcher,
        mocs,
    }
  })
})