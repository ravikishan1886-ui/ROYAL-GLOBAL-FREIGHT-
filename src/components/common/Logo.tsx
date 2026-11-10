import React from 'react';

export const OFFICIAL_LOGO_IMAGE = '/assets/aistudio/file_000000002b3c8208aa2c073557e13cb3_eeff9ba8.png';

interface LogoProps {
  variant?: 'horizontal' | 'icon' | 'monogram';
  theme?: 'dark' | 'light'; // dark = placed on dark navy background, light = placed on white/light background
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withTagline?: boolean;
  showText?: boolean;
  imgStyle?: React.CSSProperties;
  titleStyle?: React.CSSProperties;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'light',
  className = '',
  size = 'md',
  withTagline = true,
  showText = true,
  imgStyle,
  titleStyle
}) => {
  const isDark = theme === 'dark';

  // Responsive image height specs maintaining strict aspect ratio
  const imageHeightClasses = {
    sm: 'h-10 sm:h-11',
    md: 'h-12 sm:h-14 md:h-16',
    lg: 'h-16 sm:h-20',
    xl: 'h-20 sm:h-28'
  }[size];

  // Font size classes for the prominent corporate company name
  const titleClasses = {
    sm: 'text-xs sm:text-sm tracking-wider',
    md: 'text-sm sm:text-base md:text-lg lg:text-xl tracking-tight sm:tracking-normal',
    lg: 'text-lg sm:text-xl md:text-2xl tracking-normal',
    xl: 'text-2xl sm:text-3xl md:text-4xl tracking-tight'
  }[size];

  // Tagline typography classes
  const taglineClasses = {
    sm: 'text-[8px] sm:text-[9px] tracking-widest',
    md: 'text-[9px] sm:text-[10px] md:text-[11px] tracking-wider sm:tracking-widest',
    lg: 'text-[11px] sm:text-xs tracking-widest',
    xl: 'text-xs sm:text-sm tracking-widest'
  }[size];

  // Icon / Monogram Only
  if (variant === 'icon' || variant === 'monogram' || !showText) {
    return (
      <div className={`inline-flex items-center group cursor-pointer ${className}`}>
        <img
          src={OFFICIAL_LOGO_IMAGE}
          alt="Royal Global Freight Logo Emblem"
          style={imgStyle}
          className={`${imageHeightClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
        />
      </div>
    );
  }

  // Full Horizontal Corporate Brand Lockup
  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 group cursor-pointer ${className}`}>
      {/* High-Resolution Emblem on Transparent Background with strict aspect ratio */}
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src={OFFICIAL_LOGO_IMAGE}
          alt="Royal Global Freight Official Emblem"
          style={imgStyle}
          className={`${imageHeightClasses} w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03] drop-shadow-sm`}
        />
      </div>

      {/* Prominent Full Company Name Typography */}
      <div className="flex flex-col justify-center text-left select-none">
        <span
          style={titleStyle}
          className={`font-['Montserrat',sans-serif] font-black uppercase leading-tight transition-colors duration-200 ${titleClasses} ${
            isDark
              ? 'text-white group-hover:text-[#DFBF7A]'
              : 'text-[#071B36] group-hover:text-[#0A2242]'
          }`}
        >
          ROYAL GLOBAL FREIGHT
        </span>
        
        {withTagline && (
          <span
            className={`font-['Montserrat',sans-serif] font-bold uppercase transition-colors duration-200 ${taglineClasses} ${
              isDark
                ? 'text-[#DFBF7A]'
                : 'text-[#A88038]'
            }`}
          >
            Connecting Businesses. Moving the World.
          </span>
        )}
      </div>
    </div>
  );
};
