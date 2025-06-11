import React, { useEffect, useState } from 'react';
import { authAxios } from './api';

export default function Issues() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authAxios.get('/issues');
        setIssues(res.data);
      } catch (err) {
        console.error('No autorizado o error del servidor', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Issues</h2>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
    </div>
  );
}
