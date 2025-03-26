import { useEffect, useRef } from "react";

const ReadAloud = ({ accessibilityEnabled }) => {
  const synth = window.speechSynthesis;
  const prevState = useRef(null); // Track previous state

  useEffect(() => {
    // Avoid announcement on initial load
    if (prevState.current === null) {
      prevState.current = accessibilityEnabled;
      return;
    }

    // Speak announcement only when toggled
    if (prevState.current !== accessibilityEnabled) {
      const message = accessibilityEnabled ? "Read Aloud Enabled" : "Read Aloud Disabled";
      const announcement = new SpeechSynthesisUtterance(message);
      announcement.lang = "en-US";
      announcement.rate = 1;
      synth.speak(announcement);
    }

    prevState.current = accessibilityEnabled; // Update previous state

    if (!accessibilityEnabled) return; // Stop execution if disabled

    const getText = (element) => {
      if (!element) return "";
      if (element.tagName === "BUTTON") {
        return element.innerText.trim() || element.getAttribute("aria-label") || "";
      }
      if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
        return element.placeholder || "";
      }
      return (
        element.getAttribute("aria-label") ||
        element.getAttribute("title") ||
        element.getAttribute("alt") ||
        element.placeholder || 
        element.innerText?.trim() ||
        ""
      );
    };

    const speakText = (event) => {
      const text = getText(event.target);
      if (text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 1;
        synth.speak(utterance);
      }
    };

    const stopSpeech = () => {
      synth.cancel();
    };

    const elements = document.querySelectorAll(
      "a, button, p, li, span, h1, h2, h3, h4, h5, h6, svg, img, i, input, textarea"
    );

    elements.forEach((element) => {
      element.addEventListener("mouseenter", speakText);
      element.addEventListener("mouseleave", stopSpeech);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener("mouseenter", speakText);
        element.removeEventListener("mouseleave", stopSpeech);
      });
    };
  }, [accessibilityEnabled]);

  return null; // This component does not render anything
};

export default ReadAloud;
