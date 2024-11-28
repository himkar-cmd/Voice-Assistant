const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
 speak("Good Morning How can I help you");
}

window.addEventListener('load', () => {
    speak("Initializing JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        const query = encodeURIComponent(message);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        const finalText = `This is what I found on the internet regarding ${message}`;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        const query = encodeURIComponent(message.replace("wikipedia", "").trim());
        window.open(`https://en.wikipedia.org/wiki/${query}`, "_blank");
        const finalText = `This is what I found on Wikipedia regarding ${message}`;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = `The current time is ${time}`;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = `Today's date is ${date}`;
        speak(finalText);
    } else {
        const query = encodeURIComponent(message);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        const finalText = `I found some information for ${message} on Google`;
        speak(finalText);
    }
}
