import React from 'react';

interface TruncatedTextProps {
  text: string;
  maxWidth?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({ 
  text, 
  maxWidth = 200, 
  className = '',
  style = {}
}) => {
  return (
    <div 
      className={className}
      style={{ 
        maxWidth: typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth,
        overflow: 'hidden', 
        textOverflow: 'ellipsis', 
        whiteSpace: 'nowrap',
        ...style
      }}
      title={text}
    >
      {text}
    </div>
  );
};

export default TruncatedText; 