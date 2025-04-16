const eventModel = require('../Models/SearchModel');

const searchEvents = async (keyword) => {
  return await eventModel.findEventsByKeyword(keyword);
};

module.exports = {
  searchEvents
};
