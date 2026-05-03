interface HUDTitleProps {
  children: React.ReactNode;
}

export default function TitleBorder({ children }: HUDTitleProps) {
  return (
    <div className="relative inline-block">
      <div className="absolute -top-1 -left-1 w-4 h-4 border-t-4 border-l-4 border-accent"></div>
      <div className="absolute -top-1 -right-1 w-4 h-4 border-t-4 border-r-4 border-accent"></div>
      <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-4 border-l-4 border-accent"></div>
      <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-4 border-r-4 border-accent"></div>
      <h1 className="text-4xl px-2 py-2 text-black uppercase tracking-wider">
        {children}
      </h1>
    </div>
  );
}