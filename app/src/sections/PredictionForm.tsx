import { useState, useRef, useEffect } from 'react';
import LiquidGlassButton from '../components/LiquidGlassButton';

// JavaScript-based prediction approximation for frontend demo
// When running with the Flask backend, replace this with API calls
function approximatePrediction(
  cementBrand: string,
  mixRatio: string,
  waterCementRatio: number,
  curingMethod: string,
  curingAge: number
): { strength: number; category: string; recommendation: string } {
  // Encode cement brand (Dangote=4, Lafarge=3, BUA=2, PureChem=1)
  const cementMap: Record<string, number> = { Dangote: 4, Lafarge: 3, BUA: 2, PureChem: 1 };
  const cementVal = cementMap[cementBrand] || 2;

  // Encode curing method (submerged=3, sprinkling=2, air=1)
  const curingMap: Record<string, number> = { Submerged: 3, Sprinkling: 2, 'Open Air': 1 };
  const curingVal = curingMap[curingMethod] || 1;

  // Mix ratio numeric (1:5 → 5, 1:10 → 10)
  const mixNumeric = parseInt(mixRatio.split(':')[1]) || 7;

  // Base intercept
  let strength = -1.85;

  // Curing age effect (dominant) — quadratic growth
  strength += 0.045 * curingAge + 0.0038 * curingAge * curingAge;

  // Cement brand effect
  strength += 0.42 * cementVal;

  // Mix ratio effect (higher number = weaker)
  strength -= 0.045 * mixNumeric;

  // Water-cement ratio effect
  const wcEffects: Record<number, number> = { 0.5: 0.08, 0.55: 0.1, 0.6: 0.02, 0.65: 0.0 };
  strength += wcEffects[waterCementRatio] || 0.02;

  // Curing method effect
  strength += 0.04 * curingVal;

  // Add small random noise for realism (-0.05 to +0.05)
  strength += (Math.random() - 0.5) * 0.1;

  // Clamp reasonable bounds
  strength = Math.max(0.3, Math.min(7.45, strength));

  // Categorize
  let category: string;
  let recommendation: string;
  if (strength >= 3.5) {
    category = 'High Strength';
    recommendation =
      'The predicted strength is excellent for load-bearing walls. Blocks can be safely used for structural applications including multi-story buildings, foundations, and retaining walls. Ensure standard quality control during production per NIS 87:2000 and BS 6073 requirements.';
  } else if (strength >= 2.0) {
    category = 'Moderate Strength';
    recommendation =
      'The predicted strength is acceptable for non-load-bearing partitions and light structural use. Monitor production quality closely. Consider adjusting mix ratio toward 1:5, reducing water-cement ratio, or switching to submerged curing for improved consistency per ASTM C90 guidance.';
  } else {
    category = 'Low Strength';
    recommendation =
      'The predicted strength is below recommended standards for structural applications. Consider: (1) increasing cement content with a richer mix ratio (1:5 or 1:6), (2) optimizing water-cement ratio to 0.50 or 0.55, (3) improving curing to submerged method, (4) switching to higher-performance cement brand, or (5) extending curing age to 28 days minimum.';
  }

  return {
    strength: Math.round(strength * 1000) / 1000,
    category,
    recommendation,
  };
}

