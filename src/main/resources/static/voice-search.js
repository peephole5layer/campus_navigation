const voiceBtn = document.getElementById("voiceBtn");
const destinationSelect = document.getElementById("destination");

voiceBtn.addEventListener("click", () => {
  if (!('webkitSpeechRecognition' in window)) {
    alert("Voice recognition not supported in this browser.");
    return;
  }

  const recognition = new webkitSpeechRecognition(); // Chrome-only
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = function(event) {
    const speechResult = event.results[0][0].transcript.toLowerCase().trim();
    console.log("User said:", speechResult);

    let matched = false;
    for (let i = 0; i < destinationSelect.options.length; i++) {
      if (destinationSelect.options[i].text.toLowerCase().includes(speechResult)) {
        destinationSelect.selectedIndex = i;
        matched = true;
        break;
      }
    }

    if (!matched) {
      alert("Could not recognize location. Please try again.");
    }
  };

  recognition.onerror = function(event) {
    alert("Error occurred in recognition: " + event.error);
  };
});
