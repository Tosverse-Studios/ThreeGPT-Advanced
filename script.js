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
                        document.getElementById('response').textContent = 'Fetching information...';
                        setTimeout(() => {
                            const randomResponse = getRandomResponse();
                            document.getElementById('response').textContent = randomResponse;
                            speak(randomResponse);
                        }, 2000); // Simulate fetching data
                    } else if (command.includes('time')) {
                        const time = new Date().toLocaleTimeString();
                        speak('The current time is ' + time);
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