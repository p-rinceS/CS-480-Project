import { useState } from "react";
// import { getTest } from "../../services/apiService";

const Test = () => {
  const [message, setMessage] = useState("");

  // Calls from api service
  const testApi = async () => {
    try {
      const data = await getTest();
      setMessage(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <p>Test</p>
        <button onClick={() => testApi()}>fetch message from api</button>
        <p>Test Message: {message}</p>
      </div>
    </>
  );
};

export default Test;
