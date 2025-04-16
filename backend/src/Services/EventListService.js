// const { getEvents } = require('../Models/EventListModel');

// const fetchEvents = async () => {
//   try {
//     const events = await getEvents();
//     return { events };
//   } catch (error) {
//     throw new Error('Unable to fetch events');
//   }
// };

// module.exports = { fetchEvents };


// const EventCategory = require('../Models/EventListModel');

// class EventCategoryService {
//   static async fetchEventsByCategory(categoryId) {
//     try {
//       if (categoryId) {
//         return await EventCategory.getEventsByCategory(categoryId);
//       }
//       return await EventCategory.getAllEvents();
//     } catch (error) {
//       throw new Error('Error fetching events by category');
//     }
//   }
// }

// module.exports = EventCategoryService;




const Event = require('../Models/EventListModel');

class EventService {
  static async fetchEvents(categoryId) {
    try {
      const events = await Event.getEvents(categoryId);
      return events; // Array
    } catch (error) {
      throw new Error(`Error fetching events: ${error.message}`);
    }
  }
}

module.exports = EventService;