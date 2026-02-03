import { useState } from "react";
import { Link } from "react-router-dom";

// ═══════════════════════════════════════════════════════════════════════════
// COLOUR PALETTE
// Each colour is a preset used by sections and individual blocks.
// To add a new colour: add an entry here, then reference it by name in JSON.
// Full class strings are written out so Tailwind's purger doesn't strip them.
// ═══════════════════════════════════════════════════════════════════════════
const COLORS = {
  red: {
    border: "border-red-800",
    heading: "text-red-400",
    cardBorder: "border-red-900",
    cardTitle: "text-red-300",
    badge: "bg-red-800 text-red-100",
  },
  pink: {
    border: "border-pink-800",
    heading: "text-pink-400",
    cardBorder: "border-pink-900",
    cardTitle: "text-pink-300",
    badge: "bg-pink-800 text-pink-100",
  },
  orange: {
    border: "border-orange-800",
    heading: "text-orange-400",
    cardBorder: "border-orange-900",
    cardTitle: "text-orange-300",
    badge: "bg-orange-800 text-orange-100",
  },
  emerald: {
    border: "border-emerald-800",
    heading: "text-emerald-400",
    cardBorder: "border-emerald-900",
    cardTitle: "text-emerald-300",
    badge: "bg-emerald-800 text-emerald-100",
  },
  sky: {
    border: "border-sky-800",
    heading: "text-sky-400",
    cardBorder: "border-sky-900",
    cardTitle: "text-sky-300",
    badge: "bg-sky-800 text-sky-100",
  },
  blue: {
    border: "border-blue-800",
    heading: "text-blue-400",
    cardBorder: "border-blue-900",
    cardTitle: "text-blue-300",
    badge: "bg-blue-800 text-blue-100",
  },
  indigo: {
    border: "border-indigo-800",
    heading: "text-indigo-400",
    cardBorder: "border-indigo-900",
    cardTitle: "text-indigo-300",
    badge: "bg-indigo-800 text-indigo-100",
  },
  purple: {
    border: "border-purple-800",
    heading: "text-purple-400",
    cardBorder: "border-purple-900",
    cardTitle: "text-purple-300",
    badge: "bg-purple-800 text-purple-100",
  },
  amber: {
    border: "border-amber-800",
    heading: "text-amber-400",
    cardBorder: "border-amber-900",
    cardTitle: "text-amber-300",
    badge: "bg-amber-800 text-amber-100",
  },
};

// Grid column classes kept as full strings for Tailwind purger
const GRID_COLS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

// Helper: resolve a colour name to the palette object, with a fallback
const c = (name) => COLORS[name] || COLORS.indigo;

// ═══════════════════════════════════════════════════════════════════════════
// BLOCK TYPE COMPONENTS
// ─────────────────────────────────────────────────────────────────────────
// Each component maps to one "type" value in the JSON.
// To add a new block type:
//   1. Write the component here
//   2. Add a case to renderBlock() below
//   3. Use it in any summary JSON
//   No other files need changing.
// ═══════════════════════════════════════════════════════════════════════════

// ─── TEXT ─────────────────────────────────────────────────────────────────
// Plain paragraph. Use for introductory or connecting sentences.
// JSON: { "type": "text", "content": "..." }
const TextBlock = ({ block }) => (
  <p className="text-gray-400 text-sm">{block.content}</p>
);

// ─── SUBHEADING ───────────────────────────────────────────────────────────
// A smaller heading within a section. Sits above grids, tables, etc.
// JSON: { "type": "subheading", "content": "..." }
const SubheadingBlock = ({ block }) => (
  <p className="text-gray-300 text-sm font-semibold mt-4 mb-1">
    {block.content}
  </p>
);

// ─── DEFINITION ───────────────────────────────────────────────────────────
// Gold DEF badge — the main term callout. Stands out when scanning.
// JSON: { "type": "definition", "label": "Term", "content": "What it means" }
const DefinitionBlock = ({ block }) => (
  <div className="flex items-start gap-2 my-2">
    <span className="inline-block bg-amber-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded mt-0.5 whitespace-nowrap shrink-0">
      DEF
    </span>
    <span className="text-gray-200 text-sm">
      <strong className="text-amber-300">{block.label}:</strong> {block.content}
    </span>
  </div>
);

// ─── KEYPOINTS ────────────────────────────────────────────────────────────
// Bulleted list with green arrow markers. Good for must-remember lists.
// JSON: { "type": "keypoints", "items": ["Point 1", "Point 2"] }
const KeypointsBlock = ({ block }) => (
  <div className="space-y-1">
    {block.items.map((item, i) => (
      <div key={i} className="flex items-start gap-2">
        <span className="text-emerald-400 mt-0.5 shrink-0">▸</span>
        <span className="text-gray-300 text-sm">{item}</span>
      </div>
    ))}
  </div>
);

