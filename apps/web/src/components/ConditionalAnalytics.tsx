'use client';

import { useEffect, useState } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

interface ConditionalAnalyticsProps {
  enableVercelAnalytics: boolean;
}

export default function ConditionalAnalytics({ enableVercelAnalytics }: ConditionalAnalyticsProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !enableVercelAnalytics) {
    return null;
  }

  return <VercelAnalytics />;
}
