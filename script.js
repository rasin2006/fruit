// Define the animals array with their names and image file paths
const animals = [
    { name: 'Apple', image: 'apple.jpg' },
    { name: 'Avocado', image: 'avocado.jpg' },
    { name: 'Banana', image: 'banana.jpg' },
    { name: 'Blueberry', image: 'blueberry.jpg' },
    { name: 'Cantaloupe', image: 'cantaloupe.jpg' },
    { name: 'Cherry', image: 'cherry.jpg' },
    { name: 'Mandarin', image: 'mandarin.jpg' },
    { name: 'Coconut', image: 'coconut.jpg' },
    { name: 'Date', image: 'date.jpg' },
    { name: 'Dragonfruit', image: 'dragonfruit.jpg' },
    { name: 'Durian', image: 'durian.jpg' },
    { name: 'Fig', image: 'fig.jpg' },
    { name: 'Cap gooseberry', image: 'cap-gooseberry.jpeg' },
    { name: 'Grape', image: 'grape.jpeg' },
    { name: 'Grapefruit', image: 'grapefruit.jpeg' },
    { name: 'Guava', image: 'guava.jpg' },
    { name: 'Honeydew', image: 'honeydew.webp' },
    { name: 'Jackfruit', image: 'jackfruit.jpg' },
    { name: 'Kiwi', image: 'kiwi.jpg' },
    { name: 'Kumquat', image: 'kumquat.jpg' },
    { name: 'Lemon', image: 'lemon.png' },
    { name: 'Lime', image: 'lime.jpg' },
    { name: 'Lychee', image: 'lychee.jpg' },
    { name: 'Mango', image: 'mango.jpg' },
    { name: 'Orange', image: 'orange.jpg' },
    { name: 'Papaya', image: 'papaya.jpg' },
    { name: 'Passionfruit', image: 'passionfruit.jpg' },
    { name: 'Peach', image: 'peach.jpg' },
    { name: 'Pear', image: 'pear.webp' },
    { name: 'Persimmon', image: 'persimmon.jpg' },
    { name: 'Pineapple', image: 'pineapple.jpeg' },
    { name: 'Plum', image: 'plum.jpg' },
    { name: 'Pomegranate', image: 'pomegranate.jpg' },
    { name: 'Raspberry', image: 'raspberry.jpg' },
    { name: 'Starfruit', image: 'starfruit.jpeg' },
    { name: 'Strawberry', image: 'strawberry.jpeg' },
    { name: 'Tangerine', image: 'tangerine.jpg' },
    { name: 'Watermelon', image: 'watermelon.jpg' },
    { name: 'Wood apple', image: 'wood-apple.jpg' },
    { name: 'Uvaria rufa', image: 'uvaria-rufa.jpg' },
    { name: 'Mini passionfruit', image: 'mini-passion-fruit.jpg' },
    { name: 'Rambutan', image: 'rambutan.jpeg' },
    { name: 'Java plum', image: 'java-plum.jpg' },
    { name: 'Water apple', image: 'water-apple.jpg' },
    { name: 'Mangosteen', image: 'mangosteen.jpeg' },
    { name: 'Sugar apple', image: 'sugar-apple.jpg' },
    { name: 'Soursop', image: 'soursop.jpeg' },
    { name: 'Ice apple', image: 'palmfruit.jpg' },
    { name: 'Jujube', image: 'jujube.jpeg' },
    { name: 'Manila Tamarind', image: 'manila-tamarind.jpg' },
    { name: 'Tamarind', image: 'tamarind.jpeg' },
    { name: 'Sapodilla', image: 'sapodilla.jpg' },
    { name: 'Cotton fruit', image: 'cotton-fruit.jpeg' },
    { name: 'Longan', image: 'longan.jpeg' },
    { name: 'Bilimbi', image: 'bilimbi.jpeg' },
    { name: 'Cashew Apple', image: 'cashew-apple.jpeg' },
    { name: 'Egg Fruit', image: 'egg-fruit.jpg' },
    { name: 'June plum', image: 'june-plum.jpg' },
    { name: 'Yellow Cheesewood', image: 'yellow-cheesewood.jpg' },
    { name: 'Bael Fruit', image: 'bael-fruit.jpg' },
    { name: 'Velvet Tamarind', image: 'velvet-tamarind.jpg' },
    { name: 'Gooseberry', image: 'gooseberry.jpg' },
    { name: 'Star Gooseberry', image: 'star-gooseberry.jpg' },
    { name: 'Plum Mango', image: 'plum-mango.jpeg' }

];

