import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import resumePdf from "../../asset/cv.pdf";

const email = "subhramoy03@gmail.com";
const minimumMessageLength = 10;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const submitButtonLabels = {
  idle: "Send Message",
  sending: "Sending...",
  success: "Message Sent",
  error: "Try Again",
};

const submitButtonIcons = {
  idle: "fas fa-paper-plane",
  sending: "fas fa-circle-notch",
  success: "fas fa-check",
  error: "fas fa-arrow-rotate-right",
};

const getSubmitButtonLabel = (state) =>
  submitButtonLabels[state] || submitButtonLabels.idle;

const getSubmitButtonIcon = (state) =>
  submitButtonIcons[state] || submitButtonIcons.idle;

const getTrimmedFormValue = (formData, name) =>
  String(formData.get(name) || "").trim();

const validateContactForm = (formData) => {
  const name = getTrimmedFormValue(formData, "name");
  const senderEmail = getTrimmedFormValue(formData, "email");
  const message = getTrimmedFormValue(formData, "message");

  if (!name || !emailPattern.test(senderEmail)) {
    return "Please enter your name and a valid email address.";
  }

  if (message.length < minimumMessageLength) {
    return `Please add a message with at least ${minimumMessageLength} characters.`;
  }

  return "";
};

async function writeClipboardText(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.append(helper);
  helper.select();
  document.execCommand("copy");
  helper.remove();
}

