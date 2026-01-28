/**
 * NHN Cloud 자격증 모의고사 - 메인 스크립트 (다중 선택 지원 버전)
 * 4지선다 + 5지선다(2개 선택) 모두 지원
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
    // 상수 정의
    // ===================================
    // [수정] 5개 이상 보기 지원을 위해 마커 확장
    const MARKERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

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
            if (userAns.length !== realAns.length) return false;
            // 정렬 후 비교 (순서 무관)
            const sortedUser = [...userAns].sort((a, b) => a - b);
            const sortedReal = [...realAns].sort((a, b) => a - b);
            return sortedUser.every((val, idx) => val === sortedReal[idx]);
        }
        return userAns === realAns;
    }

    function validateQuizData(data) {
        if (!Array.isArray(data)) return [];
        
        return data.filter((q, index) => {
            if (!q || typeof q !== 'object') return false;
            const isAnswerValid = typeof q.answer === 'number' || Array.isArray(q.answer);
            if (!q.question || !Array.isArray(q.options) || !isAnswerValid) {
                console.warn(`문제 ${index + 1}: 데이터 오류`);
                return false;
            }
            return true;
        }).map((q, index) => ({
            ...q,
            id: q.id || index + 1,
            isMulti: Array.isArray(q.answer),
            requiredSelections: Array.isArray(q.answer) ? q.answer.length : 1
        }));
    }

    function escapeHtml(text) {
        if (typeof text !== 'string') return String(text || '');
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // [수정] 마커 가져오기 (범위 초과 방지)
    function getMarker(index) {
        return MARKERS[index] || String(index + 1);
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
            console.log(`✅ 총 ${validData.length}개의 문제가 로드되었습니다.`);
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
    // 렌더링 (다중 선택 + 채점 표시 통합)
    // ===================================
    function renderQuestions() {
        const startIdx = (state.currentPage - 1) * state.questionsPerPage;
        const endIdx = Math.min(startIdx + state.questionsPerPage, state.shuffledQuiz.length);
        const questionsToShow = state.shuffledQuiz.slice(startIdx, endIdx);
        
        elements.quizContainer.innerHTML = questionsToShow.map((q, idx) => {
            const globalIdx = startIdx + idx;
            const userAns = state.userAnswers[q.id];
            const isAnswered = userAns !== undefined && (Array.isArray(userAns) ? userAns.length > 0 : true);
            
            // [수정] 제출 후 정답/오답 상태 결정
            let cardStateClass = '';
            if (state.isSubmitted) {
                cardStateClass = checkIsCorrect(userAns, q.answer) ? 'correct' : 'wrong';
            } else if (isAnswered) {
                cardStateClass = 'answered';
            }
            
            // 다중 선택 안내 텍스트
            const multiHint = q.isMulti ? `<span class="multi-badge">${q.requiredSelections}개 선택</span>` : '';
            
            return `
                <div class="question-card ${cardStateClass} ${q.isMulti ? 'multi-select' : ''}" data-id="${q.id}">
                    <div class="question-header">
                        <span class="question-number">${globalIdx + 1}</span>
                        ${multiHint}
                        <p class="question-text">${escapeHtml(q.question)}</p>
                    </div>
                    <ul class="options-list">
                        ${q.options.map((opt, optIdx) => {
                            const optionNum = optIdx + 1;
                            const isChecked = q.isMulti 
                                ? (userAns || []).includes(optionNum)
                                : userAns === optionNum;
                            
                            // [수정] 제출 후 정답/오답 스타일
                            let labelClass = '';
                            if (state.isSubmitted) {
                                const isCorrectAnswer = q.isMulti 
                                    ? q.answer.includes(optionNum) 
                                    : q.answer === optionNum;
                                
                                if (isCorrectAnswer) {
                                    labelClass = 'correct-answer';
                                } else if (isChecked) {
                                    labelClass = 'wrong-answer';
                                }
                            }
                            
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
                                    <label for="q${q.id}_opt${optionNum}" class="option-label ${labelClass}">
                                        <span class="option-marker">${getMarker(optIdx)}</span>
                                        <span class="option-text">${escapeHtml(opt)}</span>
                                    </label>
                                </li>
                            `;
                        }).join('')}
                    </ul>
                    ${state.isSubmitted && !checkIsCorrect(userAns, q.answer) ? `
                        <div class="explanation">
                            <div class="explanation-title">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;">
                                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                                </svg>
                                해설
                            </div>
                            <p class="explanation-text">${escapeHtml(q.explanation || '해설이 없습니다.')}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
        
        // [수정] 제출 전에만 이벤트 리스너 등록
        if (!state.isSubmitted) {
            document.querySelectorAll('.option-input').forEach(input => {
                input.addEventListener('change', handleOptionSelect);
            });
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function handleOptionSelect(e) {
        const questionId = parseInt(e.target.name.replace('q', ''));
        const selectedOption = parseInt(e.target.value);
        const question = state.shuffledQuiz.find(q => q.id === questionId);

        if (question.isMulti) {
            if (!Array.isArray(state.userAnswers[questionId])) {
                state.userAnswers[questionId] = [];
            }
            
            if (e.target.checked) {
                // [수정] 최대 선택 개수 제한
                if (state.userAnswers[questionId].length < question.requiredSelections) {
                    state.userAnswers[questionId].push(selectedOption);
                } else {
                    e.target.checked = false;
                    return;
                }
            } else {
                state.userAnswers[questionId] = state.userAnswers[questionId].filter(v => v !== selectedOption);
            }
            
            if (state.userAnswers[questionId].length === 0) {
                delete state.userAnswers[questionId];
            }
        } else {
            state.userAnswers[questionId] = selectedOption;
        }
        
        const card = e.target.closest('.question-card');
        if (card) {
            const hasAnswer = state.userAnswers[questionId] !== undefined;
            card.classList.toggle('answered', hasAnswer);
        }
        
        updateProgress();
    }

    function updateProgress() {
        const answered = Object.keys(state.userAnswers).filter(key => {
            const ans = state.userAnswers[key];
            return Array.isArray(ans) ? ans.length > 0 : ans !== undefined;
        }).length;
        const total = state.shuffledQuiz.length;
        elements.answeredCount.textContent = answered;
        elements.progressBar.style.width = total > 0 ? `${(answered / total) * 100}%` : '0%';
    }

    // ===================================
    // 페이지네이션
    // ===================================
    function renderPagination() {
        const totalPages = Math.ceil(state.shuffledQuiz.length / state.questionsPerPage);
        if (totalPages <= 1) { 
            elements.pagination.innerHTML = ''; 
            return; 
        }
        
        let html = `<button class="page-btn nav-btn" ${state.currentPage === 1 ? 'disabled' : ''} data-page="prev">◀</button>`;
        
        for (let i = 1; i <= totalPages; i++) {
            if (totalPages > 10 && (i > 3 && i < totalPages - 2 && Math.abs(i - state.currentPage) > 2)) {
                if (i === 4 || i === totalPages - 3) html += `<span class="page-info">...</span>`;
                continue;
            }
            html += `<button class="page-btn ${i === state.currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        }
        
        html += `<button class="page-btn nav-btn" ${state.currentPage === totalPages ? 'disabled' : ''} data-page="next">▶</button>`;
        html += `<span class="page-info" style="margin-left:12px;">${state.currentPage}/${totalPages}</span>`;
        
        elements.pagination.innerHTML = html;
        
        elements.pagination.onclick = function(e) {
            const btn = e.target.closest('.page-btn');
            if (!btn || btn.disabled) return;
            
            const page = btn.dataset.page;
            const totalPages = Math.ceil(state.shuffledQuiz.length / state.questionsPerPage);
            
            if (page === 'prev') {
                state.currentPage = Math.max(1, state.currentPage - 1);
            } else if (page === 'next') {
                state.currentPage = Math.min(totalPages, state.currentPage + 1);
            } else {
                state.currentPage = parseInt(page);
            }
            
            renderQuestions();
            renderPagination();
        };
    }

    // ===================================
    // 제출 및 결과
    // ===================================
    function submitQuiz() {
        const unanswered = state.shuffledQuiz.length - Object.keys(state.userAnswers).length;
        if (unanswered > 0) {
            const confirmSubmit = confirm(`아직 ${unanswered}개의 문제에 답하지 않았습니다.\n그래도 제출하시겠습니까?`);
            if (!confirmSubmit) return;
        }
        
        state.isSubmitted = true;
        
        let correctCount = 0;
        state.shuffledQuiz.forEach(q => {
            if (checkIsCorrect(state.userAnswers[q.id], q.answer)) {
                correctCount++;
            }
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
        setTimeout(() => {
            elements.scoreProgress.style.strokeDashoffset = circumference - (state.score / 100) * circumference;
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
        
        if (elements.resultGrade) {
            elements.resultGrade.className = `result-grade ${gradeClass}`;
            elements.resultGrade.innerHTML = `<span class="grade-text">${gradeText}</span>`;
        }
        
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
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        let questionsToShow = (filter === 'wrong') 
            ? state.shuffledQuiz.filter(q => !checkIsCorrect(state.userAnswers[q.id], q.answer))
            : state.shuffledQuiz;
        
        if (questionsToShow.length === 0) {
            elements.reviewContainer.innerHTML = `
                <div class="question-card" style="text-align: center; padding: 48px;">
                    <p style="font-size: 18px; color: var(--gray-500);">🎉 모든 문제를 맞추셨습니다!</p>
                </div>
            `;
            return;
        }
        
        elements.reviewContainer.innerHTML = questionsToShow.map((q) => {
            const userAns = state.userAnswers[q.id];
            const isCorrect = checkIsCorrect(userAns, q.answer);
            const originalIdx = state.shuffledQuiz.findIndex(item => item.id === q.id);
            
            return `
                <div class="question-card ${isCorrect ? 'correct' : 'wrong'} ${q.isMulti ? 'multi-select' : ''}">
                    <div class="question-header">
                        <span class="question-number">${originalIdx + 1}</span>
                        ${q.isMulti ? `<span class="multi-badge">${q.requiredSelections}개 선택</span>` : ''}
                        <p class="question-text">${escapeHtml(q.question)}</p>
                    </div>
                    <ul class="options-list">
                        ${q.options.map((opt, optIdx) => {
                            const num = optIdx + 1;
                            const isUserPicked = q.isMulti ? (userAns || []).includes(num) : userAns === num;
                            const isCorrectAns = q.isMulti ? q.answer.includes(num) : q.answer === num;
                            
                            let labelClass = '';
                            if (isCorrectAns) {
                                labelClass = 'correct-answer';
                            } else if (isUserPicked) {
                                labelClass = 'wrong-answer';
                            }
                            
                            return `
                                <li class="option-item">
                                    <input type="${q.isMulti ? 'checkbox' : 'radio'}" class="option-input" ${isUserPicked ? 'checked' : ''} disabled>
                                    <label class="option-label ${labelClass}">
                                        <span class="option-marker">${getMarker(optIdx)}</span>
                                        <span class="option-text">${escapeHtml(opt)}</span>
                                    </label>
                                </li>
                            `;
                        }).join('')}
                    </ul>
                    <div class="explanation">
                        <div class="explanation-title">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px;height:16px;">
                                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                            </svg>
                            해설
                        </div>
                        <p class="explanation-text">${escapeHtml(q.explanation || '해설이 없습니다.')}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    // [수정] 채점된 문제 표시 - renderQuestions()가 이미 처리하므로 단순 호출
    function showGradedQuestions() {
        renderQuestions();
    }

    function retryQuiz() {
        state.currentPage = 1;
        state.userAnswers = {};
        state.isSubmitted = false;
        state.score = 0;
        state.correctCount = 0;
        state.shuffledQuiz = [];
        
        elements.resultScreen.classList.add('hidden');
        elements.reviewSection.classList.add('hidden');
        elements.startScreen.classList.remove('hidden');
        
        elements.progressBar.style.width = '0%';
        elements.answeredCount.textContent = '0';
        
        if (elements.scoreProgress) {
            elements.scoreProgress.style.strokeDashoffset = 339.292;
        }
        
        window.scrollTo({ top: 0 });
    }

    function handleScroll() {
        if (window.scrollY > 400) {
            elements.scrollTopBtn?.classList.remove('hidden');
        } else {
            elements.scrollTopBtn?.classList.add('hidden');
        }
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===================================
    // 앱 시작
    // ===================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
