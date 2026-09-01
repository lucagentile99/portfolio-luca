import { useEffect, useState, type CSSProperties } from "react";
import type { ResultMetric, ResultPeriod } from "../../types";
import { useT } from "../../i18n/LanguageContext";
import "./PerformanceVisual.css";

interface PerformanceVisualProps {
  periods: ResultPeriod[];
  conclusion?: string;
}

interface ParsedLabel {
  base: string;
  trend: { sign: "up" | "down"; text: string } | null;
}

// Separa "alcance (+144%)" en base="alcance" y trend={sign:"up", text:"+144%"}.
// Si no hay porcentaje entre paréntesis, se muestra la etiqueta tal cual.
function parseLabel(label: string): ParsedLabel {
  const match = label.match(/^(.*?)\s*\(([+-])([\d.,]+%)\)$/);
  if (!match) return { base: label, trend: null };
  const [, base, sign, pct] = match;
  return { base: base.trim(), trend: { sign: sign === "+" ? "up" : "down", text: `${sign}${pct}` } };
}

function trendMagnitude(text: string): number {
  const num = parseFloat(text.replace(/[+\-.]/g, (m) => (m === "." ? "" : "")).replace(",", "."));
  if (Number.isNaN(num)) return 0;
  return Math.min(100, Math.max(12, num));
}

function MetricTile({ metric, variant }: { metric: ResultMetric; variant: "hero" | "secondary" }) {
  const { base, trend } = parseLabel(metric.label);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setFilled(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`metric-tile metric-tile--${variant}`}>
      <span className="metric-tile__value">{metric.value}</span>
      <span className="metric-tile__label">{base}</span>
      {trend && (
        <span className={`metric-tile__trend metric-tile__trend--${trend.sign}`}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {trend.sign === "up" ? (
              <path d="M5 17 17 5M17 5H8M17 5v9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M5 7 17 19M17 19H8M17 19v-9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </svg>
          {trend.text}
        </span>
      )}
      {trend && (
        <span className="metric-tile__bar-track" aria-hidden="true">
          <span
            className={`metric-tile__bar-fill metric-tile__bar-fill--${trend.sign} ${filled ? "is-filled" : ""}`}
            style={{ "--bar-target-width": `${trendMagnitude(trend.text)}%` } as CSSProperties}
          />
        </span>
      )}
    </div>
  );
}

interface PerformanceCoverMiniProps {
  eyebrow: string;
  metrics: ResultMetric[];
}

// Portada resumida para la tarjeta de un caso sin imágenes de campaña
// propias (ver `coverStats` en CaseStudy): 2-3 métricas reales, sin capturas
// de reporte. El "sparkline" es puramente decorativo (sin valores propios),
// no representa una serie de datos.
export function PerformanceCoverMini({ eyebrow, metrics }: PerformanceCoverMiniProps) {
  const [hero, ...rest] = metrics;
  if (!hero) return null;

  return (
    <div className="performance-cover">
      <span className="performance-cover__eyebrow">{eyebrow}</span>
      <div className="performance-cover__hero">
        <span className="performance-cover__hero-value">{hero.value}</span>
        <span className="performance-cover__hero-label">{hero.label}</span>
      </div>
      {rest.length > 0 && (
        <div className="performance-cover__secondary">
          {rest.map((metric) => (
            <div key={metric.label} className="performance-cover__stat">
              <span className="performance-cover__stat-value">{metric.value}</span>
              <span className="performance-cover__stat-label">{metric.label}</span>
            </div>
          ))}
        </div>
      )}
      <svg className="performance-cover__spark" viewBox="0 0 120 40" aria-hidden="true">
        <polyline
          points="4,34 30,26 55,28 80,12 116,6"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="116" cy="6" r="4" fill="currentColor" />
      </svg>
    </div>
  );
}

export default function PerformanceVisual({ periods, conclusion }: PerformanceVisualProps) {
  const t = useT();
  if (periods.length === 0) return null;

  return (
    <section className="performance-visual" aria-label={t.performance.aria}>
      <div className="window-chrome performance-visual__chrome">
        <span className="window-chrome__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="window-chrome__title">{t.performance.dashboardTitle}</span>
      </div>
      <p className="performance-visual__eyebrow">{t.performance.eyebrow}</p>
      <h4 className="performance-visual__title">{t.performance.title}</h4>
      <p className="performance-visual__intro">{t.performance.intro}</p>

      <div className="performance-visual__periods">
        {periods.map((period) => {
          const [hero, ...rest] = period.metrics;
          return (
            <div key={period.period} className="performance-visual__period">
              <p className="performance-visual__period-title">{period.period}</p>
              <div className="performance-visual__grid">
                {hero && <MetricTile metric={hero} variant="hero" />}
                {rest.length > 0 && (
                  <div className="performance-visual__secondary">
                    {rest.map((metric) => (
                      <MetricTile key={metric.label} metric={metric} variant="secondary" />
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {conclusion && <p className="performance-visual__conclusion">{conclusion}</p>}
    </section>
  );
}
