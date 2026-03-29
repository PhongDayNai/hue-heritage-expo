import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

type Entry = { title: string; href: string; section: string };

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd');

async function readJson<T = any>(name: string): Promise<T> {
  const p = path.join(process.cwd(), 'data', name);
  const raw = await fs.readFile(p, 'utf-8');
  return JSON.parse(raw) as T;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get('q') || '').trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ query: q, results: [] });
  }

  const [scenic, food, culture, services, news] = await Promise.all([
    readJson<any[]>('scenic.json'),
    readJson<any[]>('food.json'),
    readJson<any[]>('culture.json'),
    readJson<any[]>('services.json'),
    readJson<any[]>('news.json')
  ]);

  const entries: Entry[] = [
    ...scenic.map((x) => ({ title: x.tenDiaDiem || '', href: '/danh-lam', section: 'Danh lam' })),
    ...food.map((x) => ({ title: x.tenMon || '', href: '/am-thuc', section: 'Ẩm thực' })),
    ...culture.map((x) => ({ title: x.chuDe || '', href: '/van-hoa', section: 'Văn hóa' })),
    ...services.map((x) => ({ title: x.tenDichVu || '', href: '/dich-vu', section: 'Dịch vụ' })),
    ...news.map((x) => ({ title: x.tieuDe || '', href: '/tin-tuc', section: 'Tin tức' }))
  ].filter((x) => x.title);

  const nq = normalize(q);
  const scored = entries
    .map((e) => {
      const nt = normalize(e.title);
      let score = 0;
      if (nt === nq) score = 100;
      else if (nt.startsWith(nq)) score = 80;
      else if (nt.includes(nq)) score = 60;
      return { ...e, score };
    })
    .filter((e) => e.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ title, href, section }) => ({ title, href, section }));

  return NextResponse.json({ query: q, results: scored });
}
