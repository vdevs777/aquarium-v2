type SectionProps = {
  title: string;
  children: React.ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <div className="border-b px-4 last:border-b-0">
      <div className="flex h-12 items-center font-semibold">{title}</div>
      <div className="pb-4">{children}</div>
    </div>
  );
}
