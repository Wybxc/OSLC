import type { NextApiRequest, NextApiResponse } from 'next';

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { parse } from 'csv-parse';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface CompatibilityData {
  licenses: string[];
  data: { [key: string]: string[] };
}

let compatibilityData: CompatibilityData | null = null;

export default async function compatibility(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const licenseA = req.query.a ?? '';
  const licenseB = req.query.b ?? '';
  if (typeof licenseA !== 'string' || typeof licenseB !== 'string') {
    return res.status(400).json({ error: 'Invalid query arguments' });
  }

  if (compatibilityData === null) {
    compatibilityData = {
      licenses: [],
      data: {},
    };
    const parser = fs.createReadStream(`${__dirname}/compatibility.csv`).pipe(
      parse({
        delimiter: ',',
        trim: true,
      })
    );
    for await (const record of parser) {
      if (record[0] === 'license') {
        compatibilityData.licenses = record.slice(1);
      }
      const license = record[0];
      const data = record.slice(1);
      compatibilityData.data[license] = data;
    }
  }

  if (licenseA && licenseB) {
    const indexA = compatibilityData.licenses.indexOf(licenseA);
    const indexB = compatibilityData.licenses.indexOf(licenseB);
    if (indexA === -1 || indexB === -1) {
      return res.status(400).json({ error: 'Invalid license name' });
    }
    return res.status(200).json({
      data: compatibilityData.data[licenseB][indexA],
    });
  }
  if (licenseA) {
    const indexA = compatibilityData.licenses.indexOf(licenseA);
    if (indexA === -1) {
      return res.status(400).json({ error: 'Invalid license name' });
    }
    const data = Object.fromEntries(
      compatibilityData.licenses.map((license) => [
        license,
        compatibilityData!.data[license][indexA],
      ])
    );
    return res.status(200).json({ data });
  }
  if (licenseB) {
    const indexB = compatibilityData.licenses.indexOf(licenseB);
    if (indexB === -1) {
      return res.status(400).json({ error: 'Invalid license name' });
    }
    const data = Object.fromEntries(
      compatibilityData.licenses.map((license, index) => [
        license,
        compatibilityData!.data[licenseB][index],
      ])
    );
    return res.status(200).json({ data });
  }

  res.status(200).json({ licenseA, licenseB });
}
