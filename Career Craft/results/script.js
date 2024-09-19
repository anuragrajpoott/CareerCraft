document.getElementById('hobbyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const answers = {};
    
    formData.forEach((value, key) => {
        answers[key] = value;
    });

    // Example: Determine hobby based on answers
    const hobby = calculateHobby(answers);
    
    // Redirect to result page with the hobby data
    window.location.href = index.html?hobby:`${encodeURIComponent(hobby)}`;
});

function calculateHobby(answers) {
    // Replace with your logic to calculate the hobby based on answers
    if (answers.question1 === 'painting') {
        return 'Artist';
    } else {
        return 'Photographer';
    }
}

const urlParams = new URLSearchParams(window.location.search);
const hobby = urlParams.get('hobby');

// Display the result
document.getElementById('result').textContent = "Your hobby that could be turned into a profession is  `${hobby}`";