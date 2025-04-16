// const { fetchEvents } = require('../Services/EventListService');

// const eventController = async (req, res) => {
//   try {
//     const result = await fetchEvents();
//     res.status(200).json({
//       message: 'Events fetched successfully',
//       events: result.events
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = eventController;


// const EventCategoryService = require('../Services/EventListService');

// class EventCategoryController {
//   static async getEventsByCategory(req, res) {
//     try {
//       const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : null;
//       const events = await EventCategoryService.fetchEventsByCategory(categoryId);
//       res.json(events);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// }

// module.exports = EventCategoryController;




const EventService = require('../Services/EventListService');

class EventController {
  static async viewEvents(req, res) {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId) : null;
      const events = await EventService.fetchEvents(categoryId);
      res.json({
        message: 'Events fetched successfully',
        events, // Array
      });
    } catch (error) {
      console.error('Error in viewEvents:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = EventController;