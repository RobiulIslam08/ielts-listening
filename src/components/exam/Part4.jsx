import NumberedInput from "./NumberedInput";

export default function Part4({ answers, setAnswer, currentQ, setCurrentQ, qRefs }) {
  const iprops = (num) => ({
    num,
    answers,
    setAnswer,
    qRefs,
    currentQ,
    setCurrentQ,
  });

  return (
    <div className="mx-auto w-full max-w-[1000px] px-4 text-[15px] text-black pb-20">
      <div className="mb-6">
        <h2 className="font-bold text-[16px] mb-1">Questions 31–40</h2>
        <p>Complete the notes below. Write <span className="font-bold">ONE WORD ONLY</span> for each answer.</p>
      </div>

      <div className="space-y-6">
        {Array.from({ length: 10 }, (_, i) => 31 + i).map((num) => (
          <div key={num} className="flex items-center gap-2">
            <span>Question {num}:</span>
            <NumberedInput {...iprops(num)} />
          </div>
        ))}
      </div>
    </div>
  );
}
