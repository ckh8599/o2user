

export class ConstStr {
    //const.java

    //API 서버 URL (POST)
    readonly URL_DEVELOP_SERVER: string = "http://106.245.251.182";           //개발서버
    readonly URL_SPC_DEVELOP_SERVER: string = "http://192.168.42.96:8080";        //스테이징 서버
    readonly URL_SPC_SERVER: string = "https://api.o2point.co.kr";                 //실 서버

    readonly API_BASE_URL: string =  'URL_SPC_DEVELOP_SERVER';                            //실 서버

    // isDevelopServer: string = false;                                //개발 서버 설정 여부 - sms가 자동으로 보여짐

    // Intent Extra Key
    // INTENT_EXTRA_NOTI: string = "NOTI";

    readonly URL_EVENT: string = "/web/mainevent/mainEventView";                      //이벤트
    readonly URL_O2POINT_INFO: string = "/web/agreement/AgreementList?type=tab1";     //O2정보
    readonly URL_CUSTOMER_CENTER: string = "/web/customerCenter/customerView?session_id=";        //고객센터
    readonly URL_TOS_LOCATION: string = "/web/agreement/AgreementCon?TOS_TYPE=O2P04";     //위치정보 수집이용이용 동의 - 상세보기

    //JSON KEY
    //공통
    readonly KEY_TYPE: string = "TYPE";                           //타입
    readonly KEY_PAGE: string = "PAGE";                           //조회할 페이지
    readonly KEY_ROW_COUNT: string = "ROW_COUNT";                 //한번에 받을 리스트 수
    readonly KEY_AVAIL_POINT: string = "AVAIL_POINT";             //가용포인트
    readonly KEY_AVAIL_STAMP: string = "AVAIL_STAMP";             //스탬프수
    readonly KEY_AVAIL_CASH: string = "AVAIL_CASH";              //가용캐쉬
    readonly KEY_MESSAGE_LIST: string = "MESSAGE_LIST";           //Message List
    readonly KEY_MESSAGE_CODE: string = "MESSAGE_CODE";           //메시지코드
    readonly KEY_MESSAGE: string = "MESSAGE";                     //메시지
    readonly KEY_UPDATED_DATE: string = "UPDATED_DATE";           //변경일자 (YYYYMMDDHHMMSS)
    readonly KEY_TITLE: string = "TITLE";                         //제목

