type SidebarLabelProps = {
  text: string;
};

export function SidebarLabel({ text }: SidebarLabelProps) {
  return (
    <span className="flex justify-center text-sm font-bold text-[var(--sidebar-color,hsl(var(--primary)))] pb-2 uppercase">
      {text}
    </span>
  );
}