export default function PredictionForm() {
  const [cementBrand, setCementBrand] = useState('Dangote');
  const [mixRatio, setMixRatio] = useState('1:5');
  const [waterCementRatio, setWaterCementRatio] = useState(0.55);
  const [curingMethod, setCuringMethod] = useState('Submerged');
  const [curingAge, setCuringAge] = useState(28);
  const [result, setResult] = useState<{
    strength: number;
    category: string;
    recommendation: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const handlePredict = () => {
    setLoading(true);
    // Simulate brief processing delay
    setTimeout(() => {
      const prediction = approximatePrediction(
        cementBrand,
        mixRatio,
        waterCementRatio,
        curingMethod,
        curingAge
      );
      setResult(prediction);
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [result]);

  const categoryColor =
    result?.category === 'High Strength'
      ? '#4ade80'
      : result?.category === 'Moderate Strength'
        ? '#fbbf24'
        : '#f87171';

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(255,255,255,0.05)',
    color: '#ffffff',
    fontFamily: "'GeistMono', monospace",
    fontSize: 15,
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23ffffff' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'GeistMono', monospace",
    fontSize: 12,
    fontWeight: 400,
    color: 'rgba(255,255,255,0.6)',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    marginBottom: 8,
    display: 'block',
  };

  return (
    <section
      id="predict"
      style={{
        background: '#0a0a0a',
        padding: 'clamp(80px, 10vh, 140px) 5vw',
      }}
    >
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Section label */}
        <p
          style={{
            fontFamily: "'GeistMono', monospace",
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 16,
          }}
        >
          Prediction Tool
        </p>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: 1,
            background: 'linear-gradient(90deg, rgba(255,255,255,0.2), transparent)',
            marginBottom: 'clamp(40px, 5vw, 64px)',
          }}
        />

        {/* Title */}
        <h2
          style={{
            fontFamily: "'EB Garamond', serif",
            fontSize: 'clamp(40px, 5vw, 64px)',
            fontWeight: 400,
            color: '#ffffff',
            lineHeight: 1.1,
            letterSpacing: '-1px',
            marginBottom: 16,
          }}
        >
          Predict Compressive Strength
        </h2>
        <p
          style={{
            fontFamily: "'GeistMono', monospace",
            fontSize: 15,
            fontWeight: 200,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.6,
            marginBottom: 'clamp(40px, 5vw, 64px)',
            maxWidth: 600,
          }}
        >
          Enter your production parameters below. The model predicts compressive strength in MPa
          and provides structural recommendations aligned with NIS, BS, and ASTM standards.
        </p>

        {/* Form Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
            marginBottom: 40,
          }}
        >
          {/* Cement Brand */}
          <div>
            <label style={labelStyle}>Cement Brand</label>
            <select
              style={selectStyle}
              value={cementBrand}
              onChange={(e) => setCementBrand(e.target.value)}
            >
              <option value="Dangote">Dangote Cement</option>
              <option value="Lafarge">Lafarge Cement</option>
              <option value="BUA">BUA Cement</option>
              <option value="PureChem">PureChem Cement</option>
            </select>
          </div>

          {/* Mix Ratio */}
          <div>
            <label style={labelStyle}>Mix Ratio</label>
            <select
              style={selectStyle}
              value={mixRatio}
              onChange={(e) => setMixRatio(e.target.value)}
            >
              <option value="1:5">1:5 (Strongest)</option>
              <option value="1:6">1:6</option>
              <option value="1:7">1:7</option>
              <option value="1:8">1:8</option>
              <option value="1:9">1:9</option>
              <option value="1:10">1:10 (Leanest)</option>
            </select>
          </div>

          {/* Water-Cement Ratio */}
          <div>
            <label style={labelStyle}>Water-Cement Ratio</label>
            <select
              style={selectStyle}
              value={waterCementRatio}
              onChange={(e) => setWaterCementRatio(parseFloat(e.target.value))}
            >
              <option value={0.5}>0.50</option>
              <option value={0.55}>0.55</option>
              <option value={0.6}>0.60</option>
              <option value={0.65}>0.65</option>
            </select>
          </div>

          {/* Curing Method */}
          <div>
            <label style={labelStyle}>Curing Method</label>
            <select
              style={selectStyle}
              value={curingMethod}
              onChange={(e) => setCuringMethod(e.target.value)}
            >
              <option value="Submerged">Submerged (Best)</option>
              <option value="Sprinkling">Sprinkling</option>
              <option value="Open Air">Open Air</option>
            </select>
          </div>

          {/* Curing Age */}
          <div>
            <label style={labelStyle}>Curing Age (Days)</label>
            <select
              style={selectStyle}
              value={curingAge}
              onChange={(e) => setCuringAge(parseInt(e.target.value))}
            >
              <option value={7}>7 Days</option>
              <option value={14}>14 Days</option>
              <option value={28}>28 Days</option>
            </select>
          </div>
        </div>

        {/* Predict Button */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: result ? 60 : 0 }}>
          <LiquidGlassButton onClick={handlePredict}>
            {loading ? 'Processing...' : 'Predict Strength'}
          </LiquidGlassButton>
        </div>

        {/* Results */}
        {result && (
          <div
            ref={resultRef}
            style={{
              borderRadius: 16,
              padding: 'clamp(32px, 4vw, 48px)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {/* Strength Gauge */}
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <p
                style={{
                  fontFamily: "'GeistMono', monospace",
                  fontSize: 12,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 16,
                }}
              >
                Predicted Compressive Strength
              </p>
              <div
                style={{
                  fontFamily: "'GeistMono', monospace",
                  fontSize: 'clamp(56px, 8vw, 96px)',
                  fontWeight: 300,
                  color: categoryColor,
                  lineHeight: 1,
                  letterSpacing: '-3px',
                  marginBottom: 8,
                }}
              >
                {result.strength.toFixed(3)}
              </div>
              <div
                style={{
                  fontFamily: "'GeistMono', monospace",
                  fontSize: 18,
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: 200,
                }}
              >
                MPa (N/mm²)
              </div>

              {/* Strength bar */}
              <div
                style={{
                  marginTop: 24,
                  height: 8,
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                  maxWidth: 400,
                  margin: '24px auto 0',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${Math.min(100, (result.strength / 7.5) * 100)}%`,
                    background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}88)`,
                    borderRadius: 4,
                    transition: 'width 1s ease-out',
                  }}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  maxWidth: 400,
                  margin: '8px auto 0',
                  fontFamily: "'GeistMono', monospace",
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.3)',
                }}
              >
                <span>0</span>
                <span>3.75</span>
                <span>7.5 MPa</span>
              </div>
            </div>

            {/* Category */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: 32,
                padding: '16px 32px',
                borderRadius: 8,
                background: `${categoryColor}15`,
                border: `1px solid ${categoryColor}40`,
                display: 'inline-block',
                width: '100%',
              }}
            >
              <span
                style={{
                  fontFamily: "'GeistMono', monospace",
                  fontSize: 18,
                  fontWeight: 500,
                  color: categoryColor,
                  letterSpacing: '1px',
                }}
              >
                {result.category.toUpperCase()}
              </span>
            </div>

            {/* Recommendation */}
            <div>
              <p
                style={{
                  fontFamily: "'GeistMono', monospace",
                  fontSize: 12,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.4)',
                  marginBottom: 12,
                }}
              >
                Structural Recommendation
              </p>
              <p
                style={{
                  fontFamily: "'EB Garamond', serif",
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.75)',
                  fontStyle: 'italic',
                }}
              >
                {result.recommendation}
              </p>
            </div>

            {/* Input summary */}
            <div
              style={{
                marginTop: 32,
                paddingTop: 24,
                borderTop: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <p
                style={{
                  fontFamily: "'GeistMono', monospace",
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '1px',
                }}
              >
                INPUT: {cementBrand} | {mixRatio} | W/C {waterCementRatio} | {curingMethod} | {curingAge} Days
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