    //로그인
    readonly KEY_REG_TYPE: string = "REG_TYPE";                   //가입유형
    readonly KEY_RESULT_CODE: string = "RESULT_CODE";             //응답코드 (2.8.1응답코드 정의 참조)
    readonly KEY_ENCRYPT_DATA: string = "ENCRYPT_DATA";           //암호화 응답정보
    readonly KEY_MDN: string = "MDN";                             //휴대전화번호
    readonly KEY_OUT_PW: string = "OUT_PW";                       //사용자 비밀번호
    readonly KEY_OUT: string = "OUT";                             //사용자 토큰
    readonly KEY_SESSION_ID: string = "SESSION_ID";               //SESSION_ID
    readonly KEY_DEVICE_TYPE: string = "DEVICE_TYPE";             //디바이스 타입[001: string = Android; 002: string = IOS]
    readonly KEY_DEVICE_ID: string = "DEVICE_ID";                 //디바이스 아이디[Android: string = 디바이스 아이디; IOS: string = UUID]
    readonly KEY_DEVICE_TOKEN: string = "DEVICE_TOKEN";           //디바이스 토큰[Android: string = 등록키; IOS: string = 디바이스 토큰]
    readonly KEY_APP_VERSION: string = "APP_VERSION";             //어플리케이션 버전 정보
    readonly KEY_DEVICE_CHANGE_YN: string = "DEVICE_CHANGE_YN";   //디바이스 변경 여부[Y: string = 변경; N: string = 미변경]
    readonly KEY_NEW_APP_VERSION: string = "NEW_APP_VERSION";     //최신 어플리케이션 버전
    readonly KEY_FORCE_UPDATE_YN: string = "FORCE_UPDATE_YN";     //강제업데이트 여부 [Y: string = 강제업데이트; N: string = 선택업데이트]
    readonly KEY_UPDATE_URL: string = "UPDATE_URL";               //업데이트 마켓 URL
    readonly KEY_APP_LOCK_YN: string = "APP_LOCK_YN";             //앱 잠금 설정 사용여부[Y: string = 사용; N: string = 미사용]
    readonly KEY_MDN_LIST: string = "MDN_LIST";                   //전화번호 목록
    //약관
    readonly KEY_ESSENTIAL_YN: string = "ESSENTIAL_YN";           //필수약관 조회여부[A: string = 전체; Y: string = 필수; N: string = 선택]
    readonly KEY_AGREE_YN: string = "AGREE_YN";                   //약관동의 정보 조회여부[A: string = 전체; Y: string = 동의; N: string = 미동의]
    readonly KEY_TOS_COUNT: string = "TOS_COUNT";                 //약관 리스트 개수
    readonly KEY_TOS_LIST: string = "TOS_LIST";                   //약관 리스트
    readonly KEY_TOS_URL: string = "TOS_URL";                     //TOS URL
    readonly KEY_TOS_NO: string = "TOS_NO";                       //약관 일련번호
    readonly KEY_TOS_VERSION: string = "VERSION";                 //약관 버전
    readonly KEY_TOS_TITLE: string = "TITLE";                     //약관 제목
    readonly KEY_TOS_DESCRIPTION: string = "DESCRIPTION";         //약관 부가정보
    readonly KEY_TOS_AGREE_YN: string = "AGREE_YN";               //동의여부[ Y 동의 N 미동의]
    readonly KEY_TOS_ESSENTIAL_YN: string = "ESSENTIAL_YN";       //필수 여부[Y: string = 필수; N: string = 선택]
    //사용자 정보
    readonly KEY_AUTH_NUMBER: string = "AUTH_NUMBER";             //인증번호
    readonly KEY_CONFIRM_YN: string = "CONFIRM_YN";               //일치여부[Y: string = 일치; N: string = 불일치]
    readonly KEY_CUSTOMER_NAME: string = "CUSTOMER_NM";         //사용자이름
    readonly KEY_BIRTHDAY: string = "BIRTHDAY";                   //생년월일 (주민번호 앞 8자리)
    readonly KEY_EMAIL: string = "EMAIL";                         //이메일
    readonly KEY_SEX_CD: string = "SEX_CD";                       //성별 (남자: string = 1; 여자: string = 2)
    readonly KEY_PW_CHECK_TYPE: string = "PW_CHECK_TYPE";         //결제 비밀번호 설정 여부[Y: string = 설정; N: string = 미설정]
    readonly KEY_PAY_PW: string = "PAY_PW";                       //안심 비밀번호
    readonly KEY_IMEI: string = "IMEI";                           //단말기 식별번호(디바이스 타입이 Android인 경우 필수)
    readonly KEY_EQP_MDL_CD: string = "EQP_MDL_CD";               //단말기모델코드(디바이스 타입이 Android인 경우 필수)
    readonly KEY_EQP_SER_NUM: string = "EQP_SER_NUM";             //단말기일련번호(디바이스 타입이 Android인 경우 필수)
    readonly KEY_OS_VERSION: string = "OS_VERSION";               //OS버전
    readonly KEY_TEMP_PW_YN: string = "TEMP_PW_YN";               //임시비밀번호 설정여부
    readonly KEY_BARCODE: string = "BARCODE";                     //바코드
    readonly KEY_USER_TYPE: string = "USER_TYPE";                 //회원구분
    readonly KEY_OUT_PW_CNT: string = "OUT_PW_CNT";               //비밀번호오류횟수
    readonly KEY_PAY_PW_CNT: string = "PAY_PW_CNT";               //인심비밀번호오류횟수
    readonly KEY_PUSH_USE_YN: string = "PUSH_USE_YN";             //푸쉬 사용여부
    readonly KEY_MINOR_AGREE_YN: string = "MINOR_AGREE_YN";       //14세미만 동의 여부
    readonly KEY_NAME: string = " NAME";                          //이름
    readonly KEY_PW_SEARCH_TYPE: string = "PW_SEARCH_TYPE";       //비밀번호 찾기 타입[01: string = 이메일 찾기; 02: string = 휴대폰인증찾기]
    readonly KEY_OUT_PW_NEW: string = "OUT_PW_NEW";               //회원 비밀번호
    readonly KEY_OUT_PW_NEW2: string = "OUT_PW_NEW2";             //회원 비밀번호2
    readonly KEY_PAY_PW_NEW: string = "PAY_PW_NEW";               //안심 비밀번호 (신규)
    readonly KEY_PAY_PW_NEW2: string = "PAY_PW_NEW2";             //안심 비밀번호2 (신규)
    //pool 정보
    readonly KEY_POOL_LIST: string = "POOL_LIST";                 //풀리스트
    readonly KEY_POOL_CD: string = "POOL_CD";                     //풀코드
    readonly KEY_POOL_TYPE: string = "POOL_TYPE";                 //포인트 구분: string = 01: 공용 ; 단독
    readonly KEY_POOL_NAME: string = "POOL_NM";                 //풀명
    readonly KEY_POOL_CNT: string = "POOL_CNT";                   //풀리스트
    readonly KEY_BRND_CD: string = "BRND_CD";                     //브랜드코드
    readonly KEY_BRND_NAME: string = "BRND_NM";                 //브랜드명
    readonly KEY_BRND_NM: string = "BRND_NM";                     //브랜드목록
    readonly KEY_BRND_NOTICE_TITLE: string = "BRND_NOTICE_TITLE"; //브랜드알림 문구
    readonly KEY_BRAND_LIST: string = "BRAND_LIST";               //BRAND 목록
    readonly KEY_BRND_IMG_URL: string = "BRND_IMG_URL";           //브랜드로고이미지명
    readonly KEY_BRND_CNT: string = "BRND_CNT";                   //브랜드수
    readonly KEY_POOL_SERVICE_TYPE: string = "POOL_SERVICE_TYPE";         //포인트 서비스 구분 01: string = 포인트 ; 02 STAMP
    readonly VALUE_POOL_SERVICE_TYPE_POINT: string = "1";                 //포인트 서비스 구분 01: string = 포인트 ; 02 STAMP
    readonly VALUE_POOL_SERVICE_TYPE_STAMP: string = "2";                 //포인트 서비스 구분 01: string = 포인트 ; 02 STAMP
    //가맹점
    readonly KEY_CUSTOMER_LOCATION_X: string = "CUSTOMER_LOCATION_X";     //위치-위도
    readonly KEY_CUSTOMER_LOCATION_Y: string = "CUSTOMER_LOCATION_Y";     //위치-경도
    readonly KEY_SHOP_LIST: string = "SHOP_LIST";                         //가맹점 목록
    readonly KEY_SHOP_CD: string = "SHOP_CD";                             //가맹점코드
    readonly KEY_SHOP_NM: string = "SHOP_NM";                             //가맹점명
    readonly KEY_SHOP_ADDRESS: string = "SHOP_ADDRESS";                   //기본주소
    readonly KEY_SHOP_ADDRESS_DETAIL: string = "SHOP_ADDRESS_DETAIL";     //상세주소
    readonly KEY_SHOP_START_TIME: string = "SHOP_START_TIME";             //영업시작일
    readonly KEY_SHOP_END_TIME: string = "SHOP_END_TIME";                 //영업종료일
    readonly KEY_POLICY_NM: string = "POLICY_NM";                         //포인트 정책명
    readonly KEY_SHOP_PHONE: string = "SHOP_PHONE";                       //가맹점전화번호
    readonly KEY_DISTANCE: string = "DISTANCE";                           //거리
    readonly KEY_POINT_YN: string = "POINT_YN";                           //포인트 YN
    readonly KEY_COUPON_YN: string = "COUPON_YN";                         //쿠폰 YN
    readonly KEY_STAMP_YN: string = "STAMP_YN";                           //스탬프 YN
    readonly KEY_EVENT_YN: string = "EVENT_YN";                           //이벤트 YN
    readonly KEY_CASH_YN: string = "CASH_YN";                             //캐시 YN
    readonly KEY_CATEGORY_CD: string = "CATEGORY_CD";                     //업종 코드
    readonly KEY_EVENT_NO: string = "EVENT_NO";                           //이밴트번호
    readonly KEY_EVENT_BANNER_IMG: string = "EVENT_BANNER_IMG";           //이벤트배너이미지
    readonly KEY_REGION_CD: string = "REGION_CD";                         //지역코드
    readonly KEY_CATEGORY_IMG_URL: string = "CATEGORY_IMG_URL";           //업종 URL
    readonly KEY_CATEGORY_NM: string = "CATEGORY_NM";                     //업종명
    readonly KEY_BIZ_CONDITIONS: string = "BIZ_CONDITIONS";               //업태명
    readonly KEY_MIN_AVAIL_AMOUNT: string = "MIN_AVAIL_AMOUNT";           //최소 가용포인트
    readonly KEY_MAX_SAVE_AMOUNT: string = "MAX_SAVE_AMOUNT";             //최대 가용포인트
    readonly KEY_SHOP_IMG_URL_LIST: string = "SHOP_IMG_URL_LIST";         //가맹점 이미지URL
    readonly KEY_IMG_NO: string = "IMG_NO";                               //이미지번호
    readonly KEY_SHOP_IMG_URL: string = "SHOP_IMG_URL";                   //가맹점 이미지 URL
    readonly KEY_SHOP_NOTICE_TITLE: string = "SHOP_NOTICE_TITLE";         //가맹점 안내문구
    readonly KEY_SHOP_RECOMMAND_TITLE: string = "SHOP_RECOMMAND_TITLE";   //가맹점 추천문구
    readonly KEY_POINT_POLICY: string = "POINT_POLICY";                   //포인트 정책
    readonly KEY_CASH_POLICY: string = "CASH_POLICY";                     //캐시 정책
    readonly KEY_STAMP_POLICY: string = "STAMP_POLICY";                   //스탬프 정책
    readonly KEY_SEARCH_KEYWORD: string = "SEARCH_KEYWORD";               //검색조건
    readonly KEY_SHOP_HOLIDAY: string = "SHOP_HOLIDAY";                   //휴일
    readonly KEY_STAMP_CNT: string = "STAMP_CNT";                         //스탬프 수
    readonly KEY_STAMP_TOTAL_CNT: string = "STAMP_TOTAL_CNT";             //스탬프 총수
    readonly KEY_POINT_SAVE_NOTICE1: string = "POINT_SAVE_NOTICE1";       //포인트적립사용안내1
    readonly KEY_POINT_SAVE_NOTICE2: string = "POINT_SAVE_NOTICE2";       //포인트적립사용안내2
    readonly KEY_POINT_SAVE_NOTICE3: string = "POINT_SAVE_NOTICE3";       //포인트적립사용안내3
    readonly KEY_POINT_SAVE_NOTICE4: string = "POINT_SAVE_NOTICE4";       //포인트적립사용안내4
    readonly KEY_CASH_SAVE_NOTICE1: string = "CASH_SAVE_NOTICE1";         //캐시적립사용안내1
    readonly KEY_CASH_SAVE_NOTICE2: string = "CASH_SAVE_NOTICE2";         //캐시적립사용안내1
    readonly KEY_CASH_SAVE_NOTICE3: string = "CASH_SAVE_NOTICE3";         //캐시적립사용안내1
    readonly KEY_CASH_SAVE_NOTICE4: string = "CASH_SAVE_NOTICE4";         //캐시적립사용안내1
    readonly KEY_STAMP_SAVE_NOTICE1: string = "STAMP_SAVE_NOTICE1";       //스탬프적립사용안내1
    readonly KEY_STAMP_SAVE_NOTICE2: string = "STAMP_SAVE_NOTICE2";       //스탬프적립사용안내2
    readonly KEY_STAMP_SAVE_NOTICE3: string = "STAMP_SAVE_NOTICE3";       //스탬프적립사용안내3
    readonly KEY_STAMP_SAVE_NOTICE4: string = "STAMP_SAVE_NOTICE4";       //스탬프적립사용안내4
    readonly KEY_SHOP_LOCATION_X: string = "SHOP_LOCATION_X";             //위치 - 위도
    readonly KEY_SHOP_LOCATION_Y: string = "SHOP_LOCATION_Y";             //위치 - 경도
    readonly KEY_THEMA_LIST: string = "THEMA_LIST";                       // 테마 목록
    readonly KEY_THEMA_SEQ: string = "THEMA_SEQ";                         // 테마 일련번호
    readonly KEY_THEMA_NM: string = "THEMA_NM";                           // 테마 명
    readonly KEY_THEMA_IMG_URL: string = "THEMA_IMG_URL";                 // 테마이미지경로
    readonly KEY_STAMP_CNT1: string = "STAMP_CNT1";                       // 스탬프 수1
    readonly KEY_STAMP_CNT2: string = "STAMP_CNT2";                       // 스탬프 수2
    readonly KEY_STAMP_CNT3: string = "STAMP_CNT3";                       // 스탬프 수3
    readonly KEY_STAMP_DESC1: string = "STAMP_DESC1";                     // 상품 지급 설명 1
    readonly KEY_STAMP_DESC2: string = "STAMP_DESC2";                     // 상품 지급 설명 2
    readonly KEY_STAMP_DESC3: string = "STAMP_DESC3";                     // 상품 지급 설명 3
    //포인트
    readonly KEY_POINT_LIST: string = "POINT_LIST";                       //POINT적립사용 목록
    readonly KEY_SAVE_RESERVE_POINT: string = "SAVE_RESERVE_POINT";       //적립예정 POINT
    readonly KEY_EXIT_RESERVE_POINT: string = "EXIT_RESERVE_POINT";       //소멸예정 POINT
    readonly KEY_SEARCH_MONTH: string = "SEARCH_MONTH";                   //검색월
    readonly KEY_TRADE_NAME: string = "TRADE_NM";                       //적립사용명칭
    readonly KEY_TRADE_DATE: string = "TRADE_DATE";                       //거래일자
    readonly KEY_TRADE_TYPE: string = "TRADE_TYPE";                       //거래구분(01: 적립 ; 02:적립취소  ; 03: 사용 ; 04:사용취소 ; 05: 적립예정 ; 06: string = 소멸 ; 구매: string = 07 ; 구매취소: string = 08)
    readonly VALUE_TRADE_TYPE_SAVE: string = "01";                        //거래구분 적립: string = 01
    readonly VALUE_TRADE_TYPE_SAVE_CANCEL: string = "02";                 //거래구분 적립취소: string = 02
    readonly VALUE_TRADE_TYPE_USE: string = "03";                         //거래구분 사용: string = 03
    readonly VALUE_TRADE_TYPE_USE_CANCEL: string = "04";                  //거래구분 사용취소: string = 04
    readonly VALUE_TRADE_TYPE_TOBE_SAVE: string = "05";                   //거래구분 적립예정: string = 05
    readonly VALUE_TRADE_TYPE_EXTINCTION: string = "06";                  //거래구분 소멸: string = 06
    readonly VALUE_TRADE_TYPE_BUY: string = "07";                         //거래구분 구매: string = 07
    readonly VALUE_TRADE_TYPE_BUY_CANCEL: string = "08";                  //거래구분 구매취소: string = 08
    readonly KEY_TRADE_CASH: string = "TRADE_CASH";                       //거래 cash
    readonly KEY_POINT_TYPE: string = "POINT_TYPE";                       //포인트구분(1:POINT 2:CASH)
    //캐시
    readonly KEY_CASH_LIST: string = "CASH_LIST";                         //CASH적립사용 목록
    readonly KEY_SAVE_RESERVE_CASH: string = "SAVE_RESERVE_CASH";         //적립예정 CASH
    readonly KEY_EXIT_RESERVE_CASH: string = "EXIT_RESERVE_CASH";         //소멸예정 CASH
    readonly KEY_TRADE_POINT: string = "TRADE_POINT";                     //거래 point
    //스탬프
    readonly KEY_STAMP_LIST: string = "STAMP_LIST";                       //STAMP적립사용 목록
    readonly KEY_SAVE_RESERVE_STAMP: string = "SAVE_RESERVE_STAMP";       //적립예정 STAMP
    readonly KEY_EXIT_RESERVE_STAMP: string = "EXIT_RESERVE_STAMP";       //소멸예정 STAMP
    readonly KEY_TRADE_STAMP: string = "TRADE_STAMP";                     //거래 stamp
    //이벤트
    readonly KEY_EVENT_LIST: string = "EVENT_LIST";                       //이벤트목록
    readonly KEY_EVENT_TITLE1: string = "EVENT_TITLE1";                   //이벤트 안내문구 1
    readonly KEY_EVENT_TITLE2: string = "EVENT_TITLE2";                   //이벤트 안내문구 2
    readonly KEY_CONTENTS: string = "CONTENTS";                           //내용
    readonly KEY_START_DATE: string = "START_DATE";                       //이벤트시작일시
    readonly KEY_END_DATE: string = "END_DATE";                           //이벤트종료일시
    readonly KEY_MAIN_BANNER_IMG_URL: string = "MAIN_BANNER_IMG_URL";     //배너이미지
    readonly KEY_EVENT_NM: string = "EVENT_NM";                           //이밴트명
    readonly KEY_EVENT_NOTICE1: string = "EVENT_NOTICE1";                 //이벤트 안내문구1
    readonly KEY_EVENT_NOTICE2: string = "EVENT_NOTICE2";                 //이벤트 안내문구2
    readonly KEY_EVENT_NOTICE3: string = "EVENT_NOTICE3";                 //이벤트 안내문구3
    readonly KEY_EVENT_NOTICE4: string = "EVENT_NOTICE4";                 //이벤트 안내문구4
    readonly KEY_EVENT_NOTICE5: string = "EVENT_NOTICE5";                 //이벤트 안내문구5
    //공지
    readonly KEY_NOTICE_NO: string = "NOTICE_NO";                         //일련번호
    readonly KEY_LINK_URL: string = "LINK_URL";                           //링크 URL
    // O2 쿠폰
    readonly KEY_COUPON_TYPE: string = "COUPON_TYPE";                         // 쿠폰종류 (01:할인쿠폰; 02:1+1쿠폰; 03:금액쿠폰; 04:교환쿠폰)
    readonly VALUE_COUPON_TYPE_DISCOUNT: string = "01";                       // 쿠폰종류 >> 01: string = 할인쿠폰
    readonly VALUE_COUPON_TYPE_ONE_MORE: string = "02";                       // 쿠폰종류 >> 02: string = 1+1쿠폰
    readonly VALUE_COUPON_TYPE_CASH: string = "03";                           // 쿠폰종류 >> 03: string = 금액쿠폰
    readonly VALUE_COUPON_TYPE_CHANGE: string = "04";                         // 쿠폰종류 >> 04: string = 교환쿠폰
    readonly VALUE_COUPON_TYPE_BRAND: string = "CB";                          // 쿠폰종류 >> CB: string = 브랜드 쿠폰
    readonly KEY_KEYWORD: string = "KEYWORD";                                 // 검색 조건
    readonly KEY_COUPON_LIST: string = "COUPON_LIST";                         // O2 쿠폰 목록
    readonly KEY_COUPON_CD: string = "COUPON_CD";                             // 쿠폰 코드
    readonly KEY_COUPON_KIND: string = "COUPON_KIND";                         // 쿠폰 구분
    readonly KEY_COUPON_NM: string = "COUPON_NM";                             // 쿠폰 이름
    readonly KEY_PURCHASE_POINT: string = "PURCHASE_POINT";                   // 쿠폰 금액
    readonly KEY_COUPON_PRICE: string = "COUPON_PRICE";                       // 금액 쿠폰 금액
    readonly KEY_DISCOUNT_RATE: string = "DISCOUNT_RATE";                     // 할인율
    readonly KEY_VALID_DATE: string = "VALID_DATE";                           // 유효기간
    readonly KEY_USE_NOTICE1: string = "USE_NOTICE1";                         // 사용안내1
    readonly KEY_USE_NOTICE2: string = "USE_NOTICE2";                         // 사용안내2
    readonly KEY_USE_NOTICE3: string = "USE_NOTICE3";                         // 사용안내3
    readonly KEY_CONSTRAINT_NOTICE1: string = "CONSTRAINT_NOTICE1";           // 주의사항1
    readonly KEY_CONSTRAINT_NOTICE2: string = "CONSTRAINT_NOTICE2";           // 주의사항2
    readonly KEY_CONSTRAINT_NOTICE3: string = "CONSTRAINT_NOTICE3";           // 주의사항3
    readonly KEY_CONSTRAINT_NOTICE4: string = "CONSTRAINT_NOTICE4";           // 주의사항4
    readonly KEY_IMG_URL: string = "IMG_URL";                                 // 쿠폰 이미지
    readonly KEY_PROD_URL: string = "PROD_URL";                               // 상품 URL
    readonly KEY_SEARCH_TYPE: string = "SEARCH_TYPE";                         // 정렬 조건 (01:신규발급순; 02:마감임박순; 03:기간만료순; 04:사용완료순)
    readonly VALUE_MY_COUPON_SEARCH_TYPE_NEW: string = "01";                  // 정렬 조건 >> 01: string = 신규발급순
    readonly VALUE_MY_COUPON_SEARCH_TYPE_DEADLINE: string = "02";             // 정렬 조건 >> 02: string = 마감임박순
    readonly VALUE_MY_COUPON_SEARCH_TYPE_EXPIRE: string = "03";               // 정렬 조건 >> 03: string = 기간만료순
    readonly VALUE_MY_COUPON_SEARCH_TYPE_USED: string = "04";                 // 정렬 조건 >> 04: string = 사용완료순
    readonly KEY_AVAIL_COUPON: string = "AVAIL_COUPON";                       // 사용가능쿠폰
    readonly KEY_COUPON_SEQ: string = "COUPON_SEQ";                           // 쿠폰 일련 번호
    readonly KEY_VALID_START_DATE: string = "VALID_START_DATE";               // 유효 시작일
    readonly KEY_VALID_END_DATE: string = "VALID_END_DATE";                   // 유효 종료일
    readonly KEY_DEADLINE: string = "DEADLINE";                               // 마감일
    readonly KEY_STATUS: string = "STATUS";                                   // 내쿠폰 상태 (01:사용; 02:사용 안함; 03:기간 만료)
    readonly VALUE_MY_COUPON_STATUS_USED: string = "01";                      // 내쿠폰 상태 >> 01: string = 사용
    readonly VALUE_MY_COUPON_STATUS_NOT_USED: string = "02";                  // 내쿠폰 상태 >> 02: string = 사용 안함
    readonly VALUE_MY_COUPON_STATUS_EXPIRE: string = "03";                    // 내쿠폰 상태 >> 03: string = 기간 만료
//    readonly KEY_COUPON_USE_YN: string = "COUPON_USE_YN";                     // 사용자 APP 에서 쿠폰 사용 여부
    readonly KEY_POS_AGENT_USE_YN: string = "POS_AGENT_USE_YN";               // 포스 사용 유무
    readonly KEY_COUPON_USE_DATE: string = "COUPON_USE_DATE";                 // 쿠폰 사용(만료) 일자



