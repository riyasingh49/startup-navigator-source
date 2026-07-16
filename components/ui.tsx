export function PageShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <p className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#65736b]">{eyebrow}</p>
      <h1 className="mb-6 text-3xl font-black text-[#10211e] sm:text-4xl">{title}</h1>
      {children}
    </section>
  );
}

export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
      <strong className="block text-3xl font-black text-[#153b37]">{value}</strong>
      <span className="mt-1 block text-sm font-bold text-[#65736b]">{label}</span>
    </div>
  );
}

export function EmptyState({ text }: { text: string }) {
  return <p className="rounded bg-[#f7f8f5] p-4 text-sm font-semibold text-[#65736b]">{text}</p>;
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="mt-4 block text-sm font-black">
      {label}
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 block w-full rounded border border-[#d8ded4] bg-[#f7f8f5] px-3 py-3 text-sm font-normal outline-none focus:border-[#153b37]"
      />
    </label>
  );
}

export function InfoPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded border border-[#d8ded4] bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">{title}</h2>
      <p className="mt-3 leading-7 text-[#4d5d55]">{children}</p>
    </div>
  );
}
