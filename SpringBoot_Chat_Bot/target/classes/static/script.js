document.getElementById('sendBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value;

    if (userInput.trim() === "") {
        alert("Please enter a message");
        return;
    }

    try {
        console.log("Sending request to backend...");

        const response = await fetch(`http://localhost:8080/bot/chat?prompt=${encodeURIComponent(userInput)}`, {
            method: 'GET',
        });

        console.log("Response status:", response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const botResponse = await response.text();
        console.log("Bot response:", botResponse);

        document.getElementById('botResponse').innerText = botResponse;
        document.getElementById('responseContainer').style.display = 'block';
        document.getElementById('userInput').value = '';
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
        alert("Failed to get response from chatbot.");
    }
});
