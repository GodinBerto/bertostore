export default function GridLayout({ children, className }: GridLayout) {
  return (
    <div className="border-b border-border">
      <div
        className={`w-full container mx-auto border-x border-border ${className ?? ""}`}
      >
        {children}
      </div>
    </div>
  );
}