    readonly KEY_: string = "";

    //JSON Value
    readonly VALUE_NULL: string = "null";                                 //null
    readonly VALUE_ALL: string = "A";                                      //전체
    readonly VALUE_Y: string = "Y";                                        //필수
    readonly VALUE_N: string = "N";                                        //선택
    readonly VALUE_MAIN_TYPE_RECOMMEND: string = "01";                     //추천
    readonly VALUE_MAIN_TYPE_FAVORITE : string = "02";                     //자주가는 매장
    readonly VALUE_MAIN_TYPE_O2ZONE: string = "03";                        //주변 O2 Zone
    readonly VALUE_MAIN_TYPE_EVENT : string = "04";                        //이벤트
    readonly VALUE_SEX_CD_MAN: string = "1";                               //성별 - 남
    readonly VALUE_SEX_CD_WOMAN: string = "2";                             //성별 - 여
    readonly VALUE_USER_TYPE_REGULAR: string = "1";                        //회원구분 - 정회원
    readonly VALUE_USER_TYPE_SIMPLE: string = "2";                         //회원구분 - 간편회원
    readonly VALUE_USER_TYPE_NONMEMBER: string = "3";                      //회원구분 - 비회원
    readonly VALUE_PW_SEARCH_EMAIL: string = "01";                         //비번찾기 - 이메일 찾기
    readonly VALUE_PW_SEARCH_PHONE: string = "02";                         //비번찾기 - 휴대폰인증찾기
    readonly VALUE_SHOP_SEARCH_TYPE_01: string = "01";                     //매장찾기 - 지역별찾기
    readonly VALUE_SHOP_SEARCH_TYPE_02: string = "02";                     //매장찾기 - 키워드검색
    readonly VALUE_TOS_TYPE_CUSTOMER_INFO_SAVE: string = "O2P01";         //약관 - 개인정보 수집이용 동의
    readonly VALUE_TOS_TYPE_CUSTOMER_INFO: string = "O2P02";              //약관 - 개인정보처리방침(案)
    readonly VALUE_TOS_TYPE_SERVICE: string = "O2P03";                    //약관 - 서비스이용약관(필수)
    readonly VALUE_TOS_TYPE_LOCATION: string = "O2P04";                   //약관 - 위치정보수집이용동의(선택)
    readonly VALUE_TOS_TYPE_EVENT: string = "O2P05";                      //약관 - 이벤트마케팅정보수신동의약관(선택)
    readonly VALUE_TOS_TYPE_PUSH: string = "O2P06";                       //약관 - 푸시수신동의약관(선택)
    readonly VALUE_REG_TYPE_NEW: string = "01";                           //가입유형 - 신규가입
    readonly VALUE_REG_TYPE_REGULAR_NOT_ME: string = "02";                //가입유형 - 정회원으로 가입되어 있으며 본인이 아닌경우
    readonly VALUE_REG_TYPE_SIMPLE_RECULAR: string = "03";                //가입유형 - 간편회원에서 정회원으로 가입가입
    readonly VALUE_REG_TYPE_SIMPLE_NOT_ME: string = "04";                 //가입유형 - 간편회원으로 가입되어 있으며 본인이 아닌경우
    
