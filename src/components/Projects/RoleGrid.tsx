import type { ParticipationCategory, ParticipationItem } from "../../types";
import { useT } from "../../i18n/LanguageContext";
import "./RoleGrid.css";

const categoryOrder: ParticipationCategory[] = ["estrategia", "creatividad", "implementacion"];

interface RoleGridProps {
  items: ParticipationItem[];
  tools?: string[];
}

export function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 8.5A1.5 1.5 0 0 1 4.5 7H9l1.5 2H19a1.5 1.5 0 0 1 1.5 1.5V16A1.5 1.5 0 0 1 19 17.5H4.5A1.5 1.5 0 0 1 3 16V8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// "Lo que hice": cada categoría (Estrategia / Creatividad / Implementación) es
// una carpeta celeste compacta (fondo + pestaña arriba), con sus tareas como
// chips adentro — sin guiones ni subtítulos sueltos. Las herramientas, si
// suman, van al final como una fila chica fuera de las carpetas.
export default function RoleGrid({ items, tools }: RoleGridProps) {
  const t = useT();
  const groups = categoryOrder
    .map((category) => ({ category, items: items.filter((item) => item.category === category) }))
    .filter((group) => group.items.length > 0);

  if (groups.length === 0) return null;

  return (
    <div className="role-grid">
      <p className="role-grid__eyebrow">{t.roleGrid.whatIDid}</p>

      <div className="role-grid__folders">
        {groups.map((group) => (
          <div key={group.category} className="role-grid__folder">
            <span className="role-grid__folder-tab" aria-hidden="true" />
            <p className="role-grid__folder-title">
              <FolderIcon />
              {t.roleGrid.categories[group.category]}
            </p>
            <div className="role-grid__chips">
              {group.items.slice(0, 4).map((item) => (
                <span key={item.text} className="role-grid__chip">
                  {item.text}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {tools && tools.length > 0 && (
        <div className="role-grid__tools">
          <span className="role-grid__tools-label">{t.roleGrid.tools}</span>
          <div className="role-grid__chips role-grid__chips--tools">
            {tools.map((tool) => (
              <span key={tool} className="tag">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
