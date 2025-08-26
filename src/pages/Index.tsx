import { useState } from "react";
import { FleetSidebar } from "@/components/FleetSidebar";
import { EventDetailsPanel } from "@/components/EventDetailsPanel";
import { DashcamView } from "@/components/DashcamView";
import { MapView } from "@/components/MapView";

interface Event {
  id: string;
  vehicle: string;
  timestamp: string;
  type: "BRAKE" | "TURN";
  severity: "RED" | "AMBER";
}

const Index = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>({
    id: "2",
    vehicle: "BMW X5",
    timestamp: "2025-07-23 03:32:13",
    type: "BRAKE",
    severity: "AMBER",
  });

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <FleetSidebar
        selectedEvent={selectedEvent}
        onEventSelect={setSelectedEvent}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Video Section */}
        <div className="flex-1 p-4">
          <DashcamView />
        </div>

        {/* Map Section */}
        <div className="flex-1 p-4 pt-0">
          <MapView location={[42.0433878, -87.9428176]} />
        </div>
      </div>

      {/* Event Details Panel */}
      <EventDetailsPanel event={selectedEvent} />
    </div>
  );
};

export default Index;
