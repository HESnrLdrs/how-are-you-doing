// App logic for slider-based How Are You Doing?

const app = {
    currentQuestion: 0,
    responses: {},
    shuffledQuestions: [],
    
    init() {
        this.shuffledQuestions = shuffleArray(questions);
        this.showScreen('welcome-screen');
    },
    
    startAssessment() {
        this.currentQuestion = 0;
        this.responses = {};
        this.shuffledQuestions = shuffleArray(questions);
        this.showScreen('question-screen');
        this.displayQuestion();
    },
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    },
    
    displayQuestion() {
        const question = this.shuffledQuestions[this.currentQuestion];
        const totalQuestions = this.shuffledQuestions.length;
        
        // Update progress
        const progress = ((this.currentQuestion + 1) / totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        document.getElementById('current-q').textContent = this.currentQuestion + 1;
        document.getElementById('total-q').textContent = totalQuestions;
        
        // Update question text
        document.getElementById('question-text').textContent = question.text;
        
        // Update slider labels
        document.getElementById('label-left').textContent = question.leftLabel;
        document.getElementById('label-right').textContent = question.rightLabel;
        
        // Set slider value
        const slider = document.getElementById('response-slider');
        const savedValue = this.responses[question.id];
        slider.value = savedValue !== undefined ? savedValue : 50;
        
        // Update marker position
        this.updateSliderMarker(slider.value);
        
        // Add slider input listener
        slider.oninput = (e) => {
            this.responses[question.id] = parseInt(e.target.value);
            this.updateSliderMarker(e.target.value);
        };
        
        this.updateNavigationButtons();
    },
    
    updateSliderMarker(value) {
        const marker = document.getElementById('slider-marker');
        marker.style.left = value + '%';
    },
    
    updateNavigationButtons() {
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        
        prevBtn.style.display = this.currentQuestion === 0 ? 'none' : 'block';
        
        if (this.currentQuestion === this.shuffledQuestions.length - 1) {
            nextBtn.textContent = 'See Results';
        } else {
            nextBtn.textContent = 'Next';
        }
    },
    
    previousQuestion() {
        if (this.currentQuestion > 0) {
            this.currentQuestion--;
            this.displayQuestion();
        }
    },
    
    nextQuestion() {
        const question = this.shuffledQuestions[this.currentQuestion];
        
        // Save current slider value
        const slider = document.getElementById('response-slider');
        this.responses[question.id] = parseInt(slider.value);
        
        if (this.currentQuestion < this.shuffledQuestions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        } else {
            this.showResults();
        }
    },
    
    calculateScores() {
        const scores = {
            coping: [],
            practical: [],
            self: []
        };
        
        // Group responses by dimension
        this.shuffledQuestions.forEach(question => {
            const response = this.responses[question.id];
            if (response !== undefined) {
                scores[question.dimension].push(response);
            }
        });
        
        // Calculate averages
        const averages = {
            coping: Math.round(scores.coping.reduce((a, b) => a + b, 0) / scores.coping.length),
            practical: Math.round(scores.practical.reduce((a, b) => a + b, 0) / scores.practical.length),
            self: Math.round(scores.self.reduce((a, b) => a + b, 0) / scores.self.length)
        };
        
        return averages;
    },
    
    saveResults(scores) {
        try {
            // Get existing history or create new array
            const history = JSON.parse(localStorage.getItem('howAreYouDoing_history') || '[]');
            
            // Add current results with timestamp
            const entry = {
                date: new Date().toISOString(),
                scores: scores
            };
            
            history.push(entry);
            
            // Keep only last 10 entries
            const recentHistory = history.slice(-10);
            
            localStorage.setItem('howAreYouDoing_history', JSON.stringify(recentHistory));
        } catch (e) {
            console.error('Could not save results:', e);
        }
    },
    
    getPreviousResults() {
        try {
            const history = JSON.parse(localStorage.getItem('howAreYouDoing_history') || '[]');
            if (history.length > 1) {
                // Return second-to-last entry (previous session)
                return history[history.length - 2].scores;
            }
        } catch (e) {
            console.error('Could not load previous results:', e);
        }
        return null;
    },
    
    showResults() {
        const scores = this.calculateScores();
        const previousScores = this.getPreviousResults();
        
        // Save current results
        this.saveResults(scores);
        
        // Find the lowest scoring dimension
        let lowestDimension = 'coping';
        let lowestScore = scores.coping;
        if (scores.practical < lowestScore) {
            lowestDimension = 'practical';
            lowestScore = scores.practical;
        }
        if (scores.self < lowestScore) {
            lowestDimension = 'self';
            lowestScore = scores.self;
        }
        
        // Build gauges
        this.displayGauges(scores, lowestDimension, previousScores);
        
        // Build interpretation
        this.displayInterpretation(scores, lowestDimension);
        
        this.showScreen('results-screen');
    },
    
    displayGauges(scores, lowestDimension, previousScores) {
        const container = document.getElementById('gauges-container');
        const dimensions = [
            { key: 'coping', label: 'Coping', icon: '🧠' },
            { key: 'practical', label: 'Practical', icon: '📋' },
            { key: 'self', label: 'Self', icon: '💫' }
        ];
        
        container.innerHTML = dimensions.map(dim => {
            const score = scores[dim.key];
            const zone = getZone(score);
            const rotation = getNeedleRotation(score);
            const isFocus = dim.key === lowestDimension;
            const statusText = zone === 'thriving' ? 'Thriving' : 
                              zone === 'doing-well' ? 'Doing well' :
                              zone === 'managing' ? 'Managing' : 
                              zone === 'struggling' ? 'Struggling' :
                              'Critical';
            
            // Progress indicator if we have previous scores
            let progressHtml = '';
            if (previousScores) {
                const prevScore = previousScores[dim.key];
                const change = score - prevScore;
                if (change > 0) {
                    progressHtml = `<div class="progress-indicator up">↑ +${change}</div>`;
                } else if (change < 0) {
                    progressHtml = `<div class="progress-indicator down">↓ ${change}</div>`;
                } else {
                    progressHtml = `<div class="progress-indicator same">→ Same</div>`;
                }
            }
            
            return `
                <div class="gauge-item">
                    <div class="gauge-icon">${dim.icon}</div>
                    <div class="gauge-label ${isFocus ? 'focus' : ''}">${dim.label}</div>
                    <div class="fuel-gauge">
                        <div class="gauge-zone zone-red"></div>
                        <div class="gauge-zone zone-amber"></div>
                        <div class="gauge-zone zone-green"></div>
                        <div class="gauge-inner"></div>
                        <div class="gauge-label-e">E</div>
                        <div class="gauge-label-f">F</div>
                        <div class="gauge-needle ${isFocus && zone === 'struggling' ? 'needle-glow' : ''}" 
                             style="transform: rotate(${rotation}deg);"></div>
                        <div class="gauge-center"></div>
                    </div>
                    <div class="gauge-status ${isFocus ? 'focus' : ''}">${statusText}</div>
                    ${progressHtml}
                    <div class="debug-score" style="font-size:0.8rem;color:#999;margin-top:5px;">Score: ${score}</div>
                </div>
            `;
        }).join('');
        
        // Animate needles after render
        setTimeout(() => {
            document.querySelectorAll('.gauge-needle').forEach((needle, index) => {
                const dim = dimensions[index];
                const score = scores[dim.key];
                const rotation = getNeedleRotation(score);
                needle.style.transition = 'none';
                needle.style.transform = 'rotate(-135deg)';
                setTimeout(() => {
                    needle.style.transition = 'transform 1.5s cubic-bezier(0.4, 0.0, 0.2, 1)';
                    needle.style.transform = `rotate(${rotation}deg)`;
                }, 50);
            });
        }, 100);
    },
    
    displayInterpretation(scores, lowestDimension) {
        const zone = getZone(scores[lowestDimension]);
        const interpretation = interpretations[lowestDimension][zone];
        
        // Build summary for all three
        const copingZone = getZone(scores.coping);
        const practicalZone = getZone(scores.practical);
        const selfZone = getZone(scores.self);
        
        let summaryHtml = '<div class="interpretation">';
        summaryHtml += '<h2>What This Means</h2>';
        
        // Add interpretation for each dimension
        ['coping', 'practical', 'self'].forEach(dim => {
            const dimZone = getZone(scores[dim]);
            const dimLabel = dim.charAt(0).toUpperCase() + dim.slice(1);
            summaryHtml += `<p><strong>${dimLabel}:</strong> ${interpretations[dim][dimZone].description}</p>`;
        });
        
        summaryHtml += '</div>';
        
        // Focus area
        const focusLabel = lowestDimension.charAt(0).toUpperCase() + lowestDimension.slice(1);
        summaryHtml += `
            <div class="focus-area">
                <h2>Your Focus: ${focusLabel}</h2>
                <p>${interpretation.description}</p>
                <div class="action-box">
                    <h3>What To Do:</h3>
                    <p>${interpretation.action}</p>
                </div>
            </div>
        `;
        
        document.getElementById('interpretation-area').innerHTML = summaryHtml;
    },
    
    restart() {
        this.currentQuestion = 0;
        this.responses = {};
        this.showScreen('welcome-screen');
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
