// Questions for the How Are You Doing? Assessment
// Organized by dimension: Coping, Practical, Self

const questions = [
    // COPING QUESTIONS (5 questions)
    {
        id: 1,
        dimension: "coping",
        text: "How would you describe your emotional state right now?",
        options: [
            { text: "I feel emotionally stable and able to manage my feelings", score: 5 },
            { text: "I have ups and downs but generally feel in control", score: 4 },
            { text: "My emotions feel unpredictable and harder to manage", score: 3 },
            { text: "I often feel overwhelmed by my emotions", score: 2 },
            { text: "I feel emotionally exhausted most of the time", score: 1 }
        ]
    },
    {
        id: 2,
        dimension: "coping",
        text: "How well are you sleeping?",
        options: [
            { text: "Sleeping normally, feeling rested", score: 5 },
            { text: "Some sleep disruption but managing okay", score: 4 },
            { text: "Sleep is frequently disturbed", score: 3 },
            { text: "Significant sleep problems affecting my days", score: 2 },
            { text: "Sleep is very poor, barely functioning", score: 1 }
        ]
    },
    {
        id: 3,
        dimension: "coping",
        text: "How are you managing stress and anxiety?",
        options: [
            { text: "Using effective strategies, feeling reasonably calm", score: 5 },
            { text: "Managing with some effort, anxiety is present but controlled", score: 4 },
            { text: "Struggling to manage, anxiety often takes over", score: 3 },
            { text: "Overwhelmed by stress, limited ability to cope", score: 2 },
            { text: "Constant high anxiety, no effective coping strategies", score: 1 }
        ]
    },
    {
        id: 4,
        dimension: "coping",
        text: "Are you able to talk about what you're going through?",
        options: [
            { text: "Yes, I have people I can talk to and it helps", score: 5 },
            { text: "Sometimes, though it's not always easy", score: 4 },
            { text: "I find it difficult to open up", score: 3 },
            { text: "I rarely talk about it, even when I need to", score: 2 },
            { text: "I feel completely isolated and unable to share", score: 1 }
        ]
    },
    {
        id: 5,
        dimension: "coping",
        text: "How hopeful do you feel about the future?",
        options: [
            { text: "I can see a path forward and feel reasonably hopeful", score: 5 },
            { text: "Some days are hopeful, others less so", score: 4 },
            { text: "Hope feels distant right now", score: 3 },
            { text: "I struggle to see any positive future", score: 2 },
            { text: "I feel hopeless about what lies ahead", score: 1 }
        ]
    },
    
    // PRACTICAL QUESTIONS (5 questions)
    {
        id: 6,
        dimension: "practical",
        text: "How are you managing daily tasks and responsibilities?",
        options: [
            { text: "Keeping on top of things, managing well", score: 5 },
            { text: "Managing the essentials, some things slipping", score: 4 },
            { text: "Struggling to keep up, many things being delayed", score: 3 },
            { text: "Only managing the most urgent tasks", score: 2 },
            { text: "Unable to manage basic daily tasks", score: 1 }
        ]
    },
    {
        id: 7,
        dimension: "practical",
        text: "How is your financial situation?",
        options: [
            { text: "Stable and under control", score: 5 },
            { text: "Some concerns but manageable", score: 4 },
            { text: "Significant worries, limited resources", score: 3 },
            { text: "Serious financial pressure causing major stress", score: 2 },
            { text: "Critical financial crisis", score: 1 }
        ]
    },
    {
        id: 8,
        dimension: "practical",
        text: "Do you have the practical support you need?",
        options: [
            { text: "Yes, good support network helping with practical matters", score: 5 },
            { text: "Some support available when needed", score: 4 },
            { text: "Limited support, often managing alone", score: 3 },
            { text: "Very little practical support", score: 2 },
            { text: "No practical support available", score: 1 }
        ]
    },
    {
        id: 9,
        dimension: "practical",
        text: "How are you managing health-related tasks (appointments, medications, etc.)?",
        options: [
            { text: "Staying on top of everything health-related", score: 5 },
            { text: "Managing most things, occasional lapses", score: 4 },
            { text: "Struggling to keep track of health matters", score: 3 },
            { text: "Missing appointments or medications regularly", score: 2 },
            { text: "Unable to manage basic health tasks", score: 1 }
        ]
    },
    {
        id: 10,
        dimension: "practical",
        text: "How organized do you feel in dealing with your situation?",
        options: [
            { text: "Have clear plans and systems in place", score: 5 },
            { text: "Reasonably organized, managing to track things", score: 4 },
            { text: "Things feel chaotic, hard to keep organized", score: 3 },
            { text: "Very disorganized, constantly forgetting things", score: 2 },
            { text: "Complete chaos, no sense of organization", score: 1 }
        ]
    },
    
    // SELF QUESTIONS (5 questions)
    {
        id: 11,
        dimension: "self",
        text: "How connected do you feel to your sense of who you are?",
        options: [
            { text: "I still feel like myself, my identity is intact", score: 5 },
            { text: "Mostly myself, though some aspects feel changed", score: 4 },
            { text: "I sometimes don't recognize myself", score: 3 },
            { text: "I feel quite disconnected from who I used to be", score: 2 },
            { text: "I've lost all sense of who I am", score: 1 }
        ]
    },
    {
        id: 12,
        dimension: "self",
        text: "Are you able to do things that matter to you or bring you joy?",
        options: [
            { text: "Yes, I'm maintaining activities that are important to me", score: 5 },
            { text: "Some meaningful activities, less than before", score: 4 },
            { text: "Very few moments of meaning or enjoyment", score: 3 },
            { text: "Rarely doing anything meaningful", score: 2 },
            { text: "Nothing brings meaning or joy anymore", score: 1 }
        ]
    },
    {
        id: 13,
        dimension: "self",
        text: "How do you feel about your relationships with others?",
        options: [
            { text: "Relationships feel strong and supportive", score: 5 },
            { text: "Some good connections, others more strained", score: 4 },
            { text: "Relationships feel difficult or distant", score: 3 },
            { text: "Significant relationship breakdown or conflict", score: 2 },
            { text: "Feeling completely isolated or disconnected", score: 1 }
        ]
    },
    {
        id: 14,
        dimension: "self",
        text: "Do you have a sense of purpose or meaning in your life right now?",
        options: [
            { text: "Yes, I have clear sense of purpose", score: 5 },
            { text: "Some sense of purpose, though uncertain", score: 4 },
            { text: "Purpose feels unclear or distant", score: 3 },
            { text: "Very little sense of purpose", score: 2 },
            { text: "No sense of purpose or meaning", score: 1 }
        ]
    },
    {
        id: 15,
        dimension: "self",
        text: "How much control do you feel you have over your situation?",
        options: [
            { text: "I feel I have reasonable control and can influence outcomes", score: 5 },
            { text: "Some control, though external factors are significant", score: 4 },
            { text: "Limited control, mostly reacting to events", score: 3 },
            { text: "Very little control, feeling powerless", score: 2 },
            { text: "No control at all, completely at the mercy of circumstances", score: 1 }
        ]
    }
];

