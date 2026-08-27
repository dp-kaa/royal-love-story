import { MapPin } from "lucide-react";

export const VENUE_NAME = "Mangozzz Magical World — A Riverside Resort, Karjat";
export const VENUE_ADDRESS =
  "At post Asarewadi, near Aaibaba Foundation, Chauk, Khalapur, Aasare, Maharashtra 410207";
export const MAP_URL = "https://maps.app.goo.gl/dRZfAKuyR5EvUiik9";

export type EventInfo = {
  eyebrow: string;
  title: string;
  blurb: string;
  day: string;
  date: string;
  month: string;
  time: string;
  dress: string;
  image: string;
};

export function EventCard({ event, index }: { event: EventInfo; index: number }) {
  return (
    <article className="event-card">
      <div className="event-card-copy">
        <p className="text-[0.65rem] tracking-[0.4em] text-gold uppercase">{event.eyebrow}</p>
        <h3 className="mt-3 font-display text-4xl text-primary sm:text-5xl">{event.title}</h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{event.blurb}</p>

        <div className="date-block">
          <span className="text-sm tracking-[0.2em] uppercase">{event.day}</span>
          <span className="date-numeral">{event.date}</span>
          <span className="text-sm tracking-[0.2em] uppercase">{event.month}</span>
        </div>

        <p className="mt-4 text-sm font-medium text-foreground">{event.time}</p>
        <p className="mt-3 text-sm text-muted-foreground">
          <span className="block font-medium text-foreground">{VENUE_NAME}</span>
          {VENUE_ADDRESS}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="dress-chip">{event.dress}</span>
          <a href={MAP_URL} target="_blank" rel="noreferrer" className="btn-gold">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Get directions
          </a>
        </div>
      </div>

      <div className="event-card-art">
        <img
          src={event.image}
          alt={`${event.title} illustration`}
          loading={index === 0 ? "eager" : "lazy"}
          width={912}
          height={1104}
        />
      </div>
    </article>
  );
}
