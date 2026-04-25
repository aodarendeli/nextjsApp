'use client';

import React from 'react';
import '@/i18n/index';

export function I18nextProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