    //상수값
    readonly DISTANCE_UNIT: string = "Km";                                 //거리 단위위
    readonly DEFAULT_ROW_COUNT: number = 10;                                 //기본 페이지 단위
    readonly CASH_UNIT: string = "C";                                     //캐시 단위
    readonly POINT_UNIT: string = "P";                                    //포인트 단위
    readonly STAMP_UNIT: string = "S";                                    //스탬프 단위

   //날짜 포맷
    // public static SimpleDateFormat TRANSACTION_ID_FORMAT: string = new SimpleDateFormat("yyyyMMddHHmmssSS");

    //http header
    readonly HEADER_CONTENT_TYPE: string = "Content-Type";        //aplication/json
    readonly HEADER_TRANSACTION_ID: string = "TRANSACTION_ID";    //YYYYMMDDHHMMSSss
    readonly HEADER_SESSION_ID: string = "SESSION_ID";            //세션ID
    readonly HEADER_APP_VERSION: string = "APP_VERSION";          //APP Version
    readonly HEADER_DEVICE_ID: string = "DEVICE_ID";              //Android: string = Device ID; IOS: string = UUID
    readonly HEADER_DEVICE_TYPE: string = "DEVICE_TYPE";          //Android: string = 001; IOS : string = 002

    readonly DEVICE_TYPE_ANDROID: string = "001";     //[001: string = Android; 002: string = IOS]
    readonly DEVICE_TYPE_IOS: string = "002";
    readonly CONTENT_TYPE_APP_JSON: string = "aplication/json";


