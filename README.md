# Markdown-Doc-Gen

A proof-of-concept that can generate Markdown documents to static web pages. Made with [Svelte](https://svelte.dev/)/[SvelteKit](https://kit.svelte.dev/) and several CSS tools. You can maintain a public documentation site by *simply adding Markdown files* then build/deploy it to [[Github Pages](https://pages.github.com/). 

This web app can render Markdown (.md) documents under ```/src/routes``` into static web pages, just like any Svelte components. For example, ```/src/routes/index.md``` can be accessed as ```<host>/<path>/index```. Most of the Markdown styles, code hightlights and HTML tags are working.

![1](https://user-images.githubusercontent.com/44191076/176992155-794b458b-9136-4be5-9f80-fc03aa6940dd.png)

* Example site: **https://alankrantas.github.io/markdown-doc-gen**
* Example site branch: **https://github.com/alankrantas/markdown-doc-gen/tree/gh-pages**

## Modifying the Doc Site

```index.md``` is the default entry page. But any Markdown docs will be wrapped under ```/src/routes/__layout.svelte```, which also create a navigation section on the left. You can modify  ```/src/components/nav.svelte``` to create more links, or change the overall layout in ```__layout.svelte```.

You can also still use normal Svelte components, including delete ```index.md``` and replace it with ```index.svelte```.

### Bootstrap Styles

```__layout.svelte``` injected [Bootstrap](https://getbootstrap.com/) styles so you can actually use it to add style in Markdown docs:

```markdown
<div class="display-6">
    *some texts*
</div>
```

### "Warning" Custom Container

For now only one type of Markdown custom container is supported:

```markdown
::: warning
*Some warning contents*
:::
```

However the package I've used doesn't render styles for it, only create a ```<div class="warning"></div>```. So there is a section of code in ```__layout.svelte``` which will find all blocks with the class name "warning" and add some Bootstrap styles on them. You can modify the code if you want some different container styles.

If you want to change the container name, go to ```svelte.config.js``` 

```js
[markdown_container, "warning"],
```

And change "warning" to other names (remember to modify ```__layout.svelte``` as well).

### Hyperlinks

Any Svelte components and Markdown files under ```/src/routes``` can be directly accessed by their names (without extension). But if you want to use Markdown links, it has to be *full path*:

```markdown
[link name](https://<host>/<path>/filename)
```

Relative path (like ```/<path>/filename```) won't work in Svelte's routing system when the site is published via Github Pages.

## Use This Project

### Setup

Install Node.js, download the project and install dependencies:

```
npm install
```

### Run Dev Server

Test the project locally:

```
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

```
npm run build
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-github-user-name>/<your-repo-name>.git
git pull origin main
npm run deploy
```

The ```gh-pages``` package will upload ```./build``` to a new branch called "gh-pages".

You can go to Settings/Pages on your repo and should see "gh-pages" is selected as the site source. After a moment the site should be ready to access.