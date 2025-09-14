import React, { useState } from "react";

const Button = ({ text, onClick, clsName = "" }) => {
  return (
    <div className="btn-div">
      <button className={`btn ${clsName}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

const Calculator = () => {
  const [calc, setCalc] = useState({ num: "", res: 0, sign: "" });

  const handleNumber = (d) => {
    setCalc((prev) => {
      if (d === "." && prev.num.includes(".")) return prev;
      const nextNum = prev.num === "0" && d !== "." ? d : prev.num + d;
      return { ...prev, num: nextNum };
    });
  };

  const calculate = (a, b, s) => {
    switch (s) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
      default:
        return b;
    }
  };

  const handleOperation = (op) => {
    if (op === "=") {
      setCalc((prev) =>
        !prev.sign || prev.num === ""
          ? prev
          : {
              num: "",
              res: calculate(prev.res, +prev.num, prev.sign),
              sign: "",
            }
      );
      return;
    }
    setCalc((prev) => {
      if (prev.num === "" && prev.sign) {
        return { ...prev, sign: op };
      }
      //   console.log(prev, op);
      const res =
        prev.sign && prev.num !== ""
          ? calculate(prev.res, +prev.num, prev.sign)
          : prev.num !== ""
          ? +prev.num
          : prev.res;
      return { num: "", res, sign: op };
    });
  };

  const handleUnaryOperation = (op) => {
    setCalc((prev) => {
      if (op === "+/-") {
        if (prev.num)
          return {
            ...prev,
            num: prev.num.startsWith("-") ? prev.num.slice(1) : "-" + prev.num,
          };
        return { ...prev, res: -prev.res };
      }
      if (op === "%") {
        if (prev.num) return { ...prev, num: String(+prev.num / 100) };
        return { ...prev, res: prev.res / 100 };
      }
      if (op === ".") {
        if (!prev.num.includes("."))
          return { ...prev, num: prev.num ? prev.num + "." : "0." };
        return prev;
      }
      return prev;
    });
  };

  const clearAll = () => setCalc({ num: "", res: 0, sign: "" });
  const backspace = () =>
    setCalc((prev) => ({ ...prev, num: prev.num.slice(0, -1) }));

  return (
    <div className="calc-container">
      <div className="input-div">
        <span>{calc.num !== "" ? calc.num : String(calc.res)}</span>
      </div>
      <div className="calc-div">
        <Button clsName="lgrey" text="AC" onClick={clearAll} />
        <Button clsName="lgrey" text="C" onClick={backspace} />
        <Button
          clsName="lgrey"
          text="%"
          onClick={() => handleUnaryOperation("%")}
        />
        <Button
          clsName="orange"
          text="/"
          onClick={() => handleOperation("/")}
        />
      </div>
      <div className="calc-div">
        <Button clsName="dgrey" text="7" onClick={() => handleNumber("7")} />
        <Button clsName="dgrey" text="8" onClick={() => handleNumber("8")} />
        <Button clsName="dgrey" text="9" onClick={() => handleNumber("9")} />
        <Button
          clsName="orange"
          text="x"
          onClick={() => handleOperation("*")}
        />
      </div>
      <div className="calc-div">
        <Button clsName="dgrey" text="4" onClick={() => handleNumber("4")} />
        <Button clsName="dgrey" text="5" onClick={() => handleNumber("5")} />
        <Button clsName="dgrey" text="6" onClick={() => handleNumber("6")} />
        <Button
          clsName="orange"
          text="-"
          onClick={() => handleOperation("-")}
        />
      </div>
      <div className="calc-div">
        <Button clsName="dgrey" text="1" onClick={() => handleNumber("1")} />
        <Button clsName="dgrey" text="2" onClick={() => handleNumber("2")} />
        <Button clsName="dgrey" text="3" onClick={() => handleNumber("3")} />
        <Button
          clsName="orange"
          text="+"
          onClick={() => handleOperation("+")}
        />
      </div>
      <div className="calc-div">
        <Button
          clsName="lgrey"
          text="+/-"
          onClick={() => handleUnaryOperation("+/-")}
        />
        <Button clsName="dgrey" text="0" onClick={() => handleNumber("0")} />
        <Button
          clsName="lgrey"
          text="."
          onClick={() => handleUnaryOperation(".")}
        />
        <Button
          clsName="orange"
          text="="
          onClick={() => handleOperation("=")}
        />
      </div>
    </div>
  );
};

export default Calculator;
