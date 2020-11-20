import React, { useState } from "react";
import { create, act } from "react-test-renderer";

function Button(props) {
  const [text, setText] = useState("");
  function handleClick() {
    setText("PROCEED TO CHECKOUT");
  }
  return <button onClick={handleClick}>{text || props.text}</button>;
}

describe("Button component", () => {
  test("it shows the expected text when clicked", () => {
    let component;
    act(() => {
      // hooks에서 act()메소드는 컴포넌트를 마운트(생성), 업데이트하거나 props로 전달 된 함수를 클릭하는 것과 같이 구성 요소의 상태를 변경하는 모든 작업에 사용해야한다.
      component = create(<Button text="SUBSCRIBE TO BASIC" />); // create()메소드는 브라우저에 컴포넌트를 렌더해주는것과 거의 유사하다. 어떻게보면 cra의 App컴포넌트라고도 볼수 있다. 인자에다가 컴포넌트를 넣어주면 된다.
    });
    const instance = component.root; //hooks에서는 getInstance()를 사용하지 못하고 getInstance()메소드 대신에 root를 사용해서 React컴포넌트형식으로 값을 반환한다. 반대로 클래스형식에서는 root를 사용할 수 없다.
    console.log("hooks instance", instance);
    const button = instance.findByType("button"); // queryselector와 유사하다.
    act(() => {
      // hooks에서 act()메소드는 마운트(생성), 업데이트하거나 props로 전달 된 함수를 클릭하는 것과 같이 구성 요소의 상태를 변경하는 모든 작업에 사용해야한다.
      button.props.onClick();
    });
    expect(button.props.children).toBe("PROCEED TO CHECKOUT");
  });
});
