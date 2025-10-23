"use client";
import { memo, useState } from "react";
import { useRouter } from 'next/navigation'
const InnerComponent = (props: any) => {
  const { count } = props;
  if (count) {
    return <div>has count InnerComponent{count} counting</div>;
  }
  return <div>inner InnerComponent</div>;
};

const MemoComponent1 = memo(() => {
  console.log("no props");
  return <div>non memo</div>;
});

const MemoComponent2 = memo((props: { memoCount: number }) => {
  console.log("here");
  return <div>counting memo: {props.memoCount}</div>;
});

function Home(props: any) {
  const [count, setCount] = useState(0);
  const [memoCount, setMemoCount] = useState(0);
  const router = useRouter();

   const goAppStoreSameTab = () => {
    // 외부 이동은 보통 <a> 권장. 동일 탭 강제라면 location.assign이 더 간결.
    window.location.assign(
      "https://apps.apple.com/kr/app/%EA%B8%88%EB%B0%A9%EA%B8%88%EB%B0%A9/id1575200660"
    );
    // 또는 router.push(...)도 동작은 하지만 내부 라우팅이 아니라 풀 네비게이션이 일어납니다.
  };

  const openAppStoreNewTab = () => {
    window.open(
      "https://apps.apple.com/kr/app/%EA%B8%88%EB%B0%A9%EA%B8%88%EB%B0%A9/id1575200660",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div>
      <div>render-playground - devtools render check</div>

      <input
        accept="image/*"
        type="file"
        id="raised-image-file"
        name="qnaImage"
      />

      <div>
        <button onClick={goAppStoreSameTab}>React 이동하기(동일 탭)</button>
      </div>

      <div>
        <button onClick={openAppStoreNewTab}>새 창 열기 이동하기</button>
      </div>

      <ul>
        <li>devtools의 render는 Render Phase를 의미</li>
        <li>
          state/props 변화 또는 상위 리렌더로 하위도 render phase 진입
        </li>
      </ul>

      <div>count: {count}</div>
      <div>memoCount: {memoCount}</div>

      <button onClick={() => setMemoCount((prev) => prev + 1)}>
        memo updater
      </button>

      <button onClick={() => setCount((prev) => prev + 1)}>click</button>

      <div>
        {/* 이 컴포넌트들이 실제로 존재/임포트되어 있어야 합니다 */}
        <InnerComponent count={count} />
      </div>

      <MemoComponent1 />
      <MemoComponent2 memoCount={memoCount} />

      <div>{props.children}</div>

      {/* 외부 링크는 아래처럼 a 태그로 명확히 표현하는 것도 좋습니다 */}
      <p>
        <a
          href="https://apps.apple.com/kr/app/%EA%B8%88%EB%B0%A9%EA%B8%88%EB%B0%A9/id1575200660"
          target="_blank"
          rel="noopener noreferrer"
        >
          앱스토어 새 탭으로 열기
        </a>
      </p>
    </div>
  );
}
export default function PageHome() {
  const [hoeme] = useState("home");
  return (
    <Home>
      여기는 children {hoeme} <InnerComponent />{" "}

      <div>카카오톡 버튼 테스트</div>
      <button onClick={() => window.location.href = "kakaotalk://inappbrowser/close"} > 안드로이드</button>
      <button onClick={() => window.location.href = "kakaoweb://closeBrowser"} > IOS</button>
    </Home>
  );
}
