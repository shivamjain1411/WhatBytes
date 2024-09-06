"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const PercentileGraph = ({
  initialPercentile = 30,
  initialRank = 1,
  initialCorrectAnswers = 10,
}) => {
  const [percentile, setPercentile] = useState(initialPercentile);
  const [rank, setRank] = useState(initialRank);
  const [correctAnswers, setCorrectAnswers] = useState(initialCorrectAnswers);
  const [data, setData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  const otherStudents = [
    10, 20, 30, 40, 50, 50, 50, 50, 65, 70, 75, 80, 85, 90, 95,
  ];

  useEffect(() => {
    generateData();
  }, [percentile]);

  const generateData = () => {
    const newData = [];
    for (let i = 0; i <= 100; i += 1) {
      let value = 0;
      otherStudents.forEach((studentPercentile) => {
        value += Math.exp(-Math.pow((i - studentPercentile) / 10, 2));
      });
      value += 2 * Math.exp(-Math.pow((i - percentile) / 10, 2));
      newData.push({ x: i, y: value, dot: i % 25 === 0 });
    }
    setData(newData);
  };

  const maxY = Math.max(...data.map((point) => point.y));

  const handleUpdate = () => {
    setIsUpdating(true);
  };

  const handleSave = () => {
    setIsUpdating(false);
    console.log("Updated data:", { rank, percentile, correctAnswers });
  };

  const handleCancel = () => {
    setIsUpdating(false);
    setRank(initialRank);
    setPercentile(initialPercentile);
    setCorrectAnswers(initialCorrectAnswers);
  };

  const totalQuestions = 15;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const pieData = [
    { name: "Correct", value: correctAnswers },
    { name: "Incorrect", value: incorrectAnswers },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="relative">
      {/* Main Content */}
      <div
        className={`w-full mx-auto p-4 bg-white rounded-lg shadow-md transition-opacity duration-300 ${
          isUpdating ? "opacity-50" : "opacity-100"
        }`}
      >
        <div className="ml-[4%] mr-2[%]">
          Skill set
          <div className="md:flex my-4 ">
            <div className="md:w-7/12">
              <div className="flex justify-between mr-10 border rounded-lg py-3 pr-5">
                <div className="mx-3">
                  <img
                    src="https://cdn0.iconfinder.com/data/icons/HTML5/512/HTML_Logo.png"
                    className="w-16 h-auto"
                  />
                </div>
                <div className="">
                  <h2 className="text-xl font-bold mb-4">
                    Hyper Text Markup Language
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 font-semibold">
                    Questions: 08 | Duration: 15 mins | Submitted on 5 June 2021
                  </p>
                </div>
                <div className=" flex items-center">
                  {!isUpdating && (
                    <button
                      onClick={handleUpdate}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
              <div className="mr-10 border rounded-lg my-6 pr-5 pl-3">
                <div className="mb-3 mx-3 ">
                  <h3 className="text-lg font-bold">Quick Statistics</h3>
                </div>

                <div className="flex justify-between mb-4">
                  <div className="flex border-0 border-r-2 pr-3">
                    <div>
                      <img
                        src="https://img.freepik.com/free-vector/trophy_78370-345.jpg?w=740&t=st=1725609231~exp=1725609831~hmac=7f980c107ec8c045d4c8cfefa3e1f09b074dfcb2fb44254cab2178cdcab87a13"
                        className="h-12 w-auto"
                      />
                    </div>
                    <div>
                      <div className="text-xl font-bold">{rank}</div>
                      <div className="text-sm text-gray-600">YOUR RANK</div>
                    </div>
                  </div>
                  <div className="">
                    <div className="flex">
                      <div>
                        <img
                          src="https://www.svgrepo.com/show/41668/clipboard.svg"
                          className="w-12 h-auto"
                        />
                      </div>
                      <div>
                        <div className="text-xl font-bold">{percentile}%</div>
                        <div className="text-sm text-gray-600">PERCENTILE</div>
                      </div>
                    </div>
                  </div>
                  <div className=" border-l-2 pl-3">
                    <div className="flex">
                      <div>
                        <img
                          src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/confirm-icon.png"
                          className="w-12 h-auto"
                        />
                      </div>
                      <div>
                        <div className="text-xl font-bold">
                          {correctAnswers}/15
                        </div>
                        <div className="text-sm text-gray-600">
                          CORRECT ANSWERS
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" mr-10 border rounded-lg py-3 pr-5">
                <div className="ml-8">
                  <h3 className="text-lg font-bold mb-2">Comparison Graph</h3>
                </div>
                <div className="ml-8">
                  <p className="mb-4">
                    <span className="text-gray-500 font-bold">
                      You scored {percentile}% percentile{" "}
                    </span>
                    which is {percentile < 72 ? "lower" : "higher"} than the
                    average percentile 72% of all the engineers who took this
                    assessment
                  </p>
                </div>
                <div className="h-64 w-full pl-7">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={data}
                      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                    >
                      <Line
                        type="monotone"
                        dataKey="y"
                        stroke="#8884d8"
                        dot={(props) => {
                          if (props.payload.dot) {
                            return (
                              <circle
                                cx={props.cx}
                                cy={props.cy}
                                r={3}
                                fill="#8884d8"
                              />
                            );
                          }
                          return null;
                        }}
                      />
                      <XAxis
                        dataKey="x"
                        ticks={[0, 25, 50, 75, 100]}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <YAxis hide domain={[0, maxY]} />
                      <Tooltip
                        content={({ payload, label }) => {
                          if (payload && payload.length) {
                            return (
                              <div className="bg-white border p-2 shadow-md">
                                <p className="text-sm">Percentile: {label}%</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <ReferenceDot
                        x={percentile}
                        y={data.find((point) => point.x === percentile)?.y || 0}
                        r={6}
                        fill="#ff0000"
                        stroke="none"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="md:w-5/12">
              <div className="border rounded-lg ">
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-8">
                    Syllabus Wise Analysis
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between my-4">
                        <span className="my-2 font-semibold">
                          HTML Tools, Forms, History
                        </span>
                        <span className="font-semibold text-blue-600">80%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded">
                        <div
                          className="bg-blue-600 h-2 rounded"
                          style={{ width: "80%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between my-4">
                        <span className="my-2 font-semibold">
                          Tags & References in HTML
                        </span>
                        <span className="font-semibold text-orange-400">
                          60%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded">
                        <div
                          className="bg-orange-400 h-2 rounded"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between my-4">
                        <span className="my-2 font-semibold">
                          Tables & References in HTML
                        </span>
                        <span className="font-semibold text-red-400">24%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded">
                        <div
                          className="bg-red-400 h-2 rounded"
                          style={{ width: "24%" }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between my-4">
                        <span className="my-2 font-semibold">
                          Tables & CSS Basics
                        </span>
                        <span className="font-semibold text-green-400">
                          96%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded">
                        <div
                          className="bg-green-400 h-2 rounded"
                          style={{ width: "96%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="h-80 border rounded-lg my-4">
                  <div className="flex justify-between px-8">
                    <div className="text-lg font-bold py-2">
                      Question Analysis
                    </div>
                    <div className="text-lg text-blue-600 font-bold">
                      {correctAnswers}/15
                    </div>
                  </div>
                  <div className="px-8">
                    <span className="text-gray-500 font-bold">
                      You scored {correctAnswers} questions correct out of 15{" "}
                    </span>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        outerRadius={90}
                        innerRadius={60}
                        paddingAngle={5}
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Update Form */}
      {isUpdating && (
        <div className="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h4 className="text-lg font-semibold mb-2">Update scores</h4>
            <div className="space-y-2">
              <div>
                <label
                  htmlFor="rank"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update your Rank
                </label>
                <input
                  type="number"
                  id="rank"
                  value={rank}
                  onChange={(e) => setRank(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="percentile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update your Percentile
                </label>
                <input
                  type="number"
                  id="percentile"
                  value={percentile}
                  onChange={(e) => setPercentile(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label
                  htmlFor="correctAnswers"
                  className="block text-sm font-medium text-gray-700"
                >
                  Update your Current Score (out of 15)
                </label>
                <input
                  type="number"
                  id="correctAnswers"
                  value={correctAnswers}
                  onChange={(e) => setCorrectAnswers(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleCancel}
                className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PercentileGraph;
