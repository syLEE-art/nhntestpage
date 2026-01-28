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
  // [주제 1: 인프라 구조 - 리전 및 가용 영역]
  {
    id: 1,
    question: "NHN Cloud에서 지리적으로 완전히 분리된 하드웨어 및 네트워크 인프라 단위를 무엇이라 합니까?",
    options: ["프로젝트(Project)", "리전(Region)", "조직(Organization)", "테넌트(Tenant)"],
    answer: 2,
    explanation: "리전은 지리적으로 분리된 인프라의 최상위 단위입니다."
  },
  {
    id: 2,
    question: "하나의 리전 내에서 전력, 냉방 등 인프라가 독립적으로 구성된 물리적 데이터 센터 단위를 무엇이라 합니까?",
    options: ["서비스 존", "보안 구역", "가용 영역(Availability Zone)", "네트워크 피어링"],
    answer: 3,
    explanation: "가용 영역(AZ)은 리전 내에서 독립적인 인프라를 갖춘 최소 단위입니다."
  },
  {
    id: 3,
    question: "NHN Cloud의 리전 선택 시 고려해야 할 사항이 아닌 것은?",
    options: ["사용자와의 물리적 거리", "데이터 보관 관련 법률 요구 사항", "서비스 이용 금액의 차이", "사용자의 개인 이메일 주소"],
    answer: 4,
    explanation: "리전 선택은 지연 시간, 법규, 비용 등을 고려해야 하며 개인 계정 정보와는 무관합니다."
  },
  {
    id: 4,
    question: "고가용성(High Availability) 구성을 위해 권장되는 인프라 배치 방식은?",
    options: ["단일 가용 영역 내에 모든 인스턴스 배치", "여러 가용 영역(Multi-AZ)에 인스턴스 분산 배치", "여러 프로젝트에 하나의 인스턴스 공유", "모든 자원을 하나의 리전에만 고정"],
    answer: 2,
    explanation: "장애 내성을 높이기 위해 여러 AZ에 자원을 분산하는 것이 기본 원칙입니다."
  },
  {
    id: 5,
    question: "NHN Cloud의 한국 리전(평촌/광주 등) 중 국가 AI 데이터 센터를 포함하는 리전은?",
    options: ["Korea (Pangyo) 리전", "Korea (Gwangju) 리전", "Japan (Tokyo) 리전", "USA (California) 리전"],
    answer: 2,
    explanation: "NHN Cloud는 광주에 국가 AI 데이터 센터를 구축하여 운영하고 있습니다."
  },

  // [주제 2: 자원 관리 체계 - 조직 및 프로젝트]
  {
    id: 6,
    question: "NHN Cloud에서 자원을 생성하고 관리하는 가장 기본적인 단위는?",
    options: ["조직", "프로젝트", "서비스 그룹", "사용자 계정"],
    answer: 2,
    explanation: "모든 클라우드 자원(인스턴스, 네트워크 등)은 프로젝트 내에서 생성됩니다."
  },
  {
    id: 7,
    question: "여러 프로젝트를 그룹화하여 통합 관리하고 통합 결제를 가능하게 하는 상위 개념은?",
    options: ["리전", "워크스페이스", "조직(Organization)", "엔터프라이즈 계정"],
    answer: 3,
    explanation: "조직은 여러 프로젝트를 묶어서 관리하는 상위 계층입니다."
  },
  {
    id: 8,
    question: "프로젝트 내에서 자원을 삭제하지 않고 일시적으로 서비스를 중단하려면 무엇을 해야 합니까?",
    options: ["프로젝트 삭제", "서비스 활성화 해제", "회원 탈퇴", "조직 해체"],
    answer: 2,
    explanation: "서비스 활성화를 해제하면 해당 서비스 기능을 더 이상 사용하지 않도록 설정할 수 있습니다."
  },
  {
    id: 9,
    question: "NHN Cloud 프로젝트 이름은 생성 후 변경이 가능합니까?",
    options: ["아니오, 불가능합니다.", "예, 언제든지 가능합니다.", "관리자에게 문의해야만 가능합니다.", "서비스를 모두 삭제한 후에만 가능합니다."],
    answer: 2,
    explanation: "프로젝트 이름은 생성 이후에도 콘솔 설정에서 변경할 수 있습니다."
  },
  {
    id: 10,
    question: "조직 관리자가 수행할 수 없는 업무는?",
    options: ["조직 내 프로젝트 생성", "통합 결제 수단 관리", "조직 멤버 초대", "다른 사용자의 개인 이메일 비밀번호 변경"],
    answer: 4,
    explanation: "클라우드 관리자는 서비스 내 권한만 제어할 뿐, 개인 계정 정보(비밀번호 등)는 제어할 수 없습니다."
  },

  // [주제 3: 권한 관리 - IAM 및 멤버]
  {
    id: 11,
    question: "프로젝트에 멤버를 추가할 때 부여하는 권한 종류가 아닌 것은?",
    options: ["ADMIN", "MEMBER", "VIEWER", "GUEST"],
    answer: 4,
    explanation: "기본 권한은 관리자(ADMIN), 멤버(MEMBER), 관찰자(VIEWER)로 구성됩니다."
  },
  {
    id: 12,
    question: "자원을 생성하거나 수정할 수는 없지만, 설정 내용을 조회만 할 수 있는 권한은?",
    options: ["ADMIN", "MEMBER", "VIEWER", "EDITOR"],
    answer: 3,
    explanation: "VIEWER 권한은 읽기 전용 권한입니다."
  },
  {
    id: 13,
    question: "특정 서비스(예: Object Storage)에 대해서만 세부적인 권한을 제어하고 싶을 때 사용하는 기능은?",
    options: ["전체 관리 권한", "IAM(Identity and Access Management)", "조직 권한", "비밀번호 정책"],
    answer: 2,
    explanation: "IAM을 통해 서비스별, 역할별로 세밀한 권한 제어가 가능합니다."
  },
  {
    id: 14,
    question: "NHN Cloud 콘솔 로그인 시 보안을 강화하기 위해 제공하는 기능은?",
    options: ["2단계 인증(2FA/MFA)", "자동 로그인", "소셜 공유 기능", "익명 로그인"],
    answer: 1,
    explanation: "OTP 등을 활용한 2단계 인증으로 계정 보안을 강화할 수 있습니다."
  },
  {
    id: 15,
    question: "프로젝트 멤버가 퇴사한 경우 가장 먼저 취해야 할 보안 조치는?",
    options: ["프로젝트 삭제", "멤버 권한 회수 또는 삭제", "결제 수단 변경", "고객 센터 전화"],
    answer: 2,
    explanation: "불필요한 접근을 막기 위해 멤버 목록에서 해당 계정을 삭제하거나 권한을 회수해야 합니다."
  },

  // [주제 4: 서비스 이용 일반 및 결제]
  {
    id: 16,
    question: "NHN Cloud 서비스 이용 요금은 어떤 방식으로 산정됩니까?",
    options: ["정액제 (월 고정)", "사용량 기반 종량제", "무료 (전면 무료)", "연간 선불제 전용"],
    answer: 2,
    explanation: "대부분의 클라우드 서비스는 실제 사용한 시간 또는 양에 따라 요금이 책정됩니다."
  },
  {
    id: 17,
    question: "현재 사용 중인 자원의 실시간 예상 요금을 확인할 수 있는 곳은?",
    options: ["고객 센터 공지사항", "NHN Cloud 콘솔 내 결제/비용 관리", "개인 이메일함", "서버 내부 로그"],
    answer: 2,
    explanation: "콘솔의 결제 관리 메뉴에서 이용 내역과 예상 요금을 확인할 수 있습니다."
  },
  {
    id: 18,
    question: "무료 이용 한도(Free Tier)를 초과하여 사용한 경우 어떻게 됩니까?",
    options: ["서비스가 즉시 삭제됨", "초과분만큼 요금이 청구됨", "계정이 영구 정지됨", "자동으로 최저 사양으로 변경됨"],
    answer: 2,
    explanation: "무료 한도를 초과하면 등록된 결제 수단으로 요금이 발생합니다."
  },
  {
    id: 19,
    question: "NHN Cloud 서비스를 API를 통해 제어하기 위해 필요한 정보는?",
    options: ["AppKey 및 SecretKey", "은행 계좌 번호", "사용자 집 주소", "모니터 해상도 정보"],
    answer: 1,
    explanation: "API 호출 시 인증을 위해 AppKey와 SecretKey를 주로 사용합니다."
  },
  {
    id: 20,
    question: "프로젝트를 삭제하면 해당 프로젝트 내의 자원들은 어떻게 됩니까?",
    options: ["영구히 보관됨", "모두 즉시 삭제됨", "다른 프로젝트로 자동 이전됨", "사용자의 PC로 다운로드됨"],
    answer: 2,
    explanation: "프로젝트를 삭제하면 그 안에 포함된 모든 인스턴스, 데이터 등이 함께 영구 삭제되므로 주의해야 합니다."
  },

  // [주제 5: 서비스 카테고리 이해]
  {
    id: 21,
    question: "가상 서버를 생성하고 운영할 수 있는 NHN Cloud 서비스는?",
    options: ["Instance", "Storage", "Database", "Security"],
    answer: 1,
    explanation: "Instance 서비스는 가상 서버(Compute)를 제공합니다."
  },
  {
    id: 22,
    question: "웹 서비스의 부하를 분산하기 위해 사용하는 네트워크 서비스는?",
    options: ["VPC", "Load Balancer", "DNS", "Floating IP"],
    answer: 2,
    explanation: "Load Balancer는 트래픽을 여러 서버로 나누어 전달하는 역할을 합니다."
  },
  {
    id: 23,
    question: "비정형 데이터를 대용량으로 저장하고 URL을 통해 접근 가능한 서비스는?",
    options: ["Block Storage", "Object Storage", "NAS", "MySQL"],
    answer: 2,
    explanation: "Object Storage는 이미지, 동영상 등 파일 형태의 비정형 데이터를 저장하는 데 최적화되어 있습니다."
  },
  {
    id: 24,
    question: "NHN Cloud에서 클라우드 환경 내 독립된 가상 네트워크를 구축하는 기능은?",
    options: ["VPC (Virtual Private Cloud)", "Internet Gateway", "Route Table", "Direct Connect"],
    answer: 1,
    explanation: "VPC는 사용자만의 논리적으로 격리된 가상 네트워크 공간입니다."
  },
  {
    id: 25,
    question: "NHN Cloud에서 제공하는 관리형 데이터베이스 서비스의 명칭은?",
    options: ["RDS (Relational Database Service)", "RDS for MySQL/MariaDB", "Cloud Database", "SQL Server Service"],
    answer: 2,
    explanation: "NHN Cloud는 관리형 DB 서비스로 RDS for MySQL 등을 제공합니다."
  },

  // ... (지면 관계상 26~50번은 개념 확장을 위해 유사한 변형 문제 및 심화 내용으로 구성됩니다)
  {
    id: 26,
    question: "콘솔에 접속하지 않고 CLI 환경에서 자원을 관리할 때 사용하는 인증 방식은?",
    options: ["ID/PW 입력", "API 보안 키(Access/Secret Key)", "생체 인증", "공인 인증서"],
    answer: 2,
    explanation: "CLI나 API 접근 시에는 보안 키를 통해 인증을 수행합니다."
  },
  {
    id: 27,
    question: "조직 내에서 비용을 절감하기 위해 권장되는 작업은?",
    options: ["사용하지 않는 인스턴스 반납", "모든 멤버에게 관리자 권한 부여", "백업 기능 해제", "보안 서비스 로그 끄기"],
    answer: 1,
    explanation: "클라우드 비용 효율화를 위해 미사용 자원은 즉시 삭제하거나 반납해야 합니다."
  },
  {
    id: 28,
    question: "가용 영역(AZ) 간 데이터 전송 시 비용이 발생할 수 있습니까?",
    options: ["예", "아니오", "처음 한 번만 발생", "가져올 때만 발생"],
    answer: 1,
    explanation: "일반적으로 리전 내 AZ 간 통신에는 네트워크 전송 비용이 발생할 수 있습니다."
  },
  {
    id: 29,
    question: "NHN Cloud에서 공공 기관 전용 클라우드 서비스를 제공합니까?",
    options: ["예, 공공 리전이 별도로 존재함", "아니오, 일반 리전만 존재함", "공공 기관은 가입이 불가능함", "해외 리전에서만 가능함"],
    answer: 1,
    explanation: "보안 가이드를 준수하는 공공 전용 리전을 운영하고 있습니다."
  },
  {
    id: 30,
    question: "다음 중 NHN Cloud의 고객 지원 채널이 아닌 것은?",
    options: ["온라인 1:1 문의", "사용 가이드 문서", "전화 기술 상담", "개인 블로그 댓글"],
    answer: 4,
    explanation: "공식 고객 센터와 가이드 문서를 통해 지원을 받을 수 있습니다."
  },
  
  // [주제 6: 인스턴스(Instance) 서비스]
  {
    id: 31,
    question: "NHN Cloud 인스턴스를 구성하는 요소가 아닌 것은?",
    options: ["이미지(Image)", "타입(Flavor)", "키페어(Key-pair)", "도메인 이름(Domain Name)"],
    answer: 4,
    explanation: "인스턴스 구성 요소는 이미지, 타입, 가용성 영역, 키페어, 보안 그룹, 네트워크입니다. 도메인 이름은 DNS 서비스와 관련됩니다."
  },
  {
    id: 32,
    question: "NHN Cloud에서 인스턴스 접속 시 사용하는 인증 방식으로 권장되는 것은?",
    options: ["아이디/비밀번호 입력", "키페어(SSH 공개 키/개인 키)", "휴대폰 본인 인증", "공인 인증서"],
    answer: 2,
    explanation: "보안을 위해 아이디/비밀번호 대신 PKI 기반의 키페어를 사용하여 인스턴스에 접속합니다."
  },
  {
    id: 33,
    question: "인스턴스가 중지된 상태에서 90일 동안 적용되는 요금 할인율은?",
    options: ["50%", "70%", "90%", "100% (무료)"],
    answer: 3,
    explanation: "인스턴스가 중지되면 90일 동안 90% 할인된 금액이 적용되며, 90일 초과 시 정상 요금으로 전환됩니다."
  },
  {
    id: 34,
    question: "인스턴스 생성 후 변경할 수 없는 속성은?",
    options: ["인스턴스 타입(Flavor)", "보안 그룹", "가용성 영역(AZ)", "네트워크 서브넷"],
    answer: 3,
    explanation: "이미지와 가용성 영역은 인스턴스 생성 이후 변경할 수 없습니다."
  },
  {
    id: 35,
    question: "인스턴스의 네트워크 서브넷을 변경하려면 인스턴스가 어떤 상태여야 합니까?",
    options: ["실행 중(Running)", "중지(Stopped)", "일시정지(Paused)", "재부팅 중(Rebooting)"],
    answer: 2,
    explanation: "인스턴스의 네트워크 서브넷은 인스턴스가 중지된 상태에서만 변경할 수 있습니다."
  },

  // [주제 7: VPC 및 네트워크]
  {
    id: 36,
    question: "VPC(Virtual Private Cloud)에 대한 설명으로 올바르지 않은 것은?",
    options: ["논리적으로 격리된 가상 사설 네트워크이다", "인터넷에서 직접 액세스가 가능하다", "독립된 서브넷과 라우팅 테이블을 구성할 수 있다", "프라이빗 네트워크이다"],
    answer: 2,
    explanation: "VPC는 프라이빗 네트워크이므로 인터넷에서 직접 액세스할 수 없습니다. 인터넷 게이트웨이를 통해 연결해야 합니다."
  },
  {
    id: 37,
    question: "VPC 내 인스턴스가 인터넷과 통신하기 위해 필요한 것은?",
    options: ["추가 블록 스토리지", "인터넷 게이트웨이", "내부 DNS", "백업 정책"],
    answer: 2,
    explanation: "인터넷 게이트웨이 없이는 VPC 내 모든 인스턴스가 인터넷에 연결되지 않습니다."
  },
  {
    id: 38,
    question: "외부에서 인스턴스에 직접 접속하기 위해 할당해야 하는 IP는?",
    options: ["프라이빗 IP", "플로팅 IP(Floating IP)", "게이트웨이 IP", "브로드캐스트 IP"],
    answer: 2,
    explanation: "플로팅 IP는 공인 IP 역할을 하며, 인스턴스와 1:1로 연결하여 외부 접속을 가능하게 합니다."
  },
  {
    id: 39,
    question: "서로 다른 VPC 간 통신을 가능하게 하는 기능은?",
    options: ["서브넷 분할", "VPC 피어링(Peering)", "보안 그룹 확장", "라우팅 테이블 삭제"],
    answer: 2,
    explanation: "VPC 피어링을 사용하면 서로 다른 VPC 간에 플로팅 IP 없이도 통신이 가능합니다."
  },
  {
    id: 40,
    question: "VPC 네트워크 주소를 기술할 때 사용하는 표기법은?",
    options: ["MAC 주소", "CIDR Notation", "UUID", "Base64 인코딩"],
    answer: 2,
    explanation: "VPC 네트워크는 CIDR(Classless Inter-Domain Routing) 표기법을 사용하여 기술합니다."
  },

  // [주제 8: 보안 그룹 및 접근 제어]
  {
    id: 41,
    question: "인스턴스로 유입되는 네트워크 트래픽을 제어하는 가상 방화벽 기능은?",
    options: ["키페어", "보안 그룹(Security Group)", "이미지", "스냅샷"],
    answer: 2,
    explanation: "보안 그룹은 인스턴스의 송수신 트래픽을 제어하여 인스턴스를 보호하는 가상 방화벽입니다."
  },
  {
    id: 42,
    question: "Linux 인스턴스에 SSH로 접속하기 위해 보안 그룹에서 허용해야 하는 기본 포트는?",
    options: ["21", "22", "80", "443"],
    answer: 2,
    explanation: "SSH 접속을 위해서는 기본적으로 22번 포트를 보안 그룹에서 허용해야 합니다."
  },
  {
    id: 43,
    question: "Network ACL과 보안 그룹 중 트래픽에 먼저 적용되는 것은?",
    options: ["보안 그룹", "Network ACL", "동시에 적용", "사용자 선택에 따름"],
    answer: 2,
    explanation: "유입/유출 트래픽에서 Network ACL 설정이 보안 그룹 설정보다 먼저 적용됩니다."
  },

  // [주제 9: 스토리지]
  {
    id: 44,
    question: "같은 가용성 영역 내 인스턴스 간에만 공유할 수 있는 스토리지는?",
    options: ["Object Storage", "블록 스토리지(Block Storage)", "Archive Storage", "CDN"],
    answer: 2,
    explanation: "블록 스토리지는 같은 가용성 영역에서만 인스턴스 간 공유가 가능하며, 서로 다른 AZ 간에는 공유할 수 없습니다."
  },
  {
    id: 45,
    question: "인스턴스 장애 시 데이터 복구를 위해 권장되는 스토리지 사용 방법은?",
    options: ["루트 블록 스토리지에 모든 데이터 저장", "추가 블록 스토리지를 분리하여 사용", "로컬 디스크만 사용", "메모리에 데이터 보관"],
    answer: 2,
    explanation: "추가 블록 스토리지를 사용하면 장애 시 해당 스토리지만 해제하여 다른 인스턴스에 연결해 쉽게 복구할 수 있습니다."
  },
  {
    id: 46,
    question: "인스턴스의 루트 블록 스토리지 크기는 생성 후 변경이 가능합니까?",
    options: ["예, 언제든지 가능합니다", "아니오, 변경할 수 없습니다", "중지 상태에서만 가능합니다", "관리자 요청 시에만 가능합니다"],
    answer: 2,
    explanation: "인스턴스의 루트 블록 스토리지 크기는 변경할 수 없으며, 공간이 부족하면 추가 블록 스토리지를 사용해야 합니다."
  },

  // [주제 10: 이미지 및 고급 기능]
  {
    id: 47,
    question: "인스턴스의 운영체제를 담고 있는 가상 디스크를 무엇이라 합니까?",
    options: ["플레이버(Flavor)", "이미지(Image)", "스냅샷(Snapshot)", "볼륨(Volume)"],
    answer: 2,
    explanation: "이미지는 인스턴스의 운영체제를 담고 있는 가상 디스크입니다."
  },
  {
    id: 48,
    question: "인스턴스 첫 번째 부팅 후 자동으로 실행되는 초기화 스크립트를 설정하는 기능은?",
    options: ["키페어 설정", "사용자 스크립트(User Script)", "보안 그룹 규칙", "라우팅 테이블"],
    answer: 2,
    explanation: "사용자 스크립트는 인스턴스의 첫 번째 부팅이 완료된 후 cloud-init 등에 의해 자동 실행됩니다."
  },
  {
    id: 49,
    question: "동일 배치 정책에 할당된 인스턴스들이 배치되는 방식은?",
    options: ["같은 하이퍼바이저에 배치", "서로 다른 하이퍼바이저에 분산 배치", "같은 서브넷에만 배치", "같은 보안 그룹에 자동 할당"],
    answer: 2,
    explanation: "배치 정책을 설정하면 동일 정책에 할당된 인스턴스들은 장애 격리를 위해 서로 다른 하이퍼바이저에 생성됩니다."
  },
  
  {
    id: 50,
    question: "NHN Cloud의 모토와 가장 가까운 설명은?",
    options: ["모두를 위한 AI 클라우드", "글로벌 기술 리더십과 안정적 인프라", "최저가 하드웨어 판매", "단순 웹 호스팅 전문"],
    answer: 2,
    explanation: "NHN Cloud는 안정적인 인프라와 기술력을 바탕으로 기업용 클라우드 서비스를 제공합니다."
  }
  const additionalQuizData = [
  // [영역 1: 클라우드 개념 및 보안 - 9문제]
  {
    id: 51,
    question: "클라우드 컴퓨팅의 특징 중 하나로, 필요할 때 자원을 즉시 할당받고 반납할 수 있는 특성은?",
    options: ["자기 서비스(Self-Service)", "주문형 셀프 서비스(On-demand Self-service)", "리소스 풀링(Resource Pooling)", "고정 비용 지출"],
    answer: 2,
    explanation: "사용자가 관리자의 개입 없이 필요할 때 직접 자원을 구성하는 것을 주문형 셀프 서비스라고 합니다."
  },
  {
    id: 52,
    question: "NHN Cloud와 고객이 보안 책임을 나누는 모델의 명칭은?",
    options: ["보안 위임 모델", "책임 공유 모델(Shared Responsibility Model)", "단독 책임 모델", "인프라 보안 모델"],
    answer: 2,
    explanation: "클라우드 공급자는 인프라를, 고객은 그 위의 데이터와 설정을 보호하는 책임 공유 모델을 따릅니다."
  },
  {
    id: 53,
    question: "책임 공유 모델에서 '물리적 데이터 센터의 보안'은 누구의 책임입니까?",
    options: ["고객(Customer)", "정부", "NHN Cloud", "네트워크 통신사"],
    answer: 3,
    explanation: "물리적 인프라, 하드웨어, 물리 센터 보안은 클라우드 공급자인 NHN Cloud의 책임입니다."
  },
  {
    id: 54,
    question: "책임 공유 모델에서 '인스턴스 내부의 운영체제(OS) 패치'는 누구의 책임입니까?",
    options: ["NHN Cloud", "고객(Customer)", "OS 제조사", "IDC 관리자"],
    answer: 2,
    explanation: "가상 서버(Instance) 내부의 OS 관리, 데이터, 애플리케이션 보안은 고객의 책임입니다."
  },
  {
    id: 55,
    question: "IaaS(Infrastructure as a Service)에 대한 설명으로 옳은 것은?",
    options: ["완성된 소프트웨어를 웹으로 이용함", "서버, 네트워크, 스토리지 등 인프라 자원을 제공함", "개발 환경만 제공하고 서버 제어는 불가능함", "데이터베이스 서비스만 제공함"],
    answer: 2,
    explanation: "IaaS는 컴퓨팅 인프라(서버, 네트워크 등)를 서비스 형태로 제공하는 것입니다."
  },
  {
    id: 56,
    question: "여러 사용자가 물리적 자원을 공유하지만 논리적으로 격리되어 사용하는 클라우드 특성은?",
    options: ["단독 리스(Single-lease)", "멀티 테넌시(Multi-tenancy)", "물리 격리", "폐쇄형 클라우드"],
    answer: 2,
    explanation: "멀티 테넌시는 다수의 고객이 자원 풀을 공유하면서도 논리적으로는 분리되어 사용하는 것을 뜻합니다."
  },
  {
    id: 57,
    question: "NHN Cloud 가이드에서 권장하는 보안 설정이 아닌 것은?",
    options: ["루트 계정의 상시 사용", "MFA(2단계 인증) 활성화", "최소 권한 부여 원칙 준수", "주기적인 비밀번호 변경"],
    answer: 1,
    explanation: "루트 계정은 관리에만 최소한으로 사용하고, 평시에는 별도 IAM 계정 사용을 권장합니다."
  },
  {
    id: 58,
    question: "퍼블릭 클라우드의 장점으로 보기 어려운 것은?",
    options: ["초기 인프라 구축 비용 절감", "유연한 자원 확장성", "물리 서버의 직접 소유 및 통제", "빠른 서비스 배포"],
    answer: 3,
    explanation: "퍼블릭 클라우드는 자원을 빌려 쓰는 것이므로 물리 서버를 직접 소유하지는 않습니다."
  },
  {
    id: 59,
    question: "SaaS(Software as a Service)의 예시로 NHN Cloud에서 제공하는 서비스는?",
    options: ["NHN Dooray!", "Instance", "VPC", "Block Storage"],
    answer: 1,
    explanation: "협업 도구인 Dooray!는 대표적인 SaaS 형태의 서비스입니다."
  },

  // [영역 2: NHN Cloud 서비스 특징 - 20문제]
  {
    id: 60,
    question: "NHN Cloud의 '리소스크기 제한 정책(Quota)'에 대한 설명으로 옳은 것은?",
    options: ["모든 사용자는 무제한으로 자원을 생성할 수 있다.", "프로젝트별로 생성 가능한 자원의 최대치가 정해져 있다.", "한 번 설정된 쿼터는 절대 변경할 수 없다.", "유료 결제 고객에게는 쿼터가 적용되지 않는다."],
    answer: 2,
    explanation: "안정적인 자원 배분을 위해 프로젝트별로 리소스 제한(Quota)이 설정되어 있으며 요청 시 증설 가능합니다."
  },
  {
    id: 61,
    question: "NHN Cloud에서 가상 서버 생성 시 사용되는 템플릿 이미지를 무엇이라 합니까?",
    options: ["스냅샷", "블록", "머신 이미지(Image)", "백업"],
    answer: 3,
    explanation: "운영체제와 기본 설정이 담긴 상태를 이미지(Image)라고 부릅니다."
  },
  {
    id: 62,
    question: "네트워크 서비스 중, 공용 인터넷망을 통해 외부와 통신하기 위해 인스턴스에 할당하는 IP는?",
    options: ["고정 IP", "내부 IP", "플로팅 IP(Floating IP)", "서브넷 IP"],
    answer: 3,
    explanation: "외부 통신을 위해 유동적으로 할당/해제 가능한 공인 IP를 플로팅 IP라고 합니다."
  },
  {
    id: 63,
    question: "NHN Cloud의 인스턴스 타입 중 특정 자원(CPU, 메모리 등)이 고정적으로 할당되는 타입은?",
    options: ["Shared 타입", "Dedicated 타입", "General 타입", "Low 타입"],
    answer: 2,
    explanation: "Dedicated 타입은 물리 자원을 전용으로 할당받아 성능 간섭이 적습니다."
  },
  {
    id: 64,
    question: "인스턴스 정지(Stop) 상태일 때 요금이 청구되는 항목은?",
    options: ["CPU 사용료", "메모리 사용료", "연결된 블록 스토리지 및 플로팅 IP", "네트워크 트래픽"],
    answer: 3,
    explanation: "인스턴스가 정지되어도 할당된 스토리지 공간과 예약된 IP에 대해서는 요금이 발생합니다."
  },
  {
    id: 65,
    question: "스토리지 서비스 중 여러 인스턴스가 동시에 마운트하여 파일을 공유할 수 있는 것은?",
    options: ["Block Storage", "NAS", "Local Storage", "Instance Storage"],
    answer: 2,
    explanation: "NAS는 네트워크 결합 스토리지로, 여러 서버에서 동시 접근이 가능합니다."
  },
  {
    id: 66,
    question: "VPC 내의 인스턴스에 대한 인바운드/아웃바운드 트래픽을 제어하는 보안 기능은?",
    options: ["방화벽 서비스", "보안 그룹(Security Group)", "WAF", "네트워크 ACL"],
    answer: 2,
    explanation: "보안 그룹은 인스턴스 단위로 적용되는 가상 방화벽 역할을 합니다."
  },
  {
    id: 67,
    question: "부하 분산 서비스(Load Balancer)가 지원하는 프로토콜이 아닌 것은?",
    options: ["HTTP", "HTTPS", "TCP", "ICMP"],
    answer: 4,
    explanation: "로드 밸런서는 주로 L4(TCP/UDP), L7(HTTP/HTTPS) 계층의 트래픽을 분산합니다."
  },
  {
    id: 68,
    question: "Object Storage에서 데이터를 식별하는 단위는?",
    options: ["파일(File)", "블록(Block)", "객체(Object)", "레코드(Record)"],
    answer: 3,
    explanation: "객체 스토리지는 데이터를 '객체' 단위로 관리하며 고유한 키(Key)를 가집니다."
  },
  {
    id: 69,
    question: "Auto Scaling 기능의 주요 목적은?",
    options: ["보안 강화", "비용 무조건 고정", "트래픽 변화에 따른 자동 자원 확장/축소", "데이터 백업 자동화"],
    answer: 3,
    explanation: "Auto Scaling은 부하에 따라 서버 수를 자동으로 조절하여 서비스 가용성을 유지합니다."
  },
  {
    id: 70,
    question: "NHN Cloud에서 제공하는 관리형 관계형 데이터베이스(RDS)가 지원하지 않는 엔진은?",
    options: ["MySQL", "MariaDB", "PostgreSQL", "Oracle"],
    answer: 4,
    explanation: "NHN Cloud RDS는 현재 MySQL, MariaDB, PostgreSQL 등을 관리형으로 제공합니다."
  },
  {
    id: 71,
    question: "클라우드 자원의 성능 지표(CPU 사용률 등)를 수집하고 알람을 설정하는 서비스는?",
    options: ["CloudTrail", "Monitoring", "Log & Crash Search", "Security Inspector"],
    answer: 2,
    explanation: "Monitoring 서비스는 리소스의 상태를 실시간으로 감시합니다."
  },
  {
    id: 72,
    question: "사용자가 소유한 도메인 이름을 NHN Cloud 자원의 IP 주소와 연결해주는 서비스는?",
    options: ["DNS", "VPC", "Load Balancer", "Route Table"],
    answer: 1,
    explanation: "DNS(Domain Name System)는 도메인을 IP로 변환하여 접속을 도와줍니다."
  },
  {
    id: 73,
    question: "NHN Cloud 서비스 이용 중 발생하는 로그를 수집하고 검색할 수 있는 서비스는?",
    options: ["Object Storage", "Log & Crash Search", "Data Hotel", "Notification"],
    answer: 2,
    explanation: "Log & Crash Search를 통해 앱 로그 및 시스템 로그를 통합 관리할 수 있습니다."
  },
  {
    id: 74,
    question: "대량의 메시지(SMS, 알림톡 등)를 발송할 수 있는 카테고리는?",
    options: ["Compute", "Network", "Notification", "Application Service"],
    answer: 3,
    explanation: "Notification 카테고리에서 메시지 발송 관련 서비스를 제공합니다."
  },
  {
    id: 75,
    question: "콘솔 웹 화면을 통하지 않고 프로그래밍 방식으로 서비스를 제어하기 위해 제공되는 것은?",
    options: ["REST API", "HTML 소스", "PDF 매뉴얼", "전화 상담"],
    answer: 1,
    explanation: "클라우드 서비스는 대부분 REST API를 통해 자동화된 제어를 지원합니다."
  },
  {
    id: 76,
    question: "서비스 장애 발생 시 보상 기준이 명시된 문서를 무엇이라 합니까?",
    options: ["NDA", "SLA(Service Level Agreement)", "ISO 인증서", "이용 약관"],
    answer: 2,
    explanation: "SLA는 서비스 가용성 보장 수준과 그에 따른 보상 규정을 담고 있습니다."
  },
  {
    id: 77,
    question: "데이터베이스의 특정 시점 상태를 저장하여 나중에 복구할 수 있게 하는 기능은?",
    options: ["미러링", "백업/스냅샷", "인덱싱", "샤딩"],
    answer: 2,
    explanation: "스냅샷이나 백업 기능을 통해 특정 시점으로 자원을 복구할 수 있습니다."
  },
  {
    id: 78,
    question: "보안 그룹(Security Group) 규칙 중 모든 IP 주소를 의미하는 표기법은?",
    options: ["127.0.0.1/32", "0.0.0.0/0", "192.168.0.1/24", "255.255.255.255"],
    answer: 2,
    explanation: "0.0.0.0/0은 모든 네트워크 대역을 의미하는 CIDR 표기입니다."
  },
  {
    id: 79,
    question: "NHN Cloud에서 하이브리드 클라우드 구성을 위해 로컬 IDC와 클라우드를 전용선으로 연결하는 서비스는?",
    options: ["Direct Connect", "VPC Peering", "Internet Gateway", "VPN"],
    answer: 1,
    explanation: "Direct Connect는 전용 회선을 통해 안정적인 고속 연결을 제공합니다."
  },

  // [영역 3: NHN Cloud 서비스를 사용하기 위한 기술 영역 - 24문제]
  {
    id: 80,
    question: "NHN Cloud 계정 생성 후 가장 먼저 생성해야 하는 관리 단위는?",
    options: ["인스턴스", "조직(Organization)", "VPC", "플로팅 IP"],
    answer: 2,
    explanation: "자원 관리를 위해 프로젝트를 담을 '조직'을 먼저 구성해야 합니다."
  },
  {
    id: 81,
    question: "특정 프로젝트에 새로운 사용자를 초대하기 위해 필요한 정보는?",
    options: ["사용자의 NHN Cloud ID(이메일)", "사용자의 집 주소", "사용자의 주민등록번호", "사용자의 은행 계좌"],
    answer: 1,
    explanation: "NHN Cloud 가입 시 사용한 이메일 계정을 통해 멤버 초대가 가능합니다."
  },
  {
    id: 82,
    question: "IAM에서 특정 사용자에게 '프로젝트 내 모든 자원을 관리'할 수 있게 부여하는 권한은?",
    options: ["VIEWER", "MEMBER", "ADMIN", "OWNER"],
    answer: 3,
    explanation: "ADMIN 권한은 해당 프로젝트 내 자원에 대한 모든 관리 권한을 가집니다."
  },
  {
    id: 83,
    question: "부서별로 비용을 별도로 정산하고 싶을 때 권장되는 구조는?",
    options: ["하나의 프로젝트에 모든 부서 자원 생성", "부서별로 별도의 프로젝트 생성", "계정을 여러 개 생성", "리전을 다르게 설정"],
    answer: 2,
    explanation: "프로젝트 단위로 이용 내역이 집계되므로 부서별 프로젝트 분리가 효율적입니다."
  },
  {
    id: 84,
    question: "VPC 내부에서 목적지 IP에 따라 트래픽이 전달될 경로를 지정하는 설정은?",
    options: ["인터넷 게이트웨이", "라우팅 테이블(Route Table)", "보안 그룹", "서브넷"],
    answer: 2,
    explanation: "라우팅 테이블은 네트워크 트래픽의 경로를 결정하는 규칙 세트입니다."
  },
  {
    id: 85,
    question: "프라이빗 서브넷에 있는 인스턴스가 인터넷에 접속(아웃바운드)하기 위해 필요한 서비스는?",
    options: ["NAT 게이트웨이", "VPC 피어링", "로드 밸런서", "서브넷 마스크"],
    answer: 1,
    explanation: "NAT 게이트웨이를 이용하면 외부에서 접근은 차단하면서 내부에서 인터넷 접속은 가능하게 할 수 있습니다."
  },
  {
    id: 86,
    question: "두 개의 서로 다른 VPC를 연결하여 내부 IP로 통신하게 하는 기능은?",
    options: ["VPC Peering", "Direct Connect", "Internet Gateway", "DHCP Options"],
    answer: 1,
    explanation: "VPC 피어링은 두 VPC 간의 트래픽을 비공개적으로 라우팅할 수 있게 합니다."
  },
  {
    id: 87,
    question: "인스턴스에 접속하기 위해 SSH 키 페어(Key Pair)를 생성한 경우, 비밀키(.pem)를 분실하면 어떻게 됩니까?",
    options: ["고객센터에서 복구해준다.", "다시 다운로드 받을 수 있다.", "다시 다운로드 받을 수 없으며 접근이 불가능해질 수 있다.", "비밀번호로 자동 전환된다."],
    answer: 3,
    explanation: "키 페어의 비밀키는 생성 시점에만 다운로드 가능하며, 분실 시 보안상 재발급이 불가합니다."
  },
  {
    id: 88,
    question: "콘솔에서 인스턴스를 삭제(Terminate)할 때 함께 삭제되도록 설정할 수 있는 항목은?",
    options: ["플로팅 IP", "루트 블록 스토리지", "로드 밸런서", "VPC 전체"],
    answer: 2,
    explanation: "인스턴스 삭제 시 연결된 루트 볼륨(스토리지)을 함께 삭제하도록 옵션을 선택할 수 있습니다."
  },
  {
    id: 89,
    question: "서브넷(Subnet) 생성 시 설정해야 하는 필수 정보는?",
    options: ["IP 대역(CIDR)", "서버 성능", "운영체제 종류", "백업 주기"],
    answer: 1,
    explanation: "서브넷 생성 시 해당 네트워크가 사용할 IP 주소 범위를 지정해야 합니다."
  },
  {
    id: 90,
    question: "NHN Cloud 콘솔의 '대시보드'에서 수행할 수 있는 작업은?",
    options: ["전체 자원 현황 모니터링", "회원 비밀번호 초기화", "신용카드 번호 수정", "서버 코드 코딩"],
    answer: 1,
    explanation: "대시보드는 프로젝트 내 주요 자원의 상태와 요약을 한눈에 보여줍니다."
  },
  {
    id: 91,
    question: "자원 식별을 위해 사용자 정의 키와 값을 부여하는 기능은?",
    options: ["이름(Name)", "태그(Tag)", "아이디(ID)", "설명(Description)"],
    answer: 2,
    explanation: "태그를 활용하면 자원을 논리적으로 분류하고 관리하기 용이합니다."
  },
  {
    id: 92,
    question: "보안 그룹(Security Group) 규칙 설정 시 'Stateful' 특성의 의미는?",
    options: ["인바운드가 허용되면 아웃바운드 응답은 자동으로 허용됨", "인바운드와 아웃바운드 규칙을 항상 동일하게 짜야 함", "상태 정보가 저장되지 않음", "한 번 설정하면 바꿀 수 없음"],
    answer: 1,
    explanation: "Stateful은 요청이 허용되면 그에 대한 응답 트래픽은 반대 방향 규칙과 상관없이 허용됨을 뜻합니다."
  },
  {
    id: 93,
    question: "NHN Cloud에서 자원을 생성할 수 있는 권한을 가진 최소 IAM 역할은?",
    options: ["VIEWER", "MEMBER", "ADMIN", "GUEST"],
    answer: 2,
    explanation: "MEMBER 이상 권한이 있어야 자원을 생성하거나 수정할 수 있습니다."
  },
  {
    id: 94,
    question: "실수로 자원이 삭제되는 것을 방지하기 위해 설정하는 기능은?",
    options: ["삭제 보호(Termination Protection)", "자동 백업", "스냅샷", "읽기 전용 모드"],
    answer: 1,
    explanation: "삭제 보호 설정을 활성화하면 실수로 삭제 버튼을 눌러도 삭제되지 않습니다."
  },
  {
    id: 95,
    question: "인스턴스의 운영체제를 Linux에서 Windows로 바로 변경할 수 있습니까?",
    options: ["예, 버튼 클릭 한 번으로 가능합니다.", "아니오, 인스턴스를 새로 생성해야 합니다.", "재부팅 중에 변경 가능합니다.", "관리자에게 요청하면 가능합니다."],
    answer: 2,
    explanation: "OS는 이미지 기반이므로, 다른 계열의 OS로 변경하려면 기존 인스턴스를 삭제하고 새로 만들어야 합니다."
  },
  {
    id: 96,
    question: "오브젝트 스토리지의 버킷(Bucket) 권한 설정 중 'Public Read'의 의미는?",
    options: ["나만 읽을 수 있음", "로그인한 사용자만 읽을 수 있음", "인터넷상의 누구나 URL로 객체를 읽을 수 있음", "아무도 읽을 수 없음"],
    answer: 3,
    explanation: "Public Read 권한은 공개된 상태로, 링크가 있다면 누구나 접근 가능함을 의미합니다."
  },
  {
    id: 97,
    question: "이미 운영 중인 프로젝트의 리전(Region) 위치를 변경할 수 있습니까?",
    options: ["예, 콘솔 설정에서 가능합니다.", "아니오, 리전은 고정이며 자원을 새로 만들어야 합니다.", "네트워크 설정에서 변경 가능합니다.", "요금을 추가 지불하면 이동해줍니다."],
    answer: 2,
    explanation: "리전은 물리적으로 떨어진 위치이므로, 자원을 다른 리전으로 옮기려면 해당 리전에서 새로 구축해야 합니다."
  },
  {
    id: 98,
    question: "로드 밸런서 하단에 인스턴스를 추가할 때 가장 중요한 전제 조건은?",
    options: ["두 인스턴스의 OS가 반드시 같아야 함", "인스턴스가 헬스 체크(Health Check)에 성공해야 함", "인스턴스가 동일한 태그를 가져야 함", "반드시 유료 이미지를 사용해야 함"],
    answer: 2,
    explanation: "로드 밸런서는 헬스 체크를 통해 정상 상태인 인스턴스로만 트래픽을 보냅니다."
  },
  {
    id: 99,
    question: "API 엔드포인트(Endpoint)란 무엇입니까?",
    options: ["API를 호출하기 위한 접속 주소(URL)", "사용자의 비밀번호", "프로젝트의 마지막 날짜", "서버의 물리적 위치"],
    answer: 1,
    explanation: "엔드포인트는 서비스 API와 통신하기 위한 고유한 접속 지점입니다."
  },
  {
    id: 100,
    question: "웹 콘솔 로그인 비밀번호를 5회 이상 틀렸을 때 발생하는 현상은?",
    options: ["계정 영구 삭제", "계정 잠금(Lock)", "경찰 신고", "자동 비밀번호 초기화"],
    answer: 2,
    explanation: "보안을 위해 일정 횟수 이상 실패 시 계정이 일시적으로 잠길 수 있습니다."
  },
  {
    id: 101,
    question: "NHN Cloud에서 제공하는 '이미지 서비스'의 소스가 될 수 없는 것은?",
    options: ["NHN Cloud 제공 기본 이미지", "사용자가 직접 만든 스냅샷 기반 이미지", "외부에서 업로드한 이미지 파일", "내 컴퓨터의 한글 문서 파일"],
    answer: 4,
    explanation: "이미지 서비스는 부팅 가능한 OS 환경을 대상으로 하며, 일반 문서는 소스가 될 수 없습니다."
  },
  {
    id: 102,
    question: "스냅샷(Snapshot)과 백업(Backup)의 차이점으로 옳은 것은?",
    options: ["스냅샷은 유료이고 백업은 무료이다.", "스냅샷은 특정 시점의 상태를 그대로 저장하고, 백업은 대개 주기적으로 데이터를 복사한다.", "둘은 용어만 다를 뿐 100% 동일한 기능이다.", "스냅샷은 네트워크만 저장한다."],
    answer: 2,
    explanation: "스냅샷은 순간적인 상태 보존에 가깝고, 백업은 데이터 보호를 위해 주기적으로 수행되는 개념입니다."
  },
  {
    id: 103,
    question: "프로젝트 멤버 초대 후 초대받은 사람이 해야 할 일은?",
    options: ["이메일로 온 초대 수락 버튼 클릭", "새로운 신용카드 등록", "컴퓨터 포맷", "NHN Cloud 본사 방문"],
    answer: 1,
    explanation: "이메일을 통해 전송된 초대 링크를 수락해야 해당 프로젝트의 멤버로 등록됩니다."
  },

  // [영역 4: 결제 및 요금 - 7문제]
  {
    id: 104,
    question: "NHN Cloud 이용 요금의 기본적인 과금 주기 단위는?",
    options: ["초 단위", "시간 단위", "분 단위", "연 단위"],
    answer: 2,
    explanation: "대부분의 인프라 서비스는 1시간 단위(Time-based)로 사용량을 측정하여 청구합니다."
  },
  {
    id: 105,
    question: "결제 수단으로 등록 가능한 것이 아닌 것은?",
    options: ["신용카드", "가상계좌(법인)", "체크카드", "문화상품권"],
    answer: 4,
    explanation: "문화상품권은 공식 결제 수단이 아니며, 주로 신용카드나 계좌이체 등을 사용합니다."
  },
  {
    id: 106,
    question: "NHN Cloud에서 제공하는 '크레딧(Credit)'의 용도는?",
    options: ["서비스 이용 요금 결제 시 차감", "편의점에서 물건 구매", "친구에게 현금으로 송금", "서버 성능 강제 업그레이드"],
    answer: 1,
    explanation: "크레딧은 서비스 이용 요금이 발생했을 때 현금 대신 우선적으로 차감되는 포인트입니다."
  },
  {
    id: 107,
    question: "특정 금액 이상 요금이 발생할 때 이메일이나 문자로 알림을 받는 기능은?",
    options: ["요금 알람 설정", "자동 결제 차단", "프로젝트 강제 종료", "환불 신청"],
    answer: 1,
    explanation: "예산 설정을 통해 일정 금액 초과 시 알람을 받아 비용을 관리할 수 있습니다."
  },
  {
    id: 108,
    question: "이용 내역 및 영수증을 확인하고 다운로드할 수 있는 메뉴는?",
    options: ["결제 관리", "개인 정보 수정", "고객 센터", "공지 사항"],
    answer: 1,
    explanation: "콘솔의 결제 관리 메뉴에서 청구서 확인 및 영수증 출력이 가능합니다."
  },
  {
    id: 109,
    question: "미납 요금이 발생할 경우 서비스에 미치는 영향은?",
    options: ["즉시 데이터 삭제", "일정 기간 후 서비스 이용 제한", "아무런 영향 없음", "형사 처벌"],
    answer: 2,
    explanation: "미납이 지속될 경우 안내 절차를 거쳐 서비스 이용이 정지될 수 있습니다."
  },
  {
    id: 110,
    question: "NHN Cloud의 무료 체험(Free Tier) 혜택이 종료된 후 요금이 발생하는 시점은?",
    options: ["종료 1년 후", "혜택 한도 초과 또는 기간 만료 즉시", "다음 해 1월 1일", "사용자가 결제 승인을 누를 때마다"],
    answer: 2,
    explanation: "무료 혜택 범위를 벗어나면 등록된 결제 수단으로 자동 과금이 시작됩니다."
  }
];
];
