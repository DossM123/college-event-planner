const express = require("express");
require('dotenv').config();
const cors = require("cors");
const RegisterRoutes = require("./src/Routes/RegisterRoutes");
const loginRoute = require("./src/Routes/LoginRoutes");
const CategoryRoutes = require("./src/Routes/CategoryRoutes");
const EventListRoutes = require("./src/Routes/EventListRoutes");
const OrganizerRoutes = require("./src/Routes/OrganizerRoutes");
const RegisterButtonRoutes = require("./src/Routes/RegisterButtonRoutes");
const UnregisterRoutes = require('./src/Routes/UnregisterRoutes');
const ReminderRoutes = require('./src/Routes/ReminderRoutes');
const SearchRoutes = require('./src/Routes/SearchRoutes');

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/user", RegisterRoutes);
app.use("/auth", loginRoute);
app.use("/categories", CategoryRoutes);
app.use("/events", EventListRoutes);
app.use("/organizers", OrganizerRoutes);
app.use("/event", RegisterButtonRoutes);
app.use("/event/unregister",UnregisterRoutes);
app.use("/event/reminder", ReminderRoutes);
app.use('/event/search', SearchRoutes);



// Server Listen
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
