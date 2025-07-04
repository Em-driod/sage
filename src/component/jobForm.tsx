interface JobFormProps {
  onJobDescChange: (desc: string) => void;
}

export default function JobForm({ onJobDescChange }: JobFormProps) {
  return (
    <div className="max-w-2xl mx-auto mb-6 p-4 bg-black border border-gray-700 rounded-xl shadow-lg transition-transform hover:scale-105">
      {/* Label */}
      <label className="block mb-2 font-semibold text-xl text-white">
        Job Description
      </label>
      {/* Textarea */}
      <textarea
        className="w-full h-36 p-4 bg-gray-900 text-white placeholder-gray-500 border border-gray-600 rounded-md resize-none focus:outline-none focus:ring-4 focus:ring-red-500 focus:bg-gray-800 transition-all"
        placeholder="Paste job description here..."
        onChange={(e) => onJobDescChange(e.target.value)}
      />
    </div>
  );
}