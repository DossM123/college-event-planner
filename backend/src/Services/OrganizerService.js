const userModel = require('../Models/OrganizerModel'); 

const getOrganizerDetails = async (userId) => {
  try {
    const user = await userModel.getUserById(userId);
    if (!user) {
      throw new Error('Organizer not found');
    }
    return user; 
  } catch (error) {
    throw new Error('Service error: ' + error.message);
  }
};

module.exports = {
  getOrganizerDetails,
};
