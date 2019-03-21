import { createSelector } from 'reselect';
import { map } from 'lodash';
import {
  moment
} from 'moment';

export const getAllEvents = state => state.events.allEvents;
export const getAllOldEvents = state => state.events.allOldEvents;
export const getLoading = state => state.events.loading;

export const getAllEventsAsList = createSelector([getAllEvents], (allEvents) => {
    return map(allEvents);
})

export const getAllOldEventsAsList = createSelector([getAllOldEvents], (allEvents) => {

  return map(allEvents, eventData => {

            const convertedTownHall = {};

            convertedTownHall.Member = eventData.displayName || eventData.Member;
            convertedTownHall.Event_Name = eventData.eventName ? eventData.eventName : ' ';
            convertedTownHall.Location = eventData.Location ? eventData.Location : ' ';
            convertedTownHall.Meeting_Type = eventData.meetingType;
            let district = eventData.district ? '-' + eventData.district : ' ';
            convertedTownHall.District = eventData.state + district;
            convertedTownHall.govtrack_id = eventData.govtrack_id || ' ';
            convertedTownHall.Party = eventData.party;
            convertedTownHall.State = eventData.state;
            convertedTownHall.Chamber = eventData.chamber;
            convertedTownHall.State_name = eventData.stateName ? eventData.stateName : eventData.State;
            if (eventData.repeatingEvent) {
              convertedTownHall.Repeating_Event = eventData.repeatingEvent;
              convertedTownHall.Date = ' ';
            } else if (eventData.dateString) {
              convertedTownHall.Repeating_Event = ' ';
              convertedTownHall.Date = eventData.dateString;
            } else {
              convertedTownHall.Repeating_Event = ' ';
              convertedTownHall.Date = moment(eventData.dateObj).format('ddd, MMM D YYYY');
            }
            convertedTownHall.Time_Start = eventData.Time;
            convertedTownHall.Time_End = eventData.timeEnd || ' ';
            convertedTownHall.Time_Zone = eventData.timeZone || ' ';
            convertedTownHall.Zone_ID = eventData.zoneString || ' ';
            convertedTownHall.Address = eventData.address;
            convertedTownHall.Notes = eventData.Notes ? eventData.Notes.replace(/"/g, '\'') : ' ';
            convertedTownHall.Map_Icon = eventData.iconFlag;
            convertedTownHall.Link = eventData.link || 'https://townhallproject.com/?eventId=' + eventData.eventId;
            convertedTownHall.Link_Name = eventData.linkName || ' ';
            convertedTownHall.dateNumber = eventData.yearMonthDay;
            return convertedTownHall;

  });
})