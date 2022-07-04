<script lang="ts">
	import { tick, onMount } from "svelte";
	import Nav from "../components/nav.svelte";

	import "bootstrap/dist/css/bootstrap.min.css";
	import "github-markdown-css/github-markdown.css";
	import "highlight.js/styles/github.css";
	import hljs from "highlight.js";

	onMount(async () => {
		await tick();
		hljs.highlightAll();
		const elements = document.getElementsByClassName("warning");
		for (let i = 0; i < elements.length; i++) {
			elements
				.item(i)
				?.setAttribute(
					"class",
					"p-2 m-2 text-light bg-secondary rounded-2"
				);
		}
	});
</script>

<div class="container-fluid">
	<div class="row">
		<div class="p-3 m-3 col-2"><Nav /></div>
		<div class="p-3 m-3 col-8"><slot /></div>
	</div>
</div>
