import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

let container;

beforeEach(() => {
  // beforeEach메소드는 테스트케이스에서 테스트를 실행하기 전에 실행해주는 메소드이다. React에서 componentwillmount와 유사하다.
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // afterEach메소드는 테스트케이스에서 테스트를 종료한 후에 실행해주는 메소드이다. React에서 componentdidmount와 유사하다.
  document.body.removeChild(container);
  container = null;
});

function Button(props) {
  const [text, setText] = useState("");
  function handleClick() {
    setText("PROCEED TO CHECKOUT");
  }
  return <button onClick={handleClick}>{text || props.text}</button>;
}

describe("Button component", () => {
  test("it shows the expected text when clicked", () => {
    act(() => {
      ReactDOM.render(<Button text="SUBSCRIBE TO BASIC" />, container); // container안에 Button컴포넌트가 자식으로 들어온다는 뜻이다. 즉 container는 div이니까 div의 자식은 Button컴포넌트이다.(cra의 index.js참조)
    });
    console.log("abcdef", container);
    const button = container.getElementsByTagName("button")[0];
    expect(button.textContent).toBe("SUBSCRIBE TO BASIC");
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true })); // 이부분 잘모르겠으면 https://reactjs.org/docs/test-utils.html#act 이거참조하기
    });
    expect(button.textContent).toBe("PROCEED TO CHECKOUT");
  });
});
