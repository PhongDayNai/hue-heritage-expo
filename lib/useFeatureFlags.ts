'use client';

import { useEffect, useState } from 'react';

type FeatureFlags = {
  showServices: boolean;
};

const DEFAULT_FLAGS: FeatureFlags = {
  showServices: true
};

export function useFeatureFlags() {
  const [flags, setFlags] = useState<FeatureFlags>(DEFAULT_FLAGS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    fetch('/api/admin/feature-flags', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : DEFAULT_FLAGS))
      .then((data) => {
        if (!mounted) return;
        setFlags({
          showServices: !!data.showServices
        });
      })
      .catch(() => {
        if (!mounted) return;
        setFlags(DEFAULT_FLAGS);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { flags, loading, setFlags };
}
