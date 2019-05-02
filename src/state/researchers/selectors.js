import { createSelector } from 'reselect';
import {
  map,
  find,
} from 'lodash';

export const getAllResearchers = state => state.researchers.allResearchers;
export const getAllResearchedMocData = state => state.researchers.allResearchedMocs;

export const combineMocNamesWithResearchers = createSelector([getAllResearchers, getAllResearchedMocData],
  (allResearchers, allResearchedMocs) => map(allResearchers, (researcher) => {
    const mocs = map(researcher.mocs, (moc) => {
      const mocData = find(allResearchedMocs, mocData => (mocData.id === moc.id));
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
);
