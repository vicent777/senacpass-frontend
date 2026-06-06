interface Props {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: Props) {
  return (
    <div
      style={{
        display: 'grid',
        gap: 6,
        padding: '18px 16px',
        borderRadius: 16,
        border: '1px dashed rgba(15, 23, 42, 0.14)',
        background: '#f8fafc',
        color: '#475569',
      }}
    >
      <strong style={{ color: '#1f2937' }}>{title}</strong>
      <span style={{ lineHeight: 1.55 }}>{description}</span>
    </div>
  );
}