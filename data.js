/**
 * NHN Cloud 자격증 모의고사 최종본 (179문제)
 */

const quizData = [
  {
    id: 1,
    question: "NHN Cloud에서 지리적으로 완전히 분리된 하드웨어 및 네트워크 인프라 단위를 무엇이라 합니까?",
    options: [
      "프로젝트(Project)",
      "리전(Region)",
      "조직(Organization)",
      "테넌트(Tenant)"
    ],
    answer: 2,
    explanation: "리전은 지리적으로 분리된 인프라의 최상위 단위입니다."
  },
  {
    id: 2,
    question: "하나의 리전 내에서 전력, 냉방 등 인프라가 독립적으로 구성된 물리적 데이터 센터 단위를 무엇이라 합니까?",
    options: [
      "서비스 존",
      "보안 구역",
      "가용 영역(Availability Zone)",
      "네트워크 피어링"
    ],
    answer: 3,
    explanation: "가용 영역(AZ)은 리전 내에서 독립적인 인프라를 갖춘 최소 단위입니다."
  },
  {
    id: 3,
    question: "NHN Cloud의 리전 선택 시 고려해야 할 사항이 아닌 것은?",
    options: [
      "사용자와의 물리적 거리",
      "데이터 보관 관련 법률 요구 사항",
      "서비스 이용 금액의 차이",
      "사용자의 개인 이메일 주소"
    ],
    answer: 4,
    explanation: "리전 선택은 지연 시간, 법규, 비용 등을 고려해야 하며 개인 계정 정보와는 무관합니다."
  },
  {
    id: 4,
    question: "고가용성(High Availability) 구성을 위해 권장되는 인프라 배치 방식은?",
    options: [
      "단일 가용 영역 내에 모든 인스턴스 배치",
      "여러 가용 영역(Multi-AZ)에 인스턴스 분산 배치",
      "여러 프로젝트에 하나의 인스턴스 공유",
      "모든 자원을 하나의 리전에만 고정"
    ],
    answer: 2,
    explanation: "장애 내성을 높이기 위해 여러 AZ에 자원을 분산하는 것이 기본 원칙입니다."
  },
  {
    id: 5,
    question: "NHN Cloud에서 자원을 생성하고 관리하는 가장 기본적인 단위는?",
    options: [
      "조직",
      "프로젝트",
      "서비스 그룹",
      "사용자 계정"
    ],
    answer: 2,
    explanation: "모든 클라우드 자원(인스턴스, 네트워크 등)은 프로젝트 내에서 생성됩니다."
  },
  {
    id: 6,
    question: "NHN Cloud 프로젝트 이름은 생성 후 변경이 가능합니까?",
    options: [
      "아니오, 불가능합니다.",
      "예, 언제든지 가능합니다.",
      "관리자에게 문의해야만 가능합니다.",
      "서비스를 모두 삭제한 후에만 가능합니다."
    ],
    answer: 2,
    explanation: "프로젝트 이름은 생성 이후에도 콘솔 설정에서 변경할 수 있습니다."
  },
  {
    id: 7,
    question: "조직 관리자가 수행할 수 없는 업무는?",
    options: [
      "조직 내 프로젝트 생성",
      "통합 결제 수단 관리",
      "조직 멤버 초대",
      "다른 사용자의 개인 이메일 비밀번호 변경"
    ],
    answer: 4,
    explanation: "클라우드 관리자는 서비스 내 권한만 제어할 뿐, 개인 계정 정보(비밀번호 등)는 제어할 수 없습니다."
  },
  {
    id: 8,
    question: "프로젝트에 멤버를 추가할 때 부여하는 권한 종류가 아닌 것은?",
    options: [
      "ADMIN",
      "MEMBER",
      "VIEWER",
      "GUEST"
    ],
    answer: 4,
    explanation: "기본 권한은 관리자(ADMIN), 멤버(MEMBER), 관찰자(VIEWER)로 구성됩니다."
  },
  {
    id: 9,
    question: "자원을 생성하거나 수정할 수는 없지만, 설정 내용을 조회만 할 수 있는 권한은?",
    options: [
      "ADMIN",
      "MEMBER",
      "VIEWER",
      "EDITOR"
    ],
    answer: 3,
    explanation: "VIEWER 권한은 읽기 전용 권한입니다."
  },
  {
    id: 10,
    question: "특정 서비스(예: Object Storage)에 대해서만 세부적인 권한을 제어하고 싶을 때 사용하는 기능은?",
    options: [
      "전체 관리 권한",
      "IAM(Identity and Access Management)",
      "조직 권한",
      "비밀번호 정책"
    ],
    answer: 2,
    explanation: "IAM을 통해 서비스별, 역할별로 세밀한 권한 제어가 가능합니다."
  },
  {
    id: 11,
    question: "NHN Cloud 콘솔 로그인 시 보안을 강화하기 위해 제공하는 기능은?",
    options: [
      "2단계 인증(2FA/MFA)",
      "자동 로그인",
      "소셜 공유 기능",
      "익명 로그인"
    ],
    answer: 1,
    explanation: "OTP 등을 활용한 2단계 인증으로 계정 보안을 강화할 수 있습니다."
  },
  {
    id: 12,
    question: "프로젝트 멤버가 퇴사한 경우 가장 먼저 취해야 할 보안 조치는?",
    options: [
      "프로젝트 삭제",
      "멤버 권한 회수 또는 삭제",
      "결제 수단 변경",
      "고객 센터 전화"
    ],
    answer: 2,
    explanation: "불필요한 접근을 막기 위해 멤버 목록에서 해당 계정을 삭제하거나 권한을 회수해야 합니다."
  },
  {
    id: 13,
    question: "현재 사용 중인 자원의 실시간 예상 요금을 확인할 수 있는 곳은?",
    options: [
      "고객 센터 공지사항",
      "NHN Cloud 콘솔 내 결제/비용 관리",
      "개인 이메일함",
      "서버 내부 로그"
    ],
    answer: 2,
    explanation: "콘솔의 결제 관리 메뉴에서 이용 내역과 예상 요금을 확인할 수 있습니다."
  },
  {
    id: 14,
    question: "무료 이용 한도(Free Tier)를 초과하여 사용한 경우 어떻게 됩니까?",
    options: [
      "서비스가 즉시 삭제됨",
      "초과분만큼 요금이 청구됨",
      "계정이 영구 정지됨",
      "자동으로 최저 사양으로 변경됨"
    ],
    answer: 2,
    explanation: "무료 한도를 초과하면 등록된 결제 수단으로 요금이 발생합니다."
  },
  {
    id: 15,
    question: "NHN Cloud 서비스를 API를 통해 제어하기 위해 필요한 정보는?",
    options: [
      "AppKey 및 SecretKey",
      "은행 계좌 번호",
      "사용자 집 주소",
      "모니터 해상도 정보"
    ],
    answer: 1,
    explanation: "API 호출 시 인증을 위해 AppKey와 SecretKey를 주로 사용합니다."
  },
  {
    id: 16,
    question: "프로젝트를 삭제하면 해당 프로젝트 내의 자원들은 어떻게 됩니까?",
    options: [
      "영구히 보관됨",
      "모두 즉시 삭제됨",
      "다른 프로젝트로 자동 이전됨",
      "사용자의 PC로 다운로드됨"
    ],
    answer: 2,
    explanation: "프로젝트를 삭제하면 그 안에 포함된 모든 인스턴스, 데이터 등이 함께 영구 삭제되므로 주의해야 합니다."
  },
  {
    id: 17,
    question: "가상 서버를 생성하고 운영할 수 있는 NHN Cloud 서비스는?",
    options: [
      "Instance",
      "Storage",
      "Database",
      "Security"
    ],
    answer: 1,
    explanation: "Instance 서비스는 가상 서버(Compute)를 제공합니다."
  },
  {
    id: 18,
    question: "웹 서비스의 부하를 분산하기 위해 사용하는 네트워크 서비스는?",
    options: [
      "VPC",
      "Load Balancer",
      "DNS",
      "Floating IP"
    ],
    answer: 2,
    explanation: "Load Balancer는 트래픽을 여러 서버로 나누어 전달하는 역할을 합니다."
  },
  {
    id: 19,
    question: "비정형 데이터를 대용량으로 저장하고 URL을 통해 접근 가능한 서비스는?",
    options: [
      "Block Storage",
      "Object Storage",
      "NAS",
      "MySQL"
    ],
    answer: 2,
    explanation: "Object Storage는 이미지, 동영상 등 파일 형태의 비정형 데이터를 저장하는 데 최적화되어 있습니다."
  },
  {
    id: 20,
    question: "NHN Cloud에서 제공하는 관리형 데이터베이스 서비스의 명칭은?",
    options: [
      "RDS (Relational Database Service)",
      "RDS for MySQL/MariaDB",
      "Cloud Database",
      "SQL Server Service"
    ],
    answer: 1,
    explanation: "NHN Cloud는 관리형 DB 서비스로 RDS for MySQL 등을 제공합니다."
  },
  {
    id: 21,
    question: "콘솔에 접속하지 않고 CLI 환경에서 자원을 관리할 때 사용하는 인증 방식은?",
    options: [
      "ID/PW 입력",
      "API 보안 키(Access/Secret Key)",
      "생체 인증",
      "공인 인증서"
    ],
    answer: 2,
    explanation: "CLI나 API 접근 시에는 보안 키를 통해 인증을 수행합니다."
  },
  {
    id: 22,
    question: "조직 내에서 비용을 절감하기 위해 권장되는 작업은?",
    options: [
      "사용하지 않는 인스턴스 반납",
      "모든 멤버에게 관리자 권한 부여",
      "백업 기능 해제",
      "보안 서비스 로그 끄기"
    ],
    answer: 1,
    explanation: "클라우드 비용 효율화를 위해 미사용 자원은 즉시 삭제하거나 반납해야 합니다."
  },
  {
    id: 23,
    question: "가용 영역(AZ) 간 데이터 전송 시 비용이 발생할 수 있습니까?",
    options: [
      "예",
      "아니오",
      "처음 한 번만 발생",
      "가져올 때만 발생"
    ],
    answer: 1,
    explanation: "일반적으로 리전 내 AZ 간 통신에는 네트워크 전송 비용이 발생할 수 있습니다."
  },
  {
    id: 24,
    question: "NHN Cloud에서 공공 기관 전용 클라우드 서비스를 제공합니까?",
    options: [
      "예, 공공 리전이 별도로 존재함",
      "아니오, 일반 리전만 존재함",
      "공공 기관은 가입이 불가능함",
      "해외 리전에서만 가능함"
    ],
    answer: 1,
    explanation: "보안 가이드를 준수하는 공공 전용 리전을 운영하고 있습니다."
  },
  {
    id: 25,
    question: "다음 중 NHN Cloud의 고객 지원 채널이 아닌 것은?",
    options: [
      "온라인 1:1 문의",
      "사용 가이드 문서",
      "전화 기술 상담",
      "개인 블로그 댓글"
    ],
    answer: 4,
    explanation: "공식 고객 센터와 가이드 문서를 통해 지원을 받을 수 있습니다."
  },
  {
    id: 26,
    question: "NHN Cloud 인스턴스를 구성하는 요소가 아닌 것은?",
    options: [
      "이미지(Image)",
      "타입(Flavor)",
      "키페어(Key-pair)",
      "도메인 이름(Domain Name)"
    ],
    answer: 4,
    explanation: "인스턴스 구성 요소는 이미지, 타입, 가용성 영역, 키페어, 보안 그룹, 네트워크입니다. 도메인 이름은 DNS 서비스와 관련됩니다."
  },
  {
    id: 27,
    question: "NHN Cloud에서 인스턴스 접속 시 사용하는 인증 방식으로 권장되는 것은?",
    options: [
      "아이디/비밀번호 입력",
      "키페어(SSH 공개 키/개인 키)",
      "휴대폰 본인 인증",
      "공인 인증서"
    ],
    answer: 2,
    explanation: "보안을 위해 아이디/비밀번호 대신 PKI 기반의 키페어를 사용하여 인스턴스에 접속합니다."
  },
  {
    id: 28,
    question: "인스턴스 생성 후 변경할 수 없는 속성은?",
    options: [
      "인스턴스 타입(Flavor)",
      "보안 그룹",
      "가용성 영역(AZ)",
      "네트워크 서브넷"
    ],
    answer: 3,
    explanation: "이미지와 가용성 영역은 인스턴스 생성 이후 변경할 수 없습니다."
  },
  {
    id: 29,
    question: "인스턴스의 네트워크 서브넷을 변경하려면 인스턴스가 어떤 상태여야 합니까?",
    options: [
      "실행 중(Running)",
      "중지(Stopped)",
      "일시정지(Paused)",
      "재부팅 중(Rebooting)"
    ],
    answer: 2,
    explanation: "인스턴스의 네트워크 서브넷은 인스턴스가 중지된 상태에서만 변경할 수 있습니다."
  },
  {
    id: 30,
    question: "VPC 내 인스턴스가 인터넷과 통신하기 위해 필요한 것은?",
    options: [
      "추가 블록 스토리지",
      "인터넷 게이트웨이",
      "내부 DNS",
      "백업 정책"
    ],
    answer: 2,
    explanation: "인터넷 게이트웨이 없이는 VPC 내 모든 인스턴스가 인터넷에 연결되지 않습니다."
  },
  {
    id: 31,
    question: "서로 다른 VPC 간 통신을 가능하게 하는 기능은?",
    options: [
      "서브넷 분할",
      "VPC 피어링(Peering)",
      "보안 그룹 확장",
      "라우팅 테이블 삭제"
    ],
    answer: 2,
    explanation: "VPC 피어링을 사용하면 서로 다른 VPC 간에 플로팅 IP 없이도 통신이 가능합니다."
  },
  {
    id: 32,
    question: "VPC 네트워크 주소를 기술할 때 사용하는 표기법은?",
    options: [
      "MAC 주소",
      "CIDR Notation",
      "UUID",
      "Base64 인코딩"
    ],
    answer: 2,
    explanation: "VPC 네트워크는 CIDR(Classless Inter-Domain Routing) 표기법을 사용하여 기술합니다."
  },
  {
    id: 33,
    question: "Linux 인스턴스에 SSH로 접속하기 위해 보안 그룹에서 허용해야 하는 기본 포트는?",
    options: [
      "21",
      "22",
      "80",
      "443"
    ],
    answer: 2,
    explanation: "SSH 접속을 위해서는 기본적으로 22번 포트를 보안 그룹에서 허용해야 합니다."
  },
  {
    id: 34,
    question: "Network ACL과 보안 그룹 중 트래픽에 먼저 적용되는 것은?",
    options: [
      "보안 그룹",
      "Network ACL",
      "동시에 적용",
      "사용자 선택에 따름"
    ],
    answer: 2,
    explanation: "유입/유출 트래픽에서 Network ACL 설정이 보안 그룹 설정보다 먼저 적용됩니다."
  },
  {
    id: 35,
    question: "같은 가용성 영역 내 인스턴스 간에만 공유할 수 있는 스토리지는?",
    options: [
      "Object Storage",
      "블록 스토리지(Block Storage)",
      "Archive Storage",
      "CDN"
    ],
    answer: 2,
    explanation: "블록 스토리지는 같은 가용성 영역에서만 인스턴스 간 공유가 가능하며, 서로 다른 AZ 간에는 공유할 수 없습니다."
  },
  {
    id: 36,
    question: "인스턴스 장애 시 데이터 복구를 위해 권장되는 스토리지 사용 방법은?",
    options: [
      "루트 블록 스토리지에 모든 데이터 저장",
      "추가 블록 스토리지를 분리하여 사용",
      "로컬 디스크만 사용",
      "메모리에 데이터 보관"
    ],
    answer: 2,
    explanation: "추가 블록 스토리지를 사용하면 장애 시 해당 스토리지만 해제하여 다른 인스턴스에 연결해 쉽게 복구할 수 있습니다."
  },
  {
    id: 37,
    question: "인스턴스의 루트 블록 스토리지 크기는 생성 후 변경이 가능합니까?",
    options: [
      "예, 언제든지 가능합니다",
      "아니오, 변경할 수 없습니다",
      "중지 상태에서만 가능합니다",
      "관리자 요청 시에만 가능합니다"
    ],
    answer: 2,
    explanation: "인스턴스의 루트 블록 스토리지 크기는 변경할 수 없으며, 공간이 부족하면 추가 블록 스토리지를 사용해야 합니다."
  },
  {
    id: 38,
    question: "인스턴스의 운영체제를 담고 있는 가상 디스크를 무엇이라 합니까?",
    options: [
      "플레이버(Flavor)",
      "이미지(Image)",
      "스냅샷(Snapshot)",
      "볼륨(Volume)"
    ],
    answer: 2,
    explanation: "이미지는 인스턴스의 운영체제를 담고 있는 가상 디스크입니다."
  },
  {
    id: 39,
    question: "인스턴스 첫 번째 부팅 후 자동으로 실행되는 초기화 스크립트를 설정하는 기능은?",
    options: [
      "키페어 설정",
      "사용자 스크립트(User Script)",
      "보안 그룹 규칙",
      "라우팅 테이블"
    ],
    answer: 2,
    explanation: "사용자 스크립트는 인스턴스의 첫 번째 부팅이 완료된 후 cloud-init 등에 의해 자동 실행됩니다."
  },
  {
    id: 40,
    question: "동일 배치 정책에 할당된 인스턴스들이 배치되는 방식은?",
    options: [
      "같은 하이퍼바이저에 배치",
      "서로 다른 하이퍼바이저에 분산 배치",
      "같은 서브넷에만 배치",
      "같은 보안 그룹에 자동 할당"
    ],
    answer: 2,
    explanation: "배치 정책을 설정하면 동일 정책에 할당된 인스턴스들은 장애 격리를 위해 서로 다른 하이퍼바이저에 생성됩니다."
  },
  {
    id: 41,
    question: "NHN Cloud의 모토와 가장 가까운 설명은?",
    options: [
      "모두를 위한 AI 클라우드",
      "글로벌 기술 리더십과 안정적 인프라",
      "최저가 하드웨어 판매",
      "단순 웹 호스팅 전문"
    ],
    answer: 2,
    explanation: "NHN Cloud는 안정적인 인프라와 기술력을 바탕으로 기업용 클라우드 서비스를 제공합니다."
  },
  {
    id: 42,
    question: "클라우드 컴퓨팅의 특징 중 하나로, 필요할 때 자원을 즉시 할당받고 반납할 수 있는 특성은?",
    options: [
      "자기 서비스(Self-Service)",
      "주문형 셀프 서비스(On-demand Self-service)",
      "리소스 풀링(Resource Pooling)",
      "고정 비용 지출"
    ],
    answer: 2,
    explanation: "사용자가 관리자의 개입 없이 필요할 때 직접 자원을 구성하는 것을 주문형 셀프 서비스라고 합니다."
  },
  {
    id: 43,
    question: "NHN Cloud와 고객이 보안 책임을 나누는 모델의 명칭은?",
    options: [
      "보안 위임 모델",
      "책임 공유 모델(Shared Responsibility Model)",
      "단독 책임 모델",
      "인프라 보안 모델"
    ],
    answer: 2,
    explanation: "클라우드 공급자는 인프라를, 고객은 그 위의 데이터와 설정을 보호하는 책임 공유 모델을 따릅니다."
  },
  {
    id: 44,
    question: "책임 공유 모델에서 '물리적 데이터 센터의 보안'은 누구의 책임입니까?",
    options: [
      "고객(Customer)",
      "정부",
      "NHN Cloud",
      "네트워크 통신사"
    ],
    answer: 3,
    explanation: "물리적 인프라, 하드웨어, 물리 센터 보안은 클라우드 공급자인 NHN Cloud의 책임입니다."
  },
  {
    id: 45,
    question: "책임 공유 모델에서 '인스턴스 내부의 운영체제(OS) 패치'은 누구의 책임입니까?",
    options: [
      "NHN Cloud",
      "고객(Customer)",
      "OS 제조사",
      "IDC 관리자"
    ],
    answer: 2,
    explanation: "가상 서버(Instance) 내부의 OS 관리, 데이터, 애플리케이션 보안은 고객의 책임입니다."
  },
  {
    id: 46,
    question: "IaaS(Infrastructure as a Service)에 대한 설명으로 옳은 것은?",
    options: [
      "완성된 소프트웨어를 웹으로 이용함",
      "서버, 네트워크, 스토리지 등 인프라 자원을 제공함",
      "개발 환경만 제공하고 서버 제어는 불가능함",
      "데이터베이스 서비스만 제공함"
    ],
    answer: 2,
    explanation: "IaaS는 컴퓨팅 인프라(서버, 네트워크 등)를 서비스 형태로 제공하는 것입니다."
  },
  {
    id: 47,
    question: "여러 사용자가 물리적 자원을 공유하지만 논리적으로 격리되어 사용하는 클라우드 특성은?",
    options: [
      "단독 리스(Single-lease)",
      "멀티 테넌시(Multi-tenancy)",
      "물리 격리",
      "폐쇄형 클라우드"
    ],
    answer: 2,
    explanation: "멀티 테넌시는 다수의 고객이 자원 풀을 공유하면서도 논리적으로는 분리되어 사용하는 것을 뜻합니다."
  },
  {
    id: 48,
    question: "NHN Cloud 가이드에서 권장하는 보안 설정이 아닌 것은?",
    options: [
      "루트 계정의 상시 사용",
      "MFA(2단계 인증) 활성화",
      "최소 권한 부여 원칙 준수",
      "주기적인 비밀번호 변경"
    ],
    answer: 1,
    explanation: "루트 계정은 관리에만 최소한으로 사용하고, 평시에는 별도 IAM 계정 사용을 권장합니다."
  },
  {
    id: 49,
    question: "퍼블릭 클라우드의 장점으로 보기 어려운 것은?",
    options: [
      "초기 인프라 구축 비용 절감",
      "유연한 자원 확장성",
      "물리 서버의 직접 소유 및 통제",
      "빠른 서비스 배포"
    ],
    answer: 3,
    explanation: "퍼블릭 클라우드는 자원을 빌려 쓰는 것이므로 물리 서버를 직접 소유하지는 않습니다."
  },
  {
    id: 50,
    question: "SaaS(Software as a Service)의 예시로 NHN Cloud에서 제공하는 서비스는?",
    options: [
      "NHN Dooray!",
      "Instance",
      "VPC",
      "Block Storage"
    ],
    answer: 1,
    explanation: "협업 도구인 Dooray!는 대표적인 SaaS 형태의 서비스입니다."
  },
  {
    id: 51,
    question: "NHN Cloud의 '리소스크기 제한 정책(Quota)'에 대한 설명으로 옳은 것은?",
    options: [
      "모든 사용자는 무제한으로 자원을 생성할 수 있다.",
      "프로젝트별로 생성 가능한 자원의 최대치가 정해져 있다.",
      "한 번 설정된 쿼터는 절대 변경할 수 없다.",
      "유료 결제 고객에게는 쿼터가 적용되지 않는다."
    ],
    answer: 2,
    explanation: "안정적인 자원 배분을 위해 프로젝트별로 리소스 제한(Quota)이 설정되어 있으며 요청 시 증설 가능합니다."
  },
  {
    id: 52,
    question: "NHN Cloud에서 가상 서버 생성 시 사용되는 템플릿 이미지를 무엇이라 합니까?",
    options: [
      "스냅샷",
      "블록",
      "머신 이미지(Image)",
      "백업"
    ],
    answer: 3,
    explanation: "운영체제와 기본 설정이 담긴 상태를 이미지(Image)라고 부릅니다."
  },
  {
    id: 53,
    question: "네트워크 서비스 중, 공용 인터넷망을 통해 외부와 통신하기 위해 인스턴스에 할당하는 IP는?",
    options: [
      "고정 IP",
      "내부 IP",
      "플로팅 IP(Floating IP)",
      "서브넷 IP"
    ],
    answer: 3,
    explanation: "외부 통신을 위해 유동적으로 할당/해제 가능한 공인 IP를 플로팅 IP라고 합니다."
  },
  {
    id: 54,
    question: "NHN Cloud의 인스턴스 타입 중 특정 자원(CPU, 메모리 등)이 고정적으로 할당되는 타입은?",
    options: [
      "Shared 타입",
      "Dedicated 타입",
      "General 타입",
      "Low 타입"
    ],
    answer: 2,
    explanation: "Dedicated 타입은 물리 자원을 전용으로 할당받아 성능 간섭이 적습니다."
  },
  {
    id: 55,
    question: "인스턴스 정지(Stop) 상태일 때 요금이 청구되는 항목은?",
    options: [
      "CPU 사용료",
      "메모리 사용료",
      "연결된 블록 스토리지 및 플로팅 IP",
      "네트워크 트래픽"
    ],
    answer: 3,
    explanation: "인스턴스가 정지되어도 할당된 스토리지 공간과 예약된 IP에 대해서는 요금이 발생합니다."
  },
  {
    id: 56,
    question: "스토리지 서비스 중 여러 인스턴스가 동시에 마운트하여 파일을 공유할 수 있는 것은?",
    options: [
      "Block Storage",
      "NAS",
      "Local Storage",
      "Instance Storage"
    ],
    answer: 2,
    explanation: "NAS는 네트워크 결합 스토리지로, 여러 서버에서 동시 접근이 가능합니다."
  },
  {
    id: 57,
    question: "부하 분산 서비스(Load Balancer)가 지원하는 프로토콜이 아닌 것은?",
    options: [
      "HTTP",
      "HTTPS",
      "TCP",
      "ICMP"
    ],
    answer: 4,
    explanation: "로드 밸런서는 주로 L4(TCP/UDP), L7(HTTP/HTTPS) 계층의 트래픽을 분산합니다."
  },
  {
    id: 58,
    question: "Object Storage에서 데이터를 식별하는 단위는?",
    options: [
      "파일(File)",
      "블록(Block)",
      "객체(Object)",
      "레코드(Record)"
    ],
    answer: 3,
    explanation: "객체 스토리지는 데이터를 '객체' 단위로 관리하며 고유한 키(Key)를 가집니다."
  },
  {
    id: 59,
    question: "Auto Scaling 기능의 주요 목적은?",
    options: [
      "보안 강화",
      "비용 무조건 고정",
      "트래픽 변화에 따른 자동 자원 확장/축소",
      "데이터 백업 자동화"
    ],
    answer: 3,
    explanation: "Auto Scaling은 부하에 따라 서버 수를 자동으로 조절하여 서비스 가용성을 유지합니다."
  },
  {
    id: 60,
    question: "NHN Cloud에서 제공하는 관리형 관계형 데이터베이스(RDS)가 지원하지 않는 엔진은?",
    options: [
      "MySQL",
      "MariaDB",
      "PostgreSQL",
      "Oracle"
    ],
    answer: 4,
    explanation: "NHN Cloud RDS는 현재 MySQL, MariaDB, PostgreSQL 등을 관리형으로 제공합니다."
  },
  {
    id: 61,
    question: "클라우드 자원의 성능 지표(CPU 사용률 등)를 수집하고 알람을 설정하는 서비스는?",
    options: [
      "CloudTrail",
      "Monitoring",
      "Log & Crash Search",
      "Security Inspector"
    ],
    answer: 2,
    explanation: "Monitoring 서비스는 리소스의 상태를 실시간으로 감시합니다."
  },
  {
    id: 62,
    question: "사용자가 소유한 도메인 이름을 NHN Cloud 자원의 IP 주소와 연결해주는 서비스는?",
    options: [
      "DNS",
      "VPC",
      "Load Balancer",
      "Route Table"
    ],
    answer: 1,
    explanation: "DNS(Domain Name System)는 도메인을 IP로 변환하여 접속을 도와줍니다."
  },
  {
    id: 63,
    question: "NHN Cloud 서비스 이용 중 발생하는 로그를 수집하고 검색할 수 있는 서비스는?",
    options: [
      "Object Storage",
      "Log & Crash Search",
      "Data Hotel",
      "Notification"
    ],
    answer: 2,
    explanation: "Log & Crash Search를 통해 앱 로그 및 시스템 로그를 통합 관리할 수 있습니다."
  },
  {
    id: 64,
    question: "대량의 메시지(SMS, 알림톡 등)를 발송할 수 있는 카테고리는?",
    options: [
      "Compute",
      "Network",
      "Notification",
      "Application Service"
    ],
    answer: 3,
    explanation: "Notification 카테고리에서 메시지 발송 관련 서비스를 제공합니다."
  },
  {
    id: 65,
    question: "콘솔 웹 화면을 통하지 않고 프로그래밍 방식으로 서비스를 제어하기 위해 제공되는 것은?",
    options: [
      "REST API",
      "HTML 소스",
      "PDF 매뉴얼",
      "전화 상담"
    ],
    answer: 1,
    explanation: "클라우드 서비스는 대부분 REST API를 통해 자동화된 제어를 지원합니다."
  },
  {
    id: 66,
    question: "서비스 장애 발생 시 보상 기준이 명시된 문서를 무엇이라 합니까?",
    options: [
      "NDA",
      "SLA(Service Level Agreement)",
      "ISO 인증서",
      "이용 약관"
    ],
    answer: 2,
    explanation: "SLA은 서비스 가용성 보장 수준과 그에 따른 보상 규정을 담고 있습니다."
  },
  {
    id: 67,
    question: "데이터베이스의 특정 시점 상태를 저장하여 나중에 복구할 수 있게 하는 기능은?",
    options: [
      "미러링",
      "백업/스냅샷",
      "인덱싱",
      "샤딩"
    ],
    answer: 2,
    explanation: "스냅샷이나 백업 기능을 통해 특정 시점으로 자원을 복구할 수 있습니다."
  },
  {
    id: 68,
    question: "보안 그룹(Security Group) 규칙 중 모든 IP 주소를 의미하는 표기법은?",
    options: [
      "127.0.0.1/32",
      "0.0.0.0/0",
      "192.168.0.1/24",
      "255.255.255.255"
    ],
    answer: 2,
    explanation: "0.0.0.0/0은 모든 네트워크 대역을 의미하는 CIDR 표기입니다."
  },
  {
    id: 69,
    question: "NHN Cloud에서 하이브리드 클라우드 구성을 위해 로컬 IDC와 클라우드를 전용선으로 연결하는 서비스는?",
    options: [
      "Direct Connect",
      "VPC Peering",
      "Internet Gateway",
      "VPN"
    ],
    answer: 1,
    explanation: "Direct Connect는 전용 회선을 통해 안정적인 고속 연결을 제공합니다."
  },
  {
    id: 70,
    question: "NHN Cloud 계정 생성 후 가장 먼저 생성해야 하는 관리 단위는?",
    options: [
      "인스턴스",
      "조직(Organization)",
      "VPC",
      "플로팅 IP"
    ],
    answer: 2,
    explanation: "자원 관리를 위해 프로젝트를 담을 '조직'을 먼저 구성해야 합니다."
  },
  {
    id: 71,
    question: "특정 프로젝트에 새로운 사용자를 초대하기 위해 필요한 정보는?",
    options: [
      "사용자의 NHN Cloud ID(이메일)",
      "사용자의 집 주소",
      "사용자의 주민등록번호",
      "사용자의 은행 계좌"
    ],
    answer: 1,
    explanation: "NHN Cloud 가입 시 사용한 이메일 계정을 통해 멤버 초대가 가능합니다."
  },
  {
    id: 72,
    question: "IAM에서 특정 사용자에게 '프로젝트 내 모든 자원을 관리'할 수 있게 부여하는 권한은?",
    options: [
      "VIEWER",
      "MEMBER",
      "ADMIN",
      "OWNER"
    ],
    answer: 3,
    explanation: "ADMIN 권한은 해당 프로젝트 내 자원에 대한 모든 관리 권한을 가집니다."
  },
  {
    id: 73,
    question: "부서별로 비용을 별도로 정산하고 싶을 때 권장되는 구조는?",
    options: [
      "하나의 프로젝트에 모든 부서 자원 생성",
      "부서별로 별도의 프로젝트 생성",
      "계정을 여러 개 생성",
      "리전을 다르게 설정"
    ],
    answer: 2,
    explanation: "프로젝트 단위로 이용 내역이 집계되므로 부서별 프로젝트 분리가 효율적입니다."
  },
  {
    id: 74,
    question: "VPC 내부에서 목적지 IP에 따라 트래픽이 전달될 경로를 지정하는 설정은?",
    options: [
      "인터넷 게이트웨이",
      "라우팅 테이블(Route Table)",
      "보안 그룹",
      "서브넷"
    ],
    answer: 2,
    explanation: "라우팅 테이블은 네트워크 트래픽의 경로를 결정하는 규칙 세트입니다."
  },
  {
    id: 75,
    question: "프라이빗 서브넷에 있는 인스턴스가 인터넷에 접속(아웃바운드)하기 위해 필요한 서비스는?",
    options: [
      "NAT 게이트웨이",
      "VPC 피어링",
      "로드 밸런서",
      "서브넷 마스크"
    ],
    answer: 1,
    explanation: "NAT 게이트웨이를 이용하면 외부에서 접근은 차단하면서 내부에서 인터넷 접속은 가능하게 할 수 있습니다."
  },
  {
    id: 76,
    question: "두 개의 서로 다른 VPC를 연결하여 내부 IP로 통신하게 하는 기능은?",
    options: [
      "VPC Peering",
      "Direct Connect",
      "Internet Gateway",
      "DHCP Options"
    ],
    answer: 1,
    explanation: "VPC 피어링은 두 VPC 간의 트래픽을 비공개적으로 라우팅할 수 있게 합니다."
  },
  {
    id: 77,
    question: "인스턴스에 접속하기 위해 SSH 키 페어(Key Pair)를 생성한 경우, 비밀키(.pem)를 분실하면 어떻게 됩니까?",
    options: [
      "고객센터에서 복구해준다.",
      "다시 다운로드 받을 수 있다.",
      "다시 다운로드 받을 수 없으며 접근이 불가능해질 수 있다.",
      "비밀번호로 자동 전환된다."
    ],
    answer: 3,
    explanation: "키 페어의 비밀키는 생성 시점에만 다운로드 가능하며, 분실 시 보안상 재발급이 불가합니다."
  },
  {
    id: 78,
    question: "콘솔에서 인스턴스를 삭제(Terminate)할 때 함께 삭제되도록 설정할 수 있는 항목은?",
    options: [
      "플로팅 IP",
      "루트 블록 스토리지",
      "로드 밸런서",
      "VPC 전체"
    ],
    answer: 2,
    explanation: "인스턴스 삭제 시 연결된 루트 볼륨(스토리지)을 함께 삭제하도록 옵션을 선택할 수 있습니다."
  },
  {
    id: 79,
    question: "서브넷(Subnet) 생성 시 설정해야 하는 필수 정보는?",
    options: [
      "IP 대역(CIDR)",
      "서버 성능",
      "운영체제 종류",
      "백업 주기"
    ],
    answer: 1,
    explanation: "서브넷 생성 시 해당 네트워크가 사용할 IP 주소 범위를 지정해야 합니다."
  },
  {
    id: 80,
    question: "NHN Cloud 콘솔의 '대시보드'에서 수행할 수 있는 작업은?",
    options: [
      "전체 자원 현황 모니터링",
      "회원 비밀번호 초기화",
      "신용카드 번호 수정",
      "서버 코드 코딩"
    ],
    answer: 1,
    explanation: "대시보드는 프로젝트 내 주요 자원의 상태와 요약을 한눈에 보여줍니다."
  },
  {
    id: 81,
    question: "자원 식별을 위해 사용자 정의 키와 값을 부여하는 기능은?",
    options: [
      "이름(Name)",
      "태그(Tag)",
      "아이디(ID)",
      "설명(Description)"
    ],
    answer: 2,
    explanation: "태그를 활용하면 자원을 논리적으로 분류하고 관리하기 용이합니다."
  },
  {
    id: 82,
    question: "보안 그룹(Security Group) 규칙 설정 시 'Stateful' 특성의 의미는?",
    options: [
      "인바운드가 허용되면 아웃바운드 응답은 자동으로 허용됨",
      "인바운드와 아웃바운드 규칙을 항상 동일하게 짜야 함",
      "상태 정보가 저장되지 않음",
      "한 번 설정하면 바꿀 수 없음"
    ],
    answer: 1,
    explanation: "Stateful은 요청이 허용되면 그에 대한 응답 트래픽은 반대 방향 규칙과 상관없이 허용됨을 뜻합니다."
  },
  {
    id: 83,
    question: "NHN Cloud에서 자원을 생성할 수 있는 권한을 가진 최소 IAM 역할은?",
    options: [
      "VIEWER",
      "MEMBER",
      "ADMIN",
      "GUEST"
    ],
    answer: 2,
    explanation: "MEMBER 이상 권한이 있어야 자원을 생성하거나 수정할 수 있습니다."
  },
  {
    id: 84,
    question: "실수로 자원이 삭제되는 것을 방지하기 위해 설정하는 기능은?",
    options: [
      "삭제 보호(Termination Protection)",
      "자동 백업",
      "스냅샷",
      "읽기 전용 모드"
    ],
    answer: 1,
    explanation: "삭제 보호 설정을 활성화하면 실수로 삭제 버튼을 눌러도 삭제되지 않습니다."
  },
  {
    id: 85,
    question: "인스턴스의 운영체제를 Linux에서 Windows로 바로 변경할 수 있습니까?",
    options: [
      "예, 버튼 클릭 한 번으로 가능합니다.",
      "아니오, 인스턴스를 새로 생성해야 합니다.",
      "재부팅 중에 변경 가능합니다.",
      "관리자에게 요청하면 가능합니다."
    ],
    answer: 2,
    explanation: "OS는 이미지 기반이므로, 다른 계열의 OS로 변경하려면 기존 인스턴스를 삭제하고 새로 만들어야 합니다."
  },
  {
    id: 86,
    question: "오브젝트 스토리지의 버킷(Bucket) 권한 설정 중 'Public Read'의 의미는?",
    options: [
      "나만 읽을 수 있음",
      "로그인한 사용자만 읽을 수 있음",
      "인터넷상의 누구나 URL로 객체를 읽을 수 있음",
      "아무도 읽을 수 없음"
    ],
    answer: 3,
    explanation: "Public Read 권한은 공개된 상태로, 링크가 있다면 누구나 접근 가능함을 의미합니다."
  },
  {
    id: 87,
    question: "이미 운영 중인 프로젝트의 리전(Region) 위치를 변경할 수 있습니까?",
    options: [
      "예, 콘솔 설정에서 가능합니다.",
      "아니오, 리전은 고정이며 자원을 새로 만들어야 합니다.",
      "네트워크 설정에서 변경 가능합니다.",
      "요금을 추가 지불하면 이동해줍니다."
    ],
    answer: 2,
    explanation: "리전은 물리적으로 떨어진 위치이므로, 자원을 다른 리전으로 옮기려면 해당 리전에서 새로 구축해야 합니다."
  },
  {
    id: 88,
    question: "로드 밸런서 하단에 인스턴스를 추가할 때 가장 중요한 전제 조건은?",
    options: [
      "두 인스턴스의 OS가 반드시 같아야 함",
      "인스턴스가 헬스 체크(Health Check)에 성공해야 함",
      "인스턴스가 동일한 태그를 가져야 함",
      "반드시 유료 이미지를 사용해야 함"
    ],
    answer: 2,
    explanation: "로드 밸런서는 헬스 체크를 통해 정상 상태인 인스턴스로만 트래픽을 보냅니다."
  },
  {
    id: 89,
    question: "API 엔드포인트(Endpoint)란 무엇입니까?",
    options: [
      "API를 호출하기 위한 접속 주소(URL)",
      "사용자의 비밀번호",
      "프로젝트의 마지막 날짜",
      "서버의 물리적 위치"
    ],
    answer: 1,
    explanation: "엔드포인트는 서비스 API와 통신하기 위한 고유한 접속 지점입니다."
  },
  {
    id: 90,
    question: "웹 콘솔 로그인 비밀번호를 5회 이상 틀렸을 때 발생하는 현상은?",
    options: [
      "계정 영구 삭제",
      "계정 잠금(Lock)",
      "경찰 신고",
      "자동 비밀번호 초기화"
    ],
    answer: 2,
    explanation: "보안을 위해 일정 횟수 이상 실패 시 계정이 일시적으로 잠길 수 있습니다."
  },
  {
    id: 91,
    question: "NHN Cloud에서 제공하는 '이미지 서비스'의 소스가 될 수 없는 것은?",
    options: [
      "NHN Cloud 제공 기본 이미지",
      "사용자가 직접 만든 스냅샷 기반 이미지",
      "외부에서 업로드한 이미지 파일",
      "내 컴퓨터의 한글 문서 파일"
    ],
    answer: 4,
    explanation: "이미지 서비스는 부팅 가능한 OS 환경을 대상으로 하며, 일반 문서는 소스가 될 수 없습니다."
  },
  {
    id: 92,
    question: "스냅샷(Snapshot)과 백업(Backup)의 차이점으로 옳은 것은?",
    options: [
      "스냅샷은 유료이고 백업은 무료이다.",
      "스냅샷은 특정 시점의 상태를 그대로 저장하고, 백업은 대개 주기적으로 데이터를 복사한다.",
      "둘은 용어만 다를 뿐 100% 동일한 기능이다.",
      "스냅샷은 네트워크만 저장한다."
    ],
    answer: 2,
    explanation: "스냅샷은 순간적인 상태 보존에 가깝고, 백업은 데이터 보호를 위해 주기적으로 수행되는 개념입니다."
  },
  {
    id: 93,
    question: "프로젝트 멤버 초대 후 초대받은 사람이 해야 할 일은?",
    options: [
      "이메일로 온 초대 수락 버튼 클릭",
      "새로운 신용카드 등록",
      "컴퓨터 포맷",
      "NHN Cloud 본사 방문"
    ],
    answer: 1,
    explanation: "이메일을 통해 전송된 초대 링크를 수락해야 해당 프로젝트의 멤버로 등록됩니다."
  },
  {
    id: 94,
    question: "NHN Cloud 이용 요금의 기본적인 과금 주기 단위는?",
    options: [
      "초 단위",
      "시간 단위",
      "분 단위",
      "연 단위"
    ],
    answer: 2,
    explanation: "대부분의 인프라 서비스는 1시간 단위(Time-based)로 사용량을 측정하여 청구합니다."
  },
  {
    id: 95,
    question: "결제 수단으로 등록 가능한 것이 아닌 것은?",
    options: [
      "신용카드",
      "가상계좌(법인)",
      "체크카드",
      "문화상품권"
    ],
    answer: 4,
    explanation: "문화상품권은 공식 결제 수단이 아니며, 주로 신용카드나 계좌이체 등을 사용합니다."
  },
  {
    id: 96,
    question: "NHN Cloud에서 제공하는 '크레딧(Credit)'의 용도는?",
    options: [
      "서비스 이용 요금 결제 시 차감",
      "편의점에서 물건 구매",
      "친구에게 현금으로 송금",
      "서버 성능 강제 업그레이드"
    ],
    answer: 1,
    explanation: "크레딧은 서비스 이용 요금이 발생했을 때 현금 대신 우선적으로 차감되는 포인트입니다."
  },
  {
    id: 97,
    question: "특정 금액 이상 요금이 발생할 때 이메일이나 문자로 알림을 받는 기능은?",
    options: [
      "요금 알람 설정",
      "자동 결제 차단",
      "프로젝트 강제 종료",
      "환불 신청"
    ],
    answer: 1,
    explanation: "예산 설정을 통해 일정 금액 초과 시 알람을 받아 비용을 관리할 수 있습니다."
  },
  {
    id: 98,
    question: "이용 내역 및 영수증을 확인하고 다운로드할 수 있는 메뉴는?",
    options: [
      "결제 관리",
      "개인 정보 수정",
      "고객 센터",
      "공지 사항"
    ],
    answer: 1,
    explanation: "콘솔의 결제 관리 메뉴에서 청구서 확인 및 영수증 출력이 가능합니다."
  },
  {
    id: 99,
    question: "미납 요금이 발생할 경우 서비스에 미치는 영향은?",
    options: [
      "즉시 데이터 삭제",
      "일정 기간 후 서비스 이용 제한",
      "아무런 영향 없음",
      "형사 처벌"
    ],
    answer: 2,
    explanation: "미납이 지속될 경우 안내 절차를 거쳐 서비스 이용이 정지될 수 있습니다."
  },
  {
    id: 100,
    question: "NHN Cloud의 가상 서버 인스턴스(Instance)에 대한 설명으로 옳은 것 2개를 고르세요.",
    options: [
      "인스턴스 생성 후에는 이미지 추출이 불가능하다.",
      "인스턴스 타입(사양)은 생성 후에도 변경이 가능하다.",
      "부팅 스토리지로 Local Disk와 Block Storage 중 선택할 수 있다.",
      "한 번 생성된 인스턴스의 가용성 영역(AZ)은 자유롭게 변경할 수 있다.",
      "정지(Power Off) 상태의 인스턴스에는 인스턴스 이용료가 부과되지 않는다."
    ],
    answer: [
      2,
      3
    ],
    explanation: "인스턴스는 생성 후 타입을 변경할 수 있으며, 부팅 디스크 타입으로 로컬 디스크나 블록 스토리지를 선택할 수 있습니다."
  },
  {
    id: 101,
    question: "NHN Cloud VPC(Virtual Private Cloud) 환경에서 서브넷(Subnet) 생성 시 설정해야 하는 필수 정보 2가지는 무엇입니까?",
    options: [
      "가용성 영역(Availability Zone)",
      "공인 IP 주소(Floating IP)",
      "라우팅 테이블 이름",
      "IP 주소 범위(CIDR)",
      "보안 그룹(Security Group)"
    ],
    answer: [
      1,
      4
    ],
    explanation: "서브넷을 생성할 때는 해당 서브넷이 위치할 가용성 영역(AZ)과 사설 IP 대역인 CIDR 설정이 필수입니다."
  },
  {
    id: 102,
    question: "객체 스토리지(Object Storage)의 특징으로 올바른 것 2개를 고르세요.",
    options: [
      "계층형 디렉터리 구조를 사용하여 데이터를 관리한다.",
      "REST API를 통해 데이터를 업로드하거나 다운로드할 수 있다.",
      "정적 웹 사이트 호스팅 기능을 지원한다.",
      "데이터 수정 시 파일의 특정 부분만 업데이트하는 것이 효율적이다.",
      "최대 저장 용량이 제한되어 있어 추가 구매가 필수적이다."
    ],
    answer: [
      2,
      3
    ],
    explanation: "객체 스토리지는 REST API 기반의 비정형 데이터 저장소이며, 정적 웹 호스팅 기능을 제공합니다."
  },
  {
    id: 103,
    question: "보안 그룹(Security Group)에 대한 설명 중 옳은 것 2가지는 무엇입니까?",
    options: [
      "상태 유지(Stateful) 방식으로 동작한다.",
      "인스턴스 단위가 아닌 서브넷 단위로 적용된다.",
      "허용(Allow) 규칙뿐만 아니라 거부(Deny) 규칙도 명시적으로 설정할 수 있다.",
      "하나의 인스턴스에 여러 개의 보안 그룹을 중복 적용할 수 있다.",
      "기본적으로 모든 인바운드 트래픽은 허용되어 있다."
    ],
    answer: [
      1,
      4
    ],
    explanation: "보안 그룹은 상태 유지 방식이며, 한 인스턴스에 여러 그룹을 적용할 수 있습니다. 거부 규칙은 지원하지 않습니다."
  },
  {
    id: 104,
    question: "플로팅 IP(Floating IP)에 대한 설명으로 올바른 것 2개를 고르세요.",
    options: [
      "인스턴스 삭제 시 자동으로 회수되어 삭제된다.",
      "인스턴스에 직접 할당되지 않고 포트(Port)에 연결된다.",
      "사설 IP 주소와 1:1 NAT 방식으로 연결된다.",
      "리전 간 이동이 자유롭다.",
      "인스턴스 생성 시 반드시 함께 생성해야 한다."
    ],
    answer: [
      2,
      3
    ],
    explanation: "플로팅 IP는 인스턴스의 네트워크 인터페이스(포트)에 연결되며, 사설 IP와 1:1 NAT로 통신합니다."
  },
  {
    id: 105,
    question: "NHN Cloud 로드 밸런서(Load Balancer)가 지원하는 알고리즘 2개를 고르세요.",
    options: [
      "Round Robin",
      "Least Connections",
      "First In First Out",
      "Random Access",
      "Path-based Routing"
    ],
    answer: [
      1,
      2
    ],
    explanation: "NHN Cloud의 로드 밸런서는 Round Robin과 Least Connections 방식을 주로 지원합니다."
  },
  {
    id: 106,
    question: "블록 스토리지(Block Storage)를 인스턴스에서 사용하기 위한 단계로 옳은 2가지는?",
    options: [
      "스토리지를 생성한 후 인스턴스에 연결(Attach)해야 한다.",
      "연결 후에는 별도의 포맷 과정 없이 바로 사용 가능하다.",
      "한 번 연결된 스토리지는 다른 인스턴스로 이동할 수 없다.",
      "OS 내에서 마운트(Mount) 과정을 거쳐야 파일 시스템 접근이 가능하다.",
      "스토리지는 항상 인스턴스와 다른 리전에 생성해야 안전하다."
    ],
    answer: [
      1,
      4
    ],
    explanation: "블록 스토리지는 인스턴스에 Attach한 후, OS 내부에서 포맷 및 마운트 과정을 거쳐야 사용할 수 있습니다."
  },
  {
    id: 107,
    question: "오토 스케일링(Auto Scale)의 구성 요소 중 핵심 2가지는 무엇입니까?",
    options: [
      "백업 주기 설정",
      "론치 설정(Launch Configuration)",
      "서브넷 마스크 계산기",
      "스케일링 그룹(Scaling Group)",
      "데이터베이스 복제본 수"
    ],
    answer: [
      2,
      4
    ],
    explanation: "복제할 인스턴스 규격인 론치 설정과 인스턴스 개수 범위를 정하는 스케일링 그룹이 필수입니다."
  },
  {
    id: 108,
    question: "이미지(Image)와 스냅샷(Snapshot)의 차이점에 대한 설명 중 옳은 2가지는?",
    options: [
      "스냅샷은 특정 시점의 블록 스토리지 데이터 저장한 것이다.",
      "이미지는 항상 인스턴스가 실행 중일 때만 생성할 수 있다.",
      "이미지는 새로운 인스턴스를 생성하는 템플릿으로 사용될 수 있다.",
      "스냅샷은 부팅 디스크로는 사용할 수 없다.",
      "이미지 생성 시 기존 데이터는 모두 삭제된다."
    ],
    answer: [
      1,
      3
    ],
    explanation: "스냅샷은 데이터 시점 복사본이며, 이미지는 이를 기반으로 인스턴스를 생성하는 템플릿입니다."
  },
  {
    id: 109,
    question: "NHN Cloud의 관계형 데이터베이스 서비스(RDS) 사용 시 이점 2가지는?",
    options: [
      "운영체제(OS) 패치 및 관리를 NHN Cloud가 담당한다.",
      "사용자가 데이터베이스 엔진 소스 코드를 직접 수정할 수 있다.",
      "자동 백업 및 특정 시점 복구 기능을 제공한다.",
      "어떠한 경우에도 읽기 복제본(Read Replica) 생성 비용이 무료이다.",
      "루트(root) 계정의 모든 시스템 권한을 사용자에게 부여한다."
    ],
    answer: [
      1,
      3
    ],
    explanation: "RDS는 OS 관리와 백업을 자동화해주는 관리형 DB 서비스입니다."
  },
  {
    id: 110,
    question: "네트워크 ACL(Network ACL)과 보안 그룹(Security Group)의 차이점으로 옳은 2가지는?",
    options: [
      "보안 그룹은 Stateless 방식이다.",
      "네트워크 ACL은 서브넷 단위로 적용된다.",
      "네트워크 ACL은 허용(Allow) 규칙만 설정 가능하다.",
      "네트워크 ACL은 번호가 낮은 규칙부터 우선순위로 적용된다.",
      "보안 그룹은 서브넷 내의 인스턴스 간 통신을 기본적으로 차단한다."
    ],
    answer: [
      2,
      4
    ],
    explanation: "네트워크 ACL은 서브넷 단위 적용 및 번호 순서에 따른 우선순위 방식을 따릅니다."
  },
  {
    id: 111,
    question: "CloudTrail(로그 수집) 서비스로 추적할 수 있는 항목 2가지는?",
    options: [
      "사용자의 콘솔 로그인 기록",
      "인스턴스 내부 응용 프로그램의 에러 로그",
      "API 호출을 통한 리소스 생성/삭제 기록",
      "데이터베이스 내부의 SQL 쿼리 실행 결과",
      "인스턴스 CPU 사용률 변화 그래프"
    ],
    answer: [
      1,
      3
    ],
    explanation: "CloudTrail은 계정 내 API 호출 이력과 콘솔 로그인 등의 감사 로그를 관리합니다."
  },
  {
    id: 112,
    question: "하이브리드 클라우드 구성을 위해 VPC와 외부 네트워크를 연결하는 방법 2가지는?",
    options: [
      "VPN Gateway",
      "Internet Gateway",
      "Direct Connect",
      "NAT Gateway",
      "Peering Gateway"
    ],
    answer: [
      1,
      3
    ],
    explanation: "온프레미스와의 연결에는 VPN이나 전용선(Direct Connect) 서비스가 사용됩니다."
  },
  {
    id: 113,
    question: "NHN Cloud에서 데이터 가용성을 높이기 위한 전략 2가지는?",
    options: [
      "단일 가용성 영역(AZ)에 모든 리소스를 배치한다.",
      "다중 가용성 영역(Multi-AZ)에 인스턴스를 분산한다.",
      "중요 데이터는 객체 스토리지에 복제하여 보관한다.",
      "인스턴스 로컬 디스크에만 데이터를 저장한다.",
      "보안 그룹 규칙을 모두 개방한다."
    ],
    answer: [
      2,
      3
    ],
    explanation: "여러 AZ에 분산 배치하고 객체 스토리지 등에 백업하는 것이 가용성 측면에서 우수합니다."
  },
  {
    id: 114,
    question: "NAT Gateway에 대한 설명으로 옳은 것 2개를 고르세요.",
    options: [
      "프라이빗 서브넷의 인스턴스가 인터넷에 접속할 수 있게 한다.",
      "외부 인터넷에서 프라이빗 인스턴스로의 직접 접속을 허용한다.",
      "인터넷 게이트웨이(IGW) 없이도 단독으로 외부 통신이 가능하다.",
      "플로팅 IP가 할당되어야 외부와 통신할 수 있다.",
      "모든 서브넷에 자동으로 하나씩 생성된다."
    ],
    answer: [
      1,
      4
    ],
    explanation: "NAT Gateway는 프라이빗 서브넷의 아웃바운드 인터넷 통신을 지원하며 플로팅 IP가 필요합니다."
  },
  {
    id: 115,
    question: "NHN Cloud 리전(Region)과 가용성 영역(AZ)에 대한 설명 중 옳은 2가지는?",
    options: [
      "리전은 하나 이상의 가용성 영역으로 구성된다.",
      "가용성 영역 간 데이터 전송은 항상 인터넷을 거친다.",
      "서로 다른 리전은 지리적으로 완전히 분리되어 있다.",
      "하나의 리전이 마비되어도 다른 리전의 서비스는 영향을 받지 않는다.",
      "모든 서비스는 리전과 상관없이 동일한 물리적 위치에서 제공된다."
    ],
    answer: [
      1,
      4
    ],
    explanation: "리전은 독립된 물리적 위치이며, 각 리전은 재해 복구를 위해 분리된 AZ들로 구성됩니다."
  },
  {
    id: 116,
    question: "NHN Cloud AppKey 및 비밀키 관리에 대한 설명으로 옳은 것 2가지는?",
    options: [
      "AppKey는 외부 API 호출 시 인증을 위해 사용된다.",
      "비밀키는 보안을 위해 절대로 소스 코드에 직접 노출해서는 안 된다.",
      "한 번 생성된 AppKey는 영구적이며 재발급이 불가능하다.",
      "모든 팀원은 동일한 하나의 비밀키만 공유해서 사용해야 한다.",
      "AppKey는 오직 인스턴스 생성 시에만 필요하다."
    ],
    answer: [
      1,
      2
    ],
    explanation: "인증 키 관리는 보안의 핵심이며, 특히 비밀키(Secret Key) 노출에 주의해야 합니다."
  },
  {
    id: 117,
    question: "NHN Cloud 멤버 관리(IAM)에서 권한 부여 방식으로 옳은 2가지는?",
    options: [
      "사용자별로 직접 권한을 할당할 수 있다.",
      "프로젝트 단위로 역할을 부여할 수 있다.",
      "권한은 오직 하드웨어 시리얼 번호 기반으로만 부여된다.",
      "한 명의 사용자는 오직 하나의 역할만 가질 수 있다.",
      "권한을 한 번 부여하면 프로젝트 종료 시까지 취소가 불가능하다."
    ],
    answer: [
      1,
      2
    ],
    explanation: "사용자별 직접 권한 할당이나 프로젝트 내 역할 기반 권한 관리가 가능합니다."
  },
  {
    id: 118,
    question: "콘텐츠 전송 네트워크(CDN) 서비스의 주요 이점 2가지는?",
    options: [
      "원본 서버의 부하를 감소시킨다.",
      "데이터베이스의 인덱싱 속도를 높여준다.",
      "사용자에게 지리적으로 가까운 엣지 서버에서 데이터를 전송하여 지연 시간을 줄인다.",
      "인스턴스의 CPU 코어 수를 동적으로 늘려준다.",
      "모든 정적 파일을 실시간으로 압축 해제한다."
    ],
    answer: [
      1,
      3
    ],
    explanation: "CDN은 캐싱을 통해 원본 부하를 줄이고 엣지 노드를 이용해 전송 지연을 최소화합니다."
  },
  {
    id: 119,
    question: "인스턴스 삭제 시 함께 삭제되지 않고 유지될 수 있는 리소스 2가지는?",
    options: [
      "인스턴스에 할당된 프라이빗 IP",
      "인스턴스 생성 시 함께 생성된 블록 스토리지(옵션 설정 시)",
      "해당 인스턴스에 연결되어 있던 플로팅 IP",
      "인스턴스 메모리(RAM)에 저장된 데이터",
      "인스턴스 내부 OS 설정 값"
    ],
    answer: [
      2,
      3
    ],
    explanation: "별도 생성된 스토리지와 플로팅 IP는 인스턴스가 삭제되어도 독립적으로 존재할 수 있습니다."
  },
  {
    id: 120,
    question: "클라우드 컴퓨팅의 5가지 핵심 특징 중 사용자가 필요할 때 별도의 관리자 개입 없이 자원을 구성할 수 있는 특성은?",
    options: [
      "리소스 풀링(Resource Pooling)",
      "광대역 네트워크 접속",
      "주문형 셀프 서비스(On-demand Self-service)",
      "신속한 탄력성"
    ],
    answer: 3,
    explanation: "주문형 셀프 서비스는 서비스 제공자와 상호 작용 없이 사용자가 직접 자원을 프로비저닝하는 기능입니다."
  },
  {
    id: 121,
    question: "NHN Cloud의 책임 공유 모델(Shared Responsibility Model)에 대한 설명으로 옳은 것 2개를 고르세요.",
    options: [
      "NHN Cloud는 물리적인 데이터 센터의 보안을 책임진다.",
      "고객은 하이퍼바이저와 물리 서버의 보안 설정을 책임진다.",
      "인스턴스 내부의 운영체제(OS) 패치는 NHN Cloud의 책임이다.",
      "고객은 서비스에 저장된 데이터의 암호화 및 접근 제어를 책임진다.",
      "모든 보안 사고에 대한 최종 책임은 NHN Cloud에 있다."
    ],
    answer: [
      1,
      4
    ],
    explanation: "인프라 보안은 NHN Cloud가, 데이터와 게스트 OS 보안은 고객이 책임집니다."
  },
  {
    id: 122,
    question: "클라우드 보안 개념 중 '최소 권한 부여(Least Privilege)' 원칙의 정의로 올바른 것은?",
    options: [
      "가장 낮은 비용의 보안 서비스를 이용하는 것",
      "업무 수행에 필요한 최소한의 권한만 사용자에게 부여하는 것",
      "보안 설정을 최소한으로 유지하여 성능을 높이는 것",
      "최소한의 인원에게만 계정을 발급하는 것"
    ],
    answer: 2,
    explanation: "보안 사고의 피해를 최소화하기 위해 필수적인 권한만 부여하는 것을 의미합니다."
  },
  {
    id: 123,
    question: "여러 사용자가 물리적 자원을 공유하면서도 논리적으로는 격리되어 사용하는 클라우드의 특징을 무엇이라 합니까?",
    options: [
      "멀티 테넌시(Multi-tenancy)",
      "오픈 소스화",
      "데이터 가용성",
      "인프라 추상화"
    ],
    answer: 1,
    explanation: "멀티 테넌시는 단일 소프트웨어 인스턴스로 여러 사용자에게 서비스를 제공하는 구조입니다."
  },
  {
    id: 124,
    question: "클라우드 컴퓨팅 서비스 모델(IaaS, PaaS, SaaS) 중 성격이 다른 것 2개를 고르세요.",
    options: [
      "Instance (가상 서버)",
      "Object Storage (저장소)",
      "NHN Dooray! (협업 도구)",
      "VPC (네트워크 환경)",
      "NHN Cloud Contact Center (콜센터 솔루션)"
    ],
    answer: [
      3,
      5
    ],
    explanation: "3번과 5번은 SaaS이며, 나머지는 IaaS 영역에 해당합니다."
  },
  {
    id: 125,
    question: "가용성 영역(Availability Zone) 간의 지리적 분리에 대한 설명으로 옳은 것은?",
    options: [
      "동일한 건물 내의 다른 층을 의미한다.",
      "전력과 네트워크 등 인프라가 완전히 독립된 데이터 센터 단위이다.",
      "서로 다른 국가에 위치해야만 AZ로 인정된다.",
      "소프트웨어적으로만 분리된 논리적 단위이다."
    ],
    answer: 2,
    explanation: "AZ는 리전 내에서 물리적 장애로부터 독립된 인프라를 갖춘 데이터 센터입니다."
  },
  {
    id: 126,
    question: "NHN Cloud 보안 가이드에서 권장하는 계정 관리 방법으로 옳은 것 2개를 고르세요.",
    options: [
      "상시 업무 수행 시 루트 계정을 사용한다.",
      "2단계 인증(MFA)을 필수적으로 활성화한다.",
      "IAM 계정을 생성하여 각 담당자에게 개별 부여한다.",
      "비밀번호는 한 번 설정하면 변경하지 않는 것이 보안상 유리하다.",
      "AppKey는 소스 코드 내에 주석으로 명시한다."
    ],
    answer: [
      2,
      3
    ],
    explanation: "루트 계정 사용을 지양하고 MFA와 IAM 계정 사용을 권장합니다."
  },
  {
    id: 127,
    question: "서비스 제공자가 서버 관리, 확장, 패치 등의 인프라 작업을 모두 담당하며, 개발자는 코드에만 집중할 수 있는 모델은?",
    options: [
      "IaaS",
      "PaaS",
      "서버리스(Serverless)",
      "On-premise"
    ],
    answer: 2,
    explanation: "PaaS는 개발 환경과 플랫폼을 제공하여 관리 부담을 줄여줍니다."
  },
  {
    id: 128,
    question: "퍼블릭 클라우드 서비스의 특징이 아닌 것은?",
    options: [
      "규모의 경제를 통한 비용 절감",
      "사용한 만큼 지불하는 유연한 요금제",
      "물리 하드웨어에 대한 직접적인 소유권",
      "신속한 자원 배포 및 확장성"
    ],
    answer: 3,
    explanation: "퍼블릭 클라우드는 자원을 빌려 쓰는 방식으로 물리 서버 소유권은 제공자에게 있습니다."
  },
  {
    id: 129,
    question: "NHN Cloud의 '쿼터(Quota)' 정책에 대한 설명으로 옳은 것은?",
    options: [
      "모든 사용자는 처음부터 무제한 자원을 생성할 수 있다.",
      "안정적인 자원 배분을 위해 프로젝트별 리소스 최대치가 제한되어 있다.",
      "쿼터 제한에 도달하면 무조건 유료 결제를 해야 풀린다.",
      "쿼터는 오직 네트워크 트래픽에만 적용된다."
    ],
    answer: 2,
    explanation: "프로젝트별 자원 생성 한도가 있으며 필요 시 고객 센터를 통해 증설 요청이 가능합니다."
  },
  {
    id: 130,
    question: "인스턴스 생성 시 '이미지(Image)'가 포함하는 정보 2개를 고르세요.",
    options: [
      "운영체제(OS)",
      "가상 서버의 CPU 및 메모리 사양",
      "데이터베이스 엔진 및 기본 소프트웨어 구성",
      "서버 접속용 플로팅 IP 주소",
      "인스턴스가 배치될 가용성 영역"
    ],
    answer: [
      1,
      3
    ],
    explanation: "이미지는 OS와 소프트웨어 구성을 담은 템플릿입니다. 사양은 Flavor에서 결정합니다."
  },
  {
    id: 131,
    question: "NHN Cloud 블록 스토리지(Block Storage)의 특성으로 올바른 것은?",
    options: [
      "여러 리전에 걸쳐 데이터를 실시간으로 동기화한다.",
      "동일 가용성 영역(AZ) 내의 인스턴스에만 연결할 수 있다.",
      "최대 저장 용량이 1GB로 고정되어 있다.",
      "네트워크 연결 없이 물리적으로만 작동한다."
    ],
    answer: 2,
    explanation: "블록 스토리지는 물리적 지연 시간을 최소화하기 위해 동일 AZ 내에서만 연결 가능합니다."
  },
  {
    id: 132,
    question: "오브젝트 스토리지(Object Storage)의 주요 기능으로 옳은 것 2개를 고르세요.",
    options: [
      "S3 호환 API 지원",
      "SQL 쿼리를 통한 데이터 직접 수정",
      "수명 주기 관리(Lifecycle Management)",
      "밀리초 단위의 데이터 임시 저장",
      "물리 서버 하드웨어 직접 제어"
    ],
    answer: [
      1,
      3
    ],
    explanation: "S3 호환성 및 객체 수명 주기를 자동으로 관리하는 기능을 제공합니다."
  },
  {
    id: 133,
    question: "NHN Cloud 로드 밸런서(Load Balancer)에 대한 설명으로 옳은 것은?",
    options: [
      "인스턴스 내부의 CPU 사용률을 직접 낮춰준다.",
      "L4(TCP/UDP) 및 L7(HTTP/HTTPS) 계층의 트래픽 분산을 지원한다.",
      "오직 하나의 서버로만 모든 트래픽을 집중시킨다.",
      "네트워크 대역폭을 강제로 축소시킨다."
    ],
    answer: 2,
    explanation: "부하 분산 서비스는 네트워크 계층에 따라 다양한 트래픽 분산 방식을 제공합니다."
  },
  {
    id: 134,
    question: "NHN Cloud 모니터링 서비스가 기본적으로 보관하는 지표 데이터의 기간은?",
    options: [
      "1주일",
      "1개월",
      "52주",
      "영구 보관"
    ],
    answer: 3,
    explanation: "Cloud Monitoring은 수집된 지표를 최대 52주간 보관합니다."
  },
  {
    id: 135,
    question: "NHN Cloud '글로벌 서비스'와 '리전 서비스'의 차이점으로 옳은 것 2가지는?",
    options: [
      "글로벌 서비스는 모든 리전에서 동일한 정책으로 사용 가능하다.",
      "리전 서비스는 특정 지역의 법률이나 인프라 환경에 따라 제공 여부가 결정된다.",
      "글로벌 서비스는 결제가 불가능하다.",
      "리전 서비스는 모든 국가에서 속도가 동일하다.",
      "글로벌 서비스는 오직 한국 리전에서만 생성 가능하다."
    ],
    answer: [
      1,
      2
    ],
    explanation: "글로벌 서비스는 전 리전 공통, 리전 서비스는 특정 지역 특화 서비스입니다."
  },
  {
    id: 136,
    question: "애플리케이션 로그 및 시스템 로그를 수집하고 분석할 수 있는 서비스의 명칭은?",
    options: [
      "CloudTrail",
      "Monitoring",
      "Log & Crash Search",
      "Security Advisor"
    ],
    answer: 3,
    explanation: "Log & Crash Search는 다양한 로그를 통합 수집하여 검색하는 기능을 제공합니다."
  },
  {
    id: 137,
    question: "NHN Cloud 'Dedicated 타입' 인스턴스의 특징으로 올바른 2가지는?",
    options: [
      "물리적 호스트를 다른 사용자와 공유하지 않는다.",
      "가장 저렴한 요금 체계를 가지고 있다.",
      "자원 간섭 없이 안정적인 성능을 보장받는다.",
      "오직 개발용으로만 사용해야 한다.",
      "생성 후 사양 변경이 절대 불가능하다."
    ],
    answer: [
      1,
      3
    ],
    explanation: "전용 호스트를 사용하여 보안성과 성능 안정성이 뛰어납니다."
  },
  {
    id: 138,
    question: "Auto Scaling 기능이 활성화되기 위해 필수적으로 설정해야 하는 요소는?",
    options: [
      "인덱싱 정책",
      "알림 수신 그룹",
      "스케일링 정책 및 론치 설정",
      "데이터베이스 복구 시점"
    ],
    answer: 3,
    explanation: "어떤 사양으로 늘릴지(론치 설정)와 언제 늘릴지(정책)가 핵심입니다."
  },
  {
    id: 139,
    question: "NHN Cloud 리전 중 광주 데이터 센터가 갖는 특별한 명칭은?",
    options: [
      "국가 AI 데이터 센터",
      "글로벌 허브 센터",
      "엔터프라이즈 전용 센터",
      "백업 전용 리전"
    ],
    answer: 1,
    explanation: "NHN Cloud 광주 리전은 국가 AI 데이터 센터로서 인프라를 제공합니다."
  },
  {
    id: 140,
    question: "데이터를 여러 하드웨어에 중복 저장하여 높은 안정성을 제공하는 스토리지 유형 2개는?",
    options: [
      "오브젝트 스토리지(Object Storage)",
      "로컬 스토리지(Local Storage)",
      "블록 스토리지(Block Storage)",
      "인스턴스 스토리지",
      "임시 메모리 저장소"
    ],
    answer: [
      1,
      3
    ],
    explanation: "오브젝트 스토리지와 블록 스토리지는 가용성을 위해 복제본을 유지합니다."
  },
  {
    id: 141,
    question: "CDN(Content Delivery Network) 서비스가 가장 효과적인 상황은?",
    options: [
      "데이터베이스 쿼리 속도를 높여야 할 때",
      "이미지, 동영상 등 대용량 정적 콘텐츠를 전 세계 사용자에게 빠르게 배포할 때",
      "서버의 운영체제 패치를 자동화할 때",
      "사내 인프라를 전용선으로 연결할 때"
    ],
    answer: 2,
    explanation: "CDN은 지리적으로 분산된 엣지 서버를 통해 콘텐츠 전송 속도를 최적화합니다."
  },
  {
    id: 142,
    question: "NHN Cloud에서 제공하는 관리형 DB 서비스(RDS)의 장점이 아닌 것은?",
    options: [
      "자동 백업 및 복원 기능",
      "DB 엔진의 소스 코드 직접 수정 권한",
      "고가용성을 위한 다중화 구성 지원",
      "운영체제 및 DB 소프트웨어 설치 대행"
    ],
    answer: 2,
    explanation: "관리형 서비스는 사용자가 엔진 소스 코드를 수정하는 권한은 제한합니다."
  },
  {
    id: 143,
    question: "Notification 서비스 카테고리에 포함된 기능 2개를 고르세요.",
    options: [
      "SMS (단문 메시지)",
      "VPC 피어링 알림",
      "AlimTalk (알림톡)",
      "인스턴스 상태 알림",
      "결제 금액 알림"
    ],
    answer: [
      1,
      3
    ],
    explanation: "메시지 발송 서비스인 SMS, Email, Push, 알림톡 등이 Notification 카테고리에 속합니다."
  },
  {
    id: 144,
    question: "NHN Cloud 서비스 이용 중 발생하는 API 활동 로그를 수집하는 서비스는?",
    options: [
      "Monitoring",
      "CloudTrail",
      "Security Advisor",
      "App Analytics"
    ],
    answer: 2,
    explanation: "CloudTrail은 계정 내 API 호출 이력을 기록하여 감사를 지원합니다."
  },
  {
    id: 145,
    question: "인스턴스 중지(Stop) 시 90일간 적용되는 할인 정책의 명칭은?",
    options: [
      "장기 미사용 할인",
      "인스턴스 반납 할인",
      "인스턴스 중지 요금 할인",
      "결제 수단 할인"
    ],
    answer: 3,
    explanation: "인스턴스 중지 시 90일 동안 90% 요금 할인을 적용합니다."
  },
  {
    id: 146,
    question: "NHN Cloud에서 하이브리드 클라우드 구축을 위해 제공하는 연결 방식 2가지는?",
    options: [
      "VPN (가상 사설망)",
      "Internet Gateway (직접 접속)",
      "Direct Connect (전용선)",
      "VPC 피어링",
      "플로팅 IP 연결"
    ],
    answer: [
      1,
      3
    ],
    explanation: "보안이 강화된 연결을 위해 VPN과 Direct Connect 전용선을 주로 사용합니다."
  },
  {
    id: 147,
    question: "VPC 네트워크 통신을 제어하는 보안 그룹(Security Group)의 특징으로 옳은 것은?",
    options: [
      "Stateless 방식으로 동작한다.",
      "인바운드 트래픽이 허용되면 아웃바운드 응답 트래픽은 자동으로 허용된다.",
      "서브넷 단위로만 적용 가능하다.",
      "거부(Deny) 규칙을 우선적으로 적용한다."
    ],
    answer: 2,
    explanation: "보안 그룹은 상태 유지(Stateful) 방식으로 동작합니다."
  },
  {
    id: 148,
    question: "NHN Cloud에서 'Flavor'란 무엇을 의미합니까?",
    options: [
      "인스턴스의 운영체제 종류",
      "인스턴스의 하드웨어 사양(vCPU, Memory)",
      "인스턴스의 이름",
      "인스턴스의 보안 등급"
    ],
    answer: 2,
    explanation: "Flavor는 가상 서버의 성능 규격(사양)을 정의하는 용어입니다."
  },
  {
    id: 149,
    question: "NHN Cloud 계정 구조에서 자원을 생성하기 위한 프로젝트를 포함하는 최상위 관리 단위는?",
    options: [
      "리전",
      "조직(Organization)",
      "네트워크",
      "워크스페이스"
    ],
    answer: 2,
    explanation: "조직은 프로젝트와 멤버를 관리하는 최상위 계층입니다."
  },
  {
    id: 150,
    question: "조직을 생성한 회원이 자동으로 갖게 되는 권한 역할은?",
    options: [
      "ADMIN",
      "MEMBER",
      "OWNER",
      "VIEWER"
    ],
    answer: 3,
    explanation: "조직 생성자는 해당 조직의 OWNER 권한을 자동으로 가집니다."
  },
  {
    id: 151,
    question: "VPC 서브넷 생성 시 CIDR 표기법(예: 10.0.0.0/24)을 사용하는 이유는?",
    options: [
      "서버의 이름을 정하기 위해",
      "IP 주소의 대역폭과 범위를 지정하기 위해",
      "데이터 암호화 키를 만들기 위해",
      "사용자 비밀번호를 암호화하기 위해"
    ],
    answer: 2,
    explanation: "CIDR은 IP 주소 할당 범위를 효율적으로 관리하기 위한 표기법입니다."
  },
  {
    id: 152,
    question: "프로젝트 멤버 초대 및 권한 부여 과정에 대한 설명 중 옳은 것 2가지는?",
    options: [
      "이메일 주소를 통해 멤버를 초대할 수 있다.",
      "초대를 받은 사람은 반드시 수락 절차를 거쳐야 멤버가 된다.",
      "초대 시 반드시 결제 수단을 등록해야 한다.",
      "한 번 멤버가 되면 권한 변경이 불가능하다.",
      "멤버 초대는 오직 VIEWER 권한자만 가능하다."
    ],
    answer: [
      1,
      2
    ],
    explanation: "이메일 초대와 수락 과정을 통해 멤버 협업이 시작됩니다."
  },
  {
    id: 153,
    question: "NHN Cloud 콘솔에서 '서비스 활성화'의 의미는?",
    options: [
      "회원 가입을 완료하는 것",
      "프로젝트 내에서 특정 상품(예: Instance)을 사용할 수 있는 상태로 만드는 것",
      "인터넷 선을 연결하는 것",
      "결제를 완료하는 것"
    ],
    answer: 2,
    explanation: "프로젝트 생성 후 사용할 각 서비스를 활성화해야 관련 자원 생성이 가능합니다."
  },
  {
    id: 154,
    question: "보안 그룹 설정 시 인바운드 규칙에 '0.0.0.0/0'을 설정했을 때의 의미는?",
    options: [
      "모든 접속을 차단한다.",
      "모든 IP 주소로부터의 접속을 허용한다.",
      "내부 네트워크 접속만 허용한다.",
      "특정 국가의 접속만 허용한다."
    ],
    answer: 2,
    explanation: "0.0.0.0/0은 전 세계 모든 네트워크 대역을 뜻합니다."
  },
  {
    id: 155,
    question: "프라이빗 서브넷에 위치한 인스턴스가 인터넷과 통신하기 위해 설정해야 하는 구성 2가지는?",
    options: [
      "인터넷 게이트웨이(IGW) 연결",
      "NAT 게이트웨이 설정",
      "라우팅 테이블에 외부 경로(0.0.0.0/0) 추가",
      "인스턴스 타입 업그레이드",
      "VPC 피어링 체결"
    ],
    answer: [
      2,
      3
    ],
    explanation: "NAT GW와 이를 통하는 라우팅 규칙이 있어야 외부 통신이 가능합니다."
  },
  {
    id: 156,
    question: "NHN Cloud에서 인스턴스에 접속하기 위해 생성한 키페어(.pem) 분실 시 조치 사항은?",
    options: [
      "콘솔에서 즉시 재다운로드한다.",
      "보안상 재발급이 불가능하므로 새로운 키페어를 사용해 인스턴스를 재생성하거나 복잡한 복구 절차를 거쳐야 한다.",
      "비밀번호 찾기 기능을 이용한다.",
      "NHN Cloud 본사를 방문하여 수령한다."
    ],
    answer: 2,
    explanation: "비밀키는 생성 시 1회만 제공되므로 분실에 주의해야 합니다."
  },
  {
    id: 157,
    question: "Object Storage의 '버킷(Bucket)' 또는 '컨테이너(Container)'에 대한 설명으로 옳은 2가지는?",
    options: [
      "객체를 저장하고 관리하기 위한 최상위 디렉터리 개념이다.",
      "컨테이너 단위로 접근 권한을 설정할 수 있다.",
      "컨테이너 생성 시 반드시 고정 용량을 지정해야 한다.",
      "컨테이너의 이름은 중복되어도 상관없다.",
      "컨테이너는 오직 10개까지만 생성 가능하다."
    ],
    answer: [
      1,
      2
    ],
    explanation: "객체 저장의 기본 단위이며 권한 설정의 기준이 됩니다."
  },
  {
    id: 158,
    question: "VPC 피어링(Peering)의 주된 용도는 무엇입니까?",
    options: [
      "인터넷 속도를 높이기 위해",
      "서로 다른 VPC 간에 사설 IP를 통해 안전하게 통신하기 위해",
      "데이터를 백업하기 위해",
      "인스턴스 성능을 통합하기 위해"
    ],
    answer: 2,
    explanation: "VPC 피어링은 독립된 네트워크 공간을 연결해주는 브리지 역할을 합니다."
  },
  {
    id: 159,
    question: "NHN Cloud 인스턴스 생성 프로세스에서 필수 선택 항목이 아닌 것은?",
    options: [
      "이미지",
      "인스턴스 타입",
      "블록 스토리지 추가(데이터용)",
      "네트워크(VPC/Subnet)"
    ],
    answer: 3,
    explanation: "기본 운영체제가 담긴 루트 볼륨 외에 추가 데이터 스토리지는 선택 사항입니다."
  },
  {
    id: 160,
    question: "인스턴스 삭제(Terminate)를 방지하기 위해 설정하는 보안 기능의 명칭은?",
    options: [
      "삭제 잠금",
      "삭제 보호(Termination Protection)",
      "데이터 보존 정책",
      "관리자 잠금"
    ],
    answer: 2,
    explanation: "실수나 악의적인 삭제를 막기 위해 삭제 보호 설정을 제공합니다."
  },
  {
    id: 161,
    question: "IAM(Identity and Access Management)의 주요 역할 2가지는?",
    options: [
      "사용자별 세밀한 권한 제어",
      "인스턴스의 하드웨어 수리",
      "조직 및 프로젝트에 대한 접근 거버넌스 관리",
      "전체 서비스의 실시간 결제 차단",
      "서버 내부 소스 코드 자동 코딩"
    ],
    answer: [
      1,
      3
    ],
    explanation: "사용자 인증과 리소스에 대한 권한 제어가 핵심 역할입니다."
  },
  {
    id: 162,
    question: "라우팅 테이블(Route Table)에 등록되는 규칙의 구성 요소는?",
    options: [
      "ID와 비밀번호",
      "목적지(Destination)와 타겟(Target/Gateway)",
      "사용자 이름과 이메일",
      "이미지 이름과 크기"
    ],
    answer: 2,
    explanation: "어디로 갈 트래픽(목적지)을 어디로 보낼지(타겟)를 정의합니다."
  },
  {
    id: 163,
    question: "NHN Cloud에서 제공하는 '사용자 스크립트(User Script)'의 실행 시점은?",
    options: [
      "인스턴스가 종료될 때",
      "인스턴스가 생성된 후 첫 번째 부팅이 완료되었을 때",
      "매번 재부팅할 때마다",
      "사용자가 콘솔에 로그인할 때"
    ],
    answer: 2,
    explanation: "cloud-init을 통해 초기 환경 설정을 자동화할 수 있습니다."
  },
  {
    id: 164,
    question: "로드 밸런서 하단에 위치한 인스턴스들의 상태를 주기적으로 점검하는 기능은?",
    options: [
      "Auto 체크",
      "헬스 체크(Health Check)",
      "서버 모니터링",
      "포트 스캐닝"
    ],
    answer: 2,
    explanation: "상태 확인에 성공한 서버로만 트래픽을 전달합니다."
  },
  {
    id: 165,
    question: "NHN Cloud에서 자원을 식별하고 분류하기 위해 키-값 쌍으로 부여하는 정보는?",
    options: [
      "태그(Tag)",
      "플레이버",
      "AppKey",
      "서브넷"
    ],
    answer: 1,
    explanation: "태그를 활용해 많은 양의 자원을 효율적으로 그룹화할 수 있습니다."
  },
  {
    id: 166,
    question: "보안 그룹(Security Group) 규칙 적용 범위에 대한 설명으로 옳은 것 2가지는?",
    options: [
      "인스턴스 단위로 적용된다.",
      "동일한 보안 그룹에 속한 인스턴스끼리는 기본적으로 모든 통신이 허용되도록 설정 가능하다.",
      "오직 인바운드 트래픽만 제어 가능하다.",
      "리전 간 보안 그룹 공유가 기본적으로 활성화되어 있다.",
      "보안 그룹은 최대 1개까지만 인스턴스에 적용 가능하다."
    ],
    answer: [
      1,
      2
    ],
    explanation: "보안 그룹은 인스턴스별로 유연하게 방화벽 규칙을 적용합니다."
  },
  {
    id: 167,
    question: "VPC 네트워크 설계 시 권장되지 않는 방법은?",
    options: [
      "향후 확장을 고려하여 넉넉한 IP 대역 설정",
      "외부 노출이 필요 없는 DB는 프라이빗 서브넷에 배치",
      "모든 서버에 플로팅 IP를 할당하여 직접 관리",
      "용도별로 서브넷을 분리하여 관리"
    ],
    answer: 3,
    explanation: "보안을 위해 꼭 필요한 경우에만 공인 IP(Floating IP)를 사용해야 합니다."
  },
  {
    id: 168,
    question: "NHN Cloud에서 제공하는 SDK(Software Development Kit)의 용도는?",
    options: [
      "콘솔의 글자 크기를 바꾸기 위해",
      "프로그래밍 언어에서 NHN Cloud 서비스를 쉽게 호출하고 개발하기 위해",
      "컴퓨터의 운영체제를 설치하기 위해",
      "인터넷 속도를 측정하기 위해"
    ],
    answer: 2,
    explanation: "개발자가 API를 직접 다루지 않고 익숙한 언어로 클라우드 기능을 구현하게 돕습니다."
  },
  {
    id: 169,
    question: "플로팅 IP(Floating IP) 해제 시 주의사항 2가지를 고르세요.",
    options: [
      "인스턴스에서 해제하더라도 서비스 자체를 반납하지 않으면 요금이 발생할 수 있다.",
      "해제하는 즉시 인스턴스의 프라이빗 IP도 삭제된다.",
      "해제된 IP 주소는 다시 할당받을 때 주소가 바뀔 수 있다.",
      "해제 시 인스턴스가 자동으로 종료된다.",
      "해제 후에는 내부 통신도 불가능해진다."
    ],
    answer: [
      1,
      3
    ],
    explanation: "공인 IP 자원은 유한하므로 미사용 시 요금이 부과되거나 주소가 바뀔 수 있습니다."
  },
  {
    id: 170,
    question: "NHN Cloud 인스턴스 이미지를 '스냅샷' 기반으로 생성했을 때의 장점은?",
    options: [
      "성능이 2배로 빨라진다.",
      "특정 시점의 데이터와 설정 상태를 그대로 복제하여 동일한 환경을 빠르게 구축할 수 있다.",
      "요금이 전액 면제된다.",
      "네트워크 설정을 수동으로 하지 않아도 된다."
    ],
    answer: 2,
    explanation: "기존 서버의 상태를 그대로 템플릿화하여 복제할 수 있습니다."
  },
  {
    id: 171,
    question: "VPC 내부의 자원들이 사용하는 DNS 서버 정보를 설정하는 메뉴는?",
    options: [
      "라우팅 테이블",
      "DHCP 옵션 세트",
      "서브넷 마스크",
      "보안 그룹"
    ],
    answer: 2,
    explanation: "DHCP 옵션 세트를 통해 VPC 내 DNS 서버 정보를 배포할 수 있습니다."
  },
  {
    id: 172,
    question: "NHN Cloud 프로젝트 삭제 시 복구가 가능한 범위는?",
    options: [
      "30일 이내 복구 가능",
      "영구 삭제되므로 복구 불가능",
      "고객 센터를 통해서만 복구 가능",
      "데이터베이스만 복구 가능"
    ],
    answer: 2,
    explanation: "프로젝트 삭제는 모든 자원의 완전 파괴를 의미하므로 신중해야 합니다."
  },
  {
    id: 173,
    question: "NHN Cloud의 요금 정책 중 '종량제'에 대한 설명으로 옳은 것은?",
    options: [
      "사용 여부와 관계없이 매월 일정한 금액을 낸다.",
      "사용한 시간 또는 데이터 용량만큼만 요금을 지불한다.",
      "선불로만 이용 가능하다.",
      "무조건 1년 단위 계약을 해야 한다."
    ],
    answer: 2,
    explanation: "종량제(Pay-as-you-go)는 클라우드의 가장 핵심적인 비용 모델입니다."
  },
  {
    id: 174,
    question: "NHN Cloud에서 제공하는 '크레딧(Credit)'에 대한 설명으로 옳은 것 2개를 고르세요.",
    options: [
      "요금 결제 시 현금보다 우선적으로 차감된다.",
      "현금으로 출금하거나 환불받을 수 있다.",
      "유효 기간이 존재하며 기간 경과 시 소멸한다.",
      "모든 서비스에서 무제한으로 사용 가능하다.",
      "사용자끼리 자유롭게 양도할 수 있다."
    ],
    answer: [
      1,
      3
    ],
    explanation: "크레딧은 프로모션용 포인트 성격이 강하며 유효 기간이 있습니다."
  },
  {
    id: 175,
    question: "NHN Cloud 요금 결제 수단으로 등록할 수 있는 항목은?",
    options: [
      "신용카드",
      "가상화폐",
      "문화상품권",
      "해외 송금"
    ],
    answer: 1,
    explanation: "신용카드와 법인의 경우 계좌 이체 방식 등을 공식 지원합니다."
  },
  {
    id: 176,
    question: "실시간 이용 내역을 확인하고 예상 요금을 조회할 수 있는 메뉴는?",
    options: [
      "인스턴스 설정",
      "결제 관리",
      "조직 설정",
      "고객 지원"
    ],
    answer: 2,
    explanation: "결제 관리 메뉴에서 현재까지 쌓인 비용과 상세 내역을 볼 수 있습니다."
  },
  {
    id: 177,
    question: "과도한 요금 발생을 막기 위해 사용자가 설정할 수 있는 기능 2가지는?",
    options: [
      "알람 임계치(예산) 설정",
      "결제 한도 초과 시 서비스 자동 강제 삭제",
      "요금 알람 수신 그룹 지정",
      "무료 체험 무제한 연장 신청",
      "해외 IP 차단 설정"
    ],
    answer: [
      1,
      3
    ],
    explanation: "예산 알람 기능을 통해 비용을 상시 모니터링할 수 있습니다."
  },
  {
    id: 178,
    question: "NHN Cloud의 '무료 체험(Free Tier)' 혜택이 적용되는 기준은?",
    options: [
      "회원 가입만 하면 평생 무료이다.",
      "신규 회원에게 특정 기간 또는 특정 한도까지 무료 자원을 제공한다.",
      "오직 학생에게만 제공된다.",
      "모든 유료 상품을 무료로 쓸 수 있다."
    ],
    answer: 2,
    explanation: "신규 가입 혜택은 기간과 한도가 정해져 있습니다."
  },
  {
    id: 179,
    question: "SLA(Service Level Agreement)에 명시된 가동률을 충족하지 못했을 때 발생하는 절차는?",
    options: [
      "관리자 징계",
      "요금 크레딧 보상 신청 및 지급",
      "서비스 전체 무료 전환",
      "하드웨어 장비 무상 증정"
    ],
    answer: 2,
    explanation: "SLA 위반 시 정의된 기준에 따라 요금의 일부를 크레딧 등으로 보상합니다."
  },
  // [영역 1: 클라우드 개념 및 보안 - 5문제]
  {
    id: 180,
    question: "국내 보안 인증 제도 중 정보보호와 개인정보보호를 관리하는 체계로, NHN Cloud가 획득한 인증의 명칭은?",
    options: ["ISMS-P", "ISO 9001", "PMP", "CSAP"],
    answer: 1,
    explanation: "ISMS-P는 정보보호 및 개인정보보호 관리체계 인증으로, NHN Cloud는 이를 획득하여 안정성을 입증했습니다."
  },
  {
    id: 181,
    question: "NHN Cloud가 준수하거나 획득한 글로벌 보안 및 품질 인증 2가지를 고르세요.",
    options: [
      "SOC 1/2/3",
      "K-Water 인증",
      "ISO/IEC 27001",
      "Green IT 인증",
      "UNESCO 문화인프라 인증"
    ],
    answer: [1, 3],
    explanation: "글로벌 표준인 ISO 27001과 서비스 조직 통제 수준을 평가하는 SOC 인증을 획득하고 있습니다."
  },
  {
    id: 182,
    question: "온프레미스(로컬 IDC)와 퍼블릭 클라우드를 연결하여 유연하게 자원을 배분하는 구성 방식을 무엇이라 합니까?",
    options: ["하이브리드 클라우드", "멀티 클라우드", "프라이빗 클라우드", "에지 클라우드"],
    answer: 1,
    explanation: "하이브리드 클라우드는 서로 다른 두 환경(주로 사설과 공용)을 연결한 구성을 말합니다."
  },
  {
    id: 183,
    question: "책임 공유 모델에서 NHN Cloud가 담당하는 '플랫폼 보안' 영역에 해당하는 것 2가지는?",
    options: [
      "하이퍼바이저(Hypervisor) 보안",
      "사용자 애플리케이션 보안",
      "데이터베이스 엔진(RDS용) 관리 및 패치",
      "고객 데이터 암호화 설정",
      "네트워크 ACL의 허용 규칙 설정"
    ],
    answer: [1, 3],
    explanation: "하이퍼바이저와 관리형 서비스(RDS 등)의 엔진 레벨 보안은 클라우드 제공자의 책임입니다."
  },
  {
    id: 184,
    question: "클라우드 거버넌스(Governance)를 위해 NHN Cloud가 제공하는 '조직' 기능의 주된 목적은?",
    options: ["자원 생성 속도 향상", "일관된 정책 관리 및 통합 관리 환경 제공", "서버 하드웨어 직접 교체", "무료 자원 무제한 제공"],
    answer: 2,
    explanation: "조직 기능을 통해 전사적 정책 적용, 멤버 관리, 통합 결제 등 거버넌스를 실현할 수 있습니다."
  },

  // [영역 2: NHN Cloud 서비스 특징 - 10문제]
  {
    id: 185,
    question: "NHN Cloud에서 제공하는 관리형 쿠버네티스 서비스의 명칭은?",
    options: ["NKS (NHN Kubernetes Service)", "NEC (NHN Engine Container)", "NCS (NHN Cloud Server)", "NKE (NHN Kubernetes Engine)"],
    answer: 1,
    explanation: "NHN Cloud의 관리형 쿠버네티스 서비스 정식 명칭은 NKS입니다."
  },
  {
    id: 186,
    question: "웹 서비스에 대한 공격(SQL Injection, XSS 등)을 차단하기 위해 사용하는 보안 서비스 2개는?",
    options: [
      "WAF (Web Application Firewall)",
      "VPC Peering",
      "App Security",
      "Direct Connect",
      "DNS"
    ],
    answer: [1, 3],
    explanation: "WAF와 App Security는 웹 및 모바일 애플리케이션 계층의 공격을 방어합니다."
  },
  {
    id: 187,
    question: "NHN Cloud 리전 중 미국 지역에 위치하여 글로벌 서비스를 지원하는 리전은?",
    options: ["USA (California) 리전", "USA (New York) 리전", "USA (Virginia) 리전", "USA (Texas) 리전"],
    answer: 1,
    explanation: "NHN Cloud는 미국 캘리포니아 리전을 운영하고 있습니다."
  },
  {
    id: 188,
    question: "NHN Cloud의 게임 플랫폼 서비스 'Gamebase'가 제공하는 기능 2가지는?",
    options: [
      "인증 및 결제 통합 지원",
      "서버 하드웨어 조립",
      "지표 분석 및 푸시 알림",
      "VPC 네트워크 설계 자동화",
      "데이터베이스 인덱싱 자동 수정"
    ],
    answer: [1, 3],
    explanation: "Gamebase는 게임 개발에 필수적인 인증, 결제, 운영 지표 등의 기능을 통합 제공합니다."
  },
  {
    id: 189,
    question: "API 호출을 효율적으로 관리하고 인증 및 트래픽을 제어하는 서비스의 명칭은?",
    options: ["API Gateway", "API Bridge", "API Loader", "API Console"],
    answer: 1,
    explanation: "API Gateway는 대규모 API 호출을 처리하고 인증 및 유량 제어를 담당합니다."
  },
  {
    id: 190,
    question: "NHN Cloud Marketplace를 이용할 때의 장점 2가지는?",
    options: [
      "검증된 솔루션(이미지)을 즉시 도입할 수 있다.",
      "모든 유료 소프트웨어를 무료로 사용할 수 있다.",
      "NHN Cloud 요금과 통합하여 정산이 가능하다.",
      "서버의 물리적인 위치를 직접 바꿀 수 있다.",
      "인터넷 연결 없이도 모든 기능을 쓸 수 있다."
    ],
    answer: [1, 3],
    explanation: "마켓플레이스는 신뢰할 수 있는 솔루션을 쉽고 빠르게 구축하고 비용을 통합 관리하게 돕습니다."
  },
  {
    id: 191,
    question: "NHN Cloud의 컨테이너 이미지 저장소 서비스의 명칭은?",
    options: ["NCR (NHN Container Registry)", "NHN Docker Hub", "NCS (NHN Container Storage)", "NCR (NHN Cloud Repository)"],
    answer: 1,
    explanation: "NCR(NHN Container Registry)은 컨테이너 이미지를 안전하게 관리하는 저장소입니다."
  },
  {
    id: 192,
    question: "NHN Cloud의 'Search' 서비스(Cloud Search)에 대한 설명으로 옳은 것 2가지는?",
    options: [
      "대용량 데이터를 빠르게 검색할 수 있는 기능을 제공한다.",
      "오직 텍스트 파일만 검색 가능하다.",
      "RESTful API 기반으로 검색 엔진 연동이 가능하다.",
      "네트워크 선로의 물리적 단락을 검색한다.",
      "사용자의 이메일 본문을 강제로 검색한다."
    ],
    answer: [1, 3],
    explanation: "Cloud Search는 대용량 데이터에 대한 전문 검색(Full-text Search) 기능을 API 형태로 제공합니다."
  },
  {
    id: 193,
    question: "VPC 내부에서만 사용 가능한 전용 도메인 이름을 설정하고 관리하는 서비스는?",
    options: ["Private DNS", "Local DNS", "Internal Host", "VPC DNS"],
    answer: 1,
    explanation: "Private DNS는 VPC 내부 네트워크에서만 식별되는 도메인을 관리합니다."
  },
  {
    id: 194,
    question: "DDoS Guard 서비스가 방어하는 주된 공격 형태 2가지는?",
    options: [
      "대량의 트래픽을 유발하는 네트워크 부하 공격",
      "서버실 내부의 물리적 침입",
      "정상적인 접근을 위장한 서비스 거부 공격",
      "관리자의 패스워드 분실",
      "결제 시스템의 해킹"
    ],
    answer: [1, 3],
    explanation: "DDoS Guard는 네트워크 및 전송 계층에서 발생하는 대규모 유량 공격을 차단합니다."
  },

  // [영역 3: NHN Cloud 서비스 활용 기술 - 12문제]
  {
    id: 195,
    question: "IAM 서비스에서 '역할(Role)'과 '정책(Policy)'의 관계에 대한 설명으로 옳은 것은?",
    options: [
      "정책은 역할 내부에 포함되어 구체적인 권한을 정의한다.",
      "역할은 정책보다 항상 우선순위가 낮다.",
      "정책은 오직 이메일 발송 권한만 가진다.",
      "둘은 완전히 다른 서비스로 서로 연동되지 않는다."
    ],
    answer: 1,
    explanation: "정책은 어떤 행동을 할 수 있는지 정의하며, 이를 역할에 연결하여 권한을 부여합니다."
  },
  {
    id: 196,
    question: "VPC 서브넷을 설계할 때 주의해야 할 사항 2가지는?",
    options: [
      "사용할 IP 주소 개수에 맞춰 CIDR 범위를 적절히 설정해야 한다.",
      "서브넷은 여러 가용성 영역(AZ)에 걸쳐 생성할 수 있다.",
      "용도(WEB/WAS/DB)에 따라 퍼블릭과 프라이빗 서브넷을 분리하는 것이 좋다.",
      "하나의 VPC에는 하나의 서브넷만 생성 가능하다.",
      "서브넷 이름은 반드시 영어 대문자로만 만들어야 한다."
    ],
    answer: [1, 3],
    explanation: "서브넷은 한 AZ에 귀속되며, 보안을 위해 계층별로 분리 설계하는 것이 권장됩니다."
  },
  {
    id: 197,
    question: "이미 생성된 플로팅 IP를 다른 인스턴스로 옮기기 위한 단계로 옳은 것은?",
    options: [
      "기존 인스턴스에서 연결 해제(Dissociate) 후 새 인스턴스에 연결(Associate)",
      "플로팅 IP를 삭제하고 새로 생성",
      "두 인스턴스를 하나로 합치기",
      "네트워크 카드를 물리적으로 교체"
    ],
    answer: 1,
    explanation: "연결 해제 후 재연결을 통해 공인 IP 주소를 다른 자원으로 이전할 수 있습니다."
  },
  {
    id: 198,
    question: "자원 관리의 효율성을 높이기 위한 '태그(Tag)' 활용 사례 2가지는?",
    options: [
      "비용 센터별로 태그를 붙여 부서별 요금을 정산한다.",
      "태그를 사용하여 서버의 CPU 속도를 높인다.",
      "환경(Dev/Prod)별로 태그를 구분하여 자원을 검색한다.",
      "태그를 붙이면 보안 그룹 설정이 필요 없어진다.",
      "태그 정보는 인터넷상에 항상 공개된다."
    ],
    answer: [1, 3],
    explanation: "태그는 자원 분류, 비용 분석, 자동화 스크립트 실행 등에 활용됩니다."
  },
  {
    id: 199,
    question: "NHN Cloud 프로젝트에서 자원 생성 한도(Quota)를 초과해야 할 때의 올바른 절차는?",
    options: [
      "고객 센터의 1:1 문의 또는 증설 요청 프로세스를 이용한다.",
      "인스턴스를 강제로 더 많이 만든다.",
      "비밀번호를 바꾼다.",
      "새로운 회원 계정을 하나 더 만든다."
    ],
    answer: 1,
    explanation: "기본 쿼터는 안정적인 운영을 위해 존재하며, 요청 시 심사를 통해 상향이 가능합니다."
  },
  {
    id: 200,
    question: "모니터링 알람(Alarm)을 설정할 때 선택할 수 있는 조건 2가지는?",
    options: [
      "특정 임계치(Threshold) 초과 시",
      "서버의 물리적 먼지 농도 변화",
      "데이터 발생이 일정 기간 없을 때",
      "결제 카드 한도가 줄어들 때",
      "리전의 날씨 변화"
    ],
    answer: [1, 3],
    explanation: "수치 기반 임계치 도달이나 데이터 수집 중단 등을 감지하여 알람을 보낼 수 있습니다."
  },
  {
    id: 201,
    question: "Log & Crash Search에서 수집된 로그 데이터를 외부로 내보내는(Export) 기능에 대한 설명으로 옳은 것은?",
    options: [
      "Object Storage로 로그 파일을 전송하여 장기 보관할 수 있다.",
      "오직 엑셀 파일로만 내보낼 수 있다.",
      "내보내기 기능은 유료 결제 후에만 활성화된다.",
      "내보낸 데이터는 자동으로 암호화가 풀린다."
    ],
    answer: 1,
    explanation: "수집된 대량의 로그를 분석하거나 보관하기 위해 오브젝트 스토리지로 내보낼 수 있습니다."
  },
  {
    id: 202,
    question: "NHN Cloud에서 인스턴스 이미지를 다른 리전으로 복제(Replication)하기 위한 필수 조건 2가지는?",
    options: [
      "소스 이미지에서 스냅샷 또는 이미지를 추출해야 한다.",
      "두 리전의 요금이 반드시 같아야 한다.",
      "대상 리전에 대한 사용 권한이 있어야 한다.",
      "인스턴스가 반드시 '실행 중' 상태여야 한다.",
      "전용선을 통해서만 복제가 가능하다."
    ],
    answer: [1, 3],
    explanation: "이미지를 기반으로 타 리전 복제 기능을 사용하여 전역 인프라를 구축할 수 있습니다."
  },
  {
    id: 203,
    question: "NHN Cloud 블록 스토리지 타입 중 입출력 성능(IOPS)을 보장하기 위해 주로 사용하는 타입은?",
    options: ["SSD 타입", "HDD 타입", "Tape 타입", "CD 타입"],
    answer: 1,
    explanation: "높은 성능이 필요한 데이터베이스나 서비스에는 SSD 타입 스토리지를 사용합니다."
  },
  {
    id: 204,
    question: "VPC 피어링 연결 시 고려해야 할 기술적 제약 사항 2가지는?",
    options: [
      "두 VPC의 IP 대역(CIDR)이 겹치면 연결할 수 없다.",
      "리전이 다르면 피어링 연결이 불가능하다.",
      "피어링 체결 후 라우팅 테이블 설정을 직접 해주어야 한다.",
      "피어링을 맺으면 보안 그룹 설정이 자동으로 해제된다.",
      "피어링은 최대 2개까지만 연결 가능하다."
    ],
    answer: [1, 3],
    explanation: "IP 중복 불가와 라우팅 규칙 수동 추가가 피어링의 핵심 기술 포인트입니다."
  },
  {
    id: 205,
    question: "DNS 서비스에서 도메인을 다른 도메인 이름으로 연결(별칭)할 때 사용하는 레코드 타입은?",
    options: ["CNAME", "A", "MX", "TXT"],
    answer: 1,
    explanation: "CNAME 레코드는 하나의 도메인 별칭을 다른 도메인으로 매핑할 때 사용합니다."
  },
  {
    id: 206,
    question: "RDS 서비스의 고가용성 구성(Multi-AZ)에서 장애 발생 시의 동작 방식 2가지는?",
    options: [
      "대기중인(Standby) 복제본으로 자동 페일오버(Failover)된다.",
      "장애 발생 시 모든 데이터가 삭제된다.",
      "애플리케이션의 접속 주소(Endpoint)는 그대로 유지된다.",
      "사용자가 직접 수동으로 서버를 교체해야 한다.",
      "장애 기간 동안의 요금은 발생하지 않는다."
    ],
    answer: [1, 3],
    explanation: "Multi-AZ 구성은 장애 시 자동으로 예비 서버로 전환되며 엔드포인트가 바뀌지 않아 서비스 연속성을 보장합니다."
  },

  // [영역 4: 결제 및 요금 - 3문제]
  {
    id: 207,
    question: "조직(Organization) 단위의 통합 결제 기능을 사용할 때의 특징은?",
    options: [
      "조직 내 여러 프로젝트의 발생 비용을 합산하여 한 번에 결제할 수 있다.",
      "통합 결제를 하면 모든 서비스가 50% 할인된다.",
      "각 프로젝트 멤버가 비용을 나누어서 낸다.",
      "통합 결제 수단은 오직 계좌 이체만 가능하다."
    ],
    answer: 1,
    explanation: "조직 OWNER는 통합 결제 설정을 통해 조직 내 프로젝트들의 비용 정산을 일원화할 수 있습니다."
  },
  {
    id: 208,
    question: "NHN Cloud 요금 정산 시 '크레딧(Credit)'의 소멸 및 정책에 대한 설명으로 옳은 것 2가지는?",
    options: [
      "부여된 유효 기간이 지나면 사용하지 않아도 소멸한다.",
      "크레딧은 유료 서비스 결제 시 현금보다 늦게 차감된다.",
      "이벤트나 보상으로 지급된 크레딧은 현금으로 환불되지 않는다.",
      "모든 크레딧은 한 번 받으면 영구적으로 유지된다.",
      "타인에게 자유롭게 선물할 수 있다."
    ],
    answer: [1, 3],
    explanation: "크레딧은 기간 제한이 있으며 현금 자산과는 다른 정책을 가집니다."
  },
  {
    id: 209,
    question: "결제 관련 정보를 조회하거나 결제 수단을 관리하기 위해 필요한 IAM 역할은?",
    options: ["BILLING_ADMIN (또는 결제 관리 권한)", "MEMBER", "VIEWER", "NETWORK_ADMIN"],
    answer: 1,
    explanation: "비용 및 결제 정보는 보안이 중요하므로 전용 관리 권한이 부여된 사용자만 접근 가능합니다."
  }
];
