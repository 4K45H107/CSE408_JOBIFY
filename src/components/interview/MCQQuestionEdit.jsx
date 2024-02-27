import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const MCQQuestionEdit = ({ Q_ID, q_id, question, options }) => {
  const [edit, setEdit] = useState(false);
  const [ques, setQuestion] = useState(question);


  const handleClick = () => {
    setEdit(true);
  };

  const [opt, setOptions] = useState(options);
  let corrIndx;

  options.map((option, index) => {
    if (option.correct) {
      corrIndx = index;
    }
  });

  const [correctIndex, setCorrectIndex] = useState(corrIndx);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...opt];
    updatedOptions[index].text = value;
    setOptions(updatedOptions);
  };

  const handleCorrectChange = (index) => {
    setCorrectIndex(index);
    const updatedOptions = opt.map((option, i) => ({
      ...option,
      correct: i === index,
    }));
    setOptions(updatedOptions);
  };

  const handleSubmitQuestion = async () => {
    setEdit(false);
    const newMCQ = {
      qId: q_id,
      question: ques,
      options: opt,
    };

    try {
      const res = await axios.patch(
        `/api/question/editQuestion?questionId=${Q_ID}`,
        newMCQ
      );
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    console.log({ ques, opt, corrIndx });
    // Send question, options, and correct index to backend
  };

  

  return (
    <div>
      {!edit && (
        <div className="border p-4 rounded-md mb-4">
          <p className="font-semibold">{question}</p>
          <ul className="list-disc ml-6">
            {opt.map((option, index) => (
              <li key={index} className="flex items-center">
                {index + 1}. {"  "}
                {option.text}
                {option.correct && (
                  <span className="ml-2 text-green-500">✔</span>
                )}
              </li>
            ))}
          </ul>
          <div className="bg-black rounded w-20">
            <button
              type="submit"
              onClick={handleClick}
              className="text-white w-20 px-4 py-3 active:bg-slate-600 mx-auto"
            >
              Edit
            </button>
          </div>
        </div>
      )}

      {edit && (
        <div>
          <div className="w-1/2 flex flex-col mt-5 rounded border border-gray-300 mx-auto px-4 py-8">
            <label className="block mb-2">Question:</label>
            <input
              type="text"
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
              value={ques}
              placeholder={ques}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <div className="mb-4">
              <label className="block mb-2">Options:</label>
              {opt.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    className="border border-gray-300 rounded-md px-4 py-2 mr-2 w-full"
                    value={option.text}
                    placeholder={option.text}
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
        </div>
      )}
    </div>
  );
};

export default MCQQuestionEdit;
