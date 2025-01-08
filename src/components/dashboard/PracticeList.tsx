import { useEffect, useState } from "react";

export default function PracticeList() {
  const [practices, setPractices] = useState([]);

  useEffect(() => {
    fetch("/api/get-practices")
      .then((res) => res.json())
      .then((data) => setPractices(data));
  }, []);

  console.log(practices)

  return (
    <div className="my-4">
      <h1 className="py-4">Yoga Practices</h1>
        {practices.map((practice: any) => (
          <div key={practice.dataType} className="flex">
            <label>
              <input type="checkbox" value={practice.practiceName} />
              {practice.practiceName}
            </label>
          </div>
        ))}
    </div>
  );
}
