import floral from "@/assets/floral.png";

/**
 * The red royal envelope shown first. Tapping the wax seal opens the invitation.
 */
export function EnvelopeGate({ open, onOpen }: { open: boolean; onOpen: () => void }) {
  return (
    <div className={`envelope-stage ${open ? "is-open" : ""}`} aria-hidden={open}>
      <div className="envelope-inner">
        <p className="mb-6 text-center text-[0.7rem] tracking-[0.45em] text-gold uppercase sm:text-xs">
          ॐ · Shree Ganeshaya Namaha
        </p>

        <div className="envelope">
          <div className="envelope-flap" />
          <div className="envelope-body">
            <img src={floral} alt="" className="envelope-floral" width={1008} height={1008} />
            <button
              type="button"
              onClick={onOpen}
              className="wax-seal"
              aria-label="Open the wedding invitation"
            >
              <span className="font-display text-2xl leading-none">A&nbsp;&amp;&nbsp;R</span>
            </button>
          </div>
        </div>

        <p className="mt-8 text-center font-display text-2xl text-gold-light">
          Tap the seal to open
        </p>
        <p className="mt-1 text-center text-sm text-cream/70">
          Our invitation is inside — click the round golden seal above.
        </p>
      </div>
    </div>
  );
}
