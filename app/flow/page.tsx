"use client";
import { useEffect, useRef, useState } from "react";
import { loadProgress, saveProgress } from "@/lib/storage";
import { addXp } from "@/lib/gamification";
import flowData from "@/data/flow_data.json";
import type { FlowNode, FlowData } from "@/lib/types";

const data = flowData as FlowData;

const NODE_COLORS: Record<string, string> = {
  actor: "#1a3a6e",
  action: "#2a1a5e",
  result: "#1a5e2a",
};
const NODE_BORDERS: Record<string, string> = {
  actor: "#3498db",
  action: "#9b59b6",
  result: "#27ae60",
};

export default function FlowPage() {
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
  const [xpAwarded, setXpAwarded] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const SCALE = 1.0;
  const NODE_W = 120;
  const NODE_H = 50;

  const handleNodeClick = (node: FlowNode) => {
    setSelectedNode(node);
    const newViewed = new Set(viewedIds).add(node.id);
    setViewedIds(newViewed);

    let p = loadProgress();
    const { progress: np } = addXp(p, "flow_node_read");
    saveProgress(np);
    window.dispatchEvent(new Event("xp_update"));

    if (newViewed.size === data.nodes.length && !xpAwarded) {
      setXpAwarded(true);
      // Badge: flow_doctor
    }
  };

  // Compute edges from connections
  const edges: { from: FlowNode; to: FlowNode }[] = [];
  const nodeMap = Object.fromEntries(data.nodes.map((n) => [n.id, n]));
  for (const node of data.nodes) {
    for (const cid of node.connections) {
      if (nodeMap[cid]) edges.push({ from: node, to: nodeMap[cid] });
    }
  }

  const minX = Math.min(...data.nodes.map((n) => n.x));
  const minY = Math.min(...data.nodes.map((n) => n.y));
  const maxX = Math.max(...data.nodes.map((n) => n.x)) + NODE_W;
  const maxY = Math.max(...data.nodes.map((n) => n.y)) + NODE_H;
  const viewBox = `${minX - 20} ${minY - 20} ${maxX - minX + 40} ${maxY - minY + 40}`;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ color: "var(--accent)", fontSize: 20, fontWeight: "bold" }}>
          🗺️ フロー図学習
        </div>
        <div style={{ color: "var(--text-secondary)", fontSize: 13, marginTop: 4 }}>
          ノードをクリックして説明を確認 ({viewedIds.size}/{data.nodes.length}個閲覧済み)
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
        {(["actor", "action", "result"] as const).map((t) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 2,
                backgroundColor: NODE_COLORS[t],
                border: `2px solid ${NODE_BORDERS[t]}`,
              }}
            />
            <span style={{ color: "var(--text-secondary)", fontSize: 12 }}>
              {t === "actor" ? "関係者" : t === "action" ? "アクション" : "結果"}
            </span>
          </div>
        ))}
      </div>

      <div className="grid-flow">
        {/* SVG Flow Diagram */}
        <div
          style={{
            backgroundColor: "var(--bg-card-dark)",
            border: "1px solid var(--border-color)",
            borderRadius: 12,
            overflow: "auto",
            maxHeight: 580,
            WebkitOverflowScrolling: "touch" as React.CSSProperties["WebkitOverflowScrolling"],
          }}
        >
          <svg
            ref={svgRef}
            viewBox={viewBox}
            style={{ width: "100%", minWidth: 600 }}
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <marker
                id="arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="8"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#2a4070" />
              </marker>
            </defs>

            {/* Edges */}
            {edges.map(({ from, to }, i) => {
              const x1 = from.x + NODE_W / 2;
              const y1 = from.y + NODE_H / 2;
              const x2 = to.x + NODE_W / 2;
              const y2 = to.y + NODE_H / 2;
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#2a4070"
                  strokeWidth={1.5}
                  markerEnd="url(#arrowhead)"
                  opacity={0.7}
                />
              );
            })}

            {/* Nodes */}
            {data.nodes.map((node) => {
              const isSelected = selectedNode?.id === node.id;
              const isViewed = viewedIds.has(node.id);
              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => handleNodeClick(node)}
                  style={{ cursor: "pointer" }}
                >
                  <rect
                    width={NODE_W}
                    height={NODE_H}
                    rx={8}
                    fill={isSelected ? "#1a3a6e" : NODE_COLORS[node.node_type]}
                    stroke={isSelected ? "var(--accent)" : NODE_BORDERS[node.node_type]}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    opacity={isViewed && !isSelected ? 0.85 : 1}
                  />
                  <text
                    x={NODE_W / 2}
                    y={NODE_H / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={isSelected ? "var(--accent)" : "#d0d8e8"}
                    fontSize={10}
                    fontFamily="sans-serif"
                    style={{ userSelect: "none", pointerEvents: "none", whiteSpace: "pre" }}
                  >
                    {node.label.split("\n").map((line, idx, arr) => (
                      <tspan
                        key={idx}
                        x={NODE_W / 2}
                        dy={idx === 0 ? `${-(arr.length - 1) * 6}` : 12}
                      >
                        {line}
                      </tspan>
                    ))}
                  </text>
                  {isViewed && (
                    <circle cx={NODE_W - 8} cy={8} r={5} fill="#27ae60" />
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail Panel */}
        <div>
          {selectedNode ? (
            <div
              style={{
                backgroundColor: "var(--bg-card-dark)",
                border: `1px solid ${NODE_BORDERS[selectedNode.node_type]}`,
                borderTop: `4px solid ${NODE_BORDERS[selectedNode.node_type]}`,
                borderRadius: 12,
                padding: "18px",
              }}
            >
              <div
                style={{
                  backgroundColor: NODE_COLORS[selectedNode.node_type] + "88",
                  border: `1px solid ${NODE_BORDERS[selectedNode.node_type]}`,
                  borderRadius: 6,
                  padding: "2px 10px",
                  fontSize: 11,
                  color: NODE_BORDERS[selectedNode.node_type],
                  display: "inline-block",
                  marginBottom: 10,
                }}
              >
                {selectedNode.node_type === "actor"
                  ? "関係者"
                  : selectedNode.node_type === "action"
                  ? "アクション"
                  : "結果"}
              </div>
              <div
                style={{
                  color: "#eef2ff",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginBottom: 12,
                  lineHeight: 1.4,
                }}
              >
                {selectedNode.label.replace("\n", " ")}
              </div>
              <div
                style={{
                  color: "#c8d4ea",
                  fontSize: 13,
                  lineHeight: 1.8,
                }}
              >
                {selectedNode.description}
              </div>
              {selectedNode.connections.length > 0 && (
                <div style={{ marginTop: 14 }}>
                  <div style={{ color: "var(--text-secondary)", fontSize: 12, marginBottom: 6 }}>
                    → 次のステップ
                  </div>
                  {selectedNode.connections.map((cid) => {
                    const n = nodeMap[cid];
                    if (!n) return null;
                    return (
                      <div
                        key={cid}
                        onClick={() => handleNodeClick(n)}
                        style={{
                          backgroundColor: "#0f1e38",
                          border: "1px solid #1e2d4a",
                          borderRadius: 6,
                          padding: "6px 10px",
                          fontSize: 12,
                          color: "#5dade2",
                          cursor: "pointer",
                          marginBottom: 6,
                        }}
                      >
                        {n.label.replace("\n", " ")} →
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div
              style={{
                backgroundColor: "var(--bg-card-dark)",
                border: "1px solid var(--border-color)",
                borderRadius: 12,
                padding: "24px",
                textAlign: "center",
                color: "var(--text-secondary)",
                fontSize: 14,
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>🗺️</div>
              ノードをクリックすると
              <br />
              詳細説明が表示されます
            </div>
          )}

          {/* Node list */}
          <div
            style={{
              backgroundColor: "var(--bg-card-dark)",
              border: "1px solid var(--border-color)",
              borderRadius: 12,
              padding: "14px",
              marginTop: 14,
              maxHeight: 280,
              overflow: "auto",
            }}
          >
            <div style={{ color: "var(--text-secondary)", fontSize: 12, marginBottom: 10 }}>
              全ノード一覧
            </div>
            {data.nodes.map((node) => (
              <div
                key={node.id}
                onClick={() => handleNodeClick(node)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "6px 8px",
                  borderRadius: 6,
                  cursor: "pointer",
                  backgroundColor: selectedNode?.id === node.id ? "#1a2d50" : "transparent",
                  marginBottom: 2,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    backgroundColor: viewedIds.has(node.id) ? "#27ae60" : NODE_BORDERS[node.node_type],
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: 12, color: "#c8d4ea" }}>
                  {node.label.replace("\n", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
