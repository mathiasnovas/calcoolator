import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import Button from "../components/button";
import classNames from "classnames";

type OperationType = "add" | "multi" | "sub" | "sqrt" | "div";

type CalculationState = {
  left?: string;
  right?: string;
  operation?: OperationType;
};

const Home: NextPage = () => {
  const debug = false;
  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const [state, setState] = useState<CalculationState>({});
  const [memory, setMemory] = useState<string | null>();
  const [isCalculating, setIsCalculating] = useState<boolean>(false);

  function clear(all: boolean = false) {
    setState({});
    setIsCalculating(false);

    if (all) {
      setMemory(null);
    }
  }

  function handleOperationClick(type: OperationType, direct: boolean = false) {
    setIsCalculating(true);

    // If we have a left number and the direct flag is truthy, we can already
    // calculate the result and show it to the user. Useful for performing
    // operations like square root, where you only need one number.
    if (state.left && direct) {
      const result = calculate(state.left, state.right ?? "0", type);
      setState({ left: result, operation: type });
      return;
    }

    // If both left and right numbers are set, we can already calculate the
    // results and display them to the user without having to click the sum button
    // explicitly.
    if (state.left && state.right) {
      const result = calculate(state.left, state.right, type);
      setState({ left: result, operation: type });
      return;
    }

    setState({ ...state, operation: type });
  }

  function handleDigitClick(digit: string) {
    // If we have the left number, we set the right number.
    if (isCalculating) {
      const newRight = state.right ? `${state.right}` + digit : digit;
      setState({ ...state, right: newRight });
      return;
    }

    const newLeft = state.left ? `${state.left}` + digit : digit;
    setState({ left: newLeft, operation: state.operation });
  }

  function calculate(left: string, right: string, operation: OperationType) {
    const l = +left;
    const r = +right;

    let sum = 0;
    switch (operation) {
      case "add":
        sum = l + r;
        break;

      case "multi":
        sum = l * r;
        break;

      case "div":
        sum = l / r;
        break;

      case "sub":
        sum = l - r;
        break;

      case "sqrt":
        // Perform a square root on either right or left number.
        sum = Math.sqrt(r || l);
        break;

      default:
        break;
    }

    const formattedSum =
      sum.toString().length < 10 ? `${sum}` : `${sum.toFixed(4)}`;

    return formattedSum;
  }

  function handleSumClick() {
    if (!state.left || !state.right || !state.operation) return;

    const result = calculate(state.left, state.right, state.operation);

    setIsCalculating(false);
    setState({ left: result, operation: state.operation });
  }

  return (
    <>
      <Head>
        <title>Calcoolator</title>
        <meta name="description" content="wow such cool calculator" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="h-screen grid place-items-center">
        <div>
          {debug ? (
            <div>
              <div>state:</div>
              {state ? (
                <>
                  <div>left: {state.left}</div>
                  <div>right: {state.right}</div>
                  <div>operation: {state.operation}</div>
                </>
              ) : null}

              <div className="border-t pt-2 mt-2">
                <div>memory: {memory ? memory : null}</div>
              </div>

              <div className="border-t pt-2 mt-2">
                isCalculating: {isCalculating ? "yes" : "no"}
              </div>
            </div>
          ) : null}

          <div className=" p-2 bg-pink-100 rounded shadow-lg border-2 border-black">
            <div className="text-center">CALCOOLATOR 2000</div>

            <div className="mt-2 bg-green-200 border border-green-400 px-2 text-right rounded">
              {state.right ? state.right : state.left ? state.left : "0"}
            </div>

            <div className="mt-2">
              <div className="grid grid-cols-4 space-x-1">
                <Button
                  variant="green"
                  size="small"
                  title="Square root"
                  onClick={() => handleOperationClick("sqrt", true)}
                >
                  √
                </Button>
                <Button
                  title="Memory Save"
                  size="small"
                  variant="blue"
                  onClick={() => {
                    setMemory(
                      isCalculating && state.right ? state.right : state.left
                    );
                  }}
                >
                  MS
                </Button>
                <Button
                  title="Memory Clear"
                  size="small"
                  variant="blue"
                  onClick={() => {
                    setMemory(null);
                  }}
                >
                  MC
                </Button>
                <Button
                  title="Memory Recall"
                  size="small"
                  variant="blue"
                  onClick={() => {
                    if (!memory) return;

                    if (isCalculating) {
                      setState({ ...state, right: memory });
                      return;
                    }

                    setState({ ...state, left: memory });
                  }}
                >
                  MR
                </Button>
              </div>
            </div>

            <div className="flex mt-2">
              <div className="grid grid-cols-3 auto-rows-min gap-1">
                {digits.map((digit, key) => (
                  <div
                    key={key}
                    className={classNames("grid place-items-center", {
                      "col-span-2": digit === "0",
                    })}
                  >
                    <Button
                      className="w-full"
                      onClick={() => handleDigitClick(digit)}
                    >
                      {digit}
                    </Button>
                  </div>
                ))}

                <div className="grid place-items-center">
                  <Button
                    onClick={() => {
                      if (!state.left && !state.right) return;

                      if (
                        isCalculating &&
                        state.right &&
                        !Number.isInteger(+state.right)
                      ) {
                        return;
                      }

                      if (
                        !isCalculating &&
                        state.left &&
                        !Number.isInteger(+state.left)
                      ) {
                        return;
                      }

                      handleDigitClick(".");
                    }}
                  >
                    ,
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1 ml-1">
                <Button title="Clear" variant="orange" onClick={() => clear()}>
                  C
                </Button>
                <Button
                  title="All Clear"
                  variant="orange"
                  onClick={() => clear(true)}
                >
                  AC
                </Button>
                <Button
                  variant="green"
                  onClick={() => handleOperationClick("multi")}
                >
                  &times;
                </Button>
                <Button
                  variant="green"
                  onClick={() => handleOperationClick("div")}
                >
                  &#247;
                </Button>
                <Button
                  variant="green"
                  onClick={() => handleOperationClick("sub")}
                >
                  -
                </Button>
                <Button
                  variant="green"
                  onClick={() => handleOperationClick("add")}
                >
                  &#43;
                </Button>
                <Button
                  className="col-span-2"
                  variant="green"
                  onClick={handleSumClick}
                >
                  &#61;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
