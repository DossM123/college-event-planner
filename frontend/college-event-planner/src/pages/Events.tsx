import React, { useState } from "react";
import CategoryDropdown from "../components/EventPage/Category";
import EventList from "../components/EventPage/EventList";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "../styles/Events.css";

const Events: React.FC = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

    return (
        <div className="events-container">
            <div className="header">
                <Header />
            </div>
            <div className="main-content">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="content">
                    <div className="category-dropdown">
                        <CategoryDropdown onCategoryChange={setSelectedCategoryId} />
                    </div>
                    <EventList categoryId={selectedCategoryId} />
                </div>
            </div>
        </div>
    );
};

export default Events;
