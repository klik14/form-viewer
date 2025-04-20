import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid or missing ID' }, { status: 400 });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = '1vVizATOZnrr0XRSlD247eBSLu8bADdNxc98WQTGnqHU';
    const sheetName = 'Відповіді форми (1)';
    const range = `${sheetName}!A${Number(id) + 1}:AM${Number(id) + 1}`;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const data = response.data.values?.[0];
    if (!data || data.every(cell => !cell)) {
      return NextResponse.json({ error: 'No data found for this ID' }, { status: 404 });
    }

    const headers = (await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A1:AM1`,
    })).data.values?.[0];

    if (!headers) {
      return NextResponse.json({ error: 'No headers found' }, { status: 500 });
    }

    const excludedColumns = [0, 2, 3, 4, 5, 6];
    const result = headers
      .map((header, index) => {
        if (excludedColumns.includes(index)) return null;
        const answer = data[index] || ''; // Залишаємо відповідь як є, без форматування
        return { question: header, answer };
      })
      .filter((item): item is { question: string; answer: string } => item !== null && item.answer !== 
'');

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