// Variables for tracking the current level and shuffled order of animals
let currentLevel = 0;
let shuffledLevels = shuffleArray([...Array(animals.length).keys()]);
let clickCount = 0;  // Counter for image clicks

// Function to start the game
function startGame() {
    loadLevel(currentLevel);
    // Add click event listener to animal image for speech
    document.getElementById('animalImage').addEventListener('click', speakAnimalName);
    const animal = animals[shuffledLevels[currentLevel]];
    const utterance = new SpeechSynthesisUtterance(animal.name);
    speechSynthesis.speak(utterance);
}

// Function to load each level randomly
function loadLevel(levelIndex) {
    const level = shuffledLevels[levelIndex];
    const animal = animals[level];
    const wrongOptions = animals.filter(a => a !== animal);

    document.getElementById('animalImage').src = animal.image;

    const options = shuffleArray([animal.name, ...getRandomOptions(wrongOptions, 3)]);
    options.forEach((option, index) => {
        document.getElementById(`option${index}`).textContent = option;
    });
    // Reset click count for the new level
    clickCount = 0;

    document.getElementById('gameMessage').textContent = '';
}

// Function to make the browser say the animal name when image is clicked
function speakAnimalName() {
    if (clickCount < 2) {  // Allow speaking the name only if clicked less than 3 times
        const animal = animals[shuffledLevels[currentLevel]];
        const utterance = new SpeechSynthesisUtterance(animal.name);
        speechSynthesis.speak(utterance);
        clickCount++;  // Increment click count
    }
}

// Function to check if the selected answer is correct
function checkAnswer(selectedIndex) {
    const selectedOption = document.getElementById(`option${selectedIndex}`).textContent;
    const correctAnswer = animals[shuffledLevels[currentLevel]].name;

    if (selectedOption === correctAnswer) {
        document.getElementById('gameMessage').textContent = 'Correct!';
        setTimeout(() => {
            nextLevel();
        }, 1000);
    }
}
// Function to play the sound if correct
function checkAnswer(selectedIndex) {
    const selectedOption = document.getElementById(`option${selectedIndex}`).textContent;
    const correctAnswer = animals[shuffledLevels[currentLevel]].name;

    if (selectedOption === correctAnswer) {
        document.getElementById('gameMessage').textContent = 'Correct!';
        // Play the correct answer sound
        document.getElementById('correctSound').play();
        setTimeout(() => {
            nextLevel();
        }, 1000);
    } else {
        // Play the shake animation on the button
        const selectedButton = document.getElementById(`option${selectedIndex}`);
        shakeButton(selectedButton);
    }
}

// Function to shake the button
function shakeButton(button) {
    button.classList.add('shake');

    // Remove the 'shake' class after the animation ends
    setTimeout(() => {
        button.classList.remove('shake');
    }, 500); // Match the animation duration in CSS
}


// Function to move to the next random level
function nextLevel() {
    currentLevel = (currentLevel + 1) % animals.length;
    if (currentLevel === 0) shuffledLevels = shuffleArray([...Array(animals.length).keys()]);
    loadLevel(currentLevel);
    const animal = animals[shuffledLevels[currentLevel]];
    const utterance = new SpeechSynthesisUtterance(animal.name);
    speechSynthesis.speak(utterance);
}

// Helper function to get random options from the wrong answers
function getRandomOptions(arr, count) {
    const shuffled = shuffleArray(arr);
    return shuffled.slice(0, count).map(item => item.name);
}

// Helper function to shuffle an array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}
// Select all buttons with the class 'option-button'
const buttons = document.querySelectorAll('.option-button');

// Add a click event listener to each button
buttons.forEach(button => {
  button.addEventListener('click', function() {
    // Disable the button
    this.disabled = true;

    // Optionally perform your desired action here, like moving to the next level
    handleButtonClick(this);

    // Re-enable the button after 1 second (1000 milliseconds)
    setTimeout(() => {
      this.disabled = false;
    }, 1400);  // Adjust the timeout period as needed
  });
});

function handleButtonClick(button) {
  // Add your button click handling logic here
  console.log(button.textContent + " clicked!");
}

function changeAnimalImage(animalName) {
    const animalImage = document.getElementById('animalImage');
    animalImage.src = ''; // Clear the image first
    setTimeout(() => {
        animalImage.src = `path/to/your/images/${animalName}.jpg`; // Then load the new image
    }, 10); // Small delay ensures the image is properly reset
}

// Start the game once the window loads
window.onload = startGame;
