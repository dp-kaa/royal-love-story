import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type CSSProperties } from "react";
import { MapPin, Heart, Clock, Moon, Sun } from "lucide-react";

import { PetalFall } from "@/components/PetalFall";
import { EnvelopeGate } from "@/components/EnvelopeGate";
import { ScratchReveal } from "@/components/ScratchReveal";
import { EventCard, MAP_URL, VENUE_ADDRESS, VENUE_NAME } from "@/components/EventCard";
import type { EventInfo } from "@/components/EventCard";
import ganesha from "@/assets/ganesha.png";
import mehndiImg from "@/assets/mehndi.jpg";
import haldiImg from "@/assets/haldi.jpg";
import sangeetImg from "@/assets/sangeet.jpg";
import weddingImg from "@/assets/wedding.jpg";

const TITLE = "Vinita & Vinit — Royal Indian Wedding Invitation";
const DESCRIPTION =
  "Join Vinita & Vinit for Mehndi, Haldi, Engagement & Sangeet, and the Wedding on 12 December 2026 at Mangozzz Magical World, Karjat.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Invitation,
});

const EVENTS: EventInfo[] = [
  {
    eyebrow: "Colours, Henna & Laughter",
    title: "Mehndi",
    blurb:
      "An afternoon of intricate henna, dholak beats and endless sweets as the celebrations begin.",
    theme: "mehndi",
    day: "Thursday",
    date: "10",
    month: "December 2026",
    time: "04:00 PM onwards",
    dress: "Vibrant Greens & Yellows",
    image: mehndiImg,
  },
  {
    eyebrow: "Sunshine & Turmeric",
    title: "Haldi",
    blurb:
      "Blessings of haldi and marigolds, showered by everyone who has loved us since we were little.",
    theme: "haldi",
    day: "Friday",
    date: "11",
    month: "December 2026",
    time: "09:00 AM onwards",
    dress: "Shades of Marigold",
    image: haldiImg,
  },
  {
    eyebrow: "Twirl, Love & Lights",
    title: "Engagement & Sangeet",
    blurb:
      "Rings exchanged under chandeliers, followed by a night of music, dance performances and dinner.",
    theme: "sangeet",
    day: "Friday",
    date: "11",
    month: "December 2026",
    time: "07:00 PM onwards",
    dress: "Glam & Glitter",
    image: sangeetImg,
  },
  {
    eyebrow: "Vows, Love & Eternity",
    title: "Jaimala & Wedding",
    blurb:
      "The garlands, the sacred fire, the seven vows — the moment we become family, forever.",
    theme: "wedding",
    day: "Saturday",
    date: "12",
    month: "December 2026",
    time: "07:30 PM onwards · Jaimala at 08:30 PM",
    dress: "Traditional Festive",
    image: weddingImg,
  },
];

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(target).getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function Invitation() {
  const [opened, setOpened] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const countdown = useCountdown("2026-12-12T19:30:00+05:30");

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(maxScroll > 0 ? Math.min(1, window.scrollY / maxScroll) : 0);
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  return (
    <>
      <PetalFall />
      <EnvelopeGate open={opened} onOpen={() => setOpened(true)} />

      <div
        className="scroll-lume"
        style={{ "--scroll-progress": scrollProgress } as CSSProperties}
        aria-hidden="true"
      >
        <div className="scroll-lume-track" />
        <div className="scroll-lume-orb">
          <Sun className="scroll-lume-sun" />
          <Moon className="scroll-lume-moon" />
        </div>
      </div>

      <main className="relative mx-auto max-w-5xl px-4 pb-24 sm:px-6">
        {/* Hero */}
        <section className="pt-14 text-center sm:pt-20">
          <img
            src={ganesha}
            alt="Lord Ganesha"
            className="mx-auto h-24 w-24 opacity-90 sm:h-28 sm:w-28"
            width={816}
            height={816}
          />
          <p className="mt-3 text-[0.7rem] tracking-[0.4em] text-gold uppercase">
            ॥ Shree Ganeshaya Namaha ॥
          </p>

          <p className="mt-10 text-sm text-muted-foreground">
            Together with our families, we joyfully invite you to the wedding celebration of
          </p>
          <h1 className="mt-4 font-display text-5xl leading-tight text-primary sm:text-7xl">
            Vinita
            <span className="mx-3 align-middle text-2xl text-gold sm:text-3xl">&amp;</span>
            Vinit
          </h1>
          <p className="mt-4 text-xs text-muted-foreground sm:text-sm">
            With the blessings of our families &nbsp;·&nbsp; A celebration of love, music and colour
          </p>

          <div className="divider-gold mt-10">
            <Heart className="h-4 w-4" aria-hidden="true" />
          </div>
        </section>

        {/* Scratch to reveal */}
        <section className="panel mt-12 px-5 py-10 text-center sm:px-10">
          <h2 className="font-display text-3xl text-primary sm:text-4xl">Save the Date</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Rub the golden panel below with your finger or mouse to uncover our wedding day.
          </p>
          <div className="mt-7">
            <ScratchReveal value="12 · 12 · 2026" caption="Wedding Day" label="Scratch here" />
          </div>
        </section>

        {/* Countdown */}
        <section className="mt-14 text-center">
          <p className="divider-gold text-[0.7rem] tracking-[0.35em] uppercase">Counting down</p>
          <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-4">
            {[
              ["Days", countdown.days],
              ["Hours", countdown.hours],
              ["Minutes", countdown.minutes],
              ["Seconds", countdown.seconds],
            ].map(([label, value]) => (
              <div key={label as string} className="panel px-2 py-4">
                <div className="font-display text-3xl text-primary sm:text-4xl">
                  {String(value).padStart(2, "0")}
                </div>
                <div className="mt-1 text-[0.6rem] tracking-[0.2em] text-muted-foreground uppercase">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Events */}
        <section className="mt-20">
          <h2 className="text-center font-display text-4xl text-primary sm:text-5xl">
            Events Schedule
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Four celebrations, one family — we would love to have you at every one.
          </p>
          <div className="mt-10 space-y-10">
            {EVENTS.map((event, i) => (
              <EventCard key={event.title} event={event} index={i} />
            ))}
          </div>
        </section>

        {/* Venue */}
        <section className="panel mt-20 px-5 py-10 text-center sm:px-10">
          <h2 className="font-display text-4xl text-primary">The Venue</h2>
          <p className="mt-4 font-display text-2xl text-secondary-foreground">{VENUE_NAME}</p>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{VENUE_ADDRESS}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a href={MAP_URL} target="_blank" rel="noreferrer" className="btn-gold">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Open in Google Maps
            </a>
            <a href="#top" className="btn-ghost-gold">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Back to top
            </a>
          </div>
        </section>

        <footer className="mt-16 text-center">
          <img
            src={ganesha}
            alt=""
            className="mx-auto h-14 w-14 opacity-60"
            loading="lazy"
            width={816}
            height={816}
          />
          <p className="mt-4 font-script text-3xl text-primary">With love, Vinita &amp; Vinit</p>
          <p className="mt-2 text-xs tracking-[0.3em] text-muted-foreground uppercase">
            Karjat · December 2026
          </p>
        </footer>
      </main>
    </>
  );
}
