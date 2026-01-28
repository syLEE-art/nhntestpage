/**
 * NHN Cloud 자격증 모의고사 - 메인 스크립트
 */

(function() {
    'use strict';

    // ===================================
    // 상태 관리
    // ===================================
    const state = {
        currentPage: 1,
        questionsPerPage: 10,
        userAnswers: {},
        isSubmitted: false,
        score: 0,
        correctCount: 0
    };

    // ===================================
    // DOM 요소 캐싱
    // ===================================
    const elements = {
        // Screens
        startScreen: document.getElementById('startScreen'),
        quizScreen: document.getElementById('quizScreen'),
        resultScreen: document.getElementById('resultScreen'),
        
        // Start Screen
        startBtn: document.getElementById('startBtn'),
        startTotalCount: document.getElementById('startTotalCount'),
        
        // Header
        progressBar: document.getElementById('progressBar'),
        answeredCount: document.getElementById('answeredCount'),
        totalCount: document.getElementById('totalCount'),
        
        // Quiz Screen
        quizContainer: document.getElementById('quizContainer'),
        pagination: document.getElementById('pagination'),
        submitSection: document.getElementById('submitSection'),
        submitBtn: document.getElementById('submitBtn'),
        
        // Result Screen
        scoreProgress: document.getElementById('scoreProgress'),
        scoreValue: document.getElementById('scoreValue'),
        resultSummary: document.getElementById('resultSummary'),
        resultGrade: document.getElementById('resultGrade'),
        reviewBtn: document.getElementById('reviewBtn'),
        retryBtn: document.getElementById('retryBtn'),
        reviewSection: document.getElementById('reviewSection'),
        reviewContainer: document.getElementById('reviewContainer'),
        
        // Scroll Button
        scrollTopBtn: document.getElementById('scrollTopBtn')
    };

    // ===================================
    // 초기화
    // ===================================
    function init() {
        // 총 문제 수 표시
        const totalQuestions = quizData.length;
        elements.startTotalCount.textContent = totalQuestions;
        elements.totalCount.textContent = totalQuestions;
        
        // 이벤트 리스너 등록
        setupEventListeners();
    }

    function setupEventListeners() {
        // 시작 버튼
        elements.startBtn.addEventListener('click', startQuiz);
        
        // 제출 버튼
        elements.submitBtn.addEventListener('click', submitQuiz);
        
        // 결과 화면 버튼
        elements.reviewBtn.addEventListener('click', showReview);
        elements.retryBtn.addEventListener('click', retryQuiz);
        
        // 필터 버튼
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => filterReview(e.target.dataset.filter));
        });
        
        // 스크롤 이벤트
        window.addEventListener('scroll', handleScroll);
        elements.scrollTopBtn.addEventListener('click', scrollToTop);
    }

    // ===================================
    // 퀴즈 시작
    // ===================================
    function startQuiz() {
        elements.startScreen.classList.add('hidden');
        elements.quizScreen.classList.remove('hidden');
        
        renderQuestions();
        renderPagination();
        updateProgress();
    }

    // ===================================
    // 문제 렌더링
    // ===================================
    function renderQuestions() {
        const startIdx = (state.currentPage - 1) * state.questionsPerPage;
        const endIdx = Math.min(startIdx + state.questionsPerPage, quizData.length);
        const questionsToShow = quizData.slice(startIdx, endIdx);
        
        elements.quizContainer.innerHTML = questionsToShow.map((q, idx) => {
            const globalIdx = startIdx + idx;
            const isAnswered = state.userAnswers[q.id] !== undefined;
            
            return `
                <div class="question-card ${isAnswered ? 'answered' : ''}" data-id="${q.id}">
                    <div class="question-header">
                        <span class="question-number">${globalIdx + 1}</span>
                        <p class="question-text">${q.question}</p>
                    </div>
                    <ul class="options-list">
                        ${q.options.map((opt, optIdx) => {
                            const optionNum = optIdx + 1;
                            const isChecked = state.userAnswers[q.id] === optionNum;
                            const markers = ['A', 'B', 'C', 'D'];
                            
                            return `
                                <li class="option-item">
                                    <input 
                                        type="radio" 
                                        name="q${q.id}" 
                                        id="q${q.id}_opt${optionNum}"
                                        value="${optionNum}"
                                        class="option-input"
                                        ${isChecked ? 'checked' : ''}
                                        ${state.isSubmitted ? 'disabled' : ''}
                                    >
                                    <label for="q${q.id}_opt${optionNum}" class="option-label">
                                        <span class="option-marker">${markers[optIdx]}</span>
                                        <span class="option-text">${opt}</span>
                                    </label>
                                </li>
                            `;
                        }).join('')}
                    </ul>
                </div>
            `;
        }).join('');
        
        // 옵션 선택 이벤트 등록
        if (!state.isSubmitted) {
            document.querySelectorAll('.option-input').forEach(input => {
                input.addEventListener('change', handleOptionSelect);
            });
        }
        
        // 스크롤 상단으로
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===================================
    // 옵션 선택 핸들러
    // ===================================
    function handleOptionSelect(e) {
        const questionId = parseInt(e.target.name.replace('q', ''));
        const selectedOption = parseInt(e.target.value);
        
        state.userAnswers[questionId] = selectedOption;
        
        // 카드에 answered 클래스 추가
        const card = e.target.closest('.question-card');
        card.classList.add('answered');
        
        updateProgress();
    }

    // ===================================
    // 진행률 업데이트
    // ===================================
    function updateProgress() {
        const answered = Object.keys(state.userAnswers).length;
        const total = quizData.length;
        const percentage = (answered / total) * 100;
        
        elements.answeredCount.textContent = answered;
        elements.progressBar.style.width = `${percentage}%`;
    }

    // ===================================
    // 페이지네이션
    // ===================================
    function renderPagination() {
        const totalPages = Math.ceil(quizData.length / state.questionsPerPage);
        
        let html = '';
        
        // 이전 버튼
        html += `
            <button class="page-btn nav-btn" ${state.currentPage === 1 ? 'disabled' : ''} data-page="prev">
                ◀
            </button>
        `;
        
        // 페이지 번호
        for (let i = 1; i <= totalPages; i++) {
            // 모바일에서 너무 많은 버튼 표시 방지
            if (totalPages > 7) {
                if (i === 1 || i === totalPages || 
                    (i >= state.currentPage - 1 && i <= state.currentPage + 1)) {
                    html += `
                        <button class="page-btn ${i === state.currentPage ? 'active' : ''}" data-page="${i}">
                            ${i}
                        </button>
                    `;
                } else if (i === state.currentPage - 2 || i === state.currentPage + 2) {
                    html += `<span class="page-info">...</span>`;
                }
            } else {
                html += `
                    <button class="page-btn ${i === state.currentPage ? 'active' : ''}" data-page="${i}">
                        ${i}
                    </button>
                `;
            }
        }
        
        // 다음 버튼
        html += `
            <button class="page-btn nav-btn" ${state.currentPage === totalPages ? 'disabled' : ''} data-page="next">
                ▶
            </button>
        `;
        
        elements.pagination.innerHTML = html;
        
        // 페이지 버튼 이벤트
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', handlePageClick);
        });
    }

    function handlePageClick(e) {
        const page = e.target.dataset.page;
        const totalPages = Math.ceil(quizData.length / state.questionsPerPage);
        
        if (page === 'prev') {
            state.currentPage = Math.max(1, state.currentPage - 1);
        } else if (page === 'next') {
            state.currentPage = Math.min(totalPages, state.currentPage + 1);
        } else {
            state.currentPage = parseInt(page);
        }
        
        renderQuestions();
        renderPagination();
        
        if (state.isSubmitted) {
            showGradedQuestions();
        }
    }

    // ===================================
    // 퀴즈 제출 및 채점
    // ===================================
    function submitQuiz() {
        // 미응답 문제 확인
        const unanswered = quizData.length - Object.keys(state.userAnswers).length;
        
        if (unanswered > 0) {
            const confirmSubmit = confirm(`아직 ${unanswered}개의 문제에 답하지 않았습니다.\n그래도 제출하시겠습니까?`);
            if (!confirmSubmit) return;
        }
        
        state.isSubmitted = true;
        
        // 채점
        let correctCount = 0;
        quizData.forEach(q => {
            if (state.userAnswers[q.id] === q.answer) {
                correctCount++;
            }
        });
        
        state.correctCount = correctCount;
        state.score = Math.round((correctCount / quizData.length) * 100);
        
        // 결과 화면 표시
        showResult();
    }

    // ===================================
    // 결과 화면
    // ===================================
    function showResult() {
        elements.quizScreen.classList.add('hidden');
        elements.resultScreen.classList.remove('hidden');
        
        // 점수 표시
        elements.scoreValue.textContent = state.score;
        elements.resultSummary.textContent = `${quizData.length}개 중 ${state.correctCount}개 정답`;
        
        // 점수 원형 애니메이션
        const circumference = 2 * Math.PI * 54; // r=54
        const offset = circumference - (state.score / 100) * circumference;
        
        setTimeout(() => {
            elements.scoreProgress.style.strokeDashoffset = offset;
        }, 100);
        
        // 등급 표시
        let gradeClass, gradeText;
        if (state.score >= 90) {
            gradeClass = 'excellent';
            gradeText = '🎉 우수';
        } else if (state.score >= 70) {
            gradeClass = 'good';
            gradeText = '👍 양호';
        } else if (state.score >= 50) {
            gradeClass = 'average';
            gradeText = '📚 보통';
        } else {
            gradeClass = 'poor';
            gradeText = '💪 노력 필요';
        }
        
        elements.resultGrade.className = `result-grade ${gradeClass}`;
        elements.resultGrade.innerHTML = `<span class="grade-text">${gradeText}</span>`;
        
        // 스크롤 상단으로
        window.scrollTo({ top: 0 });
    }

    // ===================================
    // 오답 리뷰
    // ===================================
    function showReview() {
        elements.reviewSection.classList.remove('hidden');
        filterReview('wrong');
        
        // 리뷰 섹션으로 스크롤
        elements.reviewSection.scrollIntoView({ behavior: 'smooth' });
    }

    function filterReview(filter) {
        // 필터 버튼 활성화
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        // 문제 필터링
        let questionsToShow;
        if (filter === 'wrong') {
            questionsToShow = quizData.filter(q => state.userAnswers[q.id] !== q.answer);
        } else {
            questionsToShow = quizData;
        }
        
        if (questionsToShow.length === 0) {
            elements.reviewContainer.innerHTML = `
                <div class="question-card" style="text-align: center; padding: 48px;">
                    <p style="font-size: 18px; color: var(--gray-500);">🎉 모든 문제를 맞추셨습니다!</p>
                </div>
            `;
            return;
        }
        
        // 문제 렌더링
        elements.reviewContainer.innerHTML = questionsToShow.map((q, idx) => {
            const userAnswer = state.userAnswers[q.id];
            const isCorrect = userAnswer === q.answer;
            const originalIdx = quizData.findIndex(item => item.id === q.id);
            
            return `
                <div class="question-card ${isCorrect ? 'correct' : 'wrong'}">
                    <div class="question-header">
                        <span class="question-number">${originalIdx + 1}</span>
                        <p class="question-text">${q.question}</p>
                    </div>
                    <ul class="options-list">
                        ${q.options.map((opt, optIdx) => {
                            const optionNum = optIdx + 1;
                            const markers = ['A', 'B', 'C', 'D'];
                            const isUserAnswer = userAnswer === optionNum;
                            const isCorrectAnswer = q.answer === optionNum;
                            
                            let labelClass = '';
                            if (isCorrectAnswer) labelClass = 'correct-answer';
                            else if (isUserAnswer && !isCorrect) labelClass = 'wrong-answer';
                            
                            return `
                                <li class="option-item">
                                    <input 
                                        type="radio" 
                                        name="review_q${q.id}" 
                                        id="review_q${q.id}_opt${optionNum}"
                                        class="option-input"
                                        ${isUserAnswer ? 'checked' : ''}
                                        disabled
                                    >
                                    <label for="review_q${q.id}_opt${optionNum}" class="option-label ${labelClass}">
                                        <span class="option-marker">${markers[optIdx]}</span>
                                        <span class="option-text">${opt}</span>
                                    </label>
                                </li>
                            `;
                        }).join('')}
                    </ul>
                    <div class="explanation">
                        <div class="explanation-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                            </svg>
                            해설
                        </div>
                        <p class="explanation-text">${q.explanation}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ===================================
    // 채점된 문제 표시 (퀴즈 화면에서)
    // ===================================
    function showGradedQuestions() {
        const cards = document.querySelectorAll('.question-card');
        
        cards.forEach(card => {
            const qId = parseInt(card.dataset.id);
            const question = quizData.find(q => q.id === qId);
            const userAnswer = state.userAnswers[qId];
            const isCorrect = userAnswer === question.answer;
            
            // 카드 상태 클래스
            card.classList.remove('answered');
            card.classList.add(isCorrect ? 'correct' : 'wrong');
            
            // 옵션 상태 표시
            const labels = card.querySelectorAll('.option-label');
            labels.forEach((label, idx) => {
                const optionNum = idx + 1;
                label.classList.remove('correct-answer', 'wrong-answer');
                
                if (question.answer === optionNum) {
                    label.classList.add('correct-answer');
                } else if (userAnswer === optionNum && !isCorrect) {
                    label.classList.add('wrong-answer');
                }
            });
            
            // 해설 추가 (틀린 경우)
            if (!isCorrect && !card.querySelector('.explanation')) {
                const explanation = document.createElement('div');
                explanation.className = 'explanation';
                explanation.innerHTML = `
                    <div class="explanation-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                        </svg>
                        해설
                    </div>
                    <p class="explanation-text">${question.explanation}</p>
                `;
                card.appendChild(explanation);
            }
        });
    }

    // ===================================
    // 다시 풀기
    // ===================================
    function retryQuiz() {
        // 상태 초기화
        state.currentPage = 1;
        state.userAnswers = {};
        state.isSubmitted = false;
        state.score = 0;
        state.correctCount = 0;
        
        // UI 초기화
        elements.resultScreen.classList.add('hidden');
        elements.reviewSection.classList.add('hidden');
        elements.startScreen.classList.remove('hidden');
        
        // 진행률 초기화
        elements.progressBar.style.width = '0%';
        elements.answeredCount.textContent = '0';
        
        // 점수 원형 초기화
        elements.scoreProgress.style.strokeDashoffset = 339.292;
        
        // 스크롤 상단으로
        window.scrollTo({ top: 0 });
    }

    // ===================================
    // 스크롤 핸들러
    // ===================================
    function handleScroll() {
        if (window.scrollY > 400) {
            elements.scrollTopBtn.classList.remove('hidden');
        } else {
            elements.scrollTopBtn.classList.add('hidden');
        }
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===================================
    // 앱 시작
    // ===================================
    document.addEventListener('DOMContentLoaded', init);
})();
