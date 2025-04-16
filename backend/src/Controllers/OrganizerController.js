const userService = require('../Services/OrganizerService'); 

// fetching organizer details
const getOrganizerDetails = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userService.getOrganizerDetails(userId);
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getOrganizerDetails,
};
