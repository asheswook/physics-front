import axios from "axios";

export const axi = axios.create({
  baseURL: "https://sv.jwlee.xyz",
  headers: {
    SID: window.location.hostname,
  },
});

interface dict {
  [key: string]: string;
}
interface index {
  [key: string]: number;
}

export const errMessages: dict = {
  BAD_REQUEST: "잘못된 요청입니다.",
  NO_TOKEN: "로그인 후 이용해주세요",
  UNAUTHORIZED: "로그인 후 이용해주세요.",
  TOKEN_ERROR: "올바르지 않은 접근입니다.",
  TOKEN_EXPIRED: "세션이 만료되었습니다. 다시 로그인해주세요.",
  UNKNOWN_TOKEN_ERROR: "알 수 없는 오류입니다. 다시 로그인해주세요.",
  CLIENT_NOT_FOUND: "올바른 주소로 접속해 주십시오.",
  FILTERED: "올바르지 않은 입력입니다.",
  DUPLICATE_CHARGE: "중복된 충전 신청입니다.",
  DISABLED_OPT: "비활성화된 구매 옵션입니다.",
  GRADE_POINT: "직셀러와 리셀러는 포인트 교환이 불가합니다.",
  ID_INAPPR: "아이디를 찾을 수 없습니다.",
  PW_INAPPR: "잘못된 패스워드입니다.",
  USER_EXIST: "이미 존재하는 유저입니다.",
  UNKNOWN_ERROR: "알 수 없는 오류입니다.",

  // 파일
  FILE_NOT_FOUND: "파일을 찾을 수 없습니다.",
  UPDATE_TAGS_ERROR: "태그를 수정할 수 없습니다.",

  INVAILD_ID: "올바르지 않은 업로드 아이디입니다.",
  FILE_ALREADY_EXISTS: "이미 업로드된 파일입니다.",
  NOT_SAME_USER: "업로드를 요청한 사용자와 업로드하는 사용자가 다릅니다.",
  SIZE_IS_ZERO: "파일의 크기가 0입니다.",
  EMPTY_NAME: "파일의 이름이 없습니다.",
};
