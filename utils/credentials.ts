import * as XLSX from 'xlsx';

type Credential = {
  username: string;
  password: string;
};

export function readCredentialsFromExcel(filePath: string, sheetName: string = 'Sheet1'): Credential {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json<Credential>(sheet, { defval: '' });

  if (!data[0]) {
    throw new Error('No credentials found in Excel file.');
  }

  return data[0];
}
