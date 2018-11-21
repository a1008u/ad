import * as fs from 'fs'; // <-- テスト対象が依存するモジュール

export function LineCount (path: string): number {
  const data = fs.readFileSync(path, 'utf8'); // <-- readFileSync()をモック化したい
  return data.split('\n').length;
}

export default LineCount;