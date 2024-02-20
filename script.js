const synth = window.speechSynthesis;

// Define a function to speak the assistant's response
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

// Define a function to handle user commands
function handleCommand(command) {
    if (command.includes('what is')) {
        const query = command.replace('what is', '');
        console.log('User asked about:', query);
        document.getElementById('response').textContent = 'Fetching information...';
        setTimeout(() => {
            const randomResponse = getRandomResponse();
            document.getElementById('response').textContent = randomResponse;
            speak(randomResponse);
        }, 2000);
    } else if (command.includes('time')) {
        // Handle 'time' command
    } else if (command.includes('stop') || command.includes('exit')) {
        speak("Goodbye!");
        recognition.stop(); // Stop listening
    } else {
        speak("Sorry, I didn't understand that command.");
    }
}

// Generate a random response
function getRandomResponse() {
    const responses = [
        "Interesting! Tell me more.",
        "Fascinating! Anything else?",
        "Great question! Let me think...",
        "I'm pondering that. What else can I assist with?",
    ];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}

// Start the assistant
function startAssistant() {
    recognition.start();
    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript.toLowerCase();
        handleCommand(command);
    };
}

// Stop the assistant
function stopAssistant() { // Add this function
    recognition.abort(); // Stop listening immediately
    speak("Assistant stopped.");
}
