/**
 * NHN Cloud 자격증 모의고사 문제 데이터
 * 
 * 형식:
 * {
 *   id: number,           // 문제 고유 ID
 *   question: string,     // 문제 텍스트
 *   options: string[],    // 4개의 선택지 배열
 *   answer: number,       // 정답 (1~4)
 *   explanation: string   // 해설
 * }
 * 
 * 총 100문제까지 추가 가능
 */

const quizData = [
    {
        "id": 1,
        "question": "NHN Cloud는 어떤 오픈소스 기술을 기반으로 클라우드 인프라를 제공하는가?",
        "options": [
            "Kubernetes",
            "OpenStack",
            "Docker Swarm",
            "CloudFoundry"
        ],
        "answer": 2,
        "explanation": "NHN Cloud는 OpenStack 기반의 유연한 클라우드 인프라를 제공합니다. OpenStack은 오픈소스 클라우드 컴퓨팅 플랫폼으로, NHN Cloud의 핵심 기술 기반입니다."
    },
    {
        "id": 2,
        "question": "NHN Cloud가 10년 이상 운영하며 IT 운영 경험을 축적한 서비스로 올바르게 짝지어진 것은?",
        "options": [
            "네이버, 카카오톡, 토스",
            "한게임, 벅스, PAYCO",
            "쿠팡, 배민, 당근마켓",
            "멜론, 지마켓, 11번가"
        ],
        "answer": 2,
        "explanation": "NHN Cloud는 10년 이상 한게임, 벅스, PAYCO 서비스를 운영하며 축적한 IT 운영 경험과 노하우를 바탕으로 안정된 클라우드 서비스를 제공합니다."
    },
    {
        "id": 3,
        "question": "NHN Cloud의 판교 데이터센터(NCC1)가 충족하는 Uptime Institute 등급은?",
        "options": [
            "Tier 1",
            "Tier 2",
            "Tier 3",
            "Tier 4"
        ],
        "answer": 3,
        "explanation": "NCC1(NHN Cloud Center 1)은 Uptime Institute 설계 및 가이드 기준 Tier 3를 충족하며, 높은 안정성과 가용성을 보장합니다."
    },
    {
        "id": 4,
        "question": "NHN Cloud 서비스의 릴리스 정책 중 정식 서비스를 의미하는 단계는?",
        "options": [
            "ALPHA",
            "BETA",
            "GA",
            "RC"
        ],
        "answer": 3,
        "explanation": "NHN Cloud의 릴리스 정책은 ALPHA → BETA → GA 순서로 진행됩니다. GA(General Availability)는 정식 서비스를 의미하며, ALPHA와 BETA는 정식 출시 전 사용자에게 공개하는 서비스입니다."
    },
    {
        "id": 5,
        "question": "NHN Cloud의 주요 특징으로 올바르지 않은 것은?",
        "options": [
            "다양한 서비스 구성",
            "플랫폼 중심 클라우드",
            "선불 고정 요금제만 지원",
            "합리적인 가격"
        ],
        "answer": 3,
        "explanation": "NHN Cloud는 사용한 만큼만 과금되는 종량제 방식을 기본으로 하며, 약정 요금제로 더 많은 할인 혜택을 제공합니다. 선불 고정 요금제만 지원하는 것이 아닙니다."
    },
    {
        "id": 6,
        "question": "NHN Cloud 데이터센터가 위치한 지역으로 올바르게 짝지어진 것은?",
        "options": [
            "서울, 부산",
            "판교, 광주",
            "대전, 제주",
            "인천, 대구"
        ],
        "answer": 2,
        "explanation": "NHN Cloud는 경기도 판교에 NCC1(NHN Cloud Center 1)을, 광주에 AI 데이터센터를 운영하고 있습니다. 판교 데이터센터는 자체 기술력으로 설계·구축한 도심형 인터넷 데이터 센터입니다."
    },
    {
        "id": 7,
        "question": "NHN Cloud가 제공하는 서비스 카테고리로 올바르지 않은 것은?",
        "options": [
            "인프라, 콘텐츠",
            "분석, 게임",
            "보안, 알림 메시지",
            "블록체인 채굴"
        ],
        "answer": 4,
        "explanation": "NHN Cloud는 인프라, 콘텐츠, 분석, 게임, 보안, 알림 메시지 등의 서비스 카테고리를 제공합니다. 블록체인 채굴은 NHN Cloud의 서비스 카테고리에 포함되지 않습니다."
    },
    {
        "id": 8,
        "question": "NHN Cloud 판교 데이터센터(NCC1)에서 에너지 절감을 위해 사용하는 냉각 방식은?",
        "options": [
            "수냉식 냉각",
            "직접 공랭식 냉각",
            "간접 기화 냉각",
            "액침 냉각"
        ],
        "answer": 3,
        "explanation": "NCC1은 특허 등록한 간접 기화 냉각 방식으로 IT 장비의 냉방에 최소의 전력을 사용하여 에너지를 절감합니다."
    },
    {
        "id": 9,
        "question": "NHN Cloud의 기술 지원 서비스에 대한 설명으로 올바른 것은?",
        "options": [
            "평일 오전 9시~오후 6시에만 상담 가능",
            "전문 엔지니어가 24시간/365일 상담 제공",
            "이메일 문의만 가능",
            "월 1회 정기 상담만 제공"
        ],
        "answer": 2,
        "explanation": "NHN Cloud는 전문 엔지니어가 24시간/365일 상담을 제공하며, 클라우드 도입 전략 수립을 위한 컨설팅도 함께 제공합니다."
    },
    {
        "id": 10,
        "question": "NHN Cloud 공공기관용 서비스가 획득한 클라우드 보안 인증은?",
        "options": [
            "ISO 27001",
            "SOC 2",
            "CSAP (Cloud Security Assurance Program)",
            "PCI DSS"
        ],
        "answer": 3,
        "explanation": "NHN Cloud 공공기관용은 CSAP(클라우드 서비스 보안인증)을 획득하였으며, 공공기관에서 신뢰할 수 있는 보안 인증을 통해 검증받은 클라우드 서비스입니다."
    }
];
