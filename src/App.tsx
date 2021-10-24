import { useEffect, useState } from 'react';
import classes from './App.module.css';
import { toPcm } from './toPcm';
import { CONFIG } from './constants';

const buffer = new Float32Array(1280).fill(1234);
const { wss } = CONFIG;
const delay = 400;

let timer: number;

function App() {
  const [msg, setMsg] = useState<string[]>([]);
  const [ws, setWs] = useState<WebSocket>();

  const onClick = () => {
    const client = new WebSocket(wss);

    client.onmessage = (e: MessageEvent<string>) => {
      console.log('🚀 ~ WS onMessage:', e);

      setMsg((val) => [...val, e.data]);
    };

    client.onopen = () => {
      console.log('🚀 ~ WS connected.');
    };

    client.onclose = (e: CloseEvent) => {
      console.log('🚀 ~ WS closed:', e);
    };

    client.onerror = (e: Event) => {
      console.log('🚀 ~ WS Error:', e.type);
    };

    setWs(client);
  };

  useEffect(() => {
    if (!ws) return;

    timer = window.setInterval(() => {
      if (ws.readyState !== WebSocket.OPEN) {
        clearInterval(timer);
        return;
      }

      console.log('🚀 ~ WS sending msg...');
      const pcm = toPcm(buffer);
      ws.send(new Int8Array(pcm));
    }, delay);

    return () => {
      timer && clearInterval(timer);
      ws?.close();
    };
  }, [ws]);

  return (
    <div className={classes.app}>
      <button className={classes.btn} onClick={onClick}>
        Connect
      </button>

      {msg.map((o, index) => (
        <div key={index}>{o}</div>
      ))}
    </div>
  );
}

export default App;
