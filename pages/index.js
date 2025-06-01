import { useState } from 'react';

export default function Home() {
  const [notes, setNotes] = useState('');
  const [article, setArticle] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes }),
    });
    const data = await res.json();
    setArticle(data.result);
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>AI News Writer</h1>
      <textarea
        rows={10}
        style={{ width: '100%', marginBottom: '1rem' }}
        placeholder="Paste your notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Article'}
      </button>
      <div style={{ marginTop: '2rem', whiteSpace: 'pre-wrap' }}>
        {article && <><h2>Generated Article:</h2><p>{article}</p></>}
      </div>
    </main>
  );
}