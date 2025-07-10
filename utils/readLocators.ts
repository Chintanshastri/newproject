import * as XLSX from 'xlsx';

export type LocatorData = {
  ElementName: string;
  LocatorType: string;
  LocatorValue: string;
};

export function readLocatorsFromExcel(filePath: string): Record<string, LocatorData> {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const jsonData: LocatorData[] = XLSX.utils.sheet_to_json(worksheet);

  const locators: Record<string, LocatorData> = {};

  for (const entry of jsonData) {
    locators[entry.ElementName] = entry;
  }

  return locators;
}