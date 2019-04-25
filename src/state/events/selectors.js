import { createSelector } from 'reselect';
import { map } from 'lodash';

export const getAllEvents = state => state.events.allEvents;
export const getAllOldEvents = state => state.events.allOldEvents;
export const getLoading = state => state.events.loading;

export const getAllEventsAsList = createSelector([getAllEvents], (allEvents) => {
    return map(allEvents);
})

// export const getAllOldEventsAsList = createSelector([getAllOldEvents], (allEvents) => {

//   return map(allEvents, eventData => {
//     let district = eventData.district ? '-' + eventData.district : ' ';
//     const convertedTownHall = {
//       Entered_By: eventData.enteredBy,
//       Member: eventData.displayName || eventData.Member,
//       Event_Name: eventData.eventName ? eventData.eventName : ' ',
//       Location: eventData.Location ? eventData.Location : ' ',
//       Meeting_Type: eventData.meetingType,
//       District: eventData.state + district,
//       govtrack_id: eventData.govtrack_id || ' ',
//       Party: eventData.party,
//       State: eventData.state,
//       Chamber: eventData.chamber,
//       State_name: eventData.stateName ? eventData.stateName : eventData.State,
//       Time_Start: eventData.Time,
//       Time_End: eventData.timeEnd || ' ',
//       Time_Zone: eventData.timeZone || ' ',
//       Zone_ID: eventData.zoneString || ' ',
//       Address: eventData.address,
//       Notes: eventData.Notes ? eventData.Notes.replace(/"/g, '\'') : ' ',
//       Map_Icon: eventData.iconFlag,
//       Link: eventData.link || 'https://townhallproject.com/?eventId=' + eventData.eventId,
//       Link_Name: eventData.linkName || ' ',
//       dateNumber: eventData.yearMonthDay,
//     }
//     if (eventData.repeatingEvent) {
//       convertedTownHall.Repeating_Event = eventData.repeatingEvent;
//       convertedTownHall.Date = ' ';
//     } else if (eventData.dateString) {
//       convertedTownHall.Repeating_Event = ' ';
//       convertedTownHall.Date = eventData.dateString;
//     } else {
//       convertedTownHall.Repeating_Event = ' ';
//       convertedTownHall.Date = moment(eventData.dateObj).format('ddd, MMM D YYYY');
//     }
      
//     return convertedTownHall;

//   });
// })