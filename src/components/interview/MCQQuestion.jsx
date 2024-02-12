import React from "react";

const MCQQuestion = ({ question, options }) => {
  return (
    <div className="border p-4 rounded-md mb-4">
      <p className="font-semibold">{question}</p>
      <ul className="list-disc ml-6">
        {options.map((option, index) => (
          <li key={index} className="flex items-center">
            {index + 1}. {"  "}
            {option.text}
            {option.correct && <span className="ml-2 text-green-500">✔</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MCQQuestion;
