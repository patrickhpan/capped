const shortid = require('shortid');

const words = [
    "doge",
    "shibe",
    "pupper",
    "doggo",
    "bork",
    "woofer",
    "wow"
]

const lines = [
    "We're no strangers to love",
    "You know the rules and so do I",
    "A full commitment's what I'm thinking of",
    "You wouldn't get this from any other guy",
    "I just wanna tell you how I'm feeling",
    "Gotta make you understand",
    "Never gonna give you up",
    "Never gonna let you down",
    "Never gonna run around and desert you",
    "Never gonna make you cry",
    "Never gonna say goodbye",
    "Never gonna tell a lie and hurt you",
    "We've known each other for so long",
    "Your heart's been aching, but you're too shy to say it",
    "Inside, we both know what's been going on",
    "We know the game and we're gonna play it",
    "And if you ask me how I'm feeling",
    "Don't tell me you're too blind to see"
]

/**
 * Mock of generateCVRequest from msCogServ.js to conserve API calls
 */
function generateCVRequest(fileReadStream, visualFeatures = ['description', 'faces'], details = [], language = 'en') {
    return new Promise((resolve, reject) => {
        resolve({
            description: {
                tags: words.filter(() => { return (Math.random() > 0.5) }),
                captions: [{
                    text: lines[Math.round(Math.random() * lines.length)],
                    confidence: Math.random() * 0.7 + 0.3
                }],
            },
            requestId: shortid.generate(),
            metadata: {
                width: 426,
                height: 240,
                format: "Png"
            },
            faces: [
                {
                    age: Math.round(Math.random() * 100),
                    gender: (Math.random() > 0.5 ? "Male" : "Female"),
                    faceRectangle: {
                        left: Math.round(Math.random() * 350),
                        top: Math.round(Math.random() * 200),
                        width: Math.round(Math.random() * 20 + 20),
                        height: Math.round(Math.random() * 20 + 20)
                    }
                }
            ].slice(0, Math.round(Math.random()))
        })
    })
}

module.exports = {
    generateCVRequest
};