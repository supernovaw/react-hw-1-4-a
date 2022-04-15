import React, { useRef } from 'react';
import './App.css';

const ColorConverter = () => {
  const labelRef = useRef(null);

  const hexToRgb = hex => {
    if (!hex.startsWith("#") || hex.length !== 7) return null;

    const isAllowedHexChar = ch => [..."0123456789abcdef"].includes(ch);
    for (let i = 1; i < 7; i++) if (!isAllowedHexChar(hex[i])) return null;

    const rh = hex.substring(1, 3);
    const gh = hex.substring(3, 5);
    const bh = hex.substring(5);
    let r, g, b;
    try {
      r = parseInt(rh, 16);
      g = parseInt(gh, 16);
      b = parseInt(bh, 16);
    } catch (e) { }
    if (Math.min(r, g, b) < 0 || Math.max(r, g, b) > 255) return null;
    return [r, g, b];
  }

  const handleChange = e => {
    const value = e.target.value;
    const rgb = hexToRgb(value);
    const rgbStyle = rgb === null ? "" : `rgb(${rgb.join(", ")})`;
    const invalidHex = value.startsWith("#") && value.length >= 7 && rgb === null;

    if (rgb !== null) e.target.parentElement.style.backgroundColor = rgbStyle;
    labelRef.current.textContent = invalidHex ? "bad hex rgb" : rgbStyle;
  }

  return (
    <div className="ColorConverter">
      <input className="hex-input" defaultValue="#" onChange={handleChange} />
      <div className="rgb-label" ref={labelRef}></div>
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <ColorConverter />
    </div>
  )
};
