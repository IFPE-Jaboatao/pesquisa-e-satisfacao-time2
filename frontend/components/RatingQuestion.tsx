type RatingQuestionProps = {
  text: string;
  value: number;
  onChange: (value: number) => void;
};

const ratings = [
  { value: 1, emoji: "😡", label: "Muito ruim" },
  { value: 2, emoji: "🙁", label: "Ruim" },
  { value: 3, emoji: "😐", label: "Regular" },
  { value: 4, emoji: "🙂", label: "Bom" },
  { value: 5, emoji: "😄", label: "Excelente" },
];

export default function RatingQuestion({
  text,
  value,
  onChange,
}: RatingQuestionProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-semibold text-gray-900">{text}</p>

      <div className="grid grid-cols-5 gap-2">
        {ratings.map((rating) => {
          const selected = value === rating.value;

          return (
            <button
              key={rating.value}
              type="button"
              onClick={() => onChange(rating.value)}
              className={`
                flex flex-col items-center justify-center gap-1
                rounded-xl border p-3 text-center transition
                hover:scale-105 hover:border-blue-500
                ${
                  selected
                    ? "border-blue-700 bg-blue-100 shadow-md"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              <span className="text-2xl">{rating.emoji}</span>

              <span className="text-[11px] font-medium text-gray-700">
                {rating.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