    //서버 응답 코드
    //시스템
    readonly RESULT_CODE_SUCCESS: string = "0";                           //성공
    readonly RESULT_CODE_GENERAL_DECLINE: string = "GENERAL_DECLINE";     //일시적인 오류로 인해 정상적으로 처리되지 않았습니다. App을 종료하신 후 다시 시도해 주시기 바랍니다.
    readonly RESULT_CODE_LINKAGE_ERROR: string = "LINKAGE_ERROR";         //연동 시스템 오류
    //공통
    readonly RESULT_CODE_SYSTEM_INSPECT: string = "SYSTEM_INSPECT";       //시스템 점검
    readonly RESULT_CODE_INVALID_AGREEMENT: string = "INVALID_AGREEMENT"; //일시적인 오류로 인해 정상적으로 처리되지 않았습니다. App을 종료하신 후 다시 시도해 주시기 바랍니다
    readonly RESULT_CODE_OVERLAP_MDN: string = "OVERLAP_MDN";             //동일한 ID 입니다.
    //회원
    readonly RESULT_CODE_ALREADY_USER: string = "ALREADY_USER";           //이미 가입된 회원입니다
    readonly RESULT_CODE_INVALID_BAN_WORD: string = "INVALID_BAN_WORD";   //사용이 금지된 단어입니다
    readonly RESULT_CODE_INVALID_USER: string = "INVALID_USER";           //등록되지 않은 고객입니다
    readonly RESULT_CODE_INVALID_USER3: string = "INVALID_USER3";         //14세 미만 고객님께서는 회원 가입을 하실 수 없습니다.
    readonly RESULT_CODE_LOCKED_SEND_SMS: string = "LOCKED_SEND_SMS";     //인증번호 발송 제한 상태입니다
    readonly RESULT_CODE_UPGRADE_USER: string = "UPGRADE_USER";           //APP버전 강제업데이트 대상입니다
    readonly RESULT_CODE_EXPIRED_SESSION: string = "EXPIRED_SESSION";     //세션이 만료되었습니다. 로그인 후 이용 해 주시기 바랍니다
    readonly RESULT_CODE_INVALID_PASSWORD: string = "INVALID_PASSWORD";   //비밀번호가 맞지 않습니다.
    readonly RESULT_CODE_INVALID_PW: string = "INVALID_PW";               //PW가 불일치 합니다
    readonly RESULT_CODE_INVALID_AUTH_NUM: string = "INVALID_AUTH_NUM";   //인증번호가 맞지 않습니다. 인증번호를 확인해주세요.
    readonly RESULT_CODE_INVALID_MDN: string = "INVALID_MDN";              //가입된 ID(휴대폰번호)가 아닙니다.
    readonly RESULT_CODE_INVALID_USER_NAME: string = "INVALID_USER_NAME"; //등록된 이름이 아닙니다.
    readonly RESULT_CODE_ACCOUNT_ON_HOLD: string = "ACCOUNT_ON_HOLD";     //등록된 이름이 아닙니다.

    //SharedPreferences
    readonly SP_KEY_AUTO_LOGIN: string = "SP_KEY_AUTO_LOGIN";             //설정 - 자동로그인 (boolean)
    readonly SP_KEY_CALL: string = "SP_KEY_CALL";                         //전화 걸기 권한 (boolean)
    readonly SP_KEY_TUTORIAL: string = "SP_KEY_TUTORIAL";                 //튜토리얼 (boolean)
    readonly SP_KEY_BARCODE: string = "SP_KEY_BARCODE";                   //설정 - 바코드 (String)


    //비밀 번호 정규식 검사 상태 코드
    readonly VALIDATE_PW_STATE_SUCCESS: string = "0";                     //이상 없음
    readonly VALIDATE_PW_STATE_DUPLICATE_NUMBER: string = "1";            //중복된 숫자
    readonly VALIDATE_PW_STATE_CONSECUTIVE_NUMBER: string = "2";          //연속된 숫자
    readonly VALIDATE_PW_STATE_CONTAIN_CELL_NUMBER: string = "3";         //핸드폰 번호가 포함되어져 있다


    //string.xml
    readonly app_name: string = "O² POINT";

    //Common Str
    readonly test: string = "테스트 전용";
    readonly alert: string = "알림";
    readonly cancel: string = "취소";
    readonly ok: string = "확인";
    readonly next: string = "다음";
    readonly modify: string = "수정";
    readonly pw_edit_hint: string = "비밀번호(영문; 숫자; 특수문자 8~15자리)";
    readonly pw_edit_hint2: string = "비밀번호 재입력";
    readonly email_address: string = "이메일";
    readonly email: string = "이메일";
    readonly contact_us: string = "1:1 상담문의";
    readonly faq: string = "FAQ";
    readonly regular_member: string = "정회원";
    readonly simple_member: string = "간편회원";
    readonly new_member: string = "신규회원";
    readonly man: string = "남자";
    readonly woman: string = "여자";
    readonly at_sign: string = "\@";
    readonly choice: string = "선택";
    readonly skip: string = "건너뛰기";
    readonly edit_my_self: string = "직접입력";
    readonly search: string = "검색";
    readonly toast_back_msg: string = "\'뒤로\' 버튼을 한번 더 누르시면 종료됩니다.";
    readonly toast_rooting_msg: string = "탈옥이나 루팅을 통한 비정상 단말인 경우 지원하지 않습니다.";
    readonly open: string = "열기";
    readonly close: string = "접기";
    readonly validate: string = "유효기간";
    readonly n_ea: string = "%1$s개";
    readonly dot_noti: string = "● %1$s";
    readonly dday: string = "D-%1$d";
    readonly won: string = "원";
    readonly no_case: string = "해당없음";
    readonly new_word: string = "NEW";
    readonly expire: string = "만료";
    readonly date_format: string = "yyyy년 MM월 dd일";

    // Splash 
    readonly splash_title: string = "작은 포인트도 소중히";
    readonly splash_sub_title: string = "오~ 두번 받는 포인트 혜택\nO² POINT";

    // Fragment Name (타이틀바 명) 
    readonly title_login: string = "로그인";
    readonly title_find_id: string = "ID(휴대폰번호) 찾기";
    readonly title_find_pw: string = "비밀번호 찾기";
    readonly title_update_pw: string = "비밀번호 재설정";
    readonly title_join: string = "회원정보입력 및 약관동의";
    readonly title_join_required: string = "회원가입 (필수)";
    readonly title_join_selective: string = "회원가입 (선택)";
    readonly title_main: string = "메인";
    readonly title_search_store: string = "매장 찾기";
    readonly title_point_management: string = "O² POINT";
    readonly title_cash_management: string = "O² CASH";
    readonly title_stamp_management: string = "O² STAMP";
    readonly title_customer_exist: string = "휴대폰 인증";
    readonly title_customer_exist_result: string = "가입여부안내";
    readonly title_safety_pw_setting: string = "안심 비밀번호 설정";
    readonly title_modify_customer_info: string = "회원정보 수정";
    readonly title_change_id: string = "ID(휴대폰번호) 변경";
    readonly title_change_pw: string = "비밀번호 변경";
    readonly title_service_close: string = "회원탈퇴";
    readonly title_my_o2zone: string = "My O² ZONE";
    readonly title_settings: string = "설정";
    readonly title_event: string = "이벤트";
    readonly title_o2_info: string = "O² 정보";
    readonly title_customer_center: string = "고객센터";
    readonly title_shop_detail_info: string = "매장 상세";
    readonly title_main_filter: string = "브랜드";

    //메인 하단 탭
    readonly nav_header_o2cash: string = "O² 캐시";
    readonly nav_header_o2point: string = "O² 포인트";
    readonly nav_header_myo2zone: string = "My O²존";
    readonly nav_header_my_coupon: string = "My 쿠폰";
    readonly nav_header_my_stamp: string = "My 스탬프";
    readonly nav_coupon: string = "쿠폰 받기";
    readonly nav_search_store: string = "매장 찾기";
    readonly nav_event: string = "이벤트";
    readonly nav_customer_center: string = "고객센터";
    readonly nav_o2_info: string = "O² 정보";
    readonly nav_settings: string = "설정";

