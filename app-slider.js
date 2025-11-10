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
        
        console.log('Current question:', this.currentQuestion, 'Total:', this.shuffledQuestions.length);
        console.log('All responses:', this.responses);
        
        if (this.currentQuestion < this.shuffledQuestions.length - 1) {
            this.currentQuestion++;
            this.displayQuestion();
        } else {
            console.log('Showing results...');
            this.showResults();
        }
    },
    
    calculateScores() {
        const scores = {
            coping: [],
            practical: [],
            personal: []
        };
        
        console.log('Calculating scores from responses:', this.responses);
        console.log('Questions:', this.shuffledQuestions);
        
        // Group responses by dimension (handle both 'self' and 'personal' for backwards compatibility)
        this.shuffledQuestions.forEach(question => {
            const response = this.responses[question.id];
            console.log(`Question ${question.id} (${question.dimension}):`, response);
            if (response !== undefined) {
                const dim = question.dimension === 'self' ? 'personal' : question.dimension;
                scores[dim].push(response);
            }
        });
        
        console.log('Grouped scores:', scores);
        
        // Calculate averages
        const averages = {
            coping: Math.round(scores.coping.reduce((a, b) => a + b, 0) / scores.coping.length),
            practical: Math.round(scores.practical.reduce((a, b) => a + b, 0) / scores.practical.length),
            personal: Math.round(scores.personal.reduce((a, b) => a + b, 0) / scores.personal.length)
        };
        
        console.log('Calculated averages:', averages);
        
        return averages;
    },
    
    calculateOverallScore(scores) {
        // Using multiplier: (C × P × P) ÷ 10,000
        // This ensures that weakness in any area significantly impacts overall score
        const overall = (scores.coping * scores.practical * scores.personal) / 10000;
        return Math.round(overall);
    },
    
    getOverallMessage(score) {
        if (score >= 80) return { emoji: '🌟', text: 'You\'re doing well overall', color: '#10b981' };
        if (score >= 60) return { emoji: '👍', text: 'Managing, with some challenges', color: '#3b82f6' };
        if (score >= 40) return { emoji: '⚠️', text: 'Struggling in important areas', color: '#f59e0b' };
        if (score >= 20) return { emoji: '🆘', text: 'Significant difficulty - consider support', color: '#ef4444' };
        return { emoji: '🚨', text: 'Crisis level - please reach out for help', color: '#dc2626' };
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
            
            // Keep last 26 entries (roughly 6 months of weekly check-ins)
            const recentHistory = history.slice(-26);
            
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
                const prevScores = history[history.length - 2].scores;
                // Handle transition from 'self' to 'personal'
                if (prevScores.self !== undefined && prevScores.personal === undefined) {
                    prevScores.personal = prevScores.self;
                }
                return prevScores;
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
        if (scores.personal < lowestScore) {
            lowestDimension = 'personal';
            lowestScore = scores.personal;
        }
        
        // Build gauges
        this.displayGauges(scores, lowestDimension, previousScores);
        
        // Build interpretation
        this.displayInterpretation(scores, lowestDimension);
        
        // Display overall score
        this.displayOverallScore(scores);
        
        // Show history button if there's history
        const history = JSON.parse(localStorage.getItem('howAreYouDoing_history') || '[]');
        if (history.length >= 2) {
            document.getElementById('history-btn').style.display = 'inline-block';
        }
        
        this.showScreen('results-screen');
    },
    
    displayGauges(scores, lowestDimension, previousScores) {
        const container = document.getElementById('gauges-container');
        const dimensions = [
            { key: 'coping', label: 'Coping', icon: '🧠' },
            { key: 'practical', label: 'Practical', icon: '📋' },
            { key: 'personal', label: 'Personal', icon: '💫' }
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
                const prevZone = getZone(prevScore);
                
                if (change > 0) {
                    let celebration = '';
                    if (change >= 50) {
                        celebration = ' - Remarkable progress!';
                    } else if (change >= 30) {
                        celebration = ' - Major improvement!';
                    } else if (change >= 15) {
                        celebration = ' - Real improvement!';
                    } else if (change >= 5) {
                        celebration = ' - Good progress!';
                    } else if (zone !== prevZone && (zone === 'managing' || zone === 'doing-well' || zone === 'thriving')) {
                        celebration = ' - You\'ve moved up a level!';
                    }
                    progressHtml = `<div class="progress-indicator up">↑ +${change}${celebration}</div>`;
                } else if (change < 0) {
                    const dip = Math.abs(change);
                    let message = '';
                    if (dip >= 50) {
                        message = ' - Significant concern, consider seeking support';
                    } else if (dip >= 30) {
                        message = ' - Major change, worth serious attention';
                    } else if (dip >= 15) {
                        message = ' - Notable decline, keep an eye on this';
                    } else if (dip >= 5) {
                        message = ' - Slight decrease';
                    } else {
                        message = ' - Small dip, that\'s normal';
                    }
                    progressHtml = `<div class="progress-indicator down">↓ ${change}${message}</div>`;
                } else {
                    progressHtml = `<div class="progress-indicator same">→ Holding steady</div>`;
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
        const personalZone = getZone(scores.personal);
        
        let summaryHtml = '<div class="interpretation">';
        summaryHtml += '<h2>What This Means</h2>';
        
        // Add interpretation for each dimension
        ['coping', 'practical', 'personal'].forEach(dim => {
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
    
    displayOverallScore(scores) {
        console.log('displayOverallScore called with:', scores);
        const overallScore = this.calculateOverallScore(scores);
        console.log('Overall score calculated:', overallScore);
        const message = this.getOverallMessage(overallScore);
        console.log('Message:', message);
        
        const overallHtml = `
            <div class="overall-score" style="margin-top: 40px; padding: 30px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 12px; border: 2px solid #cbd5e1;">
                <h2 style="text-align: center; margin-bottom: 20px; color: #1e293b;">Overall Wellbeing</h2>
                <div style="text-align: center;">
                    <div style="font-size: 4rem; margin-bottom: 10px;">${message.emoji}</div>
                    <div style="font-size: 3rem; font-weight: bold; color: ${message.color}; margin-bottom: 10px;">${overallScore}/100</div>
                    <div style="font-size: 1.2rem; color: #475569;">${message.text}</div>
                </div>
                <div style="margin-top: 20px; padding: 15px; background: white; border-radius: 8px; font-size: 0.9rem; color: #64748b;">
                    <p style="margin: 0;"><strong>About this score:</strong> This reflects how your three areas work together. Even if some areas are strong, struggling in one dimension significantly impacts how you feel overall - which matches real life experience.</p>
                </div>
            </div>
        `;
        
        console.log('Setting innerHTML for overall-score-area');
        const element = document.getElementById('overall-score-area');
        console.log('Element found:', element);
        element.innerHTML = overallHtml;
        console.log('innerHTML set');
    },
    
    restart() {
        this.currentQuestion = 0;
        this.responses = {};
        this.showScreen('welcome-screen');
    },
    
    showHistory() {
        const history = JSON.parse(localStorage.getItem('howAreYouDoing_history') || '[]');
        if (history.length < 2) {
            alert('Not enough data yet. Check in a few more times to see your progress!');
            return;
        }
        
        // Show modal
        document.getElementById('history-modal').classList.add('active');
        
        // Draw chart
        this.drawProgressChart(history);
        
        // Show summary
        this.showHistorySummary(history);
    },
    
    closeHistory() {
        document.getElementById('history-modal').classList.remove('active');
    },
    
    drawProgressChart(history) {
        const canvas = document.getElementById('progress-chart');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        canvas.width = canvas.offsetWidth;
        canvas.height = 400;
        
        const padding = 50;
        const width = canvas.width - (padding * 2);
        const height = canvas.height - (padding * 2);
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Extract data (handle both 'self' and 'personal' for backwards compatibility)
        const copingData = history.map(entry => entry.scores.coping);
        const practicalData = history.map(entry => entry.scores.practical);
        const personalData = history.map(entry => entry.scores.personal !== undefined ? entry.scores.personal : entry.scores.self);
        
        // Draw grid
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = padding + (height / 5) * i;
            ctx.beginPath();
            ctx.moveTo(padding, y);
            ctx.lineTo(canvas.width - padding, y);
            ctx.stroke();
            
            // Y-axis labels
            ctx.fillStyle = '#64748b';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(100 - (i * 20), padding - 10, y + 4);
        }
        
        // Draw axes
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Helper function to draw line
        const drawLine = (data, color, label) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            data.forEach((value, index) => {
                const x = padding + (width / (data.length - 1)) * index;
                const y = canvas.height - padding - (value / 100) * height;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
            
            // Draw points
            ctx.fillStyle = color;
            data.forEach((value, index) => {
                const x = padding + (width / (data.length - 1)) * index;
                const y = canvas.height - padding - (value / 100) * height;
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fill();
            });
        };
        
        // Draw lines
        drawLine(copingData, '#3b82f6', 'Coping');
        drawLine(practicalData, '#8b5cf6', 'Practical');
        drawLine(personalData, '#ec4899', 'Personal');
        
        // Draw legend
        const legendX = padding + 20;
        const legendY = padding + 20;
        
        ctx.font = 'bold 14px sans-serif';
        
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(legendX, legendY, 20, 3);
        ctx.fillStyle = '#1e293b';
        ctx.fillText('Coping', legendX + 30, legendY + 4);
        
        ctx.fillStyle = '#8b5cf6';
        ctx.fillRect(legendX, legendY + 25, 20, 3);
        ctx.fillStyle = '#1e293b';
        ctx.fillText('Practical', legendX + 30, legendY + 29);
        
        ctx.fillStyle = '#ec4899';
        ctx.fillRect(legendX, legendY + 50, 20, 3);
        ctx.fillStyle = '#1e293b';
        ctx.fillText('Personal', legendX + 30, legendY + 54);
    },
    
    showHistorySummary(history) {
        const first = history[0].scores;
        const latest = history[history.length - 1].scores;
        
        // Handle transition from 'self' to 'personal'
        const firstPersonal = first.personal !== undefined ? first.personal : first.self;
        const latestPersonal = latest.personal !== undefined ? latest.personal : latest.self;
        
        const copingChange = latest.coping - first.coping;
        const practicalChange = latest.practical - first.practical;
        const personalChange = latestPersonal - firstPersonal;
        
        const formatChange = (change) => {
            if (change > 0) return `<span style="color:#10b981">↑ +${change}</span>`;
            if (change < 0) return `<span style="color:#ef4444">↓ ${change}</span>`;
            return '<span style="color:#64748b">→ No change</span>';
        };
        
        const formatDate = (isoDate) => {
            const date = new Date(isoDate);
            return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
        };
        
        const summary = `
            <h3>Your Journey</h3>
            <p><strong>Started:</strong> ${formatDate(history[0].date)}</p>
            <p><strong>Check-ins:</strong> ${history.length} sessions</p>
            <p><strong>Overall change since first check-in:</strong></p>
            <ul style="list-style:none; padding-left:0;">
                <li>Coping: ${formatChange(copingChange)}</li>
                <li>Practical: ${formatChange(practicalChange)}</li>
                <li>Personal: ${formatChange(personalChange)}</li>
            </ul>
        `;
        
        document.getElementById('history-summary').innerHTML = summary;
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
