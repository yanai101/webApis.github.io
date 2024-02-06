// Check if the browser supports the Web Speech API
if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // Start speech recognition
  recognition.start();

  // Event fired when speech recognition starts
  recognition.onstart = () => {
    console.log("Speech recognition started.");
  };

  // Event fired when speech recognition ends
  recognition.onend = () => {
    console.log("Speech recognition ended.");
    // Restart speech recognition
    recognition.start();
  };

  const sections = ["section1", "section2", "section3", "section4", "section5"];
  let activeSection = 0;

  // Event fired when speech is recognized
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    console.log("Recognized speech:", transcript);
    document.querySelector(".fixDiv").innerText = transcript;

    // Scroll to the next section
    if (transcript === "למטה") {
      activeSection++;
      if (activeSection >= sections.length) {
        activeSection = sections.length - 1;
      }
      const section = document.getElementById(sections[activeSection]);
      section.scrollIntoView({ behavior: "smooth" });
    }
    // Scroll to the previous section
    else if (transcript === "למעלה") {
      activeSection--;
      if (activeSection < 0) {
        activeSection = 0;
      }
      const section = document.getElementById(sections[activeSection]);
      section.scrollIntoView({ behavior: "smooth" });
    }
    // Scroll to the top of the page
    else if (transcript === "לך להתחלה") {
      activeSection = 0;
      const section = document.getElementById(sections[activeSection]);
      section.scrollIntoView({ behavior: "smooth" });
    }
    // Scroll to the bottom of the page
    else if (transcript === "לך לסוף") {
      activeSection = sections.length - 1;
      const section = document.getElementById(sections[activeSection]);
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
} else {
  console.log("Speech recognition is not supported in this browser.");
}
