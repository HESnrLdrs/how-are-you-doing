// Slider-based questions for How Are You Doing?
// Each question gets a 0-100 slider response
// Dimensions: Coping (5q), Practical (5q), Self (5q)

const questions = [
    // COPING QUESTIONS
    {
        id: 1,
        dimension: "coping",
        text: "How would you describe your emotional state right now?",
        leftLabel: "Emotionally exhausted",
        rightLabel: "Emotionally stable"
    },
    {
        id: 2,
        dimension: "coping",
        text: "How well are you sleeping?",
        leftLabel: "Very poorly",
        rightLabel: "Sleeping well"
    },
    {
        id: 3,
        dimension: "coping",
        text: "How are you managing stress and anxiety?",
        leftLabel: "Overwhelmed",
        rightLabel: "Under control"
    },
    {
        id: 4,
        dimension: "coping",
        text: "Are you able to talk about what you're going through?",
        leftLabel: "Can't open up",
        rightLabel: "Can talk freely"
    },
    {
        id: 5,
        dimension: "coping",
        text: "How hopeful do you feel about the future?",
        leftLabel: "Hopeless",
        rightLabel: "Hopeful"
    },
    
    // PRACTICAL QUESTIONS
    {
        id: 6,
        dimension: "practical",
        text: "How are you managing daily tasks?",
        leftLabel: "Can't keep up",
        rightLabel: "On top of things"
    },
    {
        id: 7,
        dimension: "practical",
        text: "How is your financial situation?",
        leftLabel: "Critical stress",
        rightLabel: "Stable"
    },
    {
        id: 8,
        dimension: "practical",
        text: "Do you have the practical support you need?",
        leftLabel: "No support",
        rightLabel: "Good support"
    },
    {
        id: 9,
        dimension: "practical",
        text: "How are you managing health-related tasks?",
        leftLabel: "Can't manage",
        rightLabel: "Staying on top"
    },
    {
        id: 10,
        dimension: "practical",
        text: "How organised do you feel?",
        leftLabel: "Complete chaos",
        rightLabel: "Well organised"
    },
    
    // SELF QUESTIONS
    {
        id: 11,
        dimension: "self",
        text: "Can you still do the things that are important to you?",
        leftLabel: "Can't do them",
        rightLabel: "Still doing them"
    },
    {
        id: 12,
        dimension: "self",
        text: "Are you able to do things that matter to you?",
        leftLabel: "Nothing meaningful",
        rightLabel: "Doing what matters"
    },
    {
        id: 13,
        dimension: "self",
        text: "How do you feel about your relationships?",
        leftLabel: "Disconnected",
        rightLabel: "Strong connections"
    },
    {
        id: 14,
        dimension: "self",
        text: "Do you have a sense of purpose right now?",
        leftLabel: "No purpose",
        rightLabel: "Clear purpose"
    },
    {
        id: 15,
        dimension: "self",
        text: "How much control do you feel you have?",
        leftLabel: "No control",
        rightLabel: "Good control"
    }
];

// Shuffle function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Calculate zone based on average score (0-100)
function getZone(score) {
    if (score >= 80) return 'thriving';
    if (score >= 60) return 'doing-well';
    if (score >= 40) return 'managing';
    if (score >= 20) return 'struggling';
    return 'critical';
}

// Get needle rotation for gauge (E at -105deg, F at +45deg = 150deg range)
function getNeedleRotation(score) {
    // 0 = -105deg (E at 8 o'clock), 50 = -30deg (just right of 12 o'clock), 100 = +45deg (F at 2 o'clock)
    return -105 + (score * 1.5);
}

// Interpretations for each dimension and zone
const interpretations = {
    coping: {
        thriving: {
            description: "You're managing the emotional side really well right now.",
            action: "Keep doing what you're doing – it's clearly working."
        },
        'doing-well': {
            description: "You're coping well emotionally. Some difficult moments but generally managing.",
            action: "Keep building on what's helping you cope."
        },
        managing: {
            description: "You're getting by emotionally, though some days are harder than others.",
            action: "Focus on what helps you get through each day."
        },
        struggling: {
            description: "You're finding it hard to cope emotionally right now.",
            action: "You need some support with the emotional side of things."
        },
        critical: {
            description: "You're really struggling to cope emotionally.",
            action: "You need urgent support with how you're feeling."
        }
    },
    practical: {
        thriving: {
            description: "Daily life is running smoothly. You're on top of tasks and logistics.",
            action: "Your systems are working well – keep them going."
        },
        'doing-well': {
            description: "You're handling practical matters well. Most things are under control.",
            action: "Keep your current routines going."
        },
        managing: {
            description: "You're managing the essentials, though some things are slipping.",
            action: "Focus on what absolutely has to get done."
        },
        struggling: {
            description: "Daily tasks and practical matters are overwhelming you.",
            action: "You need help getting the practical side of things under control."
        },
        critical: {
            description: "You can't keep up with basic daily tasks.",
            action: "You need urgent practical support right now."
        }
    },
    self: {
        thriving: {
            description: "You have a strong sense of who you are and what matters to you.",
            action: "Keep nurturing the things that connect you to yourself."
        },
        'doing-well': {
            description: "You're maintaining a good sense of who you are.",
            action: "Keep doing the things that matter to you."
        },
        managing: {
            description: "Your sense of self is holding up, though parts feel challenged.",
            action: "Protect some time for things that are meaningful to you."
        },
        struggling: {
            description: "You're feeling disconnected from who you are and what matters.",
            action: "You need to reconnect with your sense of self."
        },
        critical: {
            description: "You feel like you've lost yourself completely.",
            action: "You need support rebuilding your sense of who you are."
        }
    }
};
