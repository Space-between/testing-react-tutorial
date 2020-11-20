// import React from "react";
// import { create } from "react-test-renderer";

// function Button(props) {
//   return <button>Nothing to do for now</button>;
// }

// describe("Button component", () => {
//   test("Matches the snapshot", () => {
//     const button = create(<Button />);
//     expect(button.toJSON()).toMatchSnapshot(); // toMatchSnapshot()은 컴포넌트를 캡쳐하고 그 컴포넌트에 있는 텍스트들을 추출해서 자동으로 __snapshots__ 폴더를 만들어주고 그 폴더안에 컴포넌트를 캡쳐한 것의 결과값을 파일로 저장해주는 메소드이다.
//   });
// });
// Jest (테스트 실행기)는 첫 번째 실행에서 구성 요소의 스냅 샷을 만든 다음 저장된 스냅 샷이 실제 구성 요소와 일치하는지 확인한다.
// 경험상 한 가지 규칙 이 있습니다. 구성 요소가 자주 변경됩니까? 그렇다면 스냅 샷 테스트를 피하십시오 . 구성 요소의 스냅 샷을 찍으면 테스트는 첫 번째 실행에 통과하지만 변경 사항이있는 즉시 테스트는 실패합니다. 구성 요소와 원래 "그림"이 일치하지 않기 때문입니다.
// 짐작할 수 있듯이 스냅 샷 테스트는 자주 변경되지 않는 구성 요소에 적합합니다 . 다른 말로하면 : 구성 요소가 안정적 일 때 스냅 샷 테스트를 작성합니다.

import React from "react";
import { create } from "react-test-renderer";

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(() => {
      return { text: "PROCEED TO CHECKOUT" };
    });
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.text || this.props.text}
      </button>
    );
  }
}

describe("Button component", () => {
  test("it shows the expected text when clicked (testing the wrong way!)", () => {
    const component = create(<Button text="SUBSCRIBE TO BASIC" />); // create()메소드는 브라우저에 컴포넌트를 렌더해주는것과 거의 유사하다. 어떻게보면 cra의 App컴포넌트라고도 볼수 있다. 인자에다가 컴포넌트를 넣어주면 된다.
    const instance = component.getInstance(); // getInstance메소드로 인해서 상수 component를 React컴포넌트형식으로 값을 반환해서 instance라는 상수에 대입하고 있다.
    // console.log("instance ", instance); // instance를 콘솔창에 출력해 보았다. 콘솔 참조해서 보기
    expect(instance.state.text).toBe(""); // expect메소드는 기대하다라는 뜻이고 toBe메소드는 값이 일치하는지 비교할 때 사용된다. 즉 instance.state.text의 값이 toBe메소드에 있는 ""와 일치하는지 비교해서 알려주는 것이다.
    instance.handleClick(); // instance.handleClick() 함수가 실행이 됬는데 instance는 Button클래스 컴포넌트이니까 Button클래스 컴포넌트안에 있는 handleClick() 함수가 실행이 되어서 셋스테이트가 되었다.
    expect(instance.state.text).toBe("PROCEED TO CHECKOUT"); // 그렇게 instance.handleClick()으로 셋스테이트가 되어서 text: "PROCEED TO CHECKOUT" 이렇게 바꿔주고 이것을 toBe메소드로 "PROCEED TO CHECKOUT"이것과 일치하는지 비교해서 알려준다.
    // const button = instance.findByType("button"); // queryselector와 유사하다.
    // // console.log("button ", button);
    // button.props.onClick();
    // expect(instance.findByType("button").props.children).toBe(
    //   "PROCEED TO CHECKOUT"
    // );
  });
});
