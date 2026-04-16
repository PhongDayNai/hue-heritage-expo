'use client';

import { useEffect, useRef, useState } from 'react';

type OptionKey = 'A' | 'B' | 'C';

type QuizQuestion = {
  id: number;
  text: string;
  options: { key: OptionKey; label: string }[];
  responseTemplate: (label: string) => string;
};

type TravelStyle = 'chill' | 'explore' | 'checkin';
type ItineraryStep = {
  label?: string;
  time?: string;
  text: string;
};

type ItineraryCard = {
  id: string;
  title: string;
  cost: string;
  timeline: ItineraryStep[];
};

type SpotlightTarget = {
  openId: string;
  aliases: string[];
};

type TravelQuizChatProps = {
  onOpenTarget?: (openId: string) => void;
};

type TravelQuizState = {
  answers: OptionKey[];
  started: boolean;
  isOpen: boolean;
};

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: 'Bạn muốn chuyến đi như thế nào?',
    responseTemplate: (label) => `Tôi muốn chuyến đi ${label.toLowerCase()}.`,
    options: [
      { key: 'A', label: 'Thư giãn, nhẹ nhàng' },
      { key: 'B', label: 'Trải nghiệm, khám phá' },
      { key: 'C', label: 'Chụp ảnh đẹp' }
    ]
  },
  {
    id: 2,
    text: 'Bạn thích hoạt động nào nhất?',
    responseTemplate: (label) => `Tôi thích ${label.toLowerCase()}.`,
    options: [
      { key: 'A', label: 'Nghỉ ngơi, ngắm cảnh' },
      { key: 'B', label: 'Đi nhiều nơi, khám phá' },
      { key: 'C', label: 'Check-in, chụp ảnh' }
    ]
  },
  {
    id: 3,
    text: 'Bạn thích thời điểm nào trong ngày?',
    responseTemplate: (label) => `Tôi thích thời điểm ${label.toLowerCase()}.`,
    options: [
      { key: 'A', label: 'Sáng sớm' },
      { key: 'B', label: 'Ban ngày' },
      { key: 'C', label: 'Hoàng hôn' }
    ]
  },
  {
    id: 4,
    text: 'Bạn đi du lịch cùng ai?',
    responseTemplate: (label) => `Tôi đi cùng ${label.toLowerCase()}.`,
    options: [
      { key: 'A', label: 'Gia đình' },
      { key: 'B', label: 'Bạn bè' },
      { key: 'C', label: 'Người yêu / nhóm chụp ảnh' }
    ]
  },
  {
    id: 5,
    text: 'Điều quan trọng nhất với bạn là gì?',
    responseTemplate: (label) => `Điều tôi ưu tiên nhất là ${label.toLowerCase()}.`,
    options: [
      { key: 'A', label: 'Thư giãn' },
      { key: 'B', label: 'Trải nghiệm' },
      { key: 'C', label: 'Ảnh đẹp' }
    ]
  }
];

const styleContent: Record<
  TravelStyle,
  {
    badge: string;
    title: string;
    subtitle: string;
    summary: string;
    optionRecommendation: string;
    highlights: string[];
  }
> = {
  chill: {
    badge: 'A nhiều nhất',
    title: 'Chill - nghỉ dưỡng',
    subtitle: 'Ưu tiên thư giãn, nhịp đi chậm và không gian dễ nghỉ ngơi.',
    summary:
      'Bạn hợp nhất với lịch trình 1 ngày để ăn sáng, tham quan nhẹ, nghỉ tại Gee Garden rồi đi các điểm chiều tối. Nếu muốn thư giãn lâu hơn, có thể chọn bản 2 ngày 1 đêm.',
    optionRecommendation: 'Ưu tiên Option 2 (1 ngày), hoặc Option 1 nếu muốn thư giãn lâu hơn.',
    highlights: ['Chợ địa phương', 'Điện Cha - Điện Mẹ', 'Gee Garden', 'Bình Điền Retreat', 'Đồi Chuông Gió']
  },
  explore: {
    badge: 'B nhiều nhất',
    title: 'Khám phá - trải nghiệm',
    subtitle: 'Phù hợp với hành trình nhiều điểm đến, thiên về đi và khám phá.',
    summary:
      'Bạn hợp nhất với lịch trình 2 ngày 1 đêm để có đủ thời gian di chuyển, khám phá lòng hồ, suối và trải nghiệm thêm các điểm lưu trú, văn hóa địa phương.',
    optionRecommendation: 'Ưu tiên Option 1 (2 ngày 1 đêm).',
    highlights: ['Quán Bé Đen', 'Gee Garden Homestay', 'Bình Điền Retreat', 'Ami Retreat', 'Lòng hồ', 'Suối']
  },
  checkin: {
    badge: 'C nhiều nhất',
    title: 'Sống ảo - check-in',
    subtitle: 'Ưu tiên ảnh đẹp, ánh sáng tốt và các điểm dừng có view nổi bật.',
    summary:
      'Bạn hợp với lịch trình có nhiều điểm check-in, nhất là các khung sáng sớm và hoàng hôn. Có thể đi nhanh trong 1 ngày hoặc ở lại 2 ngày 1 đêm để gom nhiều góc ảnh đẹp hơn.',
    optionRecommendation: 'Option 2 (1 ngày) hoặc Option 1 (2 ngày 1 đêm).',
    highlights: ['Gee Garden', 'Bình Điền Retreat', 'Ami Retreat', 'Đồi Chuông Gió', 'Hoàng hôn', 'Bình minh']
  }
};

