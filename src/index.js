/* eslint-disable linebreak-style */
/* eslint-disable react/react-in-jsx-scope, react/jsx-filename-extension, no-unused-vars */

/* @jsx createElement */

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

const state = {
  firstValue: '',
  secondValue: '',
  firstDone: false,
  secondDone: false,
  curOper: '',
};

function render(result) {
  function doOperation() {
    const intValueA = parseInt(state.firstValue, 10);
    const intValueB = parseInt(state.secondValue, 10);
    switch (state.curOper) {
    case '+':
      return intValueA + intValueB;
    case '-':
      return intValueA - intValueB;
    case '/':
      return (intValueA / intValueB).toFixed(2);
    case '*':
      return intValueA * intValueB;
    case '':
      return intValueA;
    default:
    }
    return 0;
  }

  function calculate() {
    const answer = doOperation();
    state.firstValue = answer;
    state.secondDone = false;
    state.secondValue = '';
    render(answer);
  }

  function onClickNum(n) {
    if (!state.firstDone) {
      state.firstValue += n; // '' + '3'
      render(state.firstValue);
    } else {
      state.secondValue += n;
      state.secondDone = true;
      render(state.secondValue);
    }
  }

  function onClickOper(s) {
    // '='이면 바로 계산
    if (s === '=' && state.firstDone && state.secondDone) return calculate();

    // '='가 아닌경우
    if (!state.firstDone) {
      state.firstDone = true;
    } else if (state.firstDone && state.secondDone) {
      calculate();
    }
    state.curOper = s;
    return 0;
  }

  const element = (
    <div>
      <p>간단 계산기</p>
      <div id="result">{result}</div>
      <br />
      <div>
        {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((i) => (
          <button type="button" onClick={() => onClickNum(i)}>{i}</button>
        ))}
      </div>
      <br />
      <div>
        {['+', '-', '*', '/', '='].map((s) => (
          <button type="button" onClick={() => onClickOper(s)}>{s}</button>
        ))}
      </div>
    </div>
  );

  document.getElementById('app').textContent = '';
  document.getElementById('app').appendChild(element);
}

render('0');
