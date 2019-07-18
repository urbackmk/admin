import { 
  REQUEST_TOTAL_USERS, REQUEST_CACHE,
} from "./constants";

export const requestTotalCount = () => ({
  type: REQUEST_TOTAL_USERS,
});

export const requestCache = () => ({
  type: REQUEST_CACHE,
})