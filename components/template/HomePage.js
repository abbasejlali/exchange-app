import { CallApi } from "@/libs/helper/helper";
import React, { useState, useEffect } from "react";

function HomePage() {
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [rate, setRate] = useState(0);
  const [ratetype, setRatetype] = useState("USD");

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    // Get dollar or rial rate
    const fetchData = async () => {
      const response = await CallApi().get(`/${apiKey}/latest/${ratetype}`);
      const { base_code, conversion_rates } = response?.data;

      if (base_code === "USD") {
        const irrRate = conversion_rates.IRR;
        setRate(irrRate);
      } else {
        const usdRate = conversion_rates.USD;
        setRate(usdRate);
      }
    };
    fetchData();
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
