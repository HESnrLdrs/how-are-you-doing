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
        text: "How are you coping with stress and anxiety at the moment?",
        options: [
            { text: "I'm using strategies that work, feeling reasonably calm", score: 5 },
            { text: "Managing with some effort, anxiety is there but under control", score: 4 },
            { text: "Finding it hard to manage, anxiety often takes over", score: 3 },
            { text: "Feeling overwhelmed by stress, struggling to cope", score: 2 },
            { text: "Constant high anxiety, nothing seems to help", score: 1 }
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
        text: "How are you managing health-related things like appointments and medications?",
        options: [
            { text: "Staying on top of everything", score: 5 },
            { text: "Managing most things, occasional lapses", score: 4 },
            { text: "Finding it hard to keep track", score: 3 },
            { text: "Missing appointments or medications quite regularly", score: 2 },
            { text: "Can't manage even basic health tasks", score: 1 }
        ]
    },
    {
        id: 10,
        dimension: "practical",
        text: "How organised do you feel right now?",
        options: [
            { text: "I've got clear plans and systems that work", score: 5 },
            { text: "Reasonably organised, managing to track most things", score: 4 },
            { text: "Things feel chaotic, hard to stay on top of it all", score: 3 },
            { text: "Very disorganised, constantly forgetting things", score: 2 },
            { text: "Complete chaos, no sense of organisation at all", score: 1 }
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
        text: "Do you have a sense of purpose or meaning right now?",
        options: [
            { text: "Yes, I've got a clear sense of purpose", score: 5 },
            { text: "Some sense of purpose, though it feels uncertain", score: 4 },
            { text: "Purpose feels unclear or quite distant", score: 3 },
            { text: "Very little sense of purpose at the moment", score: 2 },
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
            description: "You're managing the emotional side of things well. Whatever strategies you're using, they're working.",
            suggestions: [
                "Keep doing what you're doing – it's clearly helping",
                "Notice what's working so you can draw on it if things get tougher",
                "You might have some capacity to support others who are struggling"
            ]
        },
        managing: {
            range: [13, 20],
            label: "Managing",
            description: "You're coping reasonably well, though some days are harder than others. That's completely normal given what you're dealing with.",
            suggestions: [
                "Build on whatever's working for you already",
                "Talk to someone you trust about what you're going through",
                "Look after the basics – sleep, eating, a bit of fresh air",
                "Be patient with yourself when it feels harder"
            ]
        },
        struggling: {
            range: [5, 12],
            label: "Struggling",
            description: "You're finding it really hard to cope emotionally right now. That's completely understandable – what you're facing is genuinely difficult.",
            suggestions: [
                "Consider talking to a counsellor or therapist – they can really help",
                "Speak to your GP about how you're feeling",
                "Look for support groups with people who understand what you're going through",
                "Take things one day at a time – that's enough for now",
                "Please don't hesitate to ask for professional help"
            ]
        }
    },
    practical: {
        thriving: {
            range: [21, 25],
            label: "Thriving",
            description: "You're managing the practical side of things really well. The daily tasks and logistics are under control.",
            suggestions: [
                "Keep your systems going – they're working",
                "You might be able to help others with practical things",
                "Make a note of what's working in case you need to come back to it"
            ]
        },
        managing: {
            range: [13, 20],
            label: "Managing",
            description: "You're handling the essentials, though some things are slipping through the cracks. That's understandable.",
            suggestions: [
                "Focus on what absolutely has to get done, let other things wait",
                "Ask for specific help with practical things – people often want to help but don't know how",
                "Simple systems help – even just a list on the fridge",
                "You don't have to do everything – prioritise ruthlessly"
            ]
        },
        struggling: {
            range: [5, 12],
            label: "Struggling",
            description: "The practical side of things is overwhelming right now. You need some help with day-to-day tasks and getting organised.",
            suggestions: [
                "Reach out for practical support – family, friends, local services",
                "Break everything down into really small steps",
                "Write lists of what needs doing and who might be able to help",
                "Consider getting professional help – social services, Citizens Advice, financial advisers",
                "Focus only on absolute essentials for now – everything else can wait"
            ]
        }
    },
    self: {
        thriving: {
            range: [21, 25],
            label: "Thriving",
            description: "You're holding onto a strong sense of who you are, even through this disruption. That's a real strength.",
            suggestions: [
                "Keep doing the things that connect you to yourself",
                "Your sense of self can be a real anchor for other people too",
                "Keep nurturing the relationships that matter to you"
            ]
        },
        managing: {
            range: [13, 20],
            label: "Managing",
            description: "Your sense of who you are is holding up, though parts of your identity might feel challenged or uncertain. That's really common.",
            suggestions: [
                "Protect time for things that matter to you, even small things",
                "Stay connected to people who see you as you really are",
                "Remember that who you are can evolve through difficult times – that's okay",
                "Look for small ways to express yourself"
            ]
        },
        struggling: {
            range: [5, 12],
            label: "Struggling",
            description: "You're feeling quite disconnected from your sense of self right now. Who you are and what matters to you might feel lost or very uncertain.",
            suggestions: [
                "This loss of self is really common in major disruptions – you're not alone in this",
                "Working with a coach or therapist on rebuilding your sense of identity can genuinely help",
                "Start very small – just one meaningful thing or one real connection",
                "Be patient with yourself – your sense of self can be rebuilt, it just takes time",
                "Connect with others who've faced similar disruptions – they'll understand"
            ]
        }
    }
};