    // 왼쪽 슬라이드 메뉴 
    readonly left_slide_title: string = "%1$s님의 My O²";
    readonly left_slide_o2_cash: string = "O² CASH";
    readonly left_slide_o2_point: string = "O² POINT";
    readonly left_slide_o2_stamp: string = "O² STAMP";
    readonly left_slide_my_o2_zone_title: string = "My O² ZONE";
    readonly left_slide_o2_coupon_shop: string = "O²쿠폰샵";
    readonly left_slide_find_store: string = "매장찾기";
    readonly left_slide_event: string = "이벤트";
    readonly left_slide_service_center: string = "고객센터";
    readonly left_slide_o2_info: string = "O²정보";
    readonly left_slide_setting: string = "설정";
    readonly left_slide_my_o2_no_item: string = "O² 앱으로 적립을 이용해 보세요.";

    // 튜토리얼 페이지 
    readonly tuto_submit: string = "O² POINT 시작하기";
    readonly tuto_title1: string = "O² POINT";
    readonly tuto_title2: string = "O² POINT/CASH";
    readonly tuto_title3: string = "O² ZONE";
    readonly tuto_title4: string = "매장 찾기";
    readonly tuto_content_1: string = "O² POINT의 주요 이벤트와\n다양한 매장을 추천 받아보세요.";
    readonly tuto_content_2: string = "전체 적립/사용 포인트와 상세 내역을\n한 화면에서 편리하게 확인하세요.";
    readonly tuto_content_3: string = "한 곳에서 적립한 포인트를\n같은 O² ZONE에서 함께 사용해보세요.";
    readonly tuto_content_4: string = "직접검색과 지역검색을 통해\n매일매일 새로운 O² ZONE을 만나보세요.";

    // 로그인 페이지 
    readonly auto_login: string = "자동 로그인";
    readonly privacy_policy: string = "개인정보처리방침";
    readonly login_id_edit_hint: string = "ID (휴대폰번호 \"-\"없이 숫자만 입력)";
    readonly login_pw_edit_hint: string = "비밀번호 (영문+숫자 10자리 이상)";
    readonly login_find_id: string = "아이디 찾기";
    readonly join: string = "회원가입";
    readonly login_warning_msg: string = "매장에서 간편가입한 경우라도 O² POINT App 이용을 위해서는 회원가입이 필요합니다.";
    readonly join_safety_pw_warning_msg: string = "매장에서 휴대폰번호만으로 서비스 이용 시 타인에 의한 사용이 발생 할 수 있습니다. 안심 비밀번호 설정으로 안전하게 서비스를 이용해보세요.";

    // ID (휴대폰 번호) 찾기 페이지 
    readonly find_id_hint: string = "회원가입 시 등록한\n이름; 이메일을 입력해주세요";
    readonly find_id_edit_hint1: string = "이름(한글)";
    readonly find_id_result: string = "고객님의 아이디 정보 입니다.";

    // 비밀번호 찾기 페이지 
    readonly find_pw_radio_case_mail: string = "이메일로 찾기";
    readonly find_pw_radio_case_phone: string = "휴대폰 인증으로 찾기";
    readonly find_pw_hint_case_mail: string = "회원가입 시 등록한 정보를 입력하시면; 등록하신 이메일 주소로 비밀번호가 재발급됩니다.";
    readonly find_pw_hint_case_phone: string = "휴대폰번호 인증 후 휴대폰으로 비밀번호가 재발급됩니다.";
    readonly find_pw_id_edit_hint: string = "아이디(휴대폰번호 숫자만 입력)";
    readonly find_pw_phone_edit_hint: string = "휴대폰번호 숫자만 입력";
    readonly find_pw_certification_phone: string = "휴대폰 인증";
    readonly find_pw_certification_number_edit_hint: string = "인증번호 입력";
    readonly find_pw_effective_time: string = "유효시간 00:00";
    readonly find_pw_alert: string = "비밀번호 재발급 후 이전 비밀번호 사용이 불가합니다.";
    readonly find_pw_result_case_mail: string = "회원가입 시 등록한 이메일주소로 임시 비밀번호가 재발급되었습니다.";
    readonly find_pw_result_case_phone: string = "인증 받으신 휴대폰으로 임시 비밀번호가 재발급되었습니다.";
    readonly find_pw_result_alert: string = "발급된 임시 비밀번호로 로그인 시 비밀번호 변경 후 이용이 가능합니다.";

    // 휴대폰 인증 페이지 
    readonly customer_exist_hint: string = "회원가입을 위해서는\n휴대폰 인증이 필요합니다.";
    readonly customer_exist_mdn_edit_hint: string = "휴대폰 번호\n(\"-\" 없이 숫자만 입력)";
    readonly customer_exist_auth_num_edit_hint: string = "인증번호 입력";
    readonly customer_exist_able_time: string = "유효시간";
    readonly customer_exist_able_time_expired: string = "유효시간 만료";
    readonly customer_exist_time: string = "%1$s:%2$s";

    //휴대폰 인증 결과 페이지
    readonly customer_exist_result_hint: string = "이미 %1$s으로\n이용 중인 번호입니다.";
    readonly customer_exist_result_btn_title1: string = "본인이 가입한 아이디라면";
    readonly customer_exist_result_btn_title2: string = "본인이 가입한 적 없다면";
    readonly customer_exist_result_btn_subtitle_tail1: string = "으로 가입 계속하기";
    readonly customer_exist_result_btn_subtitle_tail2: string = "&#160;페이지로";
    readonly customer_exist_result_warning1: string = "본인이 가입하신 아이디일 경우 기존에 사용 중이신 POINT 및 CASH가 보존됩니다.";
    readonly customer_exist_result_warning2: string = "본인이 가입하신 아이디가 아닐 경우 신규가입이 됩니다.";
    readonly customer_exist_result_warning3: string = "입력하신 휴대폰번호로 신규가입을 진행하실 경우; 해당 번호의 이력 및 혜택은 초기화 됩니다.";

    // 회원정보입력 및 약관동의 페이지 
    readonly join_pw_edit_hint1: string = "비밀번호 (영문+숫자 10자리 이상)";
    readonly join_pw_edit_hint2: string = "비밀번호 확인 (영문+숫자 10자리 이상)";
    readonly update_pw_edit_hint1: string = "신규 비밀번호 (영문+숫자 10자리 이상)";
    readonly update_pw_edit_hint2: string = "신규 비밀번호 확인 (영문+숫자 10자리 이상)";
    readonly join_birth_edit_hint: string = "생년월일 8자리(예. 19910101)";
    readonly join_tos_all_agree: string = "약관 전체 동의";
    readonly join_tos_show: string = "<u>보기</u>";
    readonly join_age_agree: string = "만 14세 이상 동의 (필수)";

    // 안심 비밀번호 설정 페이지 
    readonly safety_pw_setting_warning: string = "매장에서 휴대폰번호만으로 서비스 이용 시 타인에 의한 사용이 발생 할 수 있습니다. 안심 비밀번호 설정으로 안전하게 서비스를 이용해보세요.";
    readonly safety_pw_edit_hint1: string = "비밀번호 (숫자 4자리)";
    readonly safety_pw_edit_hint2: string = "비밀번호 확인 (숫자 4자리)";

    // 비밀번호 재설정 페이지 
    readonly update_pw_hint: string = "임시 비밀번호를 부여 받으신 회원님께서는 비밀번호 변경 후 이용이 가능합니다.";

    // 메인 페이지 
    readonly main_event: string = "EVENT";
    readonly main_o2zone: string = "O² ZONE";
    readonly main_choice_tab_hint: string = "혜택을 선택해 주세요";
    readonly main_tab1: string = "추천 매장";
    readonly main_tab2: string = "자주가는 매장";
    readonly main_tab3: string = "주변 매장";
    readonly main_tab4: string = "이벤트";
    readonly main_filter: string = "필터";
    readonly main_locate_format: string = "%1$skm 떨어져 있어요";
    readonly search_shop_locate_format: string = "%1$s Km";
    readonly show_detail_shop: string = "매장정보 보기";
    readonly filter_dash: string = "&#160;-&#160;";
    readonly main_tab1_no_data_msg: string = "추천 매장이 없습니다. ";
    readonly main_tab2_no_data_msg: string = "자주가는 매장이 없습니다.";
    readonly main_tab3_no_data_msg: string = "주변 매장이 없습니다.";
    readonly main_tab4_no_data_msg: string = "이벤트 진행 매장이 없습니다.";
    readonly main_tab2_card_bottom_point_msg: string = "POINT %1$s 사용 가능";

