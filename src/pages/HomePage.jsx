import { useMemo, useRef, useState } from "react";
import ExamHeader from "../components/exam/ExamHeader";
import PartBanner from "../components/exam/PartBanner";
import ExamFooter from "../components/exam/ExamFooter";
import Part1 from "../components/exam/Part1";
import Part2 from "../components/exam/Part2";
import Part3 from "../components/exam/Part3";
import Part4 from "../components/exam/Part4";

const GROUPS = [
  [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]],
  [[11], [12], [13], [14], [15], [16], [17], [18], [19], [20]],
  [[21], [22], [23], [24], [25], [26], [27], [28], [29], [30]],
  [[31], [32], [33], [34], [35], [36], [37], [38], [39], [40]],
];

const PARTS = [
  {
    title: "Part 1",
    intro: "Listen and answer questions 1–10.",
    start: 1,
    end: 10,
    Component: Part1,
  },
  {
    title: "Part 2",
    intro: "Listen and answer questions 11–20.",
    start: 11,
    end: 20,
    Component: Part2,
  },
  {
    title: "Part 3",
    intro: "Listen and answer questions 21–30.",
    start: 21,
    end: 30,
    Component: Part3,
  },
  {
    title: "Part 4",
    intro: "Listen and answer questions 31–40.",
    start: 31,
    end: 40,
    Component: Part4,
  },
];

const HomePage = () => {
  const [activePart, setActivePart] = useState(0);
  const [answers, setAnswers] = useState({}); // Fresh clean state
  const [currentQ, setCurrentQ] = useState(1);
  const qRefs = useRef({});

  const setAnswer = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const findPartIndex = (num) => PARTS.findIndex((p) => num >= p.start && num <= p.end);

  const setCurrentQuestion = (num) => {
    setCurrentQ(num);
    const idx = findPartIndex(num);
    if (idx !== -1 && idx !== activePart) setActivePart(idx);
  };

  const scrollToQ = (num) => {
    const el = qRefs.current[num];
    if (el && el.scrollIntoView) {
      el.scrollIntoView({ block: "center", behavior: "smooth" });
      if (typeof el.focus === "function") {
        el.focus({ preventScroll: true });
      }
    }
    setCurrentQuestion(num);
  };

  const switchPart = (idx) => {
    setActivePart(idx);
    const firstQ = PARTS[idx].start;
    setCurrentQ(firstQ);
    requestAnimationFrame(() => {
      scrollToQ(firstQ);
    });
  };

  const countAnswered = (partIdx) => {
    const groups = GROUPS[partIdx];
    return groups.reduce((count, g) => {
      const key = g.length > 1 ? `${g[0]}-${g[g.length - 1]}` : String(g[0]);
      const ans = answers[key];
      if (Array.isArray(ans)) return count + (ans.length > 0 ? 1 : 0);
      return count + (ans ? 1 : 0);
    }, 0);
  };

  const allQs = useMemo(() => Array.from({ length: 40 }, (_, i) => i + 1), []);

  const goPrev = () => {
    const idx = allQs.indexOf(currentQ);
    if (idx > 0) scrollToQ(allQs[idx - 1]);
  };

  const goNext = () => {
    const idx = allQs.indexOf(currentQ);
    if (idx < allQs.length - 1) scrollToQ(allQs[idx + 1]);
  };

  const ActiveComponent = PARTS[activePart].Component;

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-white text-[#111]">
      <ExamHeader />
      <main className="flex-1 min-h-0 flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto pb-12">
          <PartBanner title={PARTS[activePart].title} intro={PARTS[activePart].intro} />
          <ActiveComponent
            answers={answers}
            setAnswer={setAnswer}
            currentQ={currentQ}
            setCurrentQ={setCurrentQuestion}
            qRefs={qRefs}
          />
        </div>
      </main>

      <ExamFooter
        parts={PARTS}
        groups={GROUPS}
        activePart={activePart}
        switchPart={switchPart}
        currentQ={currentQ}
        scrollToQ={scrollToQ}
        answers={answers}
        countAnswered={countAnswered}
        goPrev={goPrev}
        goNext={goNext}
      />
    </div>
  );
};

export default HomePage;