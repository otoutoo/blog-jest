import React, { useContext } from "react";
import { render } from "enzyme";
import { string } from "yargs";

const Foo = ({ title, onButtonClick }) => {
  return (
    <div>
      <div>foo</div>
      <h1>{title}</h1>
      <button onClick={onButtonClick}>button</button>
    </div>
  );
};

describe("MyComponent", function () {
  it("rendered the title", () => {
    const wrapper = render(<Foo title="test" />);
    // console.log(wrapper.text()) // footestbutton
    // .toContain(item) 检查项目是否在数组中时使用
    expect(wrapper.text()).toContain("test");
  });

  it("renders a div", () => {
    const wrapper = render(<Foo />);
    // console.log(wrapper.html()) // <div>foo</div><h1></h1><button>button</button>
    expect(wrapper.html()).toContain("div");
  });

  it("can pass in context", () => {
    const SimpleContext = React.createContext({ name: "foo" });
    const SimpleComponent = () => {
      const { name } = useContext(SimpleContext);
      return (
        <div>
          <div>{name}</div>
        </div>
      );
    };
    const wrapper = render(<SimpleComponent />, { context: SimpleContext });
    // console.log(wrapper.html()) // <div>foo</div>
    expect(wrapper.html()).toContain("foo");
  });
});
