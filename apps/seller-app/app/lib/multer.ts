// lib/multer.ts
import multer from "multer"
import { NextRequest } from "next/server";
import path from "path";
import fs from "fs";

// Ensure the upload directory exists
const uploadDir = "./public/temp";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Option 1: Use original filename (as in your code)
    cb(null, file.originalname);
    
    // Option 2: Use unique filename to prevent conflicts
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // const ext = path.extname(file.originalname);
    // const name = path.basename(file.originalname, ext);
    // cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

// File filter for validation (optional)
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Accept images only
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    // cb(new Error('Only image files are allowed!' ||), false);
  }
};

export const upload = multer({ 
  storage,
  // fileFilter, // Uncomment if you want file validation
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  }
});

// Utility function to run multer in Next.js API routes
export function runMulterMiddleware(
  req: NextRequest,
  res: any,
  fn: any
): Promise<any> {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

// Alternative: Custom middleware wrapper for Next.js
export const withFileUpload = (handler: any) => {
  return async (req: any, res: any) => {
    if (req.method === 'POST') {
      try {
        // Run multer middleware
        await runMulterMiddleware(req, res, upload.single('file'));
        return handler(req, res);
      } catch (error) {
        return res.status(400).json({ 
          error: 'File upload failed', 
          message: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    }
    return handler(req, res);
  };
};

// Type definitions for better TypeScript support
export interface MulterRequest extends NextRequest {
  file?: Express.Multer.File;
  files?: Express.Multer.File[] | { [fieldname: string]: Express.Multer.File[] };
}

// ============================================
// Usage Examples:
// ============================================

// 1. API Route: app/api/upload/route.ts
/*
import { NextRequest, NextResponse } from 'next/server';
import { upload, runMulterMiddleware } from '@/lib/multer';

export async function POST(request: NextRequest) {
  try {
    // Convert NextRequest to Express-like request
    const req = request as any;
    const res = {
      status: (code: number) => ({ json: (data: any) => data })
    };

    // Run multer middleware
    await runMulterMiddleware(req, res, upload.single('file'));

    return NextResponse.json({ 
      success: true, 
      filename: req.file?.filename,
      originalName: req.file?.originalname,
      size: req.file?.size
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 400 }
    );
  }
}
*/

// 2. Pages API Route: pages/api/upload.ts
/*
import type { NextApiRequest, NextApiResponse } from 'next';
import { withFileUpload } from '@/lib/multer';

interface ExtendedNextApiRequest extends NextApiRequest {
  file?: Express.Multer.File;
}

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    return res.status(200).json({
      success: true,
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path
    });
  } catch (error) {
    return res.status(500).json({ 
      error: 'Server error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}

export default withFileUpload(handler);

// Disable Next.js body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};
*/