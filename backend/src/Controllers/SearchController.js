const eventService = require('../Services/SearchService');

const searchEvents = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query || query.trim() === '') {
      return res.status(400).json({ message: 'Search query is required.' });
    }

    const results = await eventService.searchEvents(query);
    res.status(200).json(results);
  } catch (error) {
    console.error('Error searching events:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

module.exports = {
  searchEvents
};