// ─── GRID ─────────────────────────────────────────────────────────────────
// Flexible card grid. Columns set by "columns" (1-4, defaults to 2).
// Card colour defaults to parent section colour, override with "cardColor".
// Each item can have: title, description, icon, badge, note.
//
// JSON:
// {
//   "type": "grid",
//   "columns": 2,
//   "cardColor": "sky",
//   "items": [
//     { "title": "...", "description": "...", "icon": "🔍", "badge": "label", "note": "tip" }
//   ]
// }
const GridBlock = ({ block, sectionColor }) => {
  const col = c(block.cardColor || sectionColor);
  return (
    <div className={`grid ${GRID_COLS[block.columns] || GRID_COLS[2]} gap-2`}>
      {block.items.map((item, i) => (
        <div
          key={i}
          className={`bg-gray-900 border ${col.cardBorder} rounded-lg p-2`}
        >
          <div className="flex items-center flex-wrap gap-1">
            {item.icon && <span>{item.icon}</span>}
            <span className={`${col.cardTitle} text-sm font-bold`}>
              {item.title}
            </span>
            {item.badge && (
              <span className={`text-xs ${col.badge} rounded px-2 py-0.5`}>
                {item.badge}
              </span>
            )}
          </div>
          {item.description && (
            <div className="text-gray-400 text-xs mt-1">{item.description}</div>
          )}
          {item.note && (
            <div className="text-gray-300 text-xs mt-1 italic">
              ⚡ {item.note}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── TABLE ────────────────────────────────────────────────────────────────
// Header row + data rows with alternating shading.
// "codeColumn" is an optional 0-based index — that column renders in
// monospace green. Handy for command/syntax columns.
//
// JSON:
// {
//   "type": "table",
//   "headers": ["Command", "Purpose"],
//   "codeColumn": 0,
//   "rows": [
//     ["show ip route", "Displays the routing table"],
//     ["show running-config", "Shows active configuration"]
//   ]
// }
const TableBlock = ({ block, sectionColor }) => {
  const col = c(sectionColor);
  return (
    <div
      className={`bg-gray-900 border ${col.cardBorder} rounded-lg overflow-hidden`}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800">
            {block.headers.map((h, i) => (
              <th
                key={i}
                className={`text-left p-2 ${col.cardTitle} font-semibold text-xs uppercase tracking-wide`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, rowIdx) => (
            <tr
              key={rowIdx}
              className={rowIdx % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
            >
              {row.map((cell, colIdx) => (
                <td
                  key={colIdx}
                  className={`p-2 text-xs ${block.codeColumn === colIdx ? "font-mono text-emerald-300" : "text-gray-300"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// ─── CODEBLOCK ────────────────────────────────────────────────────────────
// Monospace block — green text on dark background. For CLI commands.
// JSON: { "type": "codeblock", "code": "Router# show ip route\n..." }
const CodeBlock = ({ block }) => (
  <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 mt-1 font-mono text-xs text-emerald-300 whitespace-pre overflow-x-auto">
    {block.code}
  </div>
);

// ─── COMPARISON ───────────────────────────────────────────────────────────
// Side-by-side boxes. Red left, green right.
// Useful for weak vs strong, DoS vs DDoS, TCP vs UDP, etc.
// Optional "note" renders underneath.
//
// JSON:
// {
//   "type": "comparison",
//   "left":  { "label": "WEAK",   "content": "..." },
//   "right": { "label": "STRONG", "content": "..." },
//   "note": "Extra context"
// }
const ComparisonBlock = ({ block }) => (
  <div>
    <div className="flex gap-3">
      <div className="flex-1 bg-red-900 bg-opacity-30 border border-red-800 rounded-lg p-2">
        <div className="text-red-400 text-xs font-bold mb-1">
          ✗ {block.left.label}
        </div>
        <div className="text-gray-300 text-sm">{block.left.content}</div>
      </div>
      <div className="flex-1 bg-emerald-900 bg-opacity-30 border border-emerald-800 rounded-lg p-2">
        <div className="text-emerald-400 text-xs font-bold mb-1">
          ✓ {block.right.label}
        </div>
        <div className="text-gray-300 text-sm">{block.right.content}</div>
      </div>
    </div>
    {block.note && <p className="text-gray-500 text-xs mt-1">{block.note}</p>}
  </div>
);

// ─── STEPS ────────────────────────────────────────────────────────────────
// Numbered step list. Each step has a description and an optional command.
// Number badge colour inherits from the parent section.
//
// JSON:
// {
//   "type": "steps",
//   "steps": [
//     { "command": "hostname R1", "description": "Set a unique hostname" },
//     { "description": "Step without a command" }
//   ]
// }
const StepsBlock = ({ block, sectionColor }) => {
  const col = c(sectionColor);
  return (
    <div className={`bg-gray-900 border ${col.cardBorder} rounded-lg p-3`}>
      {block.steps.map((step, i) => (
        <div
          key={i}
          className={`flex items-start gap-2 py-1 ${i < block.steps.length - 1 ? "border-b border-gray-800" : ""}`}
        >
          <span
            className={`${col.badge} text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shrink-0`}
          >
            {i + 1}
          </span>
          <div>
            {step.command && (
              <div className="font-mono text-emerald-300 text-xs">
                {step.command}
              </div>
            )}
            <div className="text-gray-400 text-xs">{step.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── CALLOUT ──────────────────────────────────────────────────────────────
// Highlighted tip / info / warning box. Colour defaults to section colour,
// override with "color" on the block.
//
// JSON:
// {
//   "type": "callout",
//   "title": "💡 Remember:",
//   "content": "The important bit...",
//   "color": "emerald"
// }
const CalloutBlock = ({ block, sectionColor }) => {
  const col = c(block.color || sectionColor);
  return (
    <div className={`bg-gray-800 border ${col.border} rounded-lg p-3 mt-2`}>
      {block.title && (
        <p className={`${col.heading} text-sm font-bold`}>{block.title}</p>
      )}
      <p className="text-gray-300 text-xs mt-1">{block.content}</p>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// BLOCK ROUTER — maps block.type to the correct component
// ═══════════════════════════════════════════════════════════════════════════
const renderBlock = (block, index, sectionColor) => {
  const props = { block, sectionColor };

  switch (block.type) {
    case "text":
      return <TextBlock key={index} {...props} />;
    case "subheading":
      return <SubheadingBlock key={index} {...props} />;
    case "definition":
      return <DefinitionBlock key={index} {...props} />;
    case "keypoints":
      return <KeypointsBlock key={index} {...props} />;
    case "grid":
      return <GridBlock key={index} {...props} />;
    case "table":
      return <TableBlock key={index} {...props} />;
    case "codeblock":
      return <CodeBlock key={index} {...props} />;
    case "comparison":
      return <ComparisonBlock key={index} {...props} />;
    case "steps":
      return <StepsBlock key={index} {...props} />;
    case "callout":
      return <CalloutBlock key={index} {...props} />;
    default:
      return null;
  }
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXPORT — ModuleSummary
// Props:
//   data      — the parsed JSON object from module-X-summary.json
//   backLink  — where "Back to Modules" goes (default "/ccna")
// ═══════════════════════════════════════════════════════════════════════════
export default function ModuleSummary({ data, backLink = "/ccna" }) {
  const [expanded, setExpanded] = useState(() =>
    Object.fromEntries((data?.sections || []).map((_, i) => [i, true])),
  );
  const toggle = (i) => setExpanded((prev) => ({ ...prev, [i]: !prev[i] }));

  if (!data)
    return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          to={backLink}
          className="text-indigo-400 hover:text-indigo-300 text-sm mb-4 inline-block"
        >
          ← Back to Modules
        </Link>

        {/* Header */}
        <div className="text-center mb-6 pt-2">
          <div className="inline-block bg-gray-800 border border-gray-700 rounded-full px-4 py-1 text-xs text-gray-400 mb-2">
            Module {data.number}
          </div>
          <h1 className="text-2xl font-bold text-white">{data.title}</h1>
          {data.description && (
            <p className="text-gray-500 text-sm mt-1">{data.description}</p>
          )}
        </div>

        {/* Glance strip — optional. Include "glance" in JSON if the module
            has key numbers worth pinning at the top. */}
        {data.glance && (
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-3 mb-5">
            <div className="text-gray-500 text-xs font-bold mb-2 uppercase tracking-wide">
              At a Glance
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              {data.glance.map((item, i) => (
                <div key={i} className="bg-gray-800 rounded-lg p-2">
                  <div className="text-2xl font-bold text-emerald-400">
                    {item.number}
                  </div>
                  <div className="text-gray-300 text-xs font-bold">
                    {item.label}
                  </div>
                  <div className="text-gray-500 text-xs mt-0.5">
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sections — collapsible cards. Colour + icon defined per section in JSON. */}
        {data.sections.map((section, i) => {
          const col = c(section.color);
          return (
            <div
              key={i}
              className={`bg-gray-800 border ${col.border} rounded-xl p-4 mb-4`}
            >
              {/* Header row — click to toggle */}
              <div
                className="cursor-pointer flex items-center justify-between select-none"
                onClick={() => toggle(i)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <h2
                    className={`text-lg font-bold ${col.heading} tracking-wide uppercase`}
                  >
                    {section.title}
                  </h2>
                </div>
                <span
                  className="text-gray-500 text-lg transition-transform duration-200"
                  style={{
                    transform: expanded[i] ? "rotate(0deg)" : "rotate(-90deg)",
                  }}
                >
                  ▾
                </span>
              </div>

              {/* Blocks */}
              {expanded[i] && (
                <div className="mt-3 space-y-2">
                  {section.blocks.map((block, j) =>
                    renderBlock(block, j, section.color),
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Footer */}
        <div className="text-center text-gray-600 text-xs pb-6">
          Module {data.number} · {data.title} · Summary
        </div>
      </div>
    </div>
  );
}
