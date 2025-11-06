// Main Application Logic for How Are You Doing?

const app = {
    currentQuestion: 0,
    responses: {},
    
    // Shuffle array using Fisher-Yates algorithm
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },
    
    // Initialize the application
    init() {
        // Randomize questions to avoid response patterns
        window.shuffledQuestions = this.shuffleArray(questions);
        this.showScreen('welcome-screen');
    },
    
    // Start the assessment
    startAssessment() {
        this.currentQuestion = 0;
        this.responses = {};
        // Re-shuffle questions for new randomization each time
        window.shuffledQuestions = this.shuffleArray(questions);
        this.showScreen('question-screen');
        this.displayQuestion();
    },
    
    // Show a specific screen
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    },
    
    // Display the current question
    displayQuestion() {
        const question = window.shuffledQuestions[this.currentQuestion];
        const totalQuestions = window.shuffledQuestions.length;
        
        // Update progress bar
        const progress = ((this.currentQuestion + 1) / totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        document.getElementById('current-q').textContent = this.currentQuestion + 1;
        document.getElementById('total-q').textContent = totalQuestions;
        
        // Update question text
        document.getElementById('question-text').textContent = question.text;
        
        // Create response options
        const optionsContainer = document.getElementById('response-options');
        optionsContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const label = document.createElement('label');
            label.className = 'response-option';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'response';
            radio.value = option.score;
            radio.id = `option-${index}`;
            
            // Check if this option was previously selected
            if (this.responses[question.id] === option.score) {
                radio.checked = true;
                label.classList.add('selected');
            }
            
            // Add event listener for selection
            radio.addEventListener('change', () => {
                this.responses[question.id] = option.score;
                document.querySelectorAll('.response-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                label.classList.add('selected');
                this.updateNavigationButtons();
            });
            
            const text = document.createElement('span');
            text.textContent = option.text;
            
            label.appendChild(radio);
            label.appendChild(text);
            optionsContainer.appendChild(label);
        });
        
        this.updateNavigationButtons();
    },
    
    // Update navigation button states
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const currentQuestion = window.shuffledQuestions[this.currentQuestion];
        
        // Previous button
        if (this.currentQuestion === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
        }
        
        // Next button
        const hasResponse = this.responses[currentQuestion.id] !== undefined;
        nextBtn.disabled = !hasResponse;
        
        if (this.currentQuestion === window.shuffledQuestions.length - 1) {
            nextBtn.textContent = 'See Results';
        } else {
            nextBtn.textContent = 'Next';
        }
    },
    
    // Move to previous question
    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
        }
    },
    
    // Move to next question or show results
    nextQuestion() {
        const currentQuestion = window.shuffledQuestions[this.currentQuestion];
        
        if (this.responses[currentQuestion.id] === undefined) {
            return; // Don't proceed if no response
        }
        
        if (this.currentQuestion < window.shuffledQuestions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        } else {
            this.showResults();
        }
    },
    
    // Calculate scores for each dimension
    calculateScores() {
        const scores = {
            coping: { total: 0, count: 0 },
            practical: { total: 0, count: 0 },
            self: { total: 0, count: 0 }
        };
        
        questions.forEach(question => {
            const response = this.responses[question.id];
            if (response !== undefined) {
                scores[question.dimension].total += response;
                scores[question.dimension].count++;
            }
        });
        
        return {
            coping: scores.coping.total,
            practical: scores.practical.total,
            self: scores.self.total
        };
    },
    
    // Get interpretation for a score
    getInterpretation(dimension, score) {
        const dimensionInterps = interpretations[dimension];
        
        for (const level in dimensionInterps) {
            const interp = dimensionInterps[level];
            if (score >= interp.range[0] && score <= interp.range[1]) {
                return interp;
            }
        }
        
        return dimensionInterps.struggling; // Default fallback
    },
    
    // Show results screen
    showResults() {
        const scores = this.calculateScores();
        
        // Update each dimension's results
        ['coping', 'practical', 'self'].forEach(dimension => {
            const score = scores[dimension];
            const interpretation = this.getInterpretation(dimension, score);
            
            // Update score display
            document.getElementById(`${dimension}-score`).textContent = score;
            
            // Update label
            const labelElement = document.getElementById(`${dimension}-label`);
            labelElement.textContent = interpretation.label;
            labelElement.className = `score-label ${interpretation.label.toLowerCase()}`;
            
            // Update description
            document.getElementById(`${dimension}-description`).textContent = interpretation.description;
        });
        
        // Generate overall guidance
        this.displayOverallGuidance(scores);
        
        this.showScreen('results-screen');
    },
    
    // Display overall guidance based on all scores
    displayOverallGuidance(scores) {
        const interpretations = {
            coping: this.getInterpretation('coping', scores.coping),
            practical: this.getInterpretation('practical', scores.practical),
            self: this.getInterpretation('self', scores.self)
        };
        
        const strugglingAreas = [];
        if (scores.coping <= 12) strugglingAreas.push('coping');
        if (scores.practical <= 12) strugglingAreas.push('practical');
        if (scores.self <= 12) strugglingAreas.push('self');
        
        let guidance = '';
        let nextSteps = [];
        
        if (strugglingAreas.length >= 2) {
            guidance = "You're facing significant challenges across multiple areas right now. This is a time to reach out for professional support and focus on the basics. There's no shame in finding things hard - what you're going through is genuinely difficult.";
            nextSteps = [
                "Consider speaking with your GP or a counselor as soon as possible",
                "Reach out to one trusted person and tell them you're struggling",
                "Focus only on the absolute essentials for the next few days",
                "Look into crisis support services if you need immediate help",
                "Remember: asking for help is a sign of strength, not weakness"
            ];
        } else if (strugglingAreas.length === 1) {
            const area = strugglingAreas[0];
            guidance = `You're doing well in some areas but struggling with ${area}. This suggests a focused area where support could make a real difference. Your strengths in other areas can help you address this challenge.`;
            nextSteps = interpretations[area].suggestions;
        } else {
            const managingAreas = [];
            if (scores.coping >= 13 && scores.coping <= 20) managingAreas.push('coping');
            if (scores.practical >= 13 && scores.practical <= 20) managingAreas.push('practical');
            if (scores.self >= 13 && scores.self <= 20) managingAreas.push('self');
            
            if (managingAreas.length > 0) {
                guidance = "You're managing reasonably well overall, though some areas need attention. This suggests resilience and effective strategies. Keep doing what's working and don't hesitate to ask for support when you need it.";
                nextSteps = [
                    "Keep using the strategies that are working for you",
                    "Stay connected with your support network",
                    "Be proactive about asking for help before things get harder",
                    "Remember that managing doesn't mean you have to do it alone",
                    "Consider what might help you move from managing to thriving"
                ];
            } else {
                guidance = "You're navigating this disruption with considerable strength and resilience. Your coping strategies, practical management, and sense of self are all intact. This is a testament to your resources and support systems.";
                nextSteps = [
                    "Continue with what's working well for you",
                    "Stay aware of early warning signs if things get harder",
                    "Consider how you might support others facing similar challenges",
                    "Document your strategies in case you need them later",
                    "Remember that doing well now doesn't mean you won't need support later - stay open to that"
                ];
            }
        }
        
        document.getElementById('overall-guidance').textContent = guidance;
        
        const stepsList = document.getElementById('next-steps-list');
        stepsList.innerHTML = '';
        nextSteps.forEach(step => {
            const li = document.createElement('li');
            li.textContent = step;
            stepsList.appendChild(li);
        });
    },
    
    // Download results as PDF
    downloadResults() {
        const scores = this.calculateScores();
        
        // Create text content for download
        let content = 'HOW ARE YOU DOING? - ASSESSMENT RESULTS\n';
        content += '=====================================\n\n';
        content += `Date: ${new Date().toLocaleDateString()}\n\n`;
        
        ['coping', 'practical', 'self'].forEach(dimension => {
            const score = scores[dimension];
            const interpretation = this.getInterpretation(dimension, score);
            
            content += `${dimension.toUpperCase()}\n`;
            content += `Score: ${score}/25 - ${interpretation.label}\n`;
            content += `${interpretation.description}\n\n`;
            content += 'Suggestions:\n';
            interpretation.suggestions.forEach(suggestion => {
                content += `• ${suggestion}\n`;
            });
            content += '\n';
        });
        
        content += `\nFor more information: www.paulthomascoaching.com`;
        
        // Create blob and download
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `how-are-you-doing-results-${new Date().toISOString().slice(0,10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    },
    
    // Restart the assessment
    restart() {
        this.currentQuestion = 0;
        this.responses = {};
        this.showScreen('welcome-screen');
    }
};

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
