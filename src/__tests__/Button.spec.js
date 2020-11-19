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
    const component = create(<Button text="SUBSCRIBE TO BASIC" />);
    const instance = component.getInstance();
    expect(instance.state.text).toBe("");
  });
});
