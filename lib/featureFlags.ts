import fs from 'fs';
import path from 'path';

export type FeatureFlags = {
  showServices: boolean;
};

const DEFAULT_FLAGS: FeatureFlags = {
  showServices: true
};

const FLAGS_PATH = path.join(process.cwd(), 'data', 'feature-flags.json');

export function getFeatureFlags(): FeatureFlags {
  try {
    const raw = fs.readFileSync(FLAGS_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return {
      showServices: typeof parsed.showServices === 'boolean' ? parsed.showServices : DEFAULT_FLAGS.showServices
    };
  } catch {
    return DEFAULT_FLAGS;
  }
}

export function setFeatureFlags(next: FeatureFlags): FeatureFlags {
  const safe: FeatureFlags = {
    showServices: !!next.showServices
  };

  fs.mkdirSync(path.dirname(FLAGS_PATH), { recursive: true });
  fs.writeFileSync(FLAGS_PATH, JSON.stringify(safe, null, 2) + '\n', 'utf8');
  return safe;
}
