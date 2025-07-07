# 🛠️ DocSign Server

This is the **Express + MongoDB backend** for the DocSign Application. It handles user auth, document uploads, signature placement, OTP verification, and public signing workflows.

## 🌟 Features

- JWT-based authentication
- OTP email verification using Nodemailer
- Upload documents and store metadata
- Save signatures with coordinates (signed/pending/rejected)
- Generate public signing links with audit logging
- Serve PDFs securely via file path

## 🧱 Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT + Cookies
- Nodemailer
- Multer (file upload)
- CORS, dotenv
- Deployed on [Render](https://render.com)
your-username/DocSign-server.git
   cd DocSign-server
