import { useEffect } from "react";

const ReadAloud = ({ accessibilityEnabled }) => {
  const synth = window.speechSynthesis;

  useEffect(() => {
    if (accessibilityEnabled) {
        // Announce "Read Aloud Enabled" when toggled ON
        const announceEnabled = new SpeechSynthesisUtterance("Read Aloud Enabled");
        announceEnabled.lang = "en-US";
        announceEnabled.rate = 1;
        synth.speak(announceEnabled);
    } else {
        // Announce "Read Aloud Disabled" when toggled OFF
        const announceDisabled = new SpeechSynthesisUtterance("Read Aloud Disabled");
        announceDisabled.lang = "en-US";
        announceDisabled.rate = 1;
        synth.speak(announceDisabled);
        return; // Stop further execution when disabled
    }

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
        element.placeholder || // ✅ Read placeholder text
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