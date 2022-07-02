<script lang="ts">
    import { base } from "$app/paths";

    const links = [
        {
            name: "Home",
            path: "/",
        },
        {
            name: "Markdown Demo",
            path: "/doc/page1",
        },
        {
            name: "Bootstrap Demo",
            path: "/doc/page2",
        },
    ];
</script>

<div>
    <ul class="nav flex-column">
        {#each links as link}
            <li class="nav-item">
                <a class="nav-link" href="{base}{link.path}"> {link.name} </a>
            </li>
        {/each}
    </ul>
</div>
