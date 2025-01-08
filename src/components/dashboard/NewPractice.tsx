import { useEffect, useState } from "react";
import { decodeToken } from "../../lib/auth/decodeUserId";

interface NewPracticeProps {
  userId: string | null;
}

interface Practice {
  dataType: string;
  practiceName: string;
}

export default function NewPractice({ userId }: NewPracticeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [practices, setPractices] = useState<Practice[]>([]); // Type the practices array
  const [selectedPractices, setSelectedPractices] = useState<string[]>([]);

  useEffect(() => {
      fetch("/api/get-practices")
        .then((res) => res.json())
        .then((data) => setPractices(data));
    }, []);

   // Handle checkbox selection
  const handleCheckboxChange = (practiceName: string) => {
    setSelectedPractices((prev) =>
      prev.includes(practiceName)
        ? prev.filter((name) => name !== practiceName) // Remove if already selected
        : [...prev, practiceName] // Add if not selected
    );
  };

  // Save selected practices to the database
  const handleSave = async () => {
    const payload = selectedPractices.map((practiceName) => ({
      userId,
      dataType: `practice#${practiceName}`,
      practiceName,
      timestamp: new Date().toISOString(),
    }));

    console.log("Payload being sent:", payload);


    const response = await fetch("/api/save-practices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log("Practices saved successfully");
    } else {
      console.error("Failed to save practices");
    }
  };

  const handleToggle = () => setIsVisible((prev) => !prev);

  return (
    <div className="my-4">
      <h1 className="py-4">Select Yoga Practices</h1>
      {practices.map((practice) => (
        <div key={practice.dataType} className="flex">
          <label>
            <input
              type="checkbox"
              value={practice.practiceName}
              onChange={() => handleCheckboxChange(practice.practiceName)}
            />
            {practice.practiceName}
          </label>
        </div>
      ))}
      <button onClick={handleSave} className="mt-4">
        Save Practices
      </button>
    </div>
  );
}
