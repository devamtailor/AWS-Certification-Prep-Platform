# AWS CertPrep

A lightweight study platform for AWS Certified Cloud Practitioner prep.

## What this is

A static site built with HTML, CSS, and JavaScript to help organize study notes, review practice exams, and track progress.

## Run locally

From the project folder:

```bash
npm install
npx http-server . -p 3001
```

Then open:

```text
http://127.0.0.1:3001
```

## Notes

- The main entry file is `index.html`
- Static assets live under `assets/`
- Practice exam content is stored in `practice-exam/`
- Study sections are stored in `sections/`

## Deployment

This site can be hosted on any static hosting platform: GitHub Pages, Netlify, Vercel, S3, and others.

Just point the host to the project root and make sure `index.html` is served as the default page.

