/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */
/* @jsx createElement */

const NUMPAD_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const OPERATORS = [
  { operator: '+', calculate: (x, y) => x + y },
  { operator: '-', calculate: (x, y) => x - y },
  { operator: '*', calculate: (x, y) => x * y },
  { operator: '/', calculate: (x, y) => x / y },
];

const INITIAL_STATE = {
  operator: '',
  x: 0,
  y: 0,
  display: 0,
};

function render(state) {
  const calculate = () => {
    const result = state.operator.calculate(state.x, state.y);

    render({
      ...INITIAL_STATE,
      result,
      x: result,
      display: result,
    });
  };

  const handleNumPadClick = (number) => {
    if (!state.y && !state.operator) {
      const x = parseInt(`${state.x}${number}`, 10);

      render({
        ...state,
        x,
        display: x,
      });
      return;
    }

    if (state.operator) {
      const y = parseInt(`${state.y}${number}`, 10);

      render(
        {
          ...state,
          y,
          display: y,
        },
      );
    }
  };

  const handleOperatorClick = (nextOperator) => {
    if (state.operator) {
      const result = state.operator.calculate(state.x, state.y);
      render({
        ...INITIAL_STATE,
        operator: nextOperator,
        result,
        x: result,
        display: result,
      });
      return;
    }

    render({
      ...state,
      operator: nextOperator,
    });
  };

  const handleCalculateClick = () => {
    calculate();
  };

  const element = (
    <div>
      <p>간단 계산기</p>
      <p>{state.display}</p>
      {/* <p>{JSON.stringify(state)}</p> */}
      <p>
        {NUMPAD_NUMBERS.map((number) => (
          <button type="button" onClick={() => handleNumPadClick(number)}>{number}</button>
        ))}
      </p>
      <p>
        {OPERATORS.map((operator) => (
          <button type="button" onClick={() => handleOperatorClick(operator)}>{operator.operator}</button>
        ))}
        <button type="button" onClick={handleCalculateClick}>=</button>
      </p>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render(INITIAL_STATE);

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
