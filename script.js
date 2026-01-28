/**
 * NHN Cloud 자격증 모의고사 - 메인 스크립트 (다중 선택 지원 버전)
 */

(function() {
    'use strict';

    // ===================================
    // 상태 관리
    // ===================================
    const state = {
        currentPage: 1,
        questionsPerPage: 10,
        userAnswers: {}, // 단일 선택: 숫자, 다중 선택: 배열 [1, 2] 형태
        isSubmitted: false,
        score: 0,
        correctCount: 0,
        shuffledQuiz: []
    };

    // ===================================
    // DOM 요소 캐싱
    // ===================================
    const elements = {
        startScreen: document.getElementById('startScreen'),
        quizScreen: document.getElementById('quizScreen'),
        resultScreen: document.getElementById('resultScreen'),
        startBtn: document.getElementById('startBtn'),
        startTotalCount: document.getElementById('startTotalCount'),
        progressBar: document.getElementById('progressBar'),
        answeredCount: document.getElementById('answeredCount'),
        totalCount: document.getElementById('totalCount'),
        quizContainer: document.getElementById('quizContainer'),
        pagination: document.getElementById('pagination'),
        submitSection: document.getElementById('submitSection'),
        submitBtn: document.getElementById('submitBtn'),
        scoreProgress: document.getElementById('scoreProgress'),
        scoreValue: document.getElementById('scoreValue'),
        resultSummary: document.getElementById('resultSummary'),
        resultGrade: document.getElementById('resultGrade'),
        reviewBtn: document.getElementById('reviewBtn'),
        retryBtn: document.getElementById('retryBtn'),
        reviewSection: document.getElementById('reviewSection'),
        reviewContainer: document.getElementById('reviewContainer'),
        scrollTopBtn: document.getElementById('scrollTopBtn')
    };

    // ===================================
    // 유틸리티 함수
    // ===================================
    
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    // 정답 비교 함수 (단일/다중 공용)
    function checkIsCorrect(userAns, realAns) {
        if (Array.isArray(realAns)) {
            if (!Array.isArray(userAns)) return false;
            return userAns.length === realAns.length && 
                   userAns.every(val => realAns.includes(val));
        }
        return userAns === realAns;
    }

    function validateQuizData(data) {
        if (!Array.isArray(data)) return [];
        
        return data.filter((q, index) => {
            if (!q || typeof q !== 'object') return false;
            // answer가 숫자이거나 배열인 경우 허용
            const isAnswerValid = typeof q.answer === 'number' || Array.isArray(q.answer);
            if (!q.question || !Array.isArray(q.options) || !isAnswerValid) {
                console.warn(`문제 ${index + 1}: 데이터 오류`);
                return false;
            }
            return true;
        }).map((q, index) => ({
            ...q,
            id: q.id || index + 1,
            isMulti: Array.isArray(q.answer) // 다중 선택 여부 플래그
        }));
    }

    // ===================================
    // 초기화 및 이벤트
    // ===================================
    function init() {
        try {
            const validData = validateQuizData(quizData);
            if (validData.length === 0) {
                alert('유효한 문제 데이터가 없습니다.');
                return;
            }
            elements.startTotalCount.textContent = validData.length;
            elements.totalCount.textContent = validData.length;
            window.validatedQuizData = validData;
            setupEventListeners();
        } catch (error) {
            console.error('초기화 오류:', error);
        }
    }

    function setupEventListeners() {
        elements.startBtn?.addEventListener('click', startQuiz);
        elements.submitBtn?.addEventListener('click', submitQuiz);
        elements.reviewBtn?.addEventListener('click', showReview);
        elements.retryBtn?.addEventListener('click', retryQuiz);
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => filterReview(e.target.dataset.filter));
        });
        window.addEventListener('scroll', handleScroll);
        elements.scrollTopBtn?.addEventListener('click', scrollToTop);
    }

    function startQuiz() {
        state.shuffledQuiz = shuffleArray(window.validatedQuizData || quizData);
        elements.startScreen.classList.add('hidden');
        elements.quizScreen.classList.remove('hidden');
        renderQuestions();
        renderPagination();
        updateProgress();
    }

    // ===================================
    // 렌더링 (다중 선택 디자인 클래스 추가)
    // ===================================
    function renderQuestions() {
        const startIdx = (state.currentPage - 1) * state.questionsPerPage;
        const endIdx = Math.min(startIdx + state.questionsPerPage, state.shuffledQuiz.length);
        const questionsToShow = state.shuffledQuiz.slice(startIdx, endIdx);
        
        elements.quizContainer.innerHTML = questionsToShow.map((q, idx) => {
            const globalIdx = startIdx + idx;
            const isAnswered = state.userAnswers[q.id] !== undefined;
            const markers = ['A', 'B', 'C', 'D'];
            
            return `
                <div class="question-card ${isAnswered ? 'answered' : ''} ${q.isMulti ? 'multi-select' : ''}" data-id="${q.id}">
                    <div class="question-header">
                        <span class="question-number">${globalIdx + 1}</span>
                        ${q.isMulti ? '<span class="multi-badge">다중 선택</span>' : ''}
                        <p class="question-text">${escapeHtml(q.question)}</p>
                    </div>
                    <ul class="options-list">
                        ${q.options.map((opt, optIdx) => {
                            const optionNum = optIdx + 1;
                            const isChecked = q.isMulti 
                                ? (state.userAnswers[q.id] || []).includes(optionNum)
                                : state.userAnswers[q.id] === optionNum;
                            
                            return `
                                <li class="option-item">
                                    <input 
                                        type="${q.isMulti ? 'checkbox' : 'radio'}" 
                                        name="q${q.id}" 
                                        id="q${q.id}_opt${optionNum}"
                                        value="${optionNum}"
                                        class="option-input"
                                        ${isChecked ? 'checked' : ''}
                                        ${state.isSubmitted ? 'disabled' : ''}
                                    >
                                    <label for="q${q.id}_opt${optionNum}" class="option-label">
                                        <span class="option-marker">${markers[optIdx]}</span>
                                        <span class="option-text">${escapeHtml(opt)}</span>
                                    </label>
                                </li>
                            `;
                        }).join('')}
                    </ul>
                </div>
            `;
        }).join('');
        
        document.querySelectorAll('.option-input').forEach(input => {
            input.addEventListener('change', handleOptionSelect);
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleOptionSelect(e) {
        const questionId = parseInt(e.target.name.replace('q', ''));
        const selectedOption = parseInt(e.target.value);
        const question = state.shuffledQuiz.find(q => q.id === questionId);

        if (question.isMulti) {
            if (!Array.isArray(state.userAnswers[questionId])) state.userAnswers[questionId] = [];
            if (e.target.checked) {
                state.userAnswers[questionId].push(selectedOption);
            } else {
                state.userAnswers[questionId] = state.userAnswers[questionId].filter(v => v !== selectedOption);
            }
            if (state.userAnswers[questionId].length === 0) delete state.userAnswers[questionId];
        } else {
            state.userAnswers[questionId] = selectedOption;
        }
        
        const card = e.target.closest('.question-card');
        if (card) {
            state.userAnswers[questionId] ? card.classList.add('answered') : card.classList.remove('answered');
        }
        updateProgress();
    }

    function updateProgress() {
        const answered = Object.keys(state.userAnswers).length;
        const total = state.shuffledQuiz.length;
        elements.answeredCount.textContent = answered;
        elements.progressBar.style.width = `${(answered / total) * 100}%`;
    }

    // ===================================
    // 페이지네이션
    // ===================================
    function renderPagination() {
        const totalPages = Math.ceil(state.shuffledQuiz.length / state.questionsPerPage);
        if (totalPages <= 1) { elements.pagination.innerHTML = ''; return; }
        
        let html = `<button class="page-btn nav-btn" ${state.currentPage === 1 ? 'disabled' : ''} data-page="prev">◀</button>`;
        for (let i = 1; i <= totalPages; i++) {
            if (totalPages > 10 && (i > 3 && i < totalPages - 2 && Math.abs(i - state.currentPage) > 2)) {
                if (i === 4 || i === totalPages - 2) html += `<span class="page-info">...</span>`;
                continue;
            }
            html += `<button class="page-btn ${i === state.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        html += `<button class="page-btn nav-btn" ${state.currentPage === totalPages ? 'disabled' : ''} data-page="next">▶</button>`;
        elements.pagination.innerHTML = html;
        
        elements.pagination.onclick = function(e) {
            const btn = e.target.closest('.page-btn');
            if (!btn || btn.disabled) return;
            const page = btn.dataset.page;
            if (page === 'prev') state.currentPage--;
            else if (page === 'next') state.currentPage++;
            else state.currentPage = parseInt(page);
            renderQuestions();
            renderPagination();
            if (state.isSubmitted) showGradedQuestions();
        };
    }

    // ===================================
    // 제출 및 결과
    // ===================================
    function submitQuiz() {
        state.isSubmitted = true;
        let correctCount = 0;
        state.shuffledQuiz.forEach(q => {
            if (checkIsCorrect(state.userAnswers[q.id], q.answer)) correctCount++;
        });
        state.correctCount = correctCount;
        state.score = Math.round((correctCount / state.shuffledQuiz.length) * 100);
        showResult();
    }

    function showResult() {
        elements.quizScreen.classList.add('hidden');
        elements.resultScreen.classList.remove('hidden');
        elements.scoreValue.textContent = state.score;
        elements.resultSummary.textContent = `${state.shuffledQuiz.length}개 중 ${state.correctCount}개 정답`;
        const circumference = 339.292;
        elements.scoreProgress.style.strokeDashoffset = circumference - (state.score / 100) * circumference;
        window.scrollTo({ top: 0 });
    }

    // ===================================
    // 오답 리뷰
    // ===================================
    function showReview() {
        elements.reviewSection.classList.remove('hidden');
        filterReview('wrong');
        elements.reviewSection.scrollIntoView({ behavior: 'smooth' });
    }

    function filterReview(filter) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.filter === filter));
        let questionsToShow = (filter === 'wrong') 
            ? state.shuffledQuiz.filter(q => !checkIsCorrect(state.userAnswers[q.id], q.answer))
            : state.shuffledQuiz;
        
        elements.reviewContainer.innerHTML = questionsToShow.map((q) => {
            const uAns = state.userAnswers[q.id];
            const isCorrect = checkIsCorrect(uAns, q.answer);
            const originalIdx = state.shuffledQuiz.findIndex(item => item.id === q.id);
            
            return `
                <div class="question-card ${isCorrect ? 'correct' : 'wrong'} ${q.isMulti ? 'multi-select' : ''}">
                    <div class="question-header">
                        <span class="question-number">${originalIdx + 1}</span>
                        <p class="question-text">${escapeHtml(q.question)}</p>
                    </div>
                    <ul class="options-list">
                        ${q.options.map((opt, optIdx) => {
                            const num = optIdx + 1;
                            const isUserPicked = q.isMulti ? (uAns || []).includes(num) : uAns === num;
                            const isCorrectAns = q.isMulti ? q.answer.includes(num) : q.answer === num;
                            let labelClass = isCorrectAns ? 'correct-answer' : (isUserPicked ? 'wrong-answer' : '');
                            
                            return `
                                <li class="option-item">
                                    <input type="checkbox" class="option-input" ${isUserPicked ? 'checked' : ''} disabled>
                                    <label class="option-label ${labelClass}">
                                        <span class="option-marker">${['A','B','C','D'][optIdx]}</span>
                                        <span class="option-text">${escapeHtml(opt)}</span>
                                    </label>
                                </li>
                            `;
                        }).join('')}
                    </ul>
                    <div class="explanation">
                        <div class="explanation-title">해설</div>
                        <p class="explanation-text">${escapeHtml(q.explanation || '해설이 없습니다.')}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    function showGradedQuestions() {
        renderQuestions(); // 단순화를 위해 현재 페이지 다시 렌더링 후 클래스 처리
    }

    function retryQuiz() {
        Object.assign(state, { currentPage: 1, userAnswers: {}, isSubmitted: false, score: 0, correctCount: 0 });
        elements.resultScreen.classList.add('hidden');
        elements.reviewSection.classList.add('hidden');
        elements.startScreen.classList.remove('hidden');
        updateProgress();
        window.scrollTo({ top: 0 });
    }

    function handleScroll() { window.scrollY > 400 ? elements.scrollTopBtn?.classList.remove('hidden') : elements.scrollTopBtn?.classList.add('hidden'); }
    function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    function escapeHtml(t) { const d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

    init();
})();
