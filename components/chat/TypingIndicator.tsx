interface TypingIndicatorProps {
    userName?: string;
    size?: 'sm' | 'md' | 'lg';
  }
  
  export function TypingIndicator({ userName, size = 'md' }: TypingIndicatorProps) {
    const sizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    };
    
    const dotSize = {
      sm: 'w-1.5 h-1.5',
      md: 'w-2 h-2',
      lg: 'w-2.5 h-2.5'
    };
    
    return (
      <div className={`flex items-center gap-2 ${sizeClasses[size]}`}>
        <div className="flex gap-1">
          <div 
            className={`${dotSize[size]} bg-indigo-400 rounded-full animate-bounce`} 
            style={{ animationDelay: '0ms' }} 
          />
          <div 
            className={`${dotSize[size]} bg-indigo-400 rounded-full animate-bounce`} 
            style={{ animationDelay: '150ms' }} 
          />
          <div 
            className={`${dotSize[size]} bg-indigo-400 rounded-full animate-bounce`} 
            style={{ animationDelay: '300ms' }} 
          />
        </div>
        <span className="text-slate-300">
          {userName ? `${userName} is typing...` : 'Typing...'}
        </span>
      </div>
    );
  }