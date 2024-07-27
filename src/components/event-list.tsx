import { Event } from "@prisma/client";
import { EventCard } from "@/components/event-card";
interface EventListProps {
    events: Event[]
}

export function EventList({events}: EventListProps) {
    return (
        <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-3 gap-4">
                {
                    events.map(event => (
                        <EventCard
                            key={event.id}
                            title={event.title}
                            id={event.id}
                            price={event.price!}
                            date={event.date!}
                            expiresAt={event.expiresAt!}
                            location={event.location!}
                            qrCode={event.qrCode!}
                        />
                    ))
                }
            </div>
        </div>
    );
}