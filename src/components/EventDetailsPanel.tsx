import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TriangleAlert, Eye, Download, Share, Archive, MapPin, Clock, Car } from "lucide-react";

interface Event {
  id: string;
  vehicle: string;
  timestamp: string;
  type: "BRAKE" | "TURN";
  severity: "RED" | "AMBER";
}

interface EventDetailsPanelProps {
  event: Event | null;
}

export function EventDetailsPanel({ event }: EventDetailsPanelProps) {
  if (!event) {
    return (
      <div className="w-80 bg-fleet-panel border-l border-fleet-border h-screen flex items-center justify-center">
        <div className="text-center text-fleet-text-muted">
          <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>Select an event to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-80 bg-fleet-panel border-l border-fleet-border h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-fleet-border">
        <div className="flex items-center gap-2 mb-4">
          <TriangleAlert className="h-5 w-5 text-fleet-warning" />
          <h2 className="font-semibold text-foreground">
            {event.type === "BRAKE" ? "Brake Event" : "Turn Event"}
          </h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Car className="h-4 w-4 text-fleet-text-muted" />
            <span className="text-sm text-fleet-text-muted">Device:</span>
            <span className="text-sm font-medium text-foreground">{event.vehicle}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-fleet-text-muted" />
            <span className="text-sm text-fleet-text-muted">Time:</span>
            <span className="text-sm font-medium text-foreground">{event.timestamp}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-fleet-text-muted" />
            <span className="text-sm text-fleet-text-muted">Location:</span>
            <span className="text-sm font-medium text-foreground">42.0433878, -87.9428176</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-fleet-text-muted">Note:</span>
            <button className="text-sm text-primary hover:underline">View Note</button>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-foreground mb-4">Actions</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" className="flex flex-col items-center gap-2 h-auto py-3 bg-transparent border-fleet-border text-fleet-text-muted hover:text-foreground">
            <div className="w-8 h-8 rounded-full bg-fleet-accent flex items-center justify-center">
              <Eye className="h-4 w-4" />
            </div>
            <span className="text-xs">Resolve</span>
          </Button>

          <Button variant="outline" size="sm" className="flex flex-col items-center gap-2 h-auto py-3 bg-transparent border-fleet-border text-fleet-text-muted hover:text-foreground">
            <div className="w-8 h-8 rounded-full bg-fleet-accent flex items-center justify-center">
              <Eye className="h-4 w-4" />
            </div>
            <span className="text-xs">View More</span>
          </Button>

          <Button variant="outline" size="sm" className="flex flex-col items-center gap-2 h-auto py-3 bg-transparent border-fleet-border text-fleet-text-muted hover:text-foreground">
            <div className="w-8 h-8 rounded-full bg-fleet-accent flex items-center justify-center">
              <Download className="h-4 w-4" />
            </div>
            <span className="text-xs">Download</span>
          </Button>

          <Button variant="outline" size="sm" className="flex flex-col items-center gap-2 h-auto py-3 bg-transparent border-fleet-border text-fleet-text-muted hover:text-foreground">
            <div className="w-8 h-8 rounded-full bg-fleet-accent flex items-center justify-center">
              <Share className="h-4 w-4" />
            </div>
            <span className="text-xs">Share</span>
          </Button>

          <Button variant="outline" size="sm" className="flex flex-col items-center gap-2 h-auto py-3 bg-transparent border-fleet-border text-fleet-text-muted hover:text-foreground">
            <div className="w-8 h-8 rounded-full bg-fleet-accent flex items-center justify-center">
              <Archive className="h-4 w-4" />
            </div>
            <span className="text-xs">Archive</span>
          </Button>

          <Button variant="outline" size="sm" className="flex flex-col items-center gap-2 h-auto py-3 bg-transparent border-fleet-border text-fleet-text-muted hover:text-foreground">
            <div className="w-8 h-8 rounded-full bg-fleet-accent flex items-center justify-center">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="text-xs">Street View</span>
          </Button>
        </div>
      </div>
    </div>
  );
}