---
title: Bootstrap Demo
---

<div class="card shadow" style="width: 18rem;">
  <div class="card-body">
    <div class="card-title display-6">Card Title</div>
    <div class="card-text">
      <span class="lead text-muted">Many Bootstrap styles and HTML elements with JavaScript works in the Markdown doc too</span>
      <div class="p-2 m-2">
        <button id="clicks"
          class="btn btn-primary btn-lg"
          onclick="document.getElementById('clicks').innerHTML = Number(document.getElementById('clicks').innerHTML) + 1;"
          >0</button>
      </div>
    </div>
  </div>
</div>
