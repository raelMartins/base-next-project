// src/utils/fix-icon.ts
import React from 'react';

export function fixIcon(Icon: any): React.ElementType {
  if (!Icon) return () => null;
  // If the icon is an object { default: Component }, return the component.
  return (Icon.default || Icon) as React.ElementType;
}
