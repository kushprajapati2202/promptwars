'use client';

import { useEffect } from 'react';
import { initializeStore } from '@/store/usePlannerStore';

export default function StoreInitializer() {
  useEffect(() => {
    initializeStore();
  }, []);

  return null;
}
