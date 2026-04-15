"use client";
import { useState } from "react";
import { loadProgress, saveProgress } from "@/lib/storage";
import { addXp } from "@/lib/gamification";

export default function CalculatorPage() {
  const [basePrice, setBasePrice] = useState(9.6);
  const [prevYearAvg, setPrevYearAvg] = useState(12.31);
  const [currentMonthAvg, setCurrentMonthAvg] = useState(11.71);
  const [prevYearMonthAvg, setPrevYearMonthAvg] = useState(12.31);
  const [nonFossilValue, setNonFossilValue] = useState(1.30);
  const [balancingCost, setBalancingCost] = useState(1.00);
  const [generationKwh, setGenerationKwh] = useState(216000);
  const [calculated, setCalculated] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);

  const referencePrice =
    prevYearAvg + (currentMonthAvg - prevYearMonthAvg) + nonFossilValue - balancingCost;
  const premium = Math.max(0, basePrice - referencePrice);
  const marketIncome = currentMonthAvg * generationKwh;
  const premiumIncome = premium * generationKwh;
  const totalIncome = marketIncome + premiumIncome;

  const handleCalculate = () => {
    setCalculated(true);
    if (!xpAwarded) {
      let p = loadProgress();
      const { progress: np } = addXp(p, "calc_simulate");
      saveProgress(np);
      window.dispatchEvent(new Event("xp_update"));
      setXpAwarded(true);
    }
  };

  const inputStyle = {
    backgroundColor: "var(--bg-input)",
    border: "1px solid #2a4070",
    borderRadius: 5,
    color: "var(--text-primary)",
    padding: "7px 10px",
    fontSize: 14,
    width: "100%",
    outline: "none",
  };

  const labelStyle = {
    display: "block" as const,
    color: "var(--text-secondary)",
    fontSize: 13,
    marginBottom: 4,
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: "var(--accent)", fontSize: 20, fontWeight: "bold" }}>
          🧮 計算シミュレーター
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 4 }}>
          参照価格・プレミアム・収入をリアルタイム計算
        </div>
      </div>

      <div className="grid-calc">
        {/* Input */}
        <div
          style={{
            backgroundColor: "var(--bg-card-dark)",
            border: "1px solid var(--border-color)",
            borderRadius: 12,
            padding: "20px",
          }}
        >
          <div style={{ color: "var(--accent)", fontWeight: "bold", marginBottom: 16 }}>
            入力パラメータ
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>基準価格（円/kWh）</label>
            <input
              type="number"
              step="0.1"
              value={basePrice}
              onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)}
              style={inputStyle}
            />
          </div>

          <div style={{ color: "#5dade2", fontSize: 12, fontWeight: "bold", marginBottom: 10, marginTop: 20 }}>
            参照価格の計算要素
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>前年度年間平均市場価格（円/kWh）</label>
            <input
              type="number"
              step="0.01"
              value={prevYearAvg}
              onChange={(e) => setPrevYearAvg(parseFloat(e.target.value) || 0)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>当年当月平均市場価格（円/kWh）</label>
            <input
              type="number"
              step="0.01"
              value={currentMonthAvg}
              onChange={(e) => setCurrentMonthAvg(parseFloat(e.target.value) || 0)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>前年同月平均市場価格（円/kWh）</label>
            <input
              type="number"
              step="0.01"
              value={prevYearMonthAvg}
              onChange={(e) => setPrevYearMonthAvg(parseFloat(e.target.value) || 0)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>非化石価値（円/kWh）</label>
            <input
              type="number"
              step="0.01"
              value={nonFossilValue}
              onChange={(e) => setNonFossilValue(parseFloat(e.target.value) || 0)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>バランシングコスト（円/kWh）</label>
            <input
              type="number"
              step="0.01"
              value={balancingCost}
              onChange={(e) => setBalancingCost(parseFloat(e.target.value) || 0)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>月間発電量（kWh）</label>
            <input
              type="number"
              step="1000"
              value={generationKwh}
              onChange={(e) => setGenerationKwh(parseInt(e.target.value) || 0)}
              style={inputStyle}
            />
          </div>

          <button
            onClick={handleCalculate}
            style={{
              width: "100%",
              backgroundColor: "#1a3a6e",
              color: "var(--accent)",
              border: "1px solid #3a6aae",
              borderRadius: 8,
              padding: "11px 0",
              fontSize: 15,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            計算する
          </button>
        </div>

        {/* Result */}
        <div>
          {/* Formula */}
          <div
            style={{
              backgroundColor: "#0f1e38",
              border: "1px solid #1e2d4a",
              borderLeft: "4px solid #3498db",
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 16,
              fontSize: 13,
              lineHeight: 2,
            }}
          >
            <div style={{ color: "#5dade2", fontWeight: "bold", marginBottom: 8 }}>計算式</div>
            <div style={{ color: "#9aabb8" }}>
              参照価格 = 前年度年平均<br />
              　　　　＋（当月平均 − 前年同月）<br />
              　　　　＋ 非化石価値 − BC
            </div>
            <div style={{ color: "#9aabb8", marginTop: 8 }}>
              プレミアム = max(0, 基準価格 − 参照価格)
            </div>
          </div>

          <div
            style={{
              backgroundColor: "var(--bg-card-dark)",
              border: "1px solid var(--border-color)",
              borderRadius: 12,
              padding: "20px",
            }}
          >
            <div style={{ color: "var(--accent)", fontWeight: "bold", marginBottom: 16 }}>
              計算結果
            </div>

            <ResultRow
              label="参照価格"
              value={`${referencePrice.toFixed(2)} 円/kWh`}
              color="var(--accent-blue)"
              formula={`${prevYearAvg} + (${currentMonthAvg} − ${prevYearMonthAvg}) + ${nonFossilValue} − ${balancingCost}`}
            />

            <ResultRow
              label="プレミアム単価"
              value={`${premium.toFixed(2)} 円/kWh`}
              color={premium > 0 ? "#27ae60" : "#7090b0"}
              sub={
                premium === 0
                  ? "（参照価格 ≥ 基準価格のためプレミアムなし）"
                  : `（${basePrice} − ${referencePrice.toFixed(2)}）`
              }
            />

            {calculated && (
              <>
                <div style={{ borderTop: "1px solid var(--border-color)", margin: "16px 0" }} />

                <ResultRow
                  label="市場売電収入"
                  value={`${marketIncome.toLocaleString()} 円`}
                  color="#c8d4ea"
                  formula={`${currentMonthAvg}円 × ${generationKwh.toLocaleString()}kWh`}
                />

                <ResultRow
                  label="プレミアム収入"
                  value={`${premiumIncome.toLocaleString()} 円`}
                  color={premiumIncome > 0 ? "#27ae60" : "#7090b0"}
                  formula={`${premium.toFixed(2)}円 × ${generationKwh.toLocaleString()}kWh`}
                />

                <div style={{ borderTop: "1px solid var(--border-color)", margin: "16px 0" }} />

                <ResultRow
                  label="合計収入"
                  value={`${totalIncome.toLocaleString()} 円`}
                  color="var(--accent)"
                  large
                />

                <div style={{ marginTop: 12, fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>
                  ※ 非化石証書収入・インバランス精算は含みません。
                </div>
              </>
            )}
          </div>

          {/* Quick Guide */}
          <div
            style={{
              backgroundColor: "var(--bg-card-dark)",
              border: "1px solid var(--border-color)",
              borderRadius: 12,
              padding: "16px",
              marginTop: 14,
            }}
          >
            <div style={{ color: "#5dade2", fontWeight: "bold", fontSize: 13, marginBottom: 10 }}>
              参考値（2026年度）
            </div>
            <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
              <tbody>
                {[
                  ["基準価格（太陽光）", "9.6 円/kWh"],
                  ["前年度年間平均", "12.31 円/kWh"],
                  ["非化石価値上限", "1.30 円/kWh"],
                  ["バランシングコスト", "〜1.00 円/kWh"],
                ].map(([k, v]) => (
                  <tr key={k}>
                    <td style={{ color: "var(--text-secondary)", padding: "4px 0" }}>{k}</td>
                    <td style={{ color: "#d0d8e8", textAlign: "right" }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  color,
  formula,
  sub,
  large,
}: {
  label: string;
  value: string;
  color: string;
  formula?: string;
  sub?: string;
  large?: boolean;
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ color: "var(--text-secondary)", fontSize: 12, marginBottom: 2 }}>{label}</div>
      <div style={{ color, fontSize: large ? 20 : 16, fontWeight: large ? "bold" : "normal" }}>
        {value}
      </div>
      {formula && <div style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>{formula}</div>}
      {sub && <div style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}
