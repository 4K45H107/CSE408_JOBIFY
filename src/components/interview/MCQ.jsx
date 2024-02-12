"use client";
import { useState } from "react";

const MCQ = (props) => {
  console.log(props);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false },
    { text: "", correct: false },
  ]);
  const [correctIndex, setCorrectIndex] = useState(null);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].text = value;
    setOptions(updatedOptions);
  };

  const handleCorrectChange = (index) => {
    setCorrectIndex(index);
    const updatedOptions = options.map((option, i) => ({
      ...option,
      correct: i === index,
    }));
    setOptions(updatedOptions);
  };

  const handleSubmitQuestion = () => {
    const newMCQ = {
      question,
      options,
    };

    console.log(props.mcqArray);

    props.setMCQArray([...props.mcqArray, newMCQ]);
    props.setAdd(true);
    console.log({ question, options, correctIndex });
    // Send question, options, and correct index to backend
  };

  return (
    <div className="w-1/2 flex flex-col mt-5 rounded border border-gray-300 mx-auto px-4 py-8">
      <label className="block mb-2">Question:</label>
      <input
        type="text"
        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <div className="mb-4">
        <label className="block mb-2">Options:</label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 mr-2 w-full"
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
            <input
              type="radio"
              className="form-radio mr-2"
              name="correct"
              checked={index === correctIndex}
              onChange={() => handleCorrectChange(index)}
            />
            <label className="text-gray-700">Correct</label>
          </div>
        ))}
      </div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        onClick={handleSubmitQuestion}
      >
        Submit
      </button>
    </div>
  );
};

export default MCQ;
