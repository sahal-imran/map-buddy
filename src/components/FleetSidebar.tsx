import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Grid3X3,
  Bell,
  Video,
  BarChart3,
  Settings,
  TriangleAlert,
  Car,
  MapPin,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const eventTypes = ["ALL", "RED", "AMBER"] as const;
type EventType = (typeof eventTypes)[number];

interface Event {
  id: string;
  vehicle: string;
  timestamp: string;
  type: "BRAKE" | "TURN";
  severity: "RED" | "AMBER";
}

const mockEvents: Event[] = [
  {
    id: "1",
    vehicle: "Honda-CRV-01",
    timestamp: "2025-07-23 06:24:32",
    type: "BRAKE",
    severity: "AMBER",
  },
  {
    id: "2",
    vehicle: "BMW X5",
    timestamp: "2025-07-23 03:32:13",
    type: "BRAKE",
    severity: "AMBER",
  },
  {
    id: "3",
    vehicle: "BMW X5",
    timestamp: "2025-07-23 02:48:03",
    type: "BRAKE",
    severity: "AMBER",
  },
  {
    id: "4",
    vehicle: "BMW X5",
    timestamp: "2025-07-22 02:51:57",
    type: "BRAKE",
    severity: "AMBER",
  },
  {
    id: "5",
    vehicle: "BMW X5",
    timestamp: "2025-07-18 20:25:52",
    type: "BRAKE",
    severity: "AMBER",
  },
  {
    id: "6",
    vehicle: "BMW X5",
    timestamp: "2025-07-18 19:29:40",
    type: "BRAKE",
    severity: "AMBER",
  },
  {
    id: "7",
    vehicle: "BMW X5",
    timestamp: "2025-07-18 11:11:37",
    type: "BRAKE",
    severity: "AMBER",
  },
  {
    id: "8",
    vehicle: "BMW X5",
    timestamp: "2025-07-18 03:24:23",
    type: "TURN",
    severity: "AMBER",
  },
];

interface FleetSidebarProps {
  selectedEvent: Event | null;
  onEventSelect: (event: Event) => void;
}

export function FleetSidebar({
  selectedEvent,
  onEventSelect,
}: FleetSidebarProps) {
  const [activeFilter, setActiveFilter] = useState<EventType>("ALL");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedEventGroup, setSelectedEventGroup] = useState("");

  const filteredEvents = mockEvents.filter((event) => {
    if (activeFilter === "ALL") return true;
    return event.severity === activeFilter;
  });

  return (
    <div className="flex h-screen">
      {/* Navigation Icons Column */}
      <div className="w-16 bg-fleet-sidebar border-r border-fleet-border flex flex-col justify-between items-center py-4 space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-2">
            <span className="text-primary-foreground font-bold text-lg">X</span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-fleet-text-muted hover:text-foreground hover:bg-fleet-panel"
          >
            <Grid3X3 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-fleet-accent hover:text-foreground hover:bg-fleet-panel"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-fleet-text-muted hover:text-foreground hover:bg-fleet-panel"
          >
            <Video className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-fleet-text-muted hover:text-foreground hover:bg-fleet-panel"
          >
            <BarChart3 className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-fleet-text-muted hover:text-foreground hover:bg-fleet-panel"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
        {/* <ThemeToggle /> */}
      </div>

      {/* Main Sidebar Content */}
      <div className="w-80 bg-fleet-panel border-r border-fleet-border flex flex-col">
        {/* Filters Section */}
        <div className="p-4 space-y-4 border-b border-fleet-border">
          <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
            <SelectTrigger className="w-full bg-fleet-sidebar border-fleet-border text-foreground">
              <SelectValue placeholder="Select Customer" />
            </SelectTrigger>
            <SelectContent className="bg-fleet-sidebar border-fleet-border">
              <SelectItem value="customer1">Customer 1</SelectItem>
              <SelectItem value="customer2">Customer 2</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={selectedEventGroup}
            onValueChange={setSelectedEventGroup}
          >
            <SelectTrigger className="w-full bg-fleet-sidebar border-fleet-border text-foreground">
              <SelectValue placeholder="Select Event Group" />
            </SelectTrigger>
            <SelectContent className="bg-fleet-sidebar border-fleet-border">
              <SelectItem value="group1">Safety Events</SelectItem>
              <SelectItem value="group2">Performance Events</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            {eventTypes.map((type) => (
              <Button
                key={type}
                variant={activeFilter === type ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(type)}
                className={cn(
                  "flex-1",
                  activeFilter === type
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-transparent border-fleet-border text-fleet-text-muted hover:text-foreground hover:bg-fleet-border"
                )}
              >
                {type}
              </Button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full bg-transparent border-fleet-border text-fleet-text-muted hover:text-foreground hover:bg-fleet-border"
            onClick={() => {
              setActiveFilter("ALL");
              setSelectedCustomer("");
              setSelectedEventGroup("");
            }}
          >
            CLEAR FILTERS
          </Button>
        </div>

        {/* Events List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <div className="text-sm text-fleet-text-muted mb-4">
              {filteredEvents.length} events found
            </div>

            <div className="space-y-2">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-colors",
                    selectedEvent?.id === event.id
                      ? "bg-fleet-accent/20 border-fleet-accent"
                      : "bg-fleet-sidebar border-fleet-border hover:bg-fleet-border"
                  )}
                  onClick={() => onEventSelect(event)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground">
                      {event.vehicle}
                    </span>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs font-medium",
                        event.type === "BRAKE"
                          ? "bg-status-brake text-black"
                          : "bg-status-turn text-black"
                      )}
                    >
                      {event.type}
                    </Badge>
                  </div>
                  <div className="text-sm text-fleet-text-muted">
                    {event.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
