import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [password, setpassword] = useState('');
  const [character, setcharacter] = useState(true);
  const [number, setnumber] = useState(true);
  const [range, setrange] = useState(8);
  const passwordref = useRef(null);

  const generatepassword = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (number) str += '0123456789';
    if (character) str += '~!@#$%^&*()-_+={}[]?';
    for (let index = 0; index < range; index++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [character, number, range]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0, 10);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatepassword();
  }, [character, number, range]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-700 via-gray-900 to-black">
      <div className="w-full max-w-md mx-auto shadow-xl rounded-2xl px-8 py-10 bg-gray-800 text-white">
        <h1 className="text-3xl font-bold text-center mb-8">Password Generator</h1>

        <div className="relative mb-8">
          <input
            type="text"
            value={password}
            className="w-full py-3 px-4 text-lg rounded-lg border-2 border-gray-600 bg-gray-900 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Generated Password"
            readOnly
            ref={passwordref}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="absolute right-3 top-2.5 px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
          >
            Copy
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <label className="font-semibold">Length: {range}</label>
            <input
              type="range"
              min={6}
              max={100}
              value={range}
              className="w-full ml-4 cursor-pointer accent-blue-500"
              onChange={(e) => {
                setrange(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="numberinput" className="font-semibold">Include Numbers</label>
            <input
              type="checkbox"
              checked={number}
              id="numberinput"
              className="accent-blue-500 cursor-pointer"
              onChange={() => setnumber((prev) => !prev)}
            />
          </div>

          <div className="flex items-center justify-between">
            <label htmlFor="characterinput" className="font-semibold">Include Special Characters</label>
            <input
              type="checkbox"
              checked={character}
              id="characterinput"
              className="accent-blue-500 cursor-pointer"
              onChange={() => setcharacter((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
