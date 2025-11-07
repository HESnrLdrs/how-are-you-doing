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
        text: "How connected do you feel to who you are?",
        leftLabel: "Lost myself",
        rightLabel: "Still myself"
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
    if (score >= 70) return 'thriving';
    if (score >= 35) return 'managing';
    return 'struggling';
}

// Get needle rotation for gauge (-135deg to +45deg = 180deg range)
function getNeedleRotation(score) {
    // 0 = -135deg (left), 50 = -45deg (middle), 100 = +45deg (right)
    return -135 + (score * 1.8);
}

// Interpretations for each dimension and zone
const interpretations = {
    coping: {
        thriving: {
            description: "You're managing the emotional side of things well. Whatever you're doing, it's working.",
            action: "Keep doing what you're doing – it's clearly helping you cope."
        },
        managing: {
            description: "You're coping reasonably well, though some days are harder than others. That's completely normal.",
            action: "Build on whatever's working for you already. Talk to someone you trust about what you're going through."
        },
        struggling: {
            description: "You're finding it really hard to cope emotionally right now. That's completely understandable.",
            action: "Consider talking to a counsellor or therapist – they can really help. Speak to your GP about how you're feeling."
        }
    },
    practical: {
        thriving: {
            description: "You're managing the practical side of things really well. Daily tasks and logistics are under control.",
            action: "Keep your systems going – they're working. You might be able to help others with practical things."
        },
        managing: {
            description: "You're handling the essentials, though some things are slipping through the cracks. That's understandable.",
            action: "Focus on what absolutely has to get done, let other things wait. Ask for specific help with practical things."
        },
        struggling: {
            description: "The practical side of things is overwhelming you right now. You need some help with day-to-day tasks.",
            action: "Reach out for practical support – family, friends, local services. Break everything down into really small steps."
        }
    },
    self: {
        thriving: {
            description: "You're holding onto a strong sense of who you are. That's a real strength to build on.",
            action: "Keep doing the things that connect you to yourself. Keep nurturing the relationships that matter to you."
        },
        managing: {
            description: "Your sense of who you are is holding up, though parts of your identity might feel challenged. That's really common.",
            action: "Protect time for things that matter to you, even small things. Stay connected to people who see you as you really are."
        },
        struggling: {
            description: "You're feeling quite disconnected from your sense of self right now. Who you are and what matters might feel lost.",
            action: "This loss of self is really common when life disrupts you – you're not alone. Working with a coach or therapist can genuinely help."
        }
    }
};