    // 회원가입 (필수) 페이지 
    readonly join_id_edit_hint: string = "휴대폰 번호 (\"-\" 없이 숫자만 입력)";

    // 매장 찾기 페이지 
    readonly search_store_tab1: string = "매장 검색";
    readonly search_store_tab2: string = "테마 O² ZONE";
    readonly find_myself: string = "직접검색";
    readonly find_locate: string = "지역검색";
    readonly select_category_hint: string = "업종을 선택해 주세요.";
    readonly search_store_keyword_hint: string = "키워드를 입력해 주세요. 예) 파스쿠치 양재";
    readonly search_store_locate_hint1: string = "지역 1";
    readonly search_store_locate_hint2: string = "지역 2";
    readonly search_store_no_item_msg: string = "검색 결과가 없습니다.";
    readonly my_coupon_header: string = "사용 가능 쿠폰 ";
    readonly my_coupon_tail: string = "장";

    // O2 쿠폰샵 페이지 
    readonly o2_coupon_keyword_hint: string = "키워드를 입력해 주세요. (가맹점명; 쿠폰명)";
    readonly o2_coupon_tab1: string = "O²쿠폰";
    readonly o2_coupon_tab2: string = "O²콘";
    readonly o2_coupon_tab3: string = "MY 쿠폰함";
    readonly o2_coupon_type_1: string = "전체";
    readonly o2_coupon_type_2: string = "금액쿠폰";
    readonly o2_coupon_type_3: string = "할인쿠폰";
    readonly o2_coupon_type_4: string = "1+1쿠폰";
    readonly o2_coupon_type_5: string = "교환쿠폰";
    readonly my_coupon_order_by_1: string = "신규발급순";
    readonly my_coupon_order_by_2: string = "마감임박순";
    readonly my_coupon_order_by_3: string = "기간 만료";
    readonly my_coupon_order_by_4: string = "사용 완료";
    readonly coupon_no_item_msg: string = "보유 쿠폰이 없습니다.";
    readonly coupon_cant_buy_msg: string = "구매가능한 쿠폰이 없습니다.";
    readonly confirm_use_coupon: string = "쿠폰 사용하기";
    readonly confirm_buy_coupon: string = "쿠폰 구매하기";
    readonly avail_point_lack: string = "잔여 포인트 부족";
    readonly used_coupon: string = "사용 완료";
    readonly used_coupon_alert_format: string = "이 쿠폰은 %1$s에 사용되었습니다.";
    readonly expired_coupon: string = "기간 만료";
    readonly expired_coupon_alert_format: string = "이 쿠폰은 %1$s에 만료되었습니다.";
    readonly confrim_use_coupon_alert: string = "쿠폰 사용을 원하시면\n점원에게 앱 화면을 보여주세요.";
    readonly cannot_use_from_app: string = "앱에서 사용할 수 없습니다.";
    readonly o2_coupon_buy_noti: string = "결제 정보";
    readonly o2_coupon_use_noti: string = "사용 안내";
    readonly o2_coupon_alert_noti: string = "주의 사항";
    readonly use_case_brand: string = "사용처/브랜드";
    readonly cannot_use_shop: string = "사용불가매장";
    readonly validate_date_format: string = "구매일로 부터 %1$s개월";
    readonly have_point_title: string = "● 보유 포인트";
    readonly buy_point_title: string = "● 쿠폰 구매 포인트";
    readonly res_point_title: string = "● 구매 시 잔여 포인트";
    readonly coupon: string = "COUPON";
    readonly coupon_buy_msg1: string = "쿠폰 구매가 완료되었습니다.";
    readonly coupon_buy_msg2: string = "My쿠폰함";
    readonly coupon_buy_msg3: string = "을 확인해 주세요.";

    // 설정 페이지 
    readonly settings_subtitle_1: string = "개인정보";
    readonly settings_subtitle_2: string = "안심 비밀번호";
    readonly settings_subtitle_3: string = "알림";
    readonly settings_subtitle_4: string = "버전 정보";
    readonly settings_customer_info: string = "회원정보 수정";
    readonly settings_auto_login: string = "자동로그인 설정";
    readonly settings_logout: string = "로그아웃";
    readonly settings_service_out: string = "회원탈퇴";
    readonly settings_safety_pw: string = "안심 비밀번호 설정";
    readonly settings_push: string = "PUSH 알림";
    readonly settings_tos_event: string = "마케팅 활용동의";
    readonly settings_tos_event_on: string = "동의";
    readonly settings_tos_event_off: string = "동의안함";
    readonly settings_tos_event_msg: string = "항목: string = 수신 및 마케팅 활용동의\n이용목적: string = 쿠폰 및 할인혜택 제공; 새로운 서비스 및 신상품; 이벤트 정보안내\n\n* 동의 철회 시점과 시스템 반영 시점 간 차이가 있을 수 있습니다.";
    readonly settings_tos_location: string = "위치정보 수집이용 동의";
    readonly settings_tos_location_msg: string = "위치정보 수집이용 동의에 관한 간략한 설명 내용입니다.";
    readonly settings_tos_location_detail: string = "<u>상세보기</u>";
    readonly settings_version: string = "버전 정보";
    readonly settings_ver: string = "Ver %1$s";
    readonly settings_latest_version: string = "최신버전";
    readonly settings_update: string = "업데이트";

    // 회원정보 수정 페이지 
    readonly modify_customer_id_change: string = "ID(휴대폰번호)변경";
    readonly modify_customer_pw_change: string = "비밀번호 변경";

    //ID 변경
    readonly change_id_msg: string = "ID(휴대폰번호) 변경을 위해서는\n휴대폰 인증이 필요합니다.";
    readonly change_id_result_msg: string = "인증한 휴대폰번호로\nID가 변경되었습니다.";
    readonly change_id_result_msg2: string = "변경된 ID(휴대폰번호)로 서비스를 이용해 주세요.";

    // 비밀번호 변경  
    readonly change_pw_msg: string = "변경하실 비밀번호를 입력해 주세요.";
    readonly change_pw_hint1: string = "현재 비밀번호 (영문+숫자 10자리 이상)";
    readonly change_pw_result_msg: string = "신규 비밀번호로 변경되었습니다.";

    // 회원 탈퇴  
    readonly service_close_msg: string = "현재 사용중인 비밀번호를 입력해 주세요.";
    readonly service_close_pw_hint1: string = "현재 로그인 비밀번호";

    //O2Zone
    readonly o2zone_msg_use_point_cash: string = "사용가능 POINT / CASH";
    readonly o2zone_default_msg: string = "방문한 가맹점이 없습니다.\n가까운 가맹점을 방문해 보세요!";
    readonly o2zone_find_store: string = "매장 찾기";
    readonly o2zone_pool_list_title_point: string = "사용가능 POINT - %1$sP";

    //매장찾기
    readonly search_store_tap_1: string = "방문 매장";
    readonly search_store_tap_2: string = "가까운 매장";
    readonly search_store_tap_3: string = "테마별 매장";
    readonly search_store_tap_4: string = "매장 검색";


    readonly point_manager_pool_msg: string = "최근 방문 순으로 정렬";
    readonly point_manager_button_recent: string = "최근";
    readonly point_manager_button_3month: string = "3개월";
    readonly point_manager_button_6month: string = "6개월";
    readonly point_manager_button_12month: string = "12개월";

    // 캐시 / Point / Stamp 관리 
    readonly cash_manager_o2_cash: string = "O² 캐시";
    readonly cash_manager_accumulation_cash: string = "적립예정 ";
    readonly cash_manager_lapse_cash: string = "소멸예정";
    readonly cash_manager_my_o2zone: string = "My O² ZONE";
    readonly cash_manager_cash_use: string = "적립/사용 내역";
    readonly cash_manager_no_history: string = "CASH 적립/사용 내역이 없습니다.";
    readonly point_manager_no_history: string = "POINT 적립/사용 내역이 없습니다.";
    readonly stamp_manager_no_history: string = "STAMP 적립/사용 내역이 없습니다.";

