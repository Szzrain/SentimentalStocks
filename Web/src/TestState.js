import React, {useState} from 'react';

function App() {
  const [length, set_length] = useState(3);
  const [name, set_name] = useState('John Doe');

  return (
    <>
      <input value={name} onChange={e => set_name(e.target.value)} />
      <NameDisplay name={name}/>
      <hr />
      <input value={length} onChange={e => set_length(Number(e.target.value))} />
      <FibDisplay length={length} />
    </>
  );
}

function FibDisplay({length}) {
  console.log('Calculating numbers & rerendering...');
  const numbers = [1, 1];
  for (let i = 2; i < length; i++) {
    numbers[i] = numbers[i - 1] + numbers[i - 2];
  }

  return <p>{length} numbers of the fibonacci sequence: {numbers.join(', ')}</p>;
}

function NameDisplay({name}) {
  console.log('Rerendering name...');
  return <p>Your name is {name}</p>;
}

export default App;