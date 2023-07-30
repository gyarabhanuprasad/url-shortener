document.getElementById('urlForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const longUrl = document.getElementById('longUrlInput').value;

    try {
        const response = await fetch('/api/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ longUrl }),
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('shortUrl').textContent = data.shortUrl;
            document.getElementById('shortUrlContainer').style.display = 'block';
        } else {
            console.error('Error shortening URL:', data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