    // 매장 상세 
    readonly store_detail_info_event_title: string = "점포 EVENT";
    readonly store_detail_info_save_n_use_title: string = "적립 및 사용안내";
    readonly store_detail_info_business_time: string = "영업시간";
    readonly store_detail_info_category: string = "업종";
    readonly store_detail_info_store_phone: string = "전화번호";
    readonly store_detail_info_store_address: string = "주소";
    readonly store_detail_info_store_phone_button: string = "전화하기";
    readonly store_detail_info_store_map_button: string = "지도보기";
    readonly store_detail_info_no_event: string = "진행 중인 이벤트가 없습니다.";
    readonly store_detail_able_cash: string = "사용가능 CASH";
    readonly store_detail_able_point: string = "사용가능 POINT";
    readonly store_detail_have_stamp: string = "사용가능 STAMP";
    readonly stamp_use_noti_foramt: string = "● 스탬프 %1$s개 당 %2$s상품 지급";
    readonly stamp_page_range_format: string = "%1$d/%2$d";

    // 지도 페이지 

    //팝업 메시지
    readonly dialog_confirm: string = "확인";
    readonly dialog_cancel: string = "취소";
    readonly dialog_title_join_success: string = "회원가입완료";
    readonly dialog_content_join_success: string = "O² 포인트 서비스 회원가입이 완료되었습니다.";
    readonly dialog_title_update_no_force: string = "업데이트확인";
    readonly dialog_content_update_force: string = "새로운 업데이트 버전이 있습니다. 업데이트 후 사용 바랍니다";
    readonly dialog_content_update_no_force: string = "새로운 업데이트 버전이 있습니다. 업데이트를 진행하시겠습니까?";
    readonly dialog_title_modify_customer: string = "회원정보수정";
    readonly dialog_content_modify_customer_success: string = "회원정보가 수정되었습니다.";
    readonly dialog_title_error_network: string = "네트워크 장애";
    readonly dialog_title_safety_pw_change: string = "안심비밀번호변경";
    readonly dialog_content_safety_pw_change_success: string = "정상적으로 안심 비밀번호가 변경되었습니다.";
    readonly dialog_content_safety_pw_set_not_used_success: string = "안심비밀번호가 해제되었습니다.";
    readonly dialog_title_logout: string = "로그아웃";
    readonly dialog_content_logout: string = "로그아웃 하시겠습니까?";
    readonly dialog_permission_title: string = "권한";
    readonly dialog_read_phone_permission_error: string = "전화걸기 및 관리를 거부하시는 경우 앱 실행이 되지 않습니다.";
    readonly dialog_location_permission_error: string = "위치 정보 사용을 승인하지 않아 가까운 매장 정보를 이용할 수 없습니다. 위치 정보 승인은 \'설정\'에서 승인할 수 있습니다.";
    readonly dialog_title_service_close: string = "회원 탈퇴";
    readonly dialog_content_service_close: string = "회원 탈퇴하시면 보유하신 포인트/스탬프/캐시가 초기화됩니다.";
    readonly dialog_content_service_close_result: string = "회원 탈퇴가 완료되었습니다. ";
    readonly noti_safety_skip_msg: string = "타인이 휴대폰번호로 포인트 임의사용 시 회사에서 책임지지 않습니다.";
    readonly dialog_title_call: string = "전화 걸기 동의";
    readonly dialog_content_call: string = "전화 걸기에 동의하시겠습니까?";
    readonly dialog_buy_coupon_msg: string = "보유 포인트를 사용하여\n쿠폰을 구매하시겠습니까?";
    readonly dialog_use_coupon_msg: string = "사용하신 쿠폰은\n복구되지 않습니다.\n\n점원만 눌러주세요.";
    readonly dialog_req_auth_num: string = "인증번호를 전송하였습니다.";

    //Error
    readonly error: string = "에러";
    readonly error_network: string = "네트워크에 접속할 수 없습니다. 다시 시도해 주십시오.";
    readonly error_invalid_user: string = "등록된 사용자가 아닙니다. 회원가입 또는 고객센터로 문의해 주시기 바랍니다.";
    readonly error_no_mdn: string = "ID(휴대폰번호)를 입력해 주세요.";
    readonly error_validate_mdn: string = "ID(휴대폰번호)형식에 맞지않습니다.";
    readonly error_invalid_mdn: string = "가입된 ID(휴대폰번호)가 아닙니다.";
    readonly error_no_email: string = "이메일 주소를 입력해 주세요";
    readonly error_validate_email: string = "이메일 ID형식이 맞지 않습니다.";
    readonly error_no_pw: string = "비밀번호를 입력해 주세요.";
    readonly error_no_pw_re: string = "비밀번호 확인을 입력해 주세요.";
    readonly error_validate_pw: string = "비밀번호 형식이 맞지 않습니다. 문자와 숫자로만 입력하시기 바랍니다.";
    readonly error_validate_pw_consecutive: string = "연속번호는 사용이 불가합니다. 변경해주세요.";
    readonly error_validate_pw_contain_cell_num: string = "휴대폰번호와 일치합니다. 변경해주세요.";
    readonly error_mismatch_pw: string = "변경 비밀번호가 일치하지 않습니다.";
    readonly error_mismatch_pw2: string = "비밀번호가 일치하지 않습니다.";
    readonly error_mismatch_server_pw: string = "비밀번호가 맞지 않습니다.";
    readonly error_length_pw: string = "비밀번호는 영문+숫자 10자리 이상입니다.";
    readonly error_length_safety_pw: string = "안심 비밀번호는 4자리입니다.";
    readonly error_mismatch_safety_pw: string = "안심 비밀번호가 일치하지 않습니다.";
    readonly error_invalid_pw: string = "PW가 불일치 합니다.";
    readonly error_no_name: string = "이름을 입력해 주세요.";
    readonly error_validate_name: string = "이름은 한글만 입력가능합니다.";
    readonly error_invalid_user_name: string = "등록된 이름이 아닙니다.";
    readonly error_account_on_hold: string = "자격정지된 휴대폰번호 입니다. 고객센터로 문의해 주시기 바랍니다.";
    readonly error_no_birth: string = "생년월일을 입력해 주세요.";
    readonly error_validate_birth: string = "생년월일 형식이 맞지 않습니다.";
    readonly error_age: string = "14세 미만 고객님께서는 회원 가입을 하실 수 없습니다.";
    readonly error_no_auth_number: string = "인증번호를 입력해주세요.";
    readonly error_wrong_auth_number: string = "인증번호가 맞지 않습니다. 인증번호를 확인해주세요.";
    readonly error_dont_check_tos: string = "필수 약관에 동의해 주세요.";
    readonly error_dont_check_tos_service: string = "서비스 이용약관에 동의해 주세요.";
    readonly error_dont_check_tos_customer_info: string = "개인정보 취급방침에 동의해 주세요.";
    readonly error_server_general_decline: string = "일시적인 오류로 인해 정상적으로 처리되지 않았습니다. (GENERAL_DECLINE)";
    readonly error_server_invalid_agreement: string = "일시적인 오류로 인해 정상적으로 처리되지 않았습니다. (INVALID_AGREEMENT)";
    readonly error_server_overlay_mdn: string = "동일한 ID 입니다.";
    readonly error_server_expired_session: string = "세션이 만료되었습니다.";
    readonly error_server_msg: string = "error(%1$s)";
    readonly error_barcode_number_null: string = "바코드 정보를 읽어올 수 없습니다.\n다음에 다시 시도하시기 바랍니다.";
    readonly error_expired_auth_number: string = "인증번호 입력 시간이 초과되었습니다. 재인증해주세요.";
    readonly error_gps_setting: string = "GPS 설정이 OFF 상태입니다. GPS를 ON으로 바꾸시겠습니까?";
    readonly error_device_locate: string = "위치 권한이 OFF 상태입니다. 위치 권한 설정을 하시겠습니까?";
    readonly error_server_locate: string = "위치 정보 수집이용 약관 동의가 되지 않았습니다. 약관 동의를 하시겠습니까?";
    readonly error_no_locate_value: string = "등록된 위치 정보가 없습니다.";
    readonly error_create_coupon: string = "쿠폰구매에 실패하였습니다.\n계속 발생시 고객센터에 문의해주세요.\nO2포인트 고객센터: string = 1644-3271"
}