// Interpretation guidance for results
const interpretations = {
    coping: {
        thriving: {
            range: [21, 25],
            label: "Thriving",
            description: "You're managing the emotional and psychological aspects well. You have effective coping strategies and emotional resilience.",
            suggestions: [
                "Maintain your current coping strategies",
                "Consider what's working well so you can draw on it if things get harder",
                "Look for ways to support others who may be struggling"
            ]
        },
        managing: {
            range: [13, 20],
            label: "Managing",
            description: "You're coping reasonably well but there are challenges. Some days are harder than others.",
            suggestions: [
                "Build on the coping strategies that are working",
                "Consider talking to someone you trust about your situation",
                "Look after basics like sleep and stress management",
                "Be patient with yourself on difficult days"
            ]
        },
        struggling: {
            range: [5, 12],
            label: "Struggling",
            description: "You're finding it hard to cope emotionally right now. This is understandable given what you're facing.",
            suggestions: [
                "Consider reaching out to a counselor or therapist",
                "Talk to your GP about how you're feeling",
                "Connect with support groups who understand your situation",
                "Focus on one day at a time",
                "Don't hesitate to ask for professional help"
            ]
        }
    },
    practical: {
        thriving: {
            range: [21, 25],
            label: "Thriving",
            description: "You're managing the practical aspects of your situation effectively. Daily tasks and logistics are under control.",
            suggestions: [
                "Keep your organizational systems going",
                "You might have capacity to help others with practical matters",
                "Document what's working in case you need to share it"
            ]
        },
        managing: {
            range: [13, 20],
            label: "Managing",
            description: "You're handling the essentials but some things are challenging. Practical matters need attention.",
            suggestions: [
                "Focus on the most important practical tasks first",
                "Ask for specific practical help where you need it",
                "Consider simple systems to track important tasks",
                "Don't try to do everything - prioritize ruthlessly"
            ]
        },
        struggling: {
            range: [5, 12],
            label: "Struggling",
            description: "Practical matters are overwhelming right now. You need support with daily tasks and organization.",
            suggestions: [
                "Reach out for practical support - family, friends, community services",
                "Break tasks into very small steps",
                "Make lists of what needs doing and who could help",
                "Consider professional help (social services, financial advice, etc.)",
                "Focus only on absolute essentials for now"
            ]
        }
    },
    self: {
        thriving: {
            range: [21, 25],
            label: "Thriving",
            description: "You're maintaining a strong sense of self despite the disruption. Your identity and purpose remain intact.",
            suggestions: [
                "Continue the activities that connect you to yourself",
                "Your sense of self can be an anchor for others",
                "Keep nurturing the relationships that matter"
            ]
        },
        managing: {
            range: [13, 20],
            label: "Managing",
            description: "Your sense of self is holding up though parts of your identity may feel challenged. Some meaningful activities continue.",
            suggestions: [
                "Protect time for activities that matter to you",
                "Stay connected to people who see you as you really are",
                "Remember that identity can evolve through difficult times",
                "Look for small ways to express who you are"
            ]
        },
        struggling: {
            range: [5, 12],
            label: "Struggling",
            description: "You're experiencing significant challenges to your sense of self. Identity and meaning feel lost or uncertain.",
            suggestions: [
                "This loss of self is common in major disruptions - you're not alone",
                "Consider working with a coach or therapist on rebuilding identity",
                "Start very small - one meaningful activity or connection",
                "Be patient - sense of self can be rebuilt",
                "Connect with others who've faced similar disruptions"
            ]
        }
    }
};
