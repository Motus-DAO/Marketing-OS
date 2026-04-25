import { titleCase } from '../lib/format';

export function StatusBadge({ value, tone = 'neutral' }: { value?: string | null; tone?: 'neutral' | 'success' | 'warning' | 'danger' }) {
  return <span className={`badge badge-${tone}`}>{titleCase(value)}</span>;
}