const itineraryCards: ItineraryCard[] = [
  {
    id: 'option-1',
    title: 'Option 1 · 2 ngày 1 đêm',
    cost: '1.600.000đ/người',
    timeline: [
      { label: 'Ngày 1', time: '10:30', text: 'Xuất phát, ăn trưa tại quán Bé Đen.' },
      { label: 'Ngày 1', time: '12:30', text: 'Nhận phòng Gee Garden Homestay.' },
      { label: 'Ngày 1', time: '15:00', text: 'Check-in Bình Điền Retreat, Ami Retreat.' },
      { label: 'Ngày 1', time: '18:00', text: 'Thưởng thức ẩm thực Pa Hy.' },
      { label: 'Ngày 2', time: '06:30', text: 'Ăn sáng.' },
      { label: 'Ngày 2', time: '07:00', text: 'Khám phá lòng hồ, suối.' },
      { label: 'Ngày 2', time: '14:00', text: 'Ăn chiều, kết thúc.' }
    ]
  },
  {
    id: 'option-2',
    title: 'Option 2 · 1 ngày',
    cost: '200.000 - 300.000đ/người',
    timeline: [
      { label: 'Sáng', text: 'Ăn sáng, tham quan chợ Bình Điền.' },
      { label: 'Sáng', text: 'Tham quan Điện Cha - Điện Mẹ.' },
      { label: 'Trưa', text: 'Ăn trưa, nghỉ tại Gee Garden.' },
      { label: 'Chiều', text: 'Tham quan Khe Đầy, Bình Điền Retreat.' },
      { label: 'Chiều', text: 'Nghỉ ngơi.' },
      { label: 'Tối', text: 'Check-in Đồi Chuông Gió.' },
      { label: 'Tối', text: 'Ăn tối, kết thúc.' }
    ]
  }
];

const introMessages = [
  'Chào bạn, mình là trợ lý chọn lịch trình Bình Điền.',
  'Mình sẽ hỏi nhanh 5 câu. Bạn chỉ cần chạm vào đáp án phù hợp nhất để nhận gợi ý chuyến đi.'
];

const QUIZ_STATE_KEY = 'travel-quiz-chat-state';
const defaultQuizState: TravelQuizState = {
  answers: [],
  started: false,
  isOpen: false
};
let cachedQuizState: TravelQuizState = defaultQuizState;

const spotlightTargets: SpotlightTarget[] = [
  {
    openId: 'quan-be-den',
    aliases: ['Quán Bé Đen']
  },
  {
    openId: 'gee-garden',
    aliases: ['Gee Garden', 'Gee Garden Homestay']
  },
  {
    openId: 'binh-dien-retreat',
    aliases: ['Bình Điền Retreat']
  },
  {
    openId: 'ami-binh-dien',
    aliases: ['Ami Retreat', 'AMI Bình Điền', 'Ami Bình Điền']
  },
  {
    openId: 'khe-day',
    aliases: ['Khe Đầy']
  },
  {
    openId: 'doi-chuong-gio',
    aliases: ['Đồi Chuông Gió']
  }
];

const aliasTargets = spotlightTargets.flatMap((target) =>
  target.aliases.map((alias) => ({ alias, target }))
);

function renderResponseText(template: string, label: string) {
  const normalizedLabel = label.charAt(0).toLowerCase() + label.slice(1);
  const parts = template.split(normalizedLabel);

  if (parts.length < 2) {
    return <strong>{label}</strong>;
  }

  return (
    <>
      {parts[0]}
      <strong>{normalizedLabel}</strong>
      {parts.slice(1).join(normalizedLabel)}
    </>
  );
}

