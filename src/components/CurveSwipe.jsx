import {
  forwardRef,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";

const closedTopPath = "M 0 0 V 0 Q 50 0 100 0 V 0 Z";
const coverPath = "M 0 0 V 100 Q 50 118 100 100 V 0 Z";
const closedBottomPath = "M 0 100 V 100 Q 50 100 100 100 V 100 Z";

const CurveSwipe = forwardRef(function CurveSwipe(_, ref) {
  const rootRef = useRef(null);
  const pathRef = useRef(null);
  const accentRef = useRef(null);
  const timelineRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set(rootRef.current, { autoAlpha: 0, pointerEvents: "none" });
    gsap.set(pathRef.current, { attr: { d: closedTopPath } });

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    play({ onCovered } = {}) {
      const root = rootRef.current;
      const path = pathRef.current;
      const accent = accentRef.current;

      if (!root || !path) {
        onCovered?.();
        return Promise.resolve();
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        onCovered?.();
        return Promise.resolve();
      }

      timelineRef.current?.kill();

      return new Promise((resolve) => {
        let hasCovered = false;
        const cover = () => {
          if (hasCovered) {
            return;
          }

          hasCovered = true;
          onCovered?.();
        };

        timelineRef.current = gsap
          .timeline({
            defaults: { overwrite: true },
            onComplete: resolve,
          })
          .set(root, { autoAlpha: 1, pointerEvents: "auto" })
          .set(path, { attr: { d: closedTopPath } })
          .set(accent, {
            autoAlpha: 0,
            scaleX: 0,
            transformOrigin: "left center",
          })
          .to(path, {
            attr: { d: coverPath },
            duration: 0.52,
            ease: "expo.inOut",
          })
          .to(
            accent,
            {
              autoAlpha: 1,
              scaleX: 1,
              duration: 0.28,
              ease: "power3.out",
            },
            0.12,
          )
          .call(cover)
          .to(
            accent,
            {
              scaleX: 0,
              transformOrigin: "right center",
              duration: 0.24,
              ease: "power2.in",
            },
            "+=0.06",
          )
          .to(
            path,
            {
              attr: { d: closedBottomPath },
              duration: 0.62,
              ease: "expo.inOut",
            },
            "-=0.03",
          )
          .set(root, { autoAlpha: 0, pointerEvents: "none" })
          .set(path, { attr: { d: closedTopPath } })
          .set(accent, { clearProps: "all" });
      });
    },
  }));

  return (
    <div className="curve-swipe" aria-hidden="true" ref={rootRef}>
      <svg
        className="curve-swipe-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        focusable="false"
      >
        <defs>
          <linearGradient
            id="curveSwipeFill"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#07100e" />
            <stop offset="56%" stopColor="#10211d" />
            <stop offset="100%" stopColor="#0f6f5c" />
          </linearGradient>
        </defs>
        <path ref={pathRef} fill="url(#curveSwipeFill)" d={closedTopPath} />
      </svg>
      <span className="curve-swipe-accent" ref={accentRef}></span>
    </div>
  );
});

export default CurveSwipe;
