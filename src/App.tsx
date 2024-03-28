import { useState } from 'react';
import { Button } from '~/components/common/Button/Button.tsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {count}
      <Button isLoading onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </div>
  );
}

export default App;
