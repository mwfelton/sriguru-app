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
    <div>
      <h1>Configure Your Practices</h1>
        {practices.map((practice: any) => (
          <div key={practice.dataType}>
            <label>
              <input type="checkbox" value={practice.practiceName} />
              {practice.practiceName}
            </label>
          </div>
        ))}
    </div>
  );
}
