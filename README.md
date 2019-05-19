# 프린세스 커넥트! Re:Dive 퀘스트 시뮬레이터

GraphQL 엔드포인트와 정적 애셋 서버로부터 데이터를 받아 퀘스트 드랍을
시뮬레이트합니다.

## 디펜던시 설치
패키지 매니저로 [Yarn]을 사용합니다.

[Yarn]: https://yarnpkg.com/

```
yarn
```

## 개발 서버 열기

```
yarn dev
```

## 프로덕션 빌드

```
yarn build
```

## 서버 주소 변경
환경 변수 `AMES_ENDPOINT`, `AMES_STATICS`로 서버 주소를 변경할 수 있습니다.

- `AMES_ENDPOINT`: GraphQL 엔드포인트 주소입니다. (기본값:
  `https://ames.tirr.dev/graphql`)
- `AMES_STATICS`: 정적 애셋 서버 주소입니다. (기본값:
  `https://ames-static.tirr.dev`)

---

[MIT 라이선스](LICENSE)