function groupTimelineSteps(steps: ItineraryStep[]) {
  return steps.reduce<Array<{ label?: string; items: ItineraryStep[] }>>((groups, step) => {
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup.label === step.label) {
      lastGroup.items.push(step);
      return groups;
    }

    groups.push({
      label: step.label,
      items: [step]
    });

    return groups;
  }, []);
}

function resolveTravelStyle(answers: OptionKey[]): TravelStyle {
  const counts = answers.reduce(
    (acc, answer) => {
      acc[answer] += 1;
      return acc;
    },
    { A: 0, B: 0, C: 0 }
  );

  if (counts.B > counts.A && counts.B >= counts.C) {
    return 'explore';
  }

  if (counts.C > counts.A && counts.C > counts.B) {
    return 'checkin';
  }

  return 'chill';
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function findTargetsInText(text: string) {
  return aliasTargets.reduce<Array<{ alias: string; target: SpotlightTarget }>>((matches, item) => {
    if (!text.includes(item.alias)) {
      return matches;
    }

    if (matches.some((match) => match.target.openId === item.target.openId)) {
      return matches;
    }

    matches.push(item);
    return matches;
  }, []);
}

function readStoredQuizState(): TravelQuizState {
  if (typeof window === 'undefined') {
    return cachedQuizState;
  }

  try {
    const raw = window.sessionStorage.getItem(QUIZ_STATE_KEY);
    if (!raw) return cachedQuizState;

    const parsed = JSON.parse(raw) as Partial<TravelQuizState>;
    const answers = Array.isArray(parsed.answers)
      ? parsed.answers.filter((answer): answer is OptionKey => answer === 'A' || answer === 'B' || answer === 'C')
      : [];

    return {
      answers,
      started: Boolean(parsed.started),
      isOpen: Boolean(parsed.isOpen)
    };
  } catch {
    return cachedQuizState;
  }
}

function persistQuizState(state: TravelQuizState) {
  cachedQuizState = state;

  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.sessionStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage errors; in-memory cache still preserves state during client navigation.
  }
}

