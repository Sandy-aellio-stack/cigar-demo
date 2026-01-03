import { useState } from "react";

interface Props {
  onVerified: () => void;
}

const AgeGate = ({ onVerified }: Props) => {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const checkAge = () => {
    setError("");

    const mm = Number(month);
    const dd = Number(day);
    const yyyy = Number(year);

    // Basic validation
    if (!mm || !dd || !yyyy) {
      setError("Please enter your full date of birth.");
      return;
    }

    if (mm < 1 || mm > 12) {
      setError("Invalid month.");
      return;
    }

    if (dd < 1 || dd > 31) {
      setError("Invalid day.");
      return;
    }

    const today = new Date();
    if (yyyy < 1900 || yyyy > today.getFullYear()) {
      setError("Invalid year.");
      return;
    }

    // Create birth date
    const birthDate = new Date(yyyy, mm - 1, dd);

    // Catch invalid calendar dates (e.g., Feb 30)
    if (
      birthDate.getFullYear() !== yyyy ||
      birthDate.getMonth() !== mm - 1 ||
      birthDate.getDate() !== dd
    ) {
      setError("Invalid date of birth.");
      return;
    }

    // Reject future dates
    if (birthDate > today) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    // Calculate exact age
    let age = today.getFullYear() - yyyy;
    const monthDiff = today.getMonth() - (mm - 1);
    const dayDiff = today.getDate() - dd;

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    if (age >= 21) {
      localStorage.setItem("ageVerified", "true");
      onVerified();
    } else {
      setError("You must be 21 years or older to enter this site.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black text-white flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full p-6 sm:p-8 border border-gold/30 bg-neutral-900 rounded-lg text-center mx-4">
        <h1 className="text-xl sm:text-2xl font-semibold mb-2">Age Verification</h1>
        <p className="text-sm text-gray-400 mb-6">
          You must be 21 years or older to enter this site.
        </p>

        <div className="flex gap-2 sm:gap-3 mb-4">
          <input
            type="number"
            inputMode="numeric"
            placeholder="MM"
            max={12}
            min={1}
            className="w-1/3 p-2 sm:p-3 bg-black border border-gray-700 rounded text-center text-sm sm:text-base"
            onChange={(e) => setMonth(e.target.value)}
          />
          <input
            type="number"
            inputMode="numeric"
            placeholder="DD"
            max={31}
            min={1}
            className="w-1/3 p-2 sm:p-3 bg-black border border-gray-700 rounded text-center text-sm sm:text-base"
            onChange={(e) => setDay(e.target.value)}
          />
          <input
            type="number"
            inputMode="numeric"
            placeholder="YYYY"
            className="w-1/3 p-2 sm:p-3 bg-black border border-gray-700 rounded text-center text-sm sm:text-base"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        {error && (
          <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button
          onClick={checkAge}
          className="w-full bg-gold text-black py-3 rounded font-semibold hover:opacity-90"
        >
          Enter Site
        </button>

        <p className="text-xs text-gray-500 mt-4">
          By entering, you confirm you are 21 or older.
        </p>
      </div>
    </div>
  );
};

export default AgeGate;
