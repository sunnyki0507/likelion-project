# 🍱 바파고 (Bapago)

“오늘 뭐 먹지?”라는 고민을 해결해주는 **스와이프 기반 맛집 추천 웹사이트**  
Yelp Fusion API를 활용해 사용자의 조건과 취향에 맞는 식당을 **하나씩** 추천합니다.

---

## 📌 프로젝트 소개

- 정보는 많지만 결정은 어려운 시대.  
- Yelp 같은 플랫폼은 **회원가입/로그인**, **광고**, **과도한 정보** 등으로 사용자 피로도가 높음  
- 바파고는 이런 문제를 Tinder 스타일의 **스와이프 UI**로 해결합니다.

**주요 목표:**
- 사용자가 직접 원하는 조건(카테고리, 거리, 평점 등)을 선택
- 스와이프 한 번으로 식당 하나씩 추천
- 가볍고 빠른 의사결정 → UX 중심 설계

---

## ✨ 주요 기능

- 🔍 **위치 기반 검색**: location + radius 조건으로 주변 식당 조회
- 🎛 **맞춤 필터**: 카테고리, 거리, 가격대, 평점, 예약 가능 여부 등
- 👉 **스와이프 UI**: Tinder 스타일 맛집 탐색 (좋아요/패스)
- 📝 **상세 페이지**: 사진, 리뷰, 주소, 전화번호 등 정보 시각화
- ⭐ **즐겨찾기 / 프로필 기능**: 원하는 식당 저장 및 설정 가능
- 🙆 **비회원 사용 가능**: 로그인 없이도 기본 추천 가능

---

## 🛠 기술 스택

- **Frontend**: Next.js (React), TypeScript, TailwindCSS  
- **Backend**: Elysia, Node.js, TypeScript, mySQL
- **API**: Yelp Fusion API  
- **협업 도구**: GitHub, Figma

---

## 📁 디렉토리 구조

```bash
📦 bapago/
 ┣ 📂components/
 ┣ 📂pages/
 ┣ 📂public/
 ┣ 📂styles/
 ┣ 📜package.json
 ┣ 📜README.md
🚀 실행 방법 (Getting Started)
Requirements
Node.js

npm

Installation
bash
Copy
Edit
# 프로젝트 클론
git clone https://github.com/sunnyki0507/likelion-project.git
cd likelion-project

# 패키지 설치
npm install

# 로컬 실행
npm run dev
👥 팀 소개
역할	이름
Project Manager	임지은
Design	오윤서
Frontend	윤준상, 김서연
Backend	기서영, 배형준, 임지은, 황솔비

⚠️ 기술적 제한 & 해결
Yelp API의 무료 버전은 실시간 예약 여부나 음식 사진 제공 불가
→ 자체 dummy data 또는 레이아웃 기반으로 사용자 경험 보완

상태 관리 문제: 페이지 이동 시 필터 유지 안됨
→ /favorites와 /profile을 /home 내부에 포함시켜 상태 유지

📎 관련 링크
🔗 GitHub: https://github.com/sunnyki0507/likelion-project

🎨 Figma: https://www.figma.com/design/thEggL3kL8ckj6YObB90zq/LikeLionUS-Project

✍️ 한 마디
바파고는 팀원들과 함께 협업하며 사용자 중심의 UI/UX 설계를 목표로 완성한 프로젝트입니다.
정보는 적절하게, 탐색은 직관적으로. 가볍게 즐기는 맞춤형 맛집 추천 플랫폼, 바파고!

To Be Continued... 🍜


