import React, { useEffect, useState } from 'react';
import { view, invoke } from '@forge/bridge';

function formatTime(remainingTime) {
  const days = Math.floor(remainingTime / (60 * 60 * 24));
  const hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
  const seconds = remainingTime % 60;

  return `${days} : ${hours} : ${minutes} : ${seconds}`;
}

function View() {
  const [context, setContext] = useState(null);
  const [data, setData] = useState(null);
  const [timeCount, setTimeCount] = useState(0);
  const [desiredValue, setDesiredValue] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [countdownComplete, setCountdownComplete] = useState(false);
  const [error, setError] = useState(null);
  const [update, setUpdate] = useState(null);


  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await invoke('getText', { example: 'my-invoke-variable' });
        setData(fetchedData);
      } catch (error) {
        setError('Error fetching data: ' + error.message);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchContext() {
      try {
        const contextData = await view.getContext();
        setContext(contextData);
      } catch (error) {
        setError('Error fetching context: ' + error.message);
      }
    }

    fetchContext();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeCount(prevTimeCount => prevTimeCount + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (context && context.extension && context.extension.gadgetConfiguration) {
      try {
        let gadgetConfig = context.extension.gadgetConfiguration;

        if (typeof gadgetConfig === 'string') {
          gadgetConfig = JSON.parse(gadgetConfig);
        }

        const mySuccess =  gadgetConfig.successMessage;
        setUpdate(mySuccess);

        if (gadgetConfig.date) {
          setDesiredValue(new Date(gadgetConfig.date));
        }
      } catch (error) {
        setError('Error parsing gadget configuration: ' + error.message);
      }
    }
  }, [context]);

  useEffect(() => {
    if (desiredValue) {
      const countdownInterval = setInterval(() => {
        const currentTime = new Date();
        const differenceInSeconds = Math.max(0, Math.floor((desiredValue - currentTime) / 1000));
        setRemainingTime(differenceInSeconds);

        if (differenceInSeconds === 0) {
          setCountdownComplete(true);
          clearInterval(countdownInterval);
        }
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [desiredValue]);

  const h2Style = {
    fontSize: '32px',
    textAlign: 'center',
    animation: 'pulse 1s infinite', // Apply the animation to the text
  };

  const keyframes = `@keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }`;

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!context || !data || !desiredValue) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <style>{keyframes}</style> {/* Inject the CSS keyframes animation */}
      <h3 style={h2Style}>Time Countdown</h3>
      {countdownComplete ? (
        <h2>Countdown Complete<br></br> {update} </h2>
      ) : (
        <h3 style={h2Style}>{formatTime(remainingTime)}</h3>
      )}
    </div>
  );
}

export default View;
