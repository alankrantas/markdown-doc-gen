# Markdown-Doc-Gen

A very simple web app that can generate Markdown documents to static web pages. You can maintain a public documentation site by *simply adding Markdown files* then build/deploy it to [Github Pages](https://pages.github.com/). 

This web app can render Markdown (.md) documents into static web pages, just like any Svelte components, but they have to be under ```/src/routes``` to be accessible. For example, ```/src/routes/index.md``` can be accessed as ```<host>/<path>/index```. Most of the Markdown styles, code hightlights and HTML tags works.

![1](https://user-images.githubusercontent.com/44191076/176992155-794b458b-9136-4be5-9f80-fc03aa6940dd.png)

* Example site: **https://alankrantas.github.io/markdown-doc-gen**

This project is made with [Svelte](https://svelte.dev/)/[SvelteKit](https://kit.svelte.dev/) and several CSS tools:

* [vite-plugin-svelte-md](https://www.npmjs.com/package/vite-plugin-svelte-md)
* Several plugins from [markdown-it](https://www.npmjs.com/package/markdown-it)
* [github-markdown-css](https://www.npmjs.com/package/github-markdown-css)
* [highlight.js](https://www.npmjs.com/package/highlight.js?activeTab=readme)
* [Bootstrap](https://getbootstrap.com/)

## Modifying the Doc Site

```index.md``` is the default entry page. Any Markdown pages will be wrapped under ```/src/routes/__layout.svelte```, which also create a navigation section on the left. You can modify  ```/src/components/nav.svelte``` to create more links, or change the overall layout in ```__layout.svelte```.

You can still use normal Svelte components, including delete ```index.md``` and replace it with ```index.svelte``` and other pages.

### Bootstrap Styles

By default Markdown files are rendered with Github-like Markdown styles. But ```__layout.svelte``` also injected Bootstrap 5 styles so you can use them in HTML tags (not all of them will be working though):

```markdown
<div class="display-6 test-muted">
    *some texts*
</div>
```

### "Warning" Custom Container

By default this app only supports one custom container:

```markdown
::: warning
*Some warning contents*
:::
```

The package I've used will create a ```<div class="warning"></div>``` with no styles. In ```__layout.svelte``` there are some codes that will find all "warning" blocks and add some Bootstrap styles (grey alert box with white text). You can modify the code to get different styles, for example, the [HackMD](https://hackmd.io/s/features#Alert-Area) style.

If you want to change the container name, go to ```svelte.config.js``` and find

```js
[markdown_container, "warning"],
```

Change "warning" to other names you'd like (remember to modify ```__layout.svelte``` as well).

### Hyperlinks

Any Svelte components and Markdown files under ```/src/routes``` can be directly accessed by their names without extension. But if you want to use Markdown links, it has to be *full path*:

```markdown
[link name](https://<host>/<path>/filename)
```

Relative path (```/<path>/filename```) won't work since Svelte's routing system cannot work with non-root paths in Github Pages (unless you add it like in ```nav.svelte```).

## Use This Project

### Setup

Install Node.js, download the project and install dependencies:

```bash
npm install
```

### Run Dev Server

Test the project locally:

```bash
npm run dev
```

Then open ```localhost:3000```.

### Deploy Build to Github Pages

1. Create a new Github repo with README.md added.

2. Modify your deploy path and host to fit the Github repo:

```js
// svelte.config.js

const deploy_path = "/<your-repo-name>";
const deploy_host = "https://<your-github-user-name>.github.io";
...
```

These will be set to ```paths.base``` (relative routing path) and ```paths.assets``` (absolute path for static assets) so the production will not be able to test on local servers.

3. Create a production, setup the project with git then push it to the repo: (you can find the remote link in the menu of ```Code```)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-github-user-name>/<your-repo-name>.git
git pull origin main
npm run build
npm run deploy
```

The ```gh-pages``` package will upload ```./build``` to a new branch called "gh-pages".

You can go to Settings/Pages on your repo and should see "gh-pages" is selected as the site source. After a moment the site should be ready to access.

### Update Source Code

```
git add .
git commit -m "Updating"
git push origin master
```
