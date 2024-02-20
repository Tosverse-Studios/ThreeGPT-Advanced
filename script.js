        // Initialize the speech recognition engine
        const recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        // Initialize the text-to-speech engine (you can use other TTS libraries)
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
                // You can fetch information from an API or use a database here
                // For now, let's just log the query.
                console.log('User asked about:', query);
            } else if (command.includes('time')) {
                const time = new Date().toLocaleTimeString();
                speak('The current time is ' + time);
            } else {
                speak("Sorry, I didn't understand that command.");
            }
        }

        // Start the assistant
        function startAssistant() {
            recognition.start();
            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                handleCommand(command);
            };
        }