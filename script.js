/**
 * NHN Cloud 자격증 모의고사 - 메인 스크립트
 * 문제 수 선택 기능 (30 / 60 / 전체) + 다중 선택 지원
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
        correctCount: 0,
        shuffledQuiz: [],
        selectedQuestionCount: 60,  // 선택된 문제 수 (기본값 60)
        totalAvailable: 0,          // 전체 문제 수
        isReviewMode: false,        // 틀린 문제 복습 모드 여부
        flaggedQuestions: new Set(), // 깃발 표시된 문제 ID
        navFilter: 'all'            // 네비게이션 필터: 'all', 'unanswered', 'flagged'
    };

    // ===================================
    // 구글 스프레드시트 데이터 연동
    // ===================================
    const SPREADSHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vReQVdB9J2ivzz-hhxks4F_Nn90ibO-I_Vl9COYK_kKIS4R_Cu3lWOWJvK28iF9o9HjAYTpQ6SvNGAC/pub?gid=0&single=true&output=csv';

    async function fetchQuizDataFromSheet() {
        try {
            const response = await fetch(SPREADSHEET_URL);
            const data = await response.text();
            const lines = data.split('\n').slice(1);
            
            return lines.map((line, index) => {
                const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => col.replace(/^"|"$/g, '').trim());
                if (cols.length < 9) return null;
                
                const options = [cols[3], cols[4], cols[5], cols[6], cols[7]].filter(opt => opt !== "");
                let answer = cols[8].includes(',') ? cols[8].split(',').map(Number) : Number(cols[8]);

                return {
                    id: index + 1,
                    category: cols[1],
                    question: cols[2],
                    options: options,
                    answer: answer,
                    explanation: cols[9] || '해설이 없습니다.'
                };
            }).filter(item => item !== null);
        } catch (e) {
            console.error("데이터 로딩 실패:", e);
            return [];
        }
    }
    
    // quizData 오류 방지를 위한 전역 변수 선언
    let quizData = [];
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
        scrollTopBtn: document.getElementById('scrollTopBtn'),
        // 문제 수 선택 관련
        countBtns: document.querySelectorAll('.count-btn'),
        availableCount: document.getElementById('availableCount'),
        selectedCount: document.getElementById('selectedCount'),
        allCountDisplay: document.getElementById('allCountDisplay'),
        // 틀린 문제 복습 관련
        reviewWrongBtn: document.getElementById('reviewWrongBtn'),
        wrongCountBadge: document.getElementById('wrongCountBadge'),
        clearWrongBtn: document.getElementById('clearWrongBtn'),
        // 네비게이션 맵 관련
        navMap: document.getElementById('navMap'),
        navMapToggle: document.getElementById('navMapToggle'),
        navMapGrid: document.getElementById('navMapGrid'),
        navFilterBtns: null  // 동적으로 할당
    };

    // ===================================
    // 상수 정의
    // ===================================
    const MARKERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const STORAGE_KEY = 'nhn_quiz_wrong_questions';

    // ===================================
    // 세션 스토리지 관련 함수
    // ===================================
    
    /**
     * 틀린 문제 ID 목록을 세션 스토리지에 저장
     */
    function saveWrongQuestions(wrongIds) {
        try {
            // 기존 틀린 문제와 병합 (중복 제거)
            const existing = getWrongQuestionIds();
            const merged = [...new Set([...existing, ...wrongIds])];
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
            console.log(`💾 틀린 문제 ${merged.length}개 저장됨`);
        } catch (e) {
            console.error('세션 스토리지 저장 오류:', e);
        }
    }
    
    /**
     * 세션 스토리지에서 틀린 문제 ID 목록 가져오기
     */
    function getWrongQuestionIds() {
        try {
            const data = sessionStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('세션 스토리지 읽기 오류:', e);
            return [];
        }
    }
    
    /**
     * 틀린 문제 기록 삭제
     */
    function clearWrongQuestions() {
        sessionStorage.removeItem(STORAGE_KEY);
        updateWrongQuestionsUI();
        console.log('🗑️ 틀린 문제 기록 삭제됨');
    }
    
    /**
     * 틀린 문제 복습 버튼 UI 업데이트
     */
    function updateWrongQuestionsUI() {
        const wrongIds = getWrongQuestionIds();
        const hasWrongQuestions = wrongIds.length > 0;
        
        if (elements.reviewWrongBtn) {
            elements.reviewWrongBtn.classList.toggle('hidden', !hasWrongQuestions);
        }
        if (elements.wrongCountBadge) {
            elements.wrongCountBadge.textContent = wrongIds.length;
        }
        if (elements.clearWrongBtn) {
            elements.clearWrongBtn.classList.toggle('hidden', !hasWrongQuestions);
        }
    }
    
    /**
     * 복습 모드에서 맞춘 문제는 틀린 문제 목록에서 제거
     */
    function removeFromWrongQuestions(correctIds) {
        const existing = getWrongQuestionIds();
        const updated = existing.filter(id => !correctIds.includes(id));
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        console.log(`✅ ${correctIds.length}개 문제가 복습 완료되어 제거됨`);
    }

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

    /**
     * 보기(options) 순서를 섞고 정답도 함께 업데이트
     * @param {Object} question - 문제 객체
     * @returns {Object} - 보기가 섞인 새 문제 객체
     */
    function shuffleOptions(question) {
        const options = question.options;
        const originalAnswer = question.answer;
        
        // 인덱스 배열 생성 및 섞기 [0, 1, 2, 3, ...]
        const indices = options.map((_, idx) => idx);
        const shuffledIndices = shuffleArray(indices);
        
        // 섞인 순서로 옵션 재배열
        const shuffledOptions = shuffledIndices.map(idx => options[idx]);
        
        // 정답 위치 업데이트
        let newAnswer;
        if (Array.isArray(originalAnswer)) {
            // 다중 선택: 각 정답의 새 위치 찾기
            newAnswer = originalAnswer.map(ans => {
                // 💡 방어 코드: 혹시 정답이 0으로 들어오면 1로 보정
                const normalizedAns = ans > 0 ? ans : ans + 1; 
                const originalIdx = normalizedAns - 1; 
                const newIdx = shuffledIndices.indexOf(originalIdx);
                return newIdx + 1;
            });
        } else {
            // 단일 선택: 정답의 새 위치 찾기
            // 💡 방어 코드: 혹시 정답이 0으로 들어오면 1로 보정
            const normalizedAns = originalAnswer > 0 ? originalAnswer : originalAnswer + 1;
            const originalIdx = normalizedAns - 1;
            const newIdx = shuffledIndices.indexOf(originalIdx);
            newAnswer = newIdx + 1;
        }
        
        return {
            ...question,
            options: shuffledOptions,
            answer: newAnswer
        };
    }

    function checkIsCorrect(userAns, realAns) {
        if (Array.isArray(realAns)) {
            if (!Array.isArray(userAns)) return false;
            if (userAns.length !== realAns.length) return false;
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

    function getMarker(index) {
        return MARKERS[index] || String(index + 1);
    }

    // ===================================
    // 초기화 및 이벤트
    // ===================================
    async function init() {
        try {
            // 로딩 표시 (선택 사항)
            elements.startTotalCount.textContent = '로딩 중...';
            
            // 시트에서 데이터 가져오기
            quizData = await fetchQuizDataFromSheet();
            
            const validData = validateQuizData(quizData);
            if (validData.length === 0) {
                alert('유효한 문제 데이터가 없습니다. 스프레드시트 링크를 확인해주세요.');
                return;
            }
            
            state.totalAvailable = validData.length;
            window.validatedQuizData = validData;
            
            // 화면에 총 문제 수 표시
            elements.startTotalCount.textContent = validData.length;
            elements.availableCount.textContent = validData.length;
            elements.allCountDisplay.textContent = validData.length;
            
            // 기본 선택 문제 수 설정 (전체가 60개 미만이면 전체로)
            if (validData.length < 60) {
                state.selectedQuestionCount = validData.length;
                elements.selectedCount.textContent = validData.length;
                // 전체 버튼 활성화
                elements.countBtns.forEach(btn => btn.classList.remove('active'));
                document.querySelector('[data-count="all"]')?.classList.add('active');
            } else {
                elements.selectedCount.textContent = '60';
            }
            
            // 틀린 문제 복습 버튼 UI 업데이트
            updateWrongQuestionsUI();
            
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
        
        // 문제 수 선택 버튼 이벤트
        elements.countBtns.forEach(btn => {
            btn.addEventListener('click', handleCountSelect);
        });
        
        // 틀린 문제 복습 버튼 이벤트
        elements.reviewWrongBtn?.addEventListener('click', startReviewMode);
        elements.clearWrongBtn?.addEventListener('click', () => {
            if (confirm('틀린 문제 기록을 삭제하시겠습니까?')) {
                clearWrongQuestions();
            }
        });
        
        // 네비게이션 맵 토글 이벤트
        elements.navMapToggle?.addEventListener('click', toggleNavigationMap);
    }

    // ===================================
    // 틀린 문제 복습 모드
    // ===================================
    function startReviewMode() {
        const wrongIds = getWrongQuestionIds();
        if (wrongIds.length === 0) {
            alert('복습할 틀린 문제가 없습니다.');
            return;
        }
        
        // 틀린 문제만 필터링
        const wrongQuestions = (window.validatedQuizData || quizData)
            .filter(q => wrongIds.includes(q.id));
        
        if (wrongQuestions.length === 0) {
            alert('저장된 틀린 문제를 찾을 수 없습니다.');
            clearWrongQuestions();
            return;
        }
        
        state.isReviewMode = true;
        state.flaggedQuestions = new Set();  // 깃발 리셋
        state.navFilter = 'all';  // 필터 리셋
        
        // 문제 및 보기 섞기
        const shuffled = shuffleArray(wrongQuestions);
        state.shuffledQuiz = shuffled.map(q => shuffleOptions(q));
        
        // UI 업데이트
        elements.totalCount.textContent = state.shuffledQuiz.length;
        elements.startScreen.classList.add('hidden');
        elements.quizScreen.classList.remove('hidden');
        
        renderQuestions();
        renderPagination();
        updateProgress();
        
        console.log(`📝 틀린 문제 복습 모드: ${state.shuffledQuiz.length}개 문제`);
    }

    // ===================================
    // 문제 수 선택 핸들러
    // ===================================
    function handleCountSelect(e) {
        const btn = e.currentTarget;
        const count = btn.dataset.count;
        
        // 버튼 활성화 상태 변경
        elements.countBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // 선택된 문제 수 설정
        if (count === 'all') {
            state.selectedQuestionCount = state.totalAvailable;
            elements.selectedCount.textContent = state.totalAvailable;
        } else {
            const numCount = parseInt(count);
            // 전체 문제 수보다 크면 전체로 제한
            state.selectedQuestionCount = Math.min(numCount, state.totalAvailable);
            elements.selectedCount.textContent = state.selectedQuestionCount;
        }
        
        // 시작 화면의 총 문제 수도 업데이트
        elements.startTotalCount.textContent = state.selectedQuestionCount;
    }

    // ===================================
    // 퀴즈 시작
    // ===================================
    function startQuiz() {
        state.isReviewMode = false;  // 일반 모드
        state.flaggedQuestions = new Set();  // 깃발 리셋
        state.navFilter = 'all';  // 필터 리셋
        
        // 전체 문제 섞기
        const allShuffled = shuffleArray(window.validatedQuizData || quizData);
        
        // 선택된 개수만큼만 가져오기
        const selectedQuestions = allShuffled.slice(0, state.selectedQuestionCount);
        
        // 각 문제의 보기(options)도 섞기
        state.shuffledQuiz = selectedQuestions.map(q => shuffleOptions(q));
        
        // 총 문제 수 표시 업데이트
        elements.totalCount.textContent = state.shuffledQuiz.length;
        
        elements.startScreen.classList.add('hidden');
        elements.quizScreen.classList.remove('hidden');
        
        renderQuestions();
        renderPagination();
        updateProgress();
        
        console.log('✅ 문제 및 보기 순서가 섞였습니다.');
    }

    // ===================================
    // 렌더링
    // ===================================
    function renderQuestions() {
        const startIdx = (state.currentPage - 1) * state.questionsPerPage;
        const endIdx = Math.min(startIdx + state.questionsPerPage, state.shuffledQuiz.length);
        const questionsToShow = state.shuffledQuiz.slice(startIdx, endIdx);
        
        elements.quizContainer.innerHTML = questionsToShow.map((q, idx) => {
            const globalIdx = startIdx + idx;
            const userAns = state.userAnswers[q.id];
            const isAnswered = userAns !== undefined && (Array.isArray(userAns) ? userAns.length > 0 : true);
            const isFlagged = state.flaggedQuestions.has(q.id);
            
            let cardStateClass = '';
            if (state.isSubmitted) {
                cardStateClass = checkIsCorrect(userAns, q.answer) ? 'correct' : 'wrong';
            } else if (isAnswered) {
                cardStateClass = 'answered';
            }
            
            const multiHint = q.isMulti ? `<span class="multi-badge">${q.requiredSelections}개 선택</span>` : '';
            
            return `
                <div class="question-card ${cardStateClass} ${q.isMulti ? 'multi-select' : ''} ${isFlagged ? 'flagged' : ''}" data-id="${q.id}" data-index="${globalIdx}">
                    <div class="question-header">
                        <span class="question-number">${globalIdx + 1}</span>
                        ${multiHint}
                        <button class="flag-btn ${isFlagged ? 'active' : ''}" data-id="${q.id}" title="깃발 표시">
                            <svg viewBox="0 0 24 24" fill="${isFlagged ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                                <line x1="4" y1="22" x2="4" y2="15"/>
                            </svg>
                        </button>
                        <p class="question-text">${escapeHtml(q.question)}</p>
                    </div>
                    <ul class="options-list">
                        ${q.options.map((opt, optIdx) => {
                            const optionNum = optIdx + 1;
                            const isChecked = q.isMulti 
                                ? (userAns || []).includes(optionNum)
                                : userAns === optionNum;
                            
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
        
        // 이벤트 리스너 등록
        if (!state.isSubmitted) {
            document.querySelectorAll('.option-input').forEach(input => {
                input.addEventListener('change', handleOptionSelect);
            });
        }
        
        // 깃발 버튼 이벤트 등록
        document.querySelectorAll('.flag-btn').forEach(btn => {
            btn.addEventListener('click', handleFlagToggle);
        });
        
        // 네비게이션 맵 업데이트
        renderNavigationMap();
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    /**
     * 깃발 토글 핸들러
     */
    function handleFlagToggle(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const btn = e.currentTarget;
        const questionId = parseInt(btn.dataset.id);
        
        if (state.flaggedQuestions.has(questionId)) {
            state.flaggedQuestions.delete(questionId);
            btn.classList.remove('active');
            btn.querySelector('svg').setAttribute('fill', 'none');
        } else {
            state.flaggedQuestions.add(questionId);
            btn.classList.add('active');
            btn.querySelector('svg').setAttribute('fill', 'currentColor');
        }
        
        // 카드에도 flagged 클래스 토글
        const card = btn.closest('.question-card');
        if (card) {
            card.classList.toggle('flagged', state.flaggedQuestions.has(questionId));
        }
        
        // 네비게이션 맵 업데이트
        renderNavigationMap();
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
        
        // 네비게이션 맵도 업데이트
        renderNavigationMap();
    }

    // ===================================
    // 네비게이션 맵 (전체 문제 번호판)
    // ===================================
    function renderNavigationMap() {
        if (!elements.navMapGrid) return;
        
        const total = state.shuffledQuiz.length;
        const answeredCount = Object.keys(state.userAnswers).filter(key => {
            const ans = state.userAnswers[key];
            return Array.isArray(ans) ? ans.length > 0 : ans !== undefined;
        }).length;
        const flaggedCount = state.flaggedQuestions.size;
        const unansweredCount = total - answeredCount;
        
        // 필터된 문제 인덱스 가져오기
        const filteredIndices = getFilteredQuestionIndices();
        
        // 통계 업데이트
        const statsHtml = `
            <div class="nav-map-stats">
                <span class="stat-item">
                    <span class="stat-dot answered"></span>
                    답변: ${answeredCount}
                </span>
                <span class="stat-item">
                    <span class="stat-dot unanswered"></span>
                    미답변: ${unansweredCount}
                </span>
                <span class="stat-item">
                    <span class="stat-dot flagged"></span>
                    깃발: ${flaggedCount}
                </span>
            </div>
        `;
        
        // 필터 버튼
        const filterHtml = `
            <div class="nav-filter-btns">
                <button class="nav-filter-btn ${state.navFilter === 'all' ? 'active' : ''}" data-filter="all">
                    전체 (${total})
                </button>
                <button class="nav-filter-btn ${state.navFilter === 'unanswered' ? 'active' : ''}" data-filter="unanswered">
                    미답변 (${unansweredCount})
                </button>
                <button class="nav-filter-btn ${state.navFilter === 'flagged' ? 'active' : ''}" data-filter="flagged">
                    🚩 깃발 (${flaggedCount})
                </button>
            </div>
        `;
        
        // 그리드 생성
        let gridHtml = '<div class="nav-grid">';
        
        state.shuffledQuiz.forEach((q, idx) => {
            const questionNum = idx + 1;
            const userAns = state.userAnswers[q.id];
            const isAnswered = userAns !== undefined && (Array.isArray(userAns) ? userAns.length > 0 : true);
            const isFlagged = state.flaggedQuestions.has(q.id);
            const isCurrentPage = Math.ceil(questionNum / state.questionsPerPage) === state.currentPage;
            
            // 필터링: 해당 문제가 현재 필터에 포함되는지 확인
            const isVisible = filteredIndices.includes(idx);
            
            let statusClass = 'unanswered';
            if (isAnswered) statusClass = 'answered';
            
            gridHtml += `
                <button class="nav-cell ${statusClass} ${isFlagged ? 'flagged' : ''} ${isCurrentPage ? 'current-page' : ''} ${!isVisible ? 'filtered-out' : ''}"
                        data-index="${idx}" 
                        data-id="${q.id}"
                        title="문제 ${questionNum}${isFlagged ? ' (깃발)' : ''}${isAnswered ? ' (답변완료)' : ' (미답변)'}">
                    ${questionNum}
                    ${isFlagged ? '<span class="cell-flag">🚩</span>' : ''}
                </button>
            `;
        });
        
        gridHtml += '</div>';
        
        elements.navMapGrid.innerHTML = statsHtml + filterHtml + gridHtml;
        
        // 필터 버튼 이벤트
        elements.navMapGrid.querySelectorAll('.nav-filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                state.navFilter = e.target.dataset.filter;
                renderNavigationMap();
            });
        });
        
        // 셀 클릭 이벤트 (해당 페이지로 이동)
        elements.navMapGrid.querySelectorAll('.nav-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.dataset.index);
                const targetPage = Math.ceil((idx + 1) / state.questionsPerPage);
                
                if (targetPage !== state.currentPage) {
                    state.currentPage = targetPage;
                    renderQuestions();
                    renderPagination();
                }
                
                // 해당 문제로 스크롤
                setTimeout(() => {
                    const questionId = parseInt(e.currentTarget.dataset.id);
                    const targetCard = document.querySelector(`.question-card[data-id="${questionId}"]`);
                    if (targetCard) {
                        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        targetCard.classList.add('highlight');
                        setTimeout(() => targetCard.classList.remove('highlight'), 1500);
                    }
                }, 100);
            });
        });
    }
    
    /**
     * 현재 필터에 맞는 문제 인덱스 배열 반환
     */
    function getFilteredQuestionIndices() {
        const indices = [];
        
        state.shuffledQuiz.forEach((q, idx) => {
            const userAns = state.userAnswers[q.id];
            const isAnswered = userAns !== undefined && (Array.isArray(userAns) ? userAns.length > 0 : true);
            const isFlagged = state.flaggedQuestions.has(q.id);
            
            switch (state.navFilter) {
                case 'unanswered':
                    if (!isAnswered) indices.push(idx);
                    break;
                case 'flagged':
                    if (isFlagged) indices.push(idx);
                    break;
                default: // 'all'
                    indices.push(idx);
            }
        });
        
        return indices;
    }
    
    /**
     * 네비게이션 맵 토글
     */
    function toggleNavigationMap() {
        const navMap = elements.navMap;
        if (navMap) {
            navMap.classList.toggle('collapsed');
            const toggleBtn = elements.navMapToggle;
            if (toggleBtn) {
                toggleBtn.textContent = navMap.classList.contains('collapsed') ? '📋 문제 맵 열기' : '📋 문제 맵 닫기';
            }
        }
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
        const wrongIds = [];
        const correctIds = [];
        
        state.shuffledQuiz.forEach(q => {
            if (checkIsCorrect(state.userAnswers[q.id], q.answer)) {
                correctCount++;
                correctIds.push(q.id);
            } else {
                wrongIds.push(q.id);
            }
        });
        
        state.correctCount = correctCount;
        state.score = Math.round((correctCount / state.shuffledQuiz.length) * 100);
        
        // 틀린 문제 세션 스토리지에 저장
        if (wrongIds.length > 0) {
            saveWrongQuestions(wrongIds);
        }
        
        // 복습 모드에서 맞춘 문제는 틀린 문제 목록에서 제거
        if (state.isReviewMode && correctIds.length > 0) {
            removeFromWrongQuestions(correctIds);
        }
        
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

    function retryQuiz() {
        state.currentPage = 1;
        state.userAnswers = {};
        state.isSubmitted = false;
        state.score = 0;
        state.correctCount = 0;
        state.shuffledQuiz = [];
        state.isReviewMode = false;  // 복습 모드 리셋
        state.flaggedQuestions = new Set();  // 깃발 리셋
        state.navFilter = 'all';  // 필터 리셋
        
        elements.resultScreen.classList.add('hidden');
        elements.reviewSection.classList.add('hidden');
        elements.startScreen.classList.remove('hidden');
        
        elements.progressBar.style.width = '0%';
        elements.answeredCount.textContent = '0';
        
        if (elements.scoreProgress) {
            elements.scoreProgress.style.strokeDashoffset = 339.292;
        }
        
        // 틀린 문제 복습 버튼 UI 업데이트
        updateWrongQuestionsUI();
        
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
