document.getElementById('love-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const crush = document.getElementById('crush').value;
    const webhookURL = 'hook';

    // Simple hashing function to convert names into a consistent number
    function hashNames(name1, name2) {
        let hash = 0;
        for (let i =   0; i < name1.length; i++) {
            hash = ((hash << 5) - hash) + name1.charCodeAt(i);
        }
        for (let i =   0; i < name2.length; i++) {
            hash = ((hash << 5) - hash) + name2.charCodeAt(i);
        }
        return hash;
    }

    // Generate a consistent percentage based on the hashed names
    const hash = hashNames(name, crush);
    const percentage = Math.abs(hash % 101); // Ensure the percentage is between   0 and   100

    // Display the result
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `${name} and ${crush} are ${percentage}% in love!`;

    // Send the message to Discord
    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: `${name} and ${crush} are ${percentage}% in love!`,
        }),
    })
    .then(response => console.log('Message sent to Discord'))
    .catch(error => console.error('Error sending message to Discord:', error));

    // Check if the user has submitted the form three times
    const submissionCountKey = 'submissionCount';
    let submissionCount = localStorage.getItem(submissionCountKey);
    if (submissionCount === null) {
        submissionCount = 0;
    }
    submissionCount++;
    localStorage.setItem(submissionCountKey, submissionCount);

    if (submissionCount % 3 === 0) {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
});
