export interface ScreenDimensions {
  width: number;
  height: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
}

export function isMobile(): boolean {
  return window.innerWidth <= 768;
}

export function isTablet(): boolean {
  return window.innerWidth > 768 && window.innerWidth <= 1024;
}

export function isDesktop(): boolean {
  return window.innerWidth > 1024;
}

export function isLandscape(): boolean {
  return window.innerWidth > window.innerHeight;
}

export function isPortrait(): boolean {
  return window.innerHeight > window.innerWidth;
}

export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
}

export function getScreenDimensions(): ScreenDimensions {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    isMobile: isMobile(),
    isTablet: isTablet(),
    isDesktop: isDesktop(),
    isLandscape: isLandscape(),
    isPortrait: isPortrait()
  };
} 