export default function TravelQuizChat({ onOpenTarget }: TravelQuizChatProps) {
  const [quizState, setQuizState] = useState<TravelQuizState>(() => readStoredQuizState());
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const { answers, started, isOpen } = quizState;

  const currentQuestion = quizQuestions[answers.length] || null;
  const isComplete = answers.length === quizQuestions.length;
  const travelStyle = isComplete ? resolveTravelStyle(answers) : null;
  const result = travelStyle ? styleContent[travelStyle] : null;

  const openTarget = (target: SpotlightTarget) => {
    if (!onOpenTarget) return;
    onOpenTarget(target.openId);
    setQuizState((prev) => ({ ...prev, isOpen: false }));
  };

  const renderLinkedText = (text: string) => {
    const matches = findTargetsInText(text);

    if (matches.length === 0) {
      return text;
    }

    const pattern = new RegExp(`(${matches.map((item) => escapeRegExp(item.alias)).join('|')})`, 'g');
    const parts = text.split(pattern);

    return parts.map((part, index) => {
      const matched = matches.find((item) => item.alias === part);

      if (!matched) {
        return <span key={`${part}-${index}`}>{part}</span>;
      }

      return (
        <button
          key={`${matched.target.openId}-${index}`}
          type="button"
          onClick={() => openTarget(matched.target)}
          className="font-semibold text-[#9a6412] underline decoration-[#f0bf63] underline-offset-4 transition hover:text-[#c07812]"
        >
          {part}
        </button>
      );
    });
  };

  const handleAnswer = (answer: OptionKey) => {
    setQuizState((prev) => ({
      ...prev,
      started: true,
      answers: [...prev.answers, answer]
    }));
  };

  const resetQuiz = () => {
    setQuizState(defaultQuizState);
  };

  useEffect(() => {
    persistQuizState(quizState);
  }, [quizState]);

  useEffect(() => {
    if (!isOpen || !scrollRef.current || !endRef.current) {
      return;
    }

    endRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [answers.length, isComplete, isOpen]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-4 z-[80] flex justify-end sm:bottom-8 sm:right-6">
      <div className="pointer-events-auto flex flex-col items-end gap-3">
        {isOpen ? (
          <div className="h-[min(78vh,760px)] w-[min(calc(100vw-1.5rem),440px)] overflow-hidden rounded-[32px] border border-[#d3dfeb] bg-[#f8fbff] shadow-[0_28px_80px_rgba(22,41,67,0.26)] sm:w-[440px]">
            <div className="flex items-center justify-between gap-4 border-b border-[#dbe6f1] bg-[linear-gradient(135deg,#fffaf0_0%,#ffffff_45%,#eef6ff_100%)] px-5 pb-4 pt-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#f6b54d,#f9df9f)] text-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                  🧭
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#17324a]">MoodSpot - trợ lý lịch trình</p>
                  <p className="text-xs leading-5 text-[#5f7488]">Chạm vào đáp án để nhận gợi ý chuyến đi phù hợp</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="rounded-full border border-[#cad9e7] bg-white px-3 py-1.5 text-xs font-semibold text-[#35516e] transition hover:bg-[#f7fbff]"
                >
                  Làm lại
                </button>
                <button
                  type="button"
                  onClick={() => setQuizState((prev) => ({ ...prev, isOpen: false }))}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#cad9e7] bg-white text-lg text-[#35516e] transition hover:bg-[#f7fbff]"
                  aria-label="Đóng quiz"
                >
                  ×
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="h-[calc(100%-80px)] overflow-y-auto bg-[linear-gradient(180deg,#f6faff_0%,#eef4fb_100%)] px-4 py-5"
            >
              <div className="space-y-4 pb-7">
                <div className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7b8ea1]">Hôm nay</div>

                {introMessages.map((message, index) => (
                  <div key={index} className="flex items-end gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff1c9] text-sm shadow-sm">
                      🧭
                    </div>
                    <div className="max-w-[86%] rounded-[24px] rounded-bl-md border border-[#d7e6f3] bg-white px-5 py-4 text-[16px] leading-8 text-[#17324a] shadow-[0_10px_24px_rgba(111,142,175,0.12)]">
                      {message}
                    </div>
                  </div>
                ))}

                {quizQuestions.slice(0, answers.length).map((question, index) => {
                  const option = question.options.find((item) => item.key === answers[index]);
                  const response = option ? question.responseTemplate(option.label) : '';

                  return (
                    <div key={question.id} className="space-y-3">
                      <div className="flex items-end gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff1c9] text-sm shadow-sm">
                          🧭
                        </div>
                        <div className="max-w-[86%] rounded-[24px] rounded-bl-md border border-[#d7e6f3] bg-white px-5 py-4 text-[16px] leading-8 text-[#17324a] shadow-[0_10px_24px_rgba(111,142,175,0.12)]">
                          <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7f92a4]">
                            Câu {question.id}
                          </span>
                          {question.text}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <div className="max-w-[88%] rounded-[24px] rounded-br-md bg-[linear-gradient(135deg,#d88d1d,#f0b24c)] px-5 py-4 text-white shadow-[0_12px_30px_rgba(180,118,22,0.28)]">
                          <span className="block text-[15px] leading-7">
                            {option ? renderResponseText(response, option.label) : null}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {!isComplete && currentQuestion ? (
                  <div className="space-y-4">
                    {!started ? null : (
                      <div className="pl-12 text-xs font-semibold uppercase tracking-[0.14em] text-[#7b8ea1]">
                        {answers.length}/{quizQuestions.length} câu đã chọn
                      </div>
                    )}

                    <div className="flex items-end gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff1c9] text-sm shadow-sm">
                        🧭
                      </div>
                      <div className="max-w-[86%] rounded-[24px] rounded-bl-md border border-[#d7e6f3] bg-white px-5 py-4 text-[16px] leading-8 text-[#17324a] shadow-[0_10px_24px_rgba(111,142,175,0.12)]">
                        <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7f92a4]">
                          Câu {currentQuestion.id}
                        </span>
                        {currentQuestion.text}
                      </div>
                    </div>

                    <div className="pl-12">
                      <div className="grid gap-3">
                        {currentQuestion.options.map((option) => (
                          <button
                            key={option.key}
                            type="button"
                            onClick={() => handleAnswer(option.key)}
                            className="flex items-center gap-4 rounded-[22px] border border-[#c8d9ea] bg-white px-4 py-4 text-left shadow-[0_10px_22px_rgba(111,142,175,0.1)] transition hover:-translate-y-0.5 hover:border-[#d88d1d] hover:bg-[#fffaf2] hover:shadow-[0_14px_26px_rgba(180,118,22,0.16)]"
                          >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d7e6f3] bg-[#f6faff] text-sm font-semibold text-[#6a8095]">
                              {option.key}
                            </span>
                            <span className="text-[17px] font-semibold text-[#17324a]">{option.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}

                {isComplete && result ? (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-end gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#fff1c9] text-sm shadow-sm">
                        🧭
                      </div>
                      <div className="max-w-[90%] rounded-[24px] rounded-bl-md border border-[#d7e6f3] bg-white px-5 py-4 text-[16px] leading-8 text-[#17324a] shadow-[0_10px_24px_rgba(111,142,175,0.12)]">
                        Mình đã đọc xong lựa chọn của bạn. Đây là phong cách du lịch phù hợp nhất và lịch trình nên đi.
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-[#d2dfeb] bg-[linear-gradient(180deg,#ffffff_0%,#f6fbff_100%)] p-5 shadow-[0_14px_32px_rgba(111,142,175,0.14)]">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-[#17324a] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
                          {result.badge}
                        </span>
                        <span className="rounded-full bg-[#fff0cf] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a6412]">
                          {answers.length}/{quizQuestions.length} câu
                        </span>
                      </div>

                      <h3 className="mt-4 text-[28px] font-semibold leading-tight text-[#17324a]">{result.title}</h3>
                      <p className="mt-2 text-sm font-medium leading-6 text-[#4f6780]">{result.subtitle}</p>
                      <p className="mt-4 text-sm leading-7 text-[#35516e]">{result.summary}</p>

                      <div className="mt-4 rounded-2xl border border-[#f3d59a] bg-[#fff7e7] px-4 py-3 text-sm font-semibold leading-6 text-[#8e5b13]">
                        {result.optionRecommendation}
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {result.highlights.map((item) => (
                          (() => {
                            const match = aliasTargets.find((entry) => entry.alias === item);

                            if (!match) {
                              return (
                                <span key={item} className="rounded-full border border-[#d7e6f3] bg-white px-3 py-1.5 text-xs font-medium text-[#35516e]">
                                  {item}
                                </span>
                              );
                            }

                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => openTarget(match.target)}
                                className="rounded-full border border-[#d7e6f3] bg-white px-3 py-1.5 text-xs font-medium text-[#35516e] transition hover:border-[#d88d1d] hover:bg-[#fff8ea] hover:text-[#9a6412]"
                              >
                                {item}
                              </button>
                            );
                          })()
                        ))}
                      </div>

                      <div className="mt-5 grid gap-3">
                        {itineraryCards.map((card) => (
                          <article key={card.id} className="rounded-2xl border border-[#d7e3ef] bg-white px-4 py-4 shadow-[0_8px_20px_rgba(111,142,175,0.08)]">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <h4 className="text-sm font-semibold text-[#17324a]">{card.title}</h4>
                              <span className="rounded-full bg-[#eff6fd] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#5c7388]">
                                {card.cost}
                              </span>
                            </div>
                            <div className="mt-4 space-y-4 text-sm text-[#35516e]">
                              {groupTimelineSteps(card.timeline).map((group, groupIndex) => (
                                <div key={`${card.id}-${group.label || 'group'}-${groupIndex}`} className="space-y-3">
                                  <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7f92a4]">
                                    {group.label}
                                  </div>
                                  <div className="space-y-3">
                                    {group.items.map((item, itemIndex) => (
                                      <div
                                        key={`${card.id}-${group.label || 'step'}-${item.time || itemIndex}-${item.text}`}
                                        className="flex gap-3"
                                      >
                                        <div className="min-w-[44px] pt-0.5 text-[12px] font-semibold tracking-[0.02em] text-[#d88d1d]">
                                          {item.time || ' '}
                                        </div>
                                        <div className="flex-1 rounded-xl bg-[#f7fbff] px-3 py-2.5 leading-6">
                                          {renderLinkedText(item.text)}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
                <div ref={endRef} />
              </div>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setQuizState((prev) => ({ ...prev, isOpen: true }))}
          className="group flex h-[70px] items-center gap-3 rounded-full border border-[#d99f43] bg-[linear-gradient(135deg,#d78e22,#efb14f)] px-5 text-left text-white shadow-[0_16px_36px_rgba(145,91,18,0.32)] transition hover:-translate-y-0.5 hover:brightness-105"
          aria-label="Mở quiz gợi ý lịch trình"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/18 text-xl backdrop-blur">🧭</span>
          <span className="hidden pr-1 sm:block">
            <span className="block text-sm font-semibold">Gợi ý lịch trình</span>
            <span className="block text-xs text-white/85">Mở quiz 5 câu</span>
          </span>
        </button>
      </div>
    </div>
  );
}
