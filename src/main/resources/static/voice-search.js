function startVoice(targetId) {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Voice recognition not supported in this browser.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function(event) {
        const spokenText = event.results[0][0].transcript.toLowerCase().trim();
        console.log("You said:", spokenText);

        const select = document.getElementById(targetId);
        let found = false;

        for (let i = 0; i < select.options.length; i++) {
            if (select.options[i].text.toLowerCase().includes(spokenText)) {
                select.selectedIndex = i;
                found = true;
                break;
            }
        }

        if (!found) {
            alert(`Could not find a match for "${spokenText}"`);
        }
    };

    recognition.onerror = function(event) {
        alert("Error occurred in recognition: " + event.error);
    };
}
