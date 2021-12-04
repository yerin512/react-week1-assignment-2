/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

const app = document.getElementById('app');
const operators = ['+', '-', '*', '/', '='];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const operatorFunctions = {
  '+': (x, y) => x + y,
  '-': (x, y) => x - y,
  '*': (x, y) => x * y,
  '/': (x, y) => x / y,
  '=': (x, y) => x,
  '': (x, y) => y,
};

const initialState = {
  accumulator: 0,
  number: 0,
  operator: '',
};

function createElement(tagName, props, ...children) {
  const element = document.createElement(tagName);

  Object.entries(props || {}).forEach(([key, value]) => {
    element[key.toLowerCase()] = value;
  });

  children.flat().forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
      return;
    }
    element.appendChild(document.createTextNode(child));
  });

  return element;
}

function render({ accumulator, number, operator }) {
  function handleClickReset() {
    render(initialState);
  }

  function handleClickNumber(value) {
    render({
      accumulator,
      number: number * 10 + value,
      operator,
    });
  }

  function handleClickOperator(value) {
    render({
      accumulator: operatorFunctions[operator](accumulator, number),
      number: 0,
      operator: value,
    });
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>
        accumulator:
        {accumulator}
      </p>

      <p>
        현재 클릭된 숫자:
        {number}
      </p>
      <p>
        현재 클릭된 연산자:
        {operator}
      </p>
      <p>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => (
          <button type="button" onClick={() => handleClickNumber(item)}>
            {item}
          </button>
        ))}
      </p>
      <p>
        {['+', '-', '*', '/', '='].map((item) => (
          <button type="button" onClick={() => handleClickOperator(item)}>
            {item}
          </button>
        ))}
        <button type="button" onClick={() => handleClickReset()}>
          RESET
        </button>
      </p>

    </div>
  );

  app.textContent = '';
  app.appendChild(element);
}

render(initialState);
