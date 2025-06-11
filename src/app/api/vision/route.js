import { writeFile, unlink } from 'fs/promises';
import path from 'path';
import os from 'os';
import { createWorker } from 'tesseract.js';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        const data = await req.formData();
        const file = data.get('file');

        if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const tempPath = path.join(os.tmpdir(), `ocr-${Date.now()}.jpg`);

        await writeFile(tempPath, buffer);

        const worker = await createWorker({
            logger: m => console.log(m),
            workerPath: require.resolve('tesseract.js/dist/worker.min.js')
        });

        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        const { data: { text } } = await worker.recognize(tempPath);

        await worker.terminate();
        await unlink(tempPath);

        return NextResponse.json({ text });
    } catch (err) {
        console.error('OCR Error:', err);
        return NextResponse.json({ error: 'OCR failed', detail: err.message }, { status: 500 });
    }
}