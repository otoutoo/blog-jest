##### Jest单元测试



## 概念

单元测试（unit testing），是指对软件中的最小可测试单元进行检查和验证。比如开发者编写的一小段代码，用于检验被测代码的一个很小的、很明确的功能是否正确。通常而言，一个单元测试是用于判断某个特定条件（或者场景）下某个特定函数的行为。例如，你可能把一个很大的值放入一个有序list 中去，然后确认该值出现在list 的尾部。或者，你可能会从字符串中删除匹配某种模式的字符，然后确认字符串确实不再包含这些字符了。

单元测试的主要目的是：提升代码质量，兼容各种边界条件，降低出错率；也能一定程度提高开发

常见的 JS 单元测试框架有 [mocha](https://mochajs.org/)，[jesmine](https://jasmine.github.io/)，[Karma](https://karma-runner.github.io/)等，本次主要介绍的是Jest单元测试框架。



## Jest简介

Jest 是 Facebook 开源的一款 JS 单元测试框架，它也是 React 目前使用的单元测试框架。 目前除了 Facebook 外，Twitter、Nytimes、Airbnb 也在使用 Jest。Jest 除了基本的断言和 Mock 功能外，还有快照测试、实时监控模式、覆盖度报告等实用功能。 同时 Jest 几乎不需要做任何配置便可使用。



## 入门

#### 安装依赖

```bash
npm install --save-dev jest
```



#### 一个简单的测试

编写sum函数

```js
// src/sum.js
function sum (a, b) {
  return a + b;
}

module.exports = sum;
```

编写sum测试

```js
// test/sum.test.js
const sum = require('../src/sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

配置 package.json

```json
{
	...
  "scripts": {
    "test": "jest"
  },
  ...
}
```

运行测试

```
npm test
```

不出意外就是

```bash
❯ npm test    

> jest@1.0.0 test
> jest

 PASS  test/sum.test.js
  ✓ adds 1 + 2 to equal 3 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.104 s, estimated 1 s
Ran all test suites.
```

该测试使用`expect`和`toBe`来测试两个值是否完全相同。



#### Jest匹配器

当你写测试，你经常需要检查值满足一定的条件。 `expect` 让您可以访问一些“匹配器”，使用各种方法进行测试，让您验证不同的东西; 使用各种方法进行测试



##### `expect(value)`

每次要测试一个值时都会使用`expect`函数。 

```js
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

比如上面的代码，你有一个sum相加方法，`sum(1, 2)`得到的是一个值，`expect`返回了一个"预期"的对象。



##### `toBe`

`toBe`使用 `Object.is`来进行精准匹配的测试。



##### `toEqual`

`toEqual`使用一般是用来判断对象，递归检查对象或数组的每个字段。

```js
test('对象赋值', () => {
  const data = { a: '123' };
  data['b'] = '456';
  expect(data).toEqual({ a: '123', b: '456' });
});
```

结果

```bash
  PASS  test/to-equal.test.js
  ✓ 对象赋值 (1 ms)
```

您还可以测试相反的匹配︰

```js
test('adds 1 + 2 not to equal 3', () => {
  expect(sum(1, 2)).not.toBe(4);
});
```



##### 真值

代码中的`undefined`, `null`, 以及 `false`有不同含义，若你在测试时不想区分他们，可以用真值判断。

- `toBeNull` 只匹配 `null`
- `toBeUndefined` 只匹配 `undefined`
- `toBeDefined` 与 `toBeUndefined` 相反
- `toBeTruthy` 匹配任何 `if` 语句为真
- `toBeFalsy` 匹配任何 `if` 语句为假

```js
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});

test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});
```



##### 数字

大多数的比较数字有等价的匹配器。

- `toBeGreaterThan` 大于，expect值 > toBeGreaterThan里面的值
- `toBeGreaterThanOrEqual` 大于等于，expect值 >= toBeGreaterThan里面的值
- `toBeLessThan` 小于，expect值 < toBeGreaterThan里面的值
- `toBeLessThanOrEqual` 小于等于，expect值 <= toBeGreaterThan里面的值

```js
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe和toEqual在数字上是等价的
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```



##### 字符串

您可以检查对具有 `toMatch` 正则表达式的字符串︰

```js
test('there is no f in abcde', () => {
  expect('abcde').not.toMatch(/f/);
});

test('but there is a "abc" in abcdefg', () => {
  expect('abcdefg').toMatch(/abc/);
});
```



##### 数组和可迭代对象

你可以通过 `toContain`来检查一个数组或可迭代对象是否包含某个特定项：

```js
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'milk',
];

test('shoppingList数组中包含milk', () => {
  expect(shoppingList).toContain('milk');
  expect(new Set(shoppingList)).toContain('milk');
});
```



##### 异常错误

若你想测试某函数在调用时是否抛出了错误，你需要使用 `toThrow`。

```js
function compileCode() {
  throw new Error('you are using the wrong');
}

test('compiling code goes as expected', () => {
  expect(() => compileAndroidCode()).toThrow();
  expect(() => compileAndroidCode()).toThrow(Error);

  // 你可以自己定义确切的错误消息内容或者使用正则表达式
  expect(() => compileAndroidCode()).toThrow('you are using the wrong');
  expect(() => compileAndroidCode()).toThrow(/JDK/);
});
```

匹配器的完整列表，请查阅 [参考文档](https://jestjs.io/zh-Hans/docs/expect)。



## 异步测试

在JavaScript中执行异步代码是很常见的。 当你有以异步方式运行的代码时，Jest 需要知道当前它测试的代码是否已完成，然后它可以转移到另一个测试。 Jest有若干方法处理这种情况。



#### 回调

最常见的异步模式是回调函数。

例如，假设您有一个 `fetchData(callback)` 函数，获取一些数据并在完成时调用 `callback(data)`。 你期望返回的数据是一个字符串 `'peanut butter'`

默认情况下，一旦到达运行上下文底部Jest测试立即结束。 这样意味着这个测试将不能按预期工作。

```js
const fetchData = (callback) => {
  setTimeout(() => {
    callback('peanut butter')
  }, 5000);
}

// 不要这样做！！！
test('the data is peanut butter', () => {
  function callback(data) {
    expect(data).toBe('peanut butter');
  }

  fetchData(callback);
});
```

问题在于一旦`fetchData`执行结束，此测试就在调用回调函数前结束了（因为同步代码结束后，才是异步拿到的数据）。

解决方法是调用 `done`，Jest会等`done`回调函数被调用执行结束后，再结束测试。

```js
test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }

  fetchData(callback);
});
```

若 `done()` 函数从未被调用，测试用例执行失败，显示超时错误。



#### Promise

如果你使用Promise，则测试异步代码有一种更简单的方案。 为你的测试返回一个Promise，则Jest会等待Promise的resove状态 如果 Promise 被拒绝，则测试将自动失败。

```js
const fetchData = () => new Promise(resolve => resolve('peanut butter'))

test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
```

如果期望Promise被Reject，则需要使用 `.catch` 方法。

```js
const fetchData = () => new Promise((resolve, reject) => reject('error'))

test('the fetch fails with an error', () => {
  return fetchData().catch(e => expect(e).toMatch('error'));
});
```

`.resolves` / `.rejects`

您还可以使用 `.resolves` 匹配器在您期望的声明，Jest 会等待这一 Promise 来解决。 如果 Promise 被拒绝，则测试将自动失败。

```js
const fetchData = () => new Promise(resolve => resolve('peanut butter'))

test('the data is peanut butter', () => {
  return expect(fetchData()).resolves.toBe('peanut butter');
});
```



#### Async/Await

或者，您可以在测试中使用 `async` 和 `await`。 写异步测试用例时，可以在传递给`test`的函数前面加上`async`。 例如，可以用来测试相同的 `fetchData` 方案︰

```js
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```



## 安装和移除

写测试的时候你经常需要在运行测试前做一些准备工作，和在运行测试后进行一些整理工作。 Jest 提供辅助函数来处理这个问题。



#### beforeEach/afterEach

beforeEach会在每个测试之前调用；afterEach会在每个测试之后调用

```js
let cities = []
const initializeCityDatabase = () => cities.push('Guangzhou', 'Beijing', 'Shanghai')
const clearCityDatabase = () => (cities = [])

const isCity = (city) => cities.indexOf(city) !== -1

beforeEach(() => {
  initializeCityDatabase();
});
afterEach(() => {
  clearCityDatabase();
});

test('city database has Guangzhou', () => {
  expect(isCity('Guangzhou')).toBeTruthy();
});

test('city database has Shanghai', () => {
  expect(isCity('Shanghai')).toBeTruthy();
});
```



#### beforeAll/afterAll

beforeEach和afterEach会在每个测试调用一次，多个测试会影响性能。beforeAll和afterAll只会调用一次，解决问题。

```js
beforeAll(() => {
  initializeCityDatabase();
});
afterAll(() => {
  clearCityDatabase();
});

test('city database has Guangzhou', () => {
  expect(isCity('Guangzhou')).toBeTruthy();
});

test('city database has Shanghai', () => {
  expect(isCity('Shanghai')).toBeTruthy();
});
```



#### describe（作用域）

默认情况下，`beforeAll` 和 `afterAll` 的块会应用到文件中的每个测试。 此外可以通过 `describe` 块来将测试分组。 当 `beforeAll` 和 `afterAll` 的块在 `describe` 块内部时，则其只适用于该 `describe` 块内的测试。

```js
const cities = ['Guangzhou', 'Beijing', 'Shanghai']
const isCity = (city) => cities.indexOf(city) !== -1

describe('matching cities to Suzhou', () => {
  let cities = []
  // 仅适用于此作用域中的测试
  beforeAll(() => {
    cities = ['Guangzhou', 'Beijing', 'Suzhou']
  });
  const isCity = (city) => cities.indexOf(city) !== -1

  test('city database has Suzhou', () => {
    expect(isCity('Suzhou')).toBe(true);
  });
});

test('city database has Shanghai', () => {
  expect(isCity('Shanghai')).toBe(true);
});
```

注意顶级的`beforeEach` 会比 `describe` 中的`beforeEach` 执行的更早。 

```js
beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));
beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));

test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {
  beforeAll(() => console.log('2 - beforeAll'));
  afterAll(() => console.log('2 - afterAll'));
  beforeEach(() => console.log('2 - beforeEach'));
  afterEach(() => console.log('2 - afterEach'));
  
  test('', () => console.log('2 - test'));
});

// 1 - beforeAll
// 1 - beforeEach
// 1 - test
// 1 - afterEach
// 2 - beforeAll
// 1 - beforeEach
// 2 - beforeEach
// 2 - test
// 2 - afterEach
// 1 - afterEach
// 2 - afterAll
// 1 - afterAll
```



#### describe 和 test 块的执行顺序

Jest 会在所有真正的测试开始*之前*执行测试文件里所有的 describe 处理程序（handlers）。 这是在 `before*` 和 `after*` 处理程序里面 （而不是在 describe 块中）进行准备工作和整理工作的另一个原因。 当 describe 块运行完后,，默认情况下，Jest 会按照 test 出现的顺序依次运行所有测试，等待每一个测试完成并整理好，然后才继续往下走。

简单来说就是先describe，后test

```js
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toEqual(false);
    });
  });

  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```



## 测试React项目

#### Jest + Enzyme

Enzyme 是一个用于 React 的 JavaScript 测试实用程序，可以更轻松地测试 React 组件的输出；旨在通过模仿 jQuery 的 API 来进行 DOM 操作和遍历，从而变得直观和灵活。

#### 安装

```bash
npm i --save-dev enzyme enzyme-adapter-react-16
```

每个适配器可能还有额外的对等依赖项，您也需要安装这些依赖项。例如， 对和`enzyme-adapter-react-16`具有对等依赖项。`react` `react-dom`

您需要配置酶以使用您希望它使用的适配器。为此，您可以使用顶级`configure(...)`API。

```js
// test/setupTests.js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

最后在jest调用配置文件

```js
// jest.config.js
module.exports = {
  "setupFilesAfterEnv": ["<rootDir>/test/setupTests.js"]
}
```

`<rootDir>`默认指的是：包含您的 Jest配置文件 的目录的根目录；可配置

编写一个React组件

```jsx
// src/example.jsx
import React from "react";

const Example = (props) => {
  return (
    <div>
      <button>{props.text}</button>
    </div>
  );
};
export default Example;

```

编写测试

```js
// test/example.test.js
import React from 'react'
import { shallow } from 'enzyme'
import Example from '../src/example'

describe('Enzyme的浅渲染测试套件', function () {
  it('Example组件中按钮的名字为text的值', function () {
    const name = '按钮名'
    const wrapper = shallow(<Example text={name} />)
    expect(wrapper.find('button').text()).toBe(name)
  })
})
```

结果：

```bash
❯ npm test

> react-jest@1.0.0 test
> jest

 PASS  test/example.test.js
  Enzyme的浅渲染测试套件
    ✓ Example组件中按钮的名字为text的值 (3 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.457 s, estimated 1 s
Ran all test suites.
```

第一个测试组件就已经完成了



#### 组件渲染

Enzyme为我们提供来三种渲染组件的方法：

- `shallow` 方法就是官方的[shallow rendering](http://react.caibaojian.com.cn/docs/shallow-renderer.html)的封装。
- `mount`方法用于将React组件加载为真实DOM节点。
- `render` 方法将React组件渲染成静态的HTML字符串，然后分析这段HTML代码的结构，返回一个对象。它跟shallow方法非常像，主要的不同是采用了第三方HTML解析库[Cheerio](https://cheerio.js.org/)，它返回的是一个Cheerio实例对象。



##### shallow

浅层渲染，返回的为对象，用于分析HTML结构，所以无法用于交互测试

```js
import React from "react";
import { shallow } from "enzyme";

const MyComponent = ({ children }) => <div>{children}</div>;
const Foo = () => <div>foo</div>;

describe("MyComponent", function () {
  it("renders three <Foo /> components", function () {
    const wrapper = shallow(
      <MyComponent>
        <Foo />
        <Foo />
        <Foo />
      </MyComponent>
    );
    // toHaveLength 检查对象是否具有.length属性并设置为某个数值。
    expect(wrapper.find(Foo)).toHaveLength(3);
  });

  it("renders an `.icon-star`", () => {
    const wrapper = shallow(
      <MyComponent>
        <div className="icon-star">star</div>
      </MyComponent>
    );
    expect(wrapper.find(".icon-star")).toHaveLength(1);
  });

  it('renders children when passed in', () => {
    const wrapper = shallow((
      <MyComponent>
        <div className="unique" />
      </MyComponent>
    ));
    expect(wrapper.contains(<div className="unique" />)).toBeTruthy();
  });

});
```

`.find(selector) => ShallowWrapper`   查找渲染树中与提供的选择器匹配的每个节点。

`.contains(nodeOrNodes) => Boolean`    返回给定节点或节点数组是否位于渲染树中的某个位置。

`.hasClass(className) => Boolean`     返回当前节点是否具有给定的类名。

`.text() => String`     返回当前渲染树中 文本节点的字符串表示形式。

`.html() => String`     返回当前节点的静态 HTML 渲染。

`.get(index) => ReactElement`      返回当前包装器提供的索引处的节点。



##### mount

完整的 DOM 渲染非常适合您拥有可能与 DOM API 交互的组件

完整的 DOM 渲染需要在全局范围内提供完整的 DOM API。这意味着它必须在至少“看起来”像浏览器环境的环境中运行。

先将Jest的测试环境改为jsdom

```js
module.exports = {
  "setupFilesAfterEnv": ["<rootDir>/test/setupTests.js"],
  "testEnvironment": "jsdom"
}
```



```js
import React from "react";
import { mount } from "enzyme";

const Foo = ({ title, onButtonClick }) => {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={onButtonClick}>Foo</button>
    </div>
  );
};

describe("MyComponent", function () {
  it('allows us to set props', () => {
    const wrapper = mount(<Foo title="foo1" />);
    expect(wrapper.props().title).toBe('foo1');
    wrapper.setProps({ title: 'foo2' });
    expect(wrapper.props().title).toBe('foo2');
  });

  test("simulates click events", () => {
    const mockData = { value: 0 }
    const onButtonClick = () => mockData.value = 1
    const wrapper = mount(<Foo onButtonClick={onButtonClick} />);
    wrapper.find("button").simulate("click");
    expect(mockData.value).toBe(1)
  });
});
```

`.simulate(event[, mock]) => ReactWrapper`      模拟当前节点上的事件。

`.props() => Object`     返回根组件的 props。

`.setProps(nextProps[, callback]) => ReactWrapper`     手动设置根组件的 props。

`.state([key]) => Any`      返回根组件的状态。

`.setState(nextState) => ReactWrapper`      手动设置根组件的状态。



##### render

使用的`render`功能从您的 React 树生成 HTML，并分析生成的 HTML 结构。

```js
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
```

完整API参见 [Enzyme API](https://enzymejs.github.io/enzyme/docs/api/)