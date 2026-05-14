interface HUDTitleProps {
  size?: "small" | "large";
  children: React.ReactNode;
}

export default function TitleBorder({ children, size = "large"}: HUDTitleProps) {
  return (
    <div className="relative inline-block">
      <div className={`absolute -top-1 -left-1 w-4 h-4 border-accent ${size === 'large' ? 'border-t-4 border-l-4' : 'border-t-2 border-l-2'}`}></div>
      <div className={`absolute -top-1 -right-1 w-4 h-4 border-accent ${size === 'large' ? 'border-t-4 border-r-4' : 'border-t-2 border-r-2'}`}></div>
      <div className={`absolute -bottom-1 -left-1 w-4 h-4  border-accent ${size === 'large' ? 'border-b-4 border-l-4' : 'border-b-2 border-l-2'}`}></div>
      <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-accent ${size === 'large' ? 'border-b-4 border-r-4' : 'border-b-2 border-r-2'}`}></div>
      <h1 className={`${size === 'large' ? 'text-4xl px-2 py-2' : 'text-xl px-2 py-1 font-bold'} text-black uppercase tracking-wider text`}>
        {children}
      </h1>
    </div>
  );
}