export default function Contact() {
  const [copyState, setCopyState] = useState("idle");
  const [formState, setFormState] = useState("idle");
  const [formErrorMessage, setFormErrorMessage] = useState("");
  const [submitLabel, setSubmitLabel] = useState(getSubmitButtonLabel("idle"));
  const [submitIconClass, setSubmitIconClass] = useState(
    getSubmitButtonIcon("idle"),
  );
  const feedbackRef = useRef(null);
  const formRef = useRef(null);
  const submitLabelRef = useRef(null);
  const submitIconRef = useRef(null);
  const hasMountedSubmitLabelRef = useRef(false);

  const formClassName = [
    "contact-form",
    formState === "sending" ? "is-sending" : "",
    formState === "success" ? "is-success" : "",
    formState === "error" ? "is-error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const copyLabel =
    copyState === "copied"
      ? "Email copied"
      : copyState === "failed"
        ? "Copy failed"
        : "Copy email";

  useEffect(() => {
    if (copyState === "idle") {
      return undefined;
    }

    const resetTimer = window.setTimeout(() => {
      setCopyState("idle");
    }, 1800);

    return () => window.clearTimeout(resetTimer);
  }, [copyState]);

  useEffect(() => {
    const nextLabel = getSubmitButtonLabel(formState);
    const nextIconClass = getSubmitButtonIcon(formState);
    const label = submitLabelRef.current;
    const icon = submitIconRef.current;

    if (!hasMountedSubmitLabelRef.current) {
      hasMountedSubmitLabelRef.current = true;
      setSubmitLabel(nextLabel);
      setSubmitIconClass(nextIconClass);
      return undefined;
    }

    if (submitLabel === nextLabel && submitIconClass === nextIconClass) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!label || !icon || prefersReducedMotion) {
      setSubmitLabel(nextLabel);
      setSubmitIconClass(nextIconClass);
      return undefined;
    }

    gsap.killTweensOf([label, icon]);

    const timeline = gsap.timeline({
      defaults: { overwrite: true },
      onComplete: () => {
        if (formState === "sending") {
          gsap.to(icon, {
            rotation: 360,
            duration: 0.82,
            ease: "none",
            repeat: -1,
            overwrite: true,
          });
        }
      },
    });

    timeline
      .to(label, {
        autoAlpha: 0,
        yPercent: -110,
        filter: "blur(4px)",
        duration: 0.2,
        ease: "power2.in",
      })
      .to(
        icon,
        {
          autoAlpha: 0,
          x: 8,
          scale: 0.82,
          rotation: formState === "sending" ? -45 : 0,
          duration: 0.18,
          ease: "power2.in",
        },
        0,
      )
      .call(() => {
        label.textContent = nextLabel;
        icon.className = nextIconClass;
        setSubmitLabel(nextLabel);
        setSubmitIconClass(nextIconClass);
      })
      .set(label, {
        autoAlpha: 0,
        yPercent: 110,
        filter: "blur(4px)",
      })
      .set(icon, {
        autoAlpha: 0,
        x: -8,
        scale: 0.82,
        rotation: formState === "success" ? -18 : 0,
      })
      .to(label, {
        autoAlpha: 1,
        yPercent: 0,
        filter: "blur(0px)",
        duration: 0.34,
        ease: "expo.out",
      })
      .to(
        icon,
        {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          rotation: 0,
          duration: 0.34,
          ease: "back.out(1.8)",
        },
        "<0.02",
      );

    return () => timeline.kill();
  }, [formState, submitIconClass, submitLabel]);

  useEffect(() => {
    const feedback = feedbackRef.current;

    if ((formState !== "success" && formState !== "error") || !feedback) {
      return undefined;
    }

    feedback.focus({ preventScroll: true });

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return undefined;
    }

    const feedbackIcon = feedback.querySelector(".feedback-icon");
    const checkPath = feedback.querySelector(".feedback-check-path");
    const feedbackText = feedback.querySelector("[data-feedback-text]");
    const formControls = formRef.current?.querySelectorAll(
      ".form-field, .form-submit",
    );
    const timeline = gsap.timeline({ defaults: { overwrite: true } });

    gsap.killTweensOf([feedback, feedbackIcon, checkPath, feedbackText]);

    if (formState === "success") {
      const pathLength = checkPath?.getTotalLength?.() || 36;

      gsap.set(checkPath, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      timeline
        .to(formControls, {
          opacity: 0.68,
          y: -4,
          duration: 0.28,
          ease: "power2.out",
        })
        .fromTo(
          feedback,
          {
            autoAlpha: 0,
            y: 20,
            scale: 0.96,
            clipPath: "inset(0% 100% 0% 0% round 8px)",
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 8px)",
            duration: 0.58,
            ease: "expo.out",
          },
          0.04,
        )
        .fromTo(
          feedbackIcon,
          { scale: 0.72, rotation: -10 },
          { scale: 1, rotation: 0, duration: 0.48, ease: "back.out(2)" },
          0.2,
        )
        .to(
          checkPath,
          {
            strokeDashoffset: 0,
            duration: 0.48,
            ease: "power2.inOut",
          },
          0.34,
        )
        .fromTo(
          feedbackText,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.36, ease: "power3.out" },
          0.44,
        );

      return () => timeline.kill();
    }

    timeline.fromTo(
      feedback,
      { autoAlpha: 0, y: 14, scale: 0.98 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.32, ease: "power3.out" },
    );

    return () => timeline.kill();
  }, [formState]);

  const handleCopyEmail = async () => {
    try {
      await writeClipboardText(email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  const resetFormFeedback = () => {
    if (formState === "success" || formState === "error") {
      setFormErrorMessage("");
      setFormState("idle");
      gsap.to(formRef.current?.querySelectorAll(".form-field, .form-submit"), {
        opacity: 1,
        y: 0,
        duration: 0.24,
        ease: "power2.out",
        overwrite: true,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const honeypotValue = getTrimmedFormValue(formData, "_gotcha");
    const validationMessage = validateContactForm(formData);

    if (honeypotValue) {
      form.reset();
      setFormErrorMessage("");
      setFormState("success");
      return;
    }

    if (validationMessage) {
      setFormErrorMessage(validationMessage);
      setFormState("error");
      return;
    }

    setFormErrorMessage("");
    setFormState("sending");

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Form submission failed with status ${response.status}`,
        );
      }

      form.reset();
      setFormErrorMessage("");
      setFormState("success");
    } catch {
      setFormErrorMessage("Please try again in a moment or email me directly.");
      setFormState("error");
    }
  };

  const feedbackContent =
    formState === "success"
      ? {
          icon: String.fromCharCode(10003),
          title: "",
          message: "Thanks, your message has been sent successfully.",
        }
      : {
          icon: "!",
          title: "Unable to send",
          message:
            formErrorMessage ||
            "Please try again in a moment or email me directly.",
        };

  return (
    <section id="contact" className="section-block">
      <div className="container">
        <div className="section-head" data-animate="fade-up">
          <p className="section-kicker">Contact</p>
          <h2 className="section-title" data-scramble>
            Open for software development collaborations and polished product
            work
          </h2>
          <p className="section-subtitle">
            Share the project, role, or redesign problem. I will reply with the
            next practical step.
          </p>
        </div>

        <div className="contact-shell">
          <aside className="contact-card" data-animate="fade-up">
            <h3 className="contact-card-title">Good fit for</h3>
            <p className="contact-intro">
              Web projects that need both visual polish and careful
              implementation.
            </p>
            <ul className="contact-points">
              <li>
                Software builds with stronger visual language and UX clarity
              </li>
              <li>
                Responsive UI implementation with clean, maintainable code
              </li>
              <li>
                Design-aware development for portfolio, utility, and product
                sites
              </li>
            </ul>

            <div className="contact-meta">
              <a className="contact-mail" href={`mailto:${email}`}>
                {email}
              </a>

              <div className="contact-actions-inline">
                <button
                  className={`action-chip copy-email-button${
                    copyState !== "idle" ? " is-copied" : ""
                  }`}
                  type="button"
                  data-copy-email
                  data-copy-source={email}
                  onClick={handleCopyEmail}
                >
                  <i className="fas fa-copy" aria-hidden="true"></i>
                  <span data-copy-label>{copyLabel}</span>
                </button>

                <a
                  href={resumePdf}
                  className="action-chip"
                  target="_blank"
                  rel="noreferrer"
                >
                  <i className="fas fa-file-arrow-down" aria-hidden="true"></i>
                  Resume
                </a>
              </div>

              <p className="contact-response-time">
                Usually replies within 24 to 48 hours.
              </p>
            </div>
          </aside>

          <div className="contact-form-shell" data-animate="fade-up">
            <form
              id="contact-form"
              className={formClassName}
              action="https://formspree.io/f/movdqbyd"
              method="POST"
              aria-busy={formState === "sending"}
              onSubmit={handleSubmit}
              ref={formRef}
            >
              <label className="form-honeypot" aria-hidden="true">
                <span>Website</span>
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex="-1"
                  autoComplete="off"
                />
              </label>

              <div className="form-grid">
                <label className="form-field">
                  <span>Name</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    disabled={formState === "sending"}
                    onInput={resetFormFeedback}
                  />
                </label>

                <label className="form-field">
                  <span>Email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    disabled={formState === "sending"}
                    onInput={resetFormFeedback}
                  />
                </label>
              </div>

              <label className="form-field">
                <span>Message</span>
                <textarea
                  name="message"
                  rows="6"
                  placeholder="Tell me about the project"
                  required
                  minLength={minimumMessageLength}
                  disabled={formState === "sending"}
                  onInput={resetFormFeedback}
                ></textarea>
              </label>

              <button
                className="btn btn-primary form-submit"
                type="submit"
                disabled={formState === "sending"}
              >
                <span className="submit-label-clip" aria-live="polite">
                  <span
                    className="submit-label-text"
                    data-button-label
                    ref={submitLabelRef}
                  >
                    {submitLabel}
                  </span>
                </span>
                <i
                  className={submitIconClass}
                  aria-hidden="true"
                  ref={submitIconRef}
                ></i>
              </button>

              <div
                className="form-feedback"
                tabIndex="-1"
                hidden={formState !== "success" && formState !== "error"}
                ref={feedbackRef}
              >
                <span className="feedback-icon" aria-hidden="true">
                  {formState === "success" ? (
                    <svg
                      className="feedback-check"
                      viewBox="0 0 36 36"
                      focusable="false"
                    >
                      <path
                        className="feedback-check-path"
                        d="M10 18.5 15.4 24 26.5 12"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                      />
                    </svg>
                  ) : (
                    feedbackContent.icon
                  )}
                </span>
                <div data-feedback-text>
                  <strong data-feedback-title>{feedbackContent.title}</strong>
                  <p data-feedback-message>{feedbackContent.message}</p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
