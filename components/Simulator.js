import React from "react";
import { useState, useRef, useEffect } from "react";
import QueryAPI from "./QueryAPI";
import Link from "next/link";

const Direction = {
  NORTH: 0,
  EAST: 2,
  SOUTH: 4,
  WEST: 6,
  SKIP: 8,
};

const ObDirection = {
  NORTH: 0,
  EAST: 2,
  SOUTH: 4,
  WEST: 6,
  SKIP: 8,
};

const DirectionToString = {
  0: "Up",
  2: "Right",
  4: "Down",
  6: "Left",
  8: "None",
};

const transformCoord = (x, y) => {
  // Change the coordinate system from (0, 0) at top left to (0, 0) at bottom left
  return { x: 19 - y, y: x };
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Simulator() {
  const [robotState, setRobotState] = useState({
    x: 1,
    y: 1,
    d: Direction.NORTH,
    s: -1,
  });
  const [robotX, setRobotX] = useState(1);
  const [robotY, setRobotY] = useState(1);
  const [robotDir, setRobotDir] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [obXInput, setObXInput] = useState(0);
  const [obYInput, setObYInput] = useState(0);
  const [directionInput, setDirectionInput] = useState(ObDirection.NORTH);
  const [isComputing, setIsComputing] = useState(false);
  const [path, setPath] = useState([]);
  const [commands, setCommands] = useState([]);
  const [page, setPage] = useState(0);

  const generateNewID = () => {
    while (true) {
      let new_id = Math.floor(Math.random() * 10) + 1; // just try to generate an id;
      let ok = true;
      for (const ob of obstacles) {
        if (ob.id === new_id) {
          ok = false;
          break;
        }
      }
      if (ok) {
        return new_id;
      }
    }
  };

  const generateRobotCells = () => {
    const robotCells = [];
    let markerX = 0;
    let markerY = 0;

    if (Number(robotState.d) === Direction.NORTH) {
      markerY++;
    } else if (Number(robotState.d) === Direction.EAST) {
      markerX++;
    } else if (Number(robotState.d) === Direction.SOUTH) {
      markerY--;
    } else if (Number(robotState.d) === Direction.WEST) {
      markerX--;
    }

    // Go from i = -1 to i = 1
    for (let i = -1; i < 2; i++) {
      // Go from j = -1 to j = 1
      for (let j = -1; j < 2; j++) {
        // Transform the coordinates to our coordinate system where (0, 0) is at the bottom left
        const coord = transformCoord(robotState.x + i, robotState.y + j);
        // If the cell is the marker cell, add the robot state to the cell
        if (markerX === i && markerY === j) {
          robotCells.push({
            x: coord.x,
            y: coord.y,
            d: robotState.d,
            s: robotState.s,
          });
        } else {
          robotCells.push({
            x: coord.x,
            y: coord.y,
            d: null,
            s: -1,
          });
        }
      }
    }

    return robotCells;
  };

  const onChangeX = (event) => {
    // If the input is an integer and is in the range [0, 19], set ObXInput to the input
    if (Number.isInteger(Number(event.target.value))) {
      const nb = Number(event.target.value);
      if (0 <= nb && nb < 20) {
        setObXInput(nb);
        return;
      }
    }
    // If the input is not an integer or is not in the range [0, 19], set the input to 0
    setObXInput(0);
  };

  const onChangeY = (event) => {
    // If the input is an integer and is in the range [0, 19], set ObYInput to the input
    if (Number.isInteger(Number(event.target.value))) {
      const nb = Number(event.target.value);
      if (0 <= nb && nb <= 19) {
        setObYInput(nb);
        return;
      }
    }
    // If the input is not an integer or is not in the range [0, 19], set the input to 0
    setObYInput(0);
  };

  const onChangeRobotX = (event) => {
    // If the input is an integer and is in the range [1, 18], set RobotX to the input
    if (Number.isInteger(Number(event.target.value))) {
      const nb = Number(event.target.value);
      if (1 <= nb && nb < 19) {
        setRobotX(nb);
        return;
      }
    }
    // If the input is not an integer or is not in the range [1, 18], set the input to 1
    setRobotX(1);
  };

  const onChangeRobotY = (event) => {
    // If the input is an integer and is in the range [1, 18], set RobotY to the input
    if (Number.isInteger(Number(event.target.value))) {
      const nb = Number(event.target.value);
      if (1 <= nb && nb < 19) {
        setRobotY(nb);
        return;
      }
    }
    // If the input is not an integer or is not in the range [1, 18], set the input to 1
    setRobotY(1);
  };

  const onClickObstacle = () => {
    // If the input is not valid, return
    if (!obXInput && !obYInput) return;
    // Create a new array of obstacles
    const newObstacles = [...obstacles];
    // Add the new obstacle to the array
    newObstacles.push({
      x: obXInput,
      y: obYInput,
      d: directionInput,
      id: generateNewID(),
    });
    // Set the obstacles to the new array
    setObstacles(newObstacles);
  };

  const onClickRobot = () => {
    // Set the robot state to the input

    setRobotState({ x: robotX, y: robotY, d: robotDir, s: -1 });
  };

  const onDirectionInputChange = (event) => {
    // Set the direction input to the input
    setDirectionInput(Number(event.target.value));
  };

  const onRobotDirectionInputChange = (event) => {
    // Set the robot direction to the input
    setRobotDir(event.target.value);
  };

  const onRemoveObstacle = (ob) => {
    // If the path is not empty or the algorithm is computing, return
    if (path.length > 0 || isComputing) return;
    // Create a new array of obstacles
    const newObstacles = [];
    // Add all the obstacles except the one to remove to the new array
    for (const o of obstacles) {
      if (o.x === ob.x && o.y === ob.y) continue;
      newObstacles.push(o);
    }
    // Set the obstacles to the new array
    setObstacles(newObstacles);
  };

  const compute = () => {
    // Set computing to true, act like a lock
    setIsComputing(true);
    // Call the query function from the API
    QueryAPI.query(obstacles, robotX, robotY, robotDir, (data, err) => {
      if (data) {
        // If the data is valid, set the path
        setPath(data.data.path);
        // Set the commands
        const commands = [];
        for (let x of data.data.commands) {
          // If the command is a snapshot, skip it
          if (x.startsWith("SNAP")) {
            continue;
          }
          commands.push(x);
        }
        setCommands(commands);
      }
      // Set computing to false, release the lock
      setIsComputing(false);
    });
  };

  const onResetAll = () => {
    // Reset all the states
    setRobotX(1);
    setRobotDir(0);
    setRobotY(1);
    setRobotState({ x: 1, y: 1, d: Direction.NORTH, s: -1 });
    setPath([]);
    setCommands([]);
    setPage(0);
    setObstacles([]);
  };

  const onReset = () => {
    // Reset all the states
    setRobotX(1);
    setRobotDir(0);
    setRobotY(1);
    setRobotState({ x: 1, y: 1, d: Direction.NORTH, s: -1 });
    setPath([]);
    setCommands([]);
    setPage(0);
  };

  const renderGrid = () => {
    // Initialize the empty rows array
    const rows = [];

    const baseStyle = {
      width: 25,
      height: 25,
      borderStyle: "solid",
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      padding: 0,
    };

    // Generate robot cells
    const robotCells = generateRobotCells();

    // Generate the grid
    for (let i = 0; i < 20; i++) {
      const cells = [
        // Header cells
        <td key={i} className="w-5 h-5 md:w-8 md:h-8">
          <span className="text-sky-900 font-bold text-[0.6rem] md:text-base ">
            {19 - i}
          </span>
        </td>,
      ];

      for (let j = 0; j < 20; j++) {
        let foundOb = null;
        let foundRobotCell = null;

        for (const ob of obstacles) {
          const transformed = transformCoord(ob.x, ob.y);
          if (transformed.x === i && transformed.y === j) {
            foundOb = ob;
            break;
          }
        }

        if (!foundOb) {
          for (const cell of robotCells) {
            if (cell.x === i && cell.y === j) {
              foundRobotCell = cell;
              break;
            }
          }
        }

        if (foundOb) {
          if (foundOb.d === Direction.WEST) {
            cells.push(
              <td  className="border border-l-4 border-l-red-500 w-5 h-5 md:w-8 md:h-8 bg-blue-700" />
            );
          } else if (foundOb.d === Direction.EAST) {
            cells.push(
              <td  className="border border-r-4 border-r-red-500 w-5 h-5 md:w-8 md:h-8 bg-blue-700" />
            );
          } else if (foundOb.d === Direction.NORTH) {
            cells.push(
              <td  className="border border-t-4 border-t-red-500 w-5 h-5 md:w-8 md:h-8 bg-blue-700" />
            );
          } else if (foundOb.d === Direction.SOUTH) {
            cells.push(
              <td  className="border border-b-4 border-b-red-500 w-5 h-5 md:w-8 md:h-8 bg-blue-700" />
            );
          } else if (foundOb.d === Direction.SKIP) {
            cells.push(
              <td  className="border w-5 h-5 md:w-8 md:h-8 bg-blue-700" />
            );
          }
        } else if (foundRobotCell) {
          if (foundRobotCell.d !== null) {
            cells.push(
              <td 
                className={`border w-5 h-5 md:w-8 md:h-8 ${
                  foundRobotCell.s != -1 ? "bg-red-500" : "bg-yellow-300"
                }`}
              />
            );
          } else {
            cells.push(
              <td  className="bg-green-600 border-white border w-5 h-5 md:w-8 md:h-8" />
            );
          }
        } else {
          cells.push(
            <td className="border-black border w-5 h-5 md:w-8 md:h-8" />
          );
        }
      }

      rows.push(<tr key={19-i}>{cells}</tr>);
    }

    const yAxis = [<td key={0} />];
    for (let i = 0; i < 20; i++) {
      yAxis.push(
        <td className="w-5 h-5 md:w-8 md:h-8">
          <span className="text-sky-900 font-bold text-[0.6rem] md:text-base ">
            {i}
          </span>
        </td>
      );
    }
    rows.push(<tr key={20}>{yAxis}</tr>);
    return rows;
  };

  useEffect(() => {
    if (page >= path.length) return;
    setRobotState(path[page]);
  }, [page, path]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center text-center bg-sky-200 rounded-xl shadow-xl mb-8">
        <h2 className="card-title text-black pt-4">Algorithm Simulator</h2>
        <div className="card-body items-left text-center p-4">
          <p className="text-black text-justify text-sm md:text-base">
            This is the simulator for the first task of MDP. Specifically, the
            first task involves 4-8 10cm x 10cm x 20cm (W x L x H) obstacles
            that are placed in a 2m x 2m area. The area can be divided into 10cm
            x 10cm squares, and the obstacles will be placed in one of those
            squares. One of the four sides of the obstacle has a symbol card
            pasted on it (refer to the symbol recognition section to find out
            more). The objective is to navigate the robot to each symbol card
            and recognize it successfully in the shortest time possible. The
            algorithm team is in charge of the path finding and navigation,
            which is what the simulator below is for.
          </p>
          <div className="text-left items-left">
            <p className="text-black text-left text-sm md:text-base">
              The algorithm and simulator repositories can be found here:
            </p>
            <ul className="space-y-4 list-inside list-disc text-left text-sm md:text-base text-sky-800 mt-3">
              <li>
                <Link
                  className="  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  href="https://github.com/pyesonekyaw/CZ3004-SC2079-MDP-Algorithm"
                >
                  Algorithm Repository
                </Link>
              </li>
              <li>
                <Link
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  href="https://github.com/pyesonekyaw/CZ3004-SC2079-MDP-Simulator"
                >
                  Simulator Repository
                </Link>
              </li>
            </ul>
          </div>
          <p className="text-black text-justify text-sm md:text-base">
            Algorithm has been tested to be able to handle all the edge cases
            that we can think of, but of course it is far from perfect. As teams
            are given 2 minutes of preparation time before the robot is supposed
            to start and after the reveal of the obstacle positions, we conduct
            an extensive search of all possible paths to find the shortest
            possible. As such, for situations where there are 7-8 obstacles, the
            time taken to run the algorithm can be upwards of 1 minute on a 2023
            Macbook Pro M2 Max. For the simulator below, it is recommended
            against running a 7-8 obstacle simulation as it will take a long
            time to load. Please obtain the source code from the link above and
            run it locally if you wish to simulate 7-8 obstacles.
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center text-center bg-sky-200 rounded-xl shadow-xl">
        <div className="card-body items-center text-center p-4">
          <h2 className="card-title text-black">Robot Position</h2>
          <div className="form-control">
            <label className="input-group input-group-horizontal">
              <span className="bg-primary p-2">X</span>
              <input
                onChange={onChangeRobotX}
                type="number"
                placeholder="1"
                min="1"
                max="18"
                className="input input-bordered  text-blue-900 w-20"
              />
              <span className="bg-primary p-2">Y</span>
              <input
                onChange={onChangeRobotY}
                type="number"
                placeholder="1"
                min="1"
                max="18"
                className="input input-bordered  text-blue-900 w-20"
              />
              <span className="bg-primary p-2">D</span>
              <select
                onChange={onRobotDirectionInputChange}
                value={robotDir}
                className="select text-blue-900 py-2 pl-2 pr-6"
              >
                <option value={ObDirection.NORTH}>Up</option>
                <option value={ObDirection.SOUTH}>Down</option>
                <option value={ObDirection.WEST}>Left</option>
                <option value={ObDirection.EAST}>Right</option>
              </select>
              <button className="btn btn-success p-2" onClick={onClickRobot}>
                Set
              </button>
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center text-center bg-sky-200 p-4 rounded-xl shadow-xl m-8">
        <h2 className="card-title text-black pb-2">Add Obstacles</h2>
        <div className="form-control">
          <label className="input-group input-group-horizontal">
            <span className="bg-primary p-2">X</span>
            <input
              onChange={onChangeX}
              type="number"
              placeholder="1"
              min="0"
              max="19"
              className="input input-bordered  text-blue-900 w-20"
            />
            <span className="bg-primary p-2">Y</span>
            <input
              onChange={onChangeY}
              type="number"
              placeholder="1"
              min="0"
              max="19"
              className="input input-bordered  text-blue-900 w-20"
            />
            <span className="bg-primary p-2">D</span>
            <select
              onChange={onDirectionInputChange}
              value={directionInput}
              className="select text-blue-900 py-2 pl-2 pr-6"
            >
              <option value={ObDirection.NORTH}>Up</option>
              <option value={ObDirection.SOUTH}>Down</option>
              <option value={ObDirection.WEST}>Left</option>
              <option value={ObDirection.EAST}>Right</option>
              <option value={ObDirection.SKIP}>None</option>
            </select>
            <button className="btn btn-success p-2" onClick={onClickObstacle}>
              Add
            </button>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-x-2 gap-y-4 items-center">
        {obstacles.map((ob) => {
          return (
            <div
              key={ob}
              className="badge flex flex-row text-black bg-sky-100 rounded-xl text-xs md:text-sm h-max border-cyan-500"
            >
              <div flex flex-col>
                <div>X: {ob.x}</div>
                <div>Y: {ob.y}</div>
                <div>D: {DirectionToString[ob.d]}</div>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 stroke-current"
                  onClick={() => onRemoveObstacle(ob)}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      <div className="btn-group btn-group-horizontal py-4">
        <button className="btn btn-error" onClick={onResetAll}>
          Reset All
        </button>
        <button className="btn btn-warning" onClick={onReset}>
          Reset Robot
        </button>
        <button className="btn btn-success" onClick={compute}>
          Submit
        </button>
      </div>

      {path.length > 0 && (
        <div className="flex flex-row items-center text-center bg-sky-200 p-4 rounded-xl shadow-xl my-8">
          <button
            className="btn btn-circle pt-2 pl-1"
            disabled={page === 0}
            onClick={() => {
              setPage(page - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>

          <span className="mx-5 text-black">
            Step: {page + 1} / {path.length}
          </span>
          <span className="mx-5 text-black">{commands[page]}</span>
          <button
            className="btn btn-circle pt-2 pl-2"
            disabled={page === path.length - 1}
            onClick={() => {
              setPage(page + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
      )}
      <table className="border-collapse border-none border-black ">
        <tbody>{renderGrid()}</tbody>
      </table>

      <div className="flex flex-col items-center text-center bg-sky-200 rounded-xl shadow-xl my-8">
        <div className="card-body items-center text-center p-4">
          <h2 className="card-title text-black">Some Thoughts</h2>
          <p className="text-black text-justify text-sm md:text-base">
            By making most of my source code and this simulator available, I
            hope that MDP will change to not be so boring and repetitive where
            teams just reinvent the wheel every single semester, or that future
            teams will be able to build on top of this and make it better.
          </p>
          <p className="text-black text-justify text-sm md:text-base">
            I find that MDP is also incredibly luck-based where one or two
            skilled persons in a team can pretty much change the entire outcome
            for the group. If you are unlucky as to get a group of inexperienced
            people, you have to start from scratch and go blindly into the
            module, and work like hell within just 6 weeks to get something
            viable. This should not be the case, and I hope that my repositories
            can be used as the baseline for future teams to build on top of.
          </p>
          <p className="text-black text-justify text-sm md:text-base">
            Post graduation update: SCSE does NOT care that you reuse code from past semesters (Just take a look at the Android controllers from the past few semesters).
            At least from what my juniors told me, the entire codebase across all my MDP-related repositories is still entirely reusuable for 2023 Semester 1.</p>
          <p className="text-black font-bold font-sans">Acknowledgements</p>
          <ul className="text-sm md:text-base">
            <li>
              <Link
                className="text-black"
                href="https://github.com/CZ3004-Group-28"
              >
                Group 28 - For simulator and algorithm design
              </Link>
            </li>
            <li>
              <Link
                className="text-black"
                href="https://github.com/CZ3004Group27"
              >
                Group 27 - For algorithm design
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
