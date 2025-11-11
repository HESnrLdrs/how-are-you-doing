// Slider-based questions for How Are You Doing?
// Each question gets a 0-100 slider response
// Dimensions: Coping (5q), Practical (5q), Personal (5q)

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
    
    // PERSONAL QUESTIONS
    {
        id: 11,
        dimension: "personal",
        text: "Can you still do the things that are important to you?",
        leftLabel: "Can't do them",
        rightLabel: "Still doing them"
    },
    {
        id: 12,
        dimension: "personal",
        text: "Are you able to do things that matter to you?",
        leftLabel: "Nothing meaningful",
        rightLabel: "Doing what matters"
    },
    {
        id: 13,
        dimension: "personal",
        text: "How do you feel about your relationships?",
        leftLabel: "Disconnected",
        rightLabel: "Strong connections"
    },
    {
        id: 14,
        dimension: "personal",
        text: "Do you have a sense of purpose right now?",
        leftLabel: "No purpose",
        rightLabel: "Clear purpose"
    },
    {
        id: 15,
        dimension: "personal",
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

// Get needle rotation for gauge
function getNeedleRotation(score) {
    // E at 8 o'clock (-135deg), F at 4 o'clock (+135deg)
    // Total rotation span: 270 degrees
    // 0 = -135deg (AT E), 100 = +135deg (AT F)
    return -135 + (score * 2.7);
}

// Interpretations for each dimension and zone
const interpretations = {
    coping: {
        critical: {
            description: "You're in real difficulty emotionally right now. This is serious and you need support.",
            action: "Please contact your GP today. If it's out of hours, call 111. If you're in crisis right now, call Samaritans on 116 123 (available 24/7). You need support - this is too much to handle alone."
        },
        struggling: {
            description: "You're finding it very hard to cope emotionally. The feelings are overwhelming most of the time.",
            action: "Talk to your GP about how you're feeling - they can help. Consider counselling or therapy. Speak to someone you trust about what you're going through. You don't have to cope with this alone."
        },
        managing: {
            description: "You're getting by emotionally, though some days are much harder than others. That's completely normal when life is difficult.",
            action: "Keep doing whatever's helping you get through each day. Talk to someone you trust when things feel tough. Your GP can point you to support services if you need them."
        },
        'doing-well': {
            description: "You're coping well emotionally. You have some difficult moments but you're managing your feelings reasonably well.",
            action: "Whatever you're doing is working - keep it up. Stay connected to people who support you. Keep an eye on your emotional wellbeing as things change."
        },
        thriving: {
            description: "You're managing the emotional side really well. Whatever strategies you're using, they're working.",
            action: "Keep doing what you're doing. You might be able to support others who are struggling emotionally."
        }
    },
    practical: {
        critical: {
            description: "Daily life has become unmanageable. You can't keep up with even basic tasks right now.",
            action: "You need practical help urgently. Ask family or friends for specific help (shopping, appointments, meals). Contact local support services. Speak to your GP about practical support options. You can't do this alone right now - that's okay."
        },
        struggling: {
            description: "The practical side of things is overwhelming you. Daily tasks feel impossible and things are piling up.",
            action: "Break everything down into really small steps. Ask for specific practical help - people want to help but need to know what you need. Focus only on what absolutely has to get done today. Let other things wait."
        },
        managing: {
            description: "You're handling the essentials, though some things are slipping through the cracks. You're keeping your head above water.",
            action: "Focus on what absolutely has to get done - let other things wait. It's okay if some things aren't perfect right now. Ask for help with specific practical tasks when you need it."
        },
        'doing-well': {
            description: "You're handling practical matters well. Most things are under control and you're managing your commitments.",
            action: "Keep your current systems going - they're working. Stay organized and don't take on too much extra. You're doing well."
        },
        thriving: {
            description: "Daily life is running smoothly. You're on top of tasks, logistics, and commitments.",
            action: "Your systems are working really well. You might be able to help others with practical things they're struggling with."
        }
    },
    personal: {
        critical: {
            description: "You feel like you've lost yourself completely. Who you are and what matters to you feels completely gone.",
            action: "This disconnection is serious but recoverable with help. Talk to your GP about how you're feeling. Consider counselling or coaching support. Reach out to someone who knows you well and can remind you of who you are."
        },
        struggling: {
            description: "You're feeling very disconnected from who you are. What used to matter feels meaningless and you don't recognize yourself.",
            action: "Start very small - do one tiny thing that used to matter to you, even if it feels pointless. Talk to someone who knew you before this disruption. Consider working with a coach or therapist on rebuilding your sense of self. This takes time."
        },
        managing: {
            description: "Your sense of who you are is holding up, though parts feel challenged or uncertain. Some days you feel like yourself, other days less so.",
            action: "Protect some time for things that matter to you, even small things. Stay connected to people who see you as you really are. It's okay if your sense of self is shifting - that's normal during disruption."
        },
        'doing-well': {
            description: "You're maintaining a good sense of who you are. Your values and what matters to you are still clear, even if everything else is changing.",
            action: "Keep doing the things that connect you to yourself. Keep nurturing relationships that remind you of who you are. Your sense of self is a real strength right now."
        },
        thriving: {
            description: "You have a strong, clear sense of who you are and what matters to you. Your identity feels solid despite any disruption.",
            action: "Your sense of self is a real asset. Keep doing what connects you to who you are. You might be able to help others who are feeling lost right now."
        }
    }
};
