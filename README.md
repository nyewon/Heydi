# 📓 [Heydi](https://heydi-liart.vercel.app/)

> **대화로 정리하는 나만의 일기, 헤이디**

Heydi와 함께 번거로운 작성 없이, AI와의 대화로 일기를 완성하세요!

---

## ✨ 프로젝트 소개

일기를 쓰는 일은 나를 돌아보는 가장 좋은 방법이지만, 매일 글로 정리하는 일은 쉽지 않습니다.

**Heydi**는 사용자가 하루를 **말로 이야기하면**,
AI가 실시간 음성 대화를 통해 공감하고 질문하며  
그날의 감정과 이야기를 **자연스러운 일기**로 정리해주는 **AI 음성 대화 기반 일기 서비스**로,

- 키보드 없이 **AI와 음성으로 대화하며 하루를 기록**하고
- 작성된 일기를 통해 나의 **하루를 객관적으로 이해**
- 일기를 **커뮤니티에 공유**하며 다른 사람들의 하루에 공감
- 쌓인 기록을 바탕으로 **월간 리포트**로 나의 변화를 확인할 수 있습니다. 

---

## 🚀 주요 기능

- 🎙️ **AI 음성 대화 기반 일기 작성**  
  Gemini Live API를 활용해 AI와 음성으로 대화하며 하루를 기록하고 정리

- 📝 **자동 일기 생성**  
  대화 내용을 바탕으로 감정과 주제를 분석해 AI 일기 자동 작성

- 📅 **일기 기록 관리**  
  날짜별 일기 조회, 사진 추가 및 일기 수정·삭제 관리

- 📄 **일기 내보내기**  
  작성한 일기를 PDF로 저장하고 보관

- 📊 **월간 리포트 생성**  
  감정 변화 / 자주 등장한 주제 / 자주 한 활동 / 인사이트 확인

- 🌱 **커뮤니티**  
  선택한 일기를 공유하고 좋아요와 댓글로 공감

- 🔔 **FCM 알림**  
  일기 작성을 잊지 않도록 리마인더 알림 제공

- 👤 **마이페이지**  
  나의 기록 히스토리 및 개인 설정 관리

---

## 📁 폴더 구조

```bash
src/
├── assets/        # 이미지, 아이콘 등 정적 리소스
│
├── components/    # 재사용 가능한 UI 컴포넌트
│   ├── common/    # 버튼, 입력창 등 공통 UI 컴포넌트
│   ├── community/ # 커뮤니티 관련 컴포넌트
│   ├── diary/     # 일기 작성 및 조회 관련 컴포넌트
│   ├── dropdown/  # 드롭다운 UI 컴포넌트
│   ├── modal/     # 모달 UI 컴포넌트
│   ├── report/    # 월간 리포트 시각화 컴포넌트
│   └── index.ts   # 컴포넌트 export 관리
│
├── constants/     # 공통 상수 정의
│
├── hooks/         # 커스텀 React Hooks
│
├── mocks/         # 개발 및 테스트용 mock 데이터
│
├── pages/         # 라우트 단위 페이지 컴포넌트
│   ├── community/ # 커뮤니티 페이지
│   ├── diary/     # 일기 작성 및 상세 페이지
│   ├── etc/       # 기타 페이지
│   ├── init/      # 초기 진입 및 온보딩 관련 페이지
│   ├── mypage/    # 마이페이지
│   ├── report/    # 월간 리포트 페이지
│   └── index.ts   # 페이지 export 관리
│
├── services/      # API 통신 로직
│
├── utils/         # 공통 유틸리티 함수
│
├── App.tsx        # 전체 라우팅 및 레이아웃 설정
├── index.css      # 전역 스타일
├── main.tsx       # React 앱 진입점
└── vite-env.d.ts  # Vite 환경 타입 정의
```
---

## 🛠️ 기술 스택 & 사용 라이브러리
![REACT](https://img.shields.io/badge/REACT-61DAFB?style=flat-square&logo=react&logoColor=black)
![TYPESCRIPT](https://img.shields.io/badge/TYPESCRIPT-3178C6?style=flat-square&logo=typescript&logoColor=white)
![VITE](https://img.shields.io/badge/VITE-646CFF?style=flat-square&logo=vite&logoColor=white)
![TAILWIND_CSS](https://img.shields.io/badge/TAILWIND_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![ZUSTAND](https://img.shields.io/badge/ZUSTAND-000000?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white)

### Frontend
- React
- TypeScript 

### UI & 스타일링
- Tailwind CSS
- react-icons

### 상태 관리 & 유틸
- zustand

### 실시간 통신
- WebSocket

### PWA / 알림
- PWA
- Firebase Cloud Messaging (FCM)

### 개발 도구
- ESLint
- Prettier

---

## 💡 Commit Convention
```bash
- :sparkles:[feat]: 새로운 기능 추가
- :recycle:[refactor]: 코드 리팩토링
- :art:[style]: 스타일 수정, 코드 의미에 영향을 주지 않는 변경사항
- :bug:[fix]: 버그 수정
- :memo:[docs]: 문서 작성 및 수정
- :white_check_mark:[test]: 테스트 코드 추가
- :wrench:[chore]: 빌드 업무 및 패키지 매니저 수정, production code와 무관한 부분들
- :hammer:[rename]: 파일, 폴더 삭제 및 이름 수정
- :bulb:[comment]: 주석 추가 및 변경
```