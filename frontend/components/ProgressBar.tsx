type ProgressBarProps = {
  step: number;
  total: number;
};

export default function ProgressBar({ step, total }: ProgressBarProps) {
  const percentage = Math.round((step / total) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-end gap-3 mb-2">
        <span className="text-sm font-semibold text-blue-700">
          Etapa {step} de {total}
        </span>

        <span className="text-sm font-semibold text-blue-700">
          {percentage}%
        </span>
      </div>

      <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-700 h-3 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
