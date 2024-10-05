import React, { useState, useEffect } from "react";

function HomePage() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [ratetype, setRatetype] = useState("USD");

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    // Get dollar or rial rate
    fetch(`${url}/${apiKey}/latest/${ratetype}`)
      .then((response) => response.json())
      .then((data) => {
        if (data?.base_code === "USD") {
          const irrRate = data.conversion_rates.IRR;
          setRate(irrRate);
        } else if (data?.base_code === "IRR") {
          const irrRate = data.conversion_rates.USD;
          setRate(irrRate);
        }
      })
      .catch((error) => console.error("Error fetching exchange rate:", error));
  }, [ratetype]);

  const handleConversion = () => {
    const converted = amount * rate;
    ratetype === "USD"
      ? setConvertedAmount(converted.toFixed(0))
      : setConvertedAmount(converted.toFixed(3));
  };

  const handleChange = (e) => {
    setRatetype(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Exchange App</h1>

      <label htmlFor="RateType">Rate Type: </label>
      <select id="RateType" value={ratetype} onChange={handleChange}>
        <option value="USD">Dollar to IRR Converter</option>
        <option value="IRR">IRR to Dollar Converter</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter USD amount"
      />

      <button onClick={handleConversion}>Converted</button>

      <h2>
        Result : {convertedAmount} {ratetype === "USD" ? "IRR" : "USD"}
      </h2>
    </div>
  );
}

export default HomePage;
