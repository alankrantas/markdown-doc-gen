# Markdown-Doc-Gen

A proof-of-concept that can generate Markdown documents to static web pages. Wrapped under Svelte/SvelteKit and several CSS tools.

This web app can render Markdown (.md) documents under ```/src/routes/doc``` into static web pages, just like any Svelte components. For example, ```/src/routes/doc/Main.md``` can be accessed as ```/doc/Main```.

```Main.md``` is also the default page to be shown. You can modify this route in ```/src/index.svelte```. You can also still use Svelte components if you like. You can use HTML tags, JavaScript and many Bootstrap style classes in the Markdown file as well.

## Setup

Install Node.js, download the project and install dependencies:

```
npm install
```

## Run Dev Server

```
npm run dev
```

Then open ```localhost:3000```.

### Build Production

```
npm run build
```
