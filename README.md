# Weather App
React Native(with Expo)로 날씨 앱 만들기

## 개선사항
- 날짜 표시

## Expo
- 개발도구 없이 react native로 만들어진 앱을 테스트할 수 있는 환경을 만들어주는 도구

1. 설치하기
```
npm install --global expo-cli
```

2. (macOS의 경우) watchman 설치하기
```
brew update
brew install wathman
```

3. EXPO앱 설치하기
```
안드로이드 : 구글 플레이 스토어 -> Expo 검색 -> 앱 설치
아이폰 : 앱스토어 -> Expo Go 검색 -> 앱 설치
```

4. 프로젝트 생성
```
expo init [프로젝트명] -> 옵션 선택(blank)
```

5. expo 로그인 (앱, 컴퓨터 둘다 로그인 필요)
```
expo login -> username, 비밀번호 입력
```
<br>

### Expo SDK
- 위치정보
```
expo install expo-location
```