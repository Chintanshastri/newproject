import * as XLSX from 'xlsx';
import * as path from 'path';

export function readUrlFromExcel(filePath: string): string {
  const absolutePath = path.resolve(filePath);
  const workbook = XLSX.readFile(absolutePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: '' });
  // const jsonData = XLSX.utils.sheet_to_json<{ URL: string }>(worksheet, { defval: '' });
  const url = jsonData[0]?.['URL'];
  if (!url) {
    throw new Error('No URL found in the Excel file.');
  }

  return url;
}