# BillBuddy

BillBuddy is a real-time collaborative bill-splitting web application that allows users to upload restaurant receipts, automatically extract receipt items using OCR, and collaboratively claim purchased items through a shared session link.

Built with:
- Next.js 14
- TypeScript
- Tailwind CSS
- FastAPI
- Firebase Firestore
- Tesseract OCR
- Docker

## Features

- OCR-based receipt scanning
- Automatic item extraction
- Real-time collaborative bill splitting
- Quantity-based item claiming
- Live synchronization using Firebase
- Mobile-responsive interface

## Tech Stack

### Frontend
- Next.js
- Tailwind CSS
- Firebase Firestore

### Backend
- FastAPI
- Python
- Tesseract OCR

### Deployment
- Vercel
- Render + Docker

## Local Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```
### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
### ENV Variables
Create env.local in front end

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```