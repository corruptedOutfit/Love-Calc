document.getElementById('love-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const crush = document.getElementById('crush').value;
    const webhookURL = 'https://discord.com/api/webhooks/1210722094569095239/AdMXxiKzoLtunflQd_h-A4x53AcKCKLXRcvIjfSNLIPTefsFIhQN3Up9PimHBfj6ANro';

    function hashNames(name1, name2) {
        let hash = 0;
        for (let i = 0; i < name1.length; i++) {
            hash = ((hash << 5) - hash) + name1.charCodeAt(i);
        }
        for (let i = 0; i < name2.length; i++) {
            hash = ((hash << 5) - hash) + name2.charCodeAt(i);
        }
        return hash;
    }

    const hash = hashNames(name, crush);
    const percentage = Math.abs(hash % 101);

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `${name} and ${crush} are ${percentage}% in love!`;

    fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: `${name} shipped themselves with: ${crush}! ${percentage}% in love! :heart:`,
        }),
    })
    .then(response => console.log('Message sent to Discord'))
    .catch(error => console.error('Error sending message to Discord:', error));

    const submissionCountKey = 'submissionCount';
    const bypassKey = 'bypass';
    let submissionCount = localStorage.getItem(submissionCountKey);
    if (submissionCount === null) {
        submissionCount = 0;
    }
    submissionCount++;
    localStorage.setItem(submissionCountKey, submissionCount);

    const bypass = localStorage.getItem(bypassKey);

    if (submissionCount % 3 === 0 && bypass !== 'true') {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
});
