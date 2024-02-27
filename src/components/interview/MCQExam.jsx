"use client";
import { useState } from "react";

const MCQ = (props) => {
  console.log(props);
  const [correctIndex, setCorrectIndex] = useState(null);

  const handleCorrectChange = (index) => {
    console.log(index, "jdhfgudsyfgy");
    setCorrectIndex(index);
    let temp = props.answers;
    temp[props.q_id] = props.options[index].text;
    console.log(temp);
    props.setAnswers(temp);
  };

  return (
    <div className="w-1/2 flex flex-col mt-5 rounded border border-gray-300 mx-auto px-4 py-8">
      <p className="text-2xl">{props.question}</p>
      <div className="mb-4">
        {props?.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            {/* <p className="w-40">{option.text}</p> */}

            <div
              className="flex items-center gap-x-2 cursor-pointer"
              onClick={() => handleCorrectChange(index)}
            >
              <div
                className={
                  "w-4 h-4 rounded-full " +
                  (index === correctIndex
                    ? "bg-green-400"
                    : "border border-slate-500")
                }
              ></div>
              <p className="">{option.text}</p>
            </div>

            {/* <input
              type="radio"
              className="form-radio mr-2"
              name="correct"
              checked={index === correctIndex}
              onChange={() => handleCorrectChange(index)}
            /> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCQ;
