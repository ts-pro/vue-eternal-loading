import{_ as e,c as t,o,a as l}from"./app.9013c3dc.js";const m=JSON.parse('{"title":"Slots","description":"","frontmatter":{},"headers":[{"level":2,"title":"#loading","slug":"loading","link":"#loading","children":[]},{"level":2,"title":"#noMore","slug":"nomore","link":"#nomore","children":[]},{"level":2,"title":"#noResults","slug":"noresults","link":"#noresults","children":[]},{"level":2,"title":"#error","slug":"error","link":"#error","children":[]}],"relativePath":"api/slots.md"}'),a={name:"api/slots.md"},d=l('<h1 id="slots" tabindex="-1">Slots <a class="header-anchor" href="#slots" aria-hidden="true">#</a></h1><h2 id="loading" tabindex="-1">#loading <a class="header-anchor" href="#loading" aria-hidden="true">#</a></h2><ul><li>Default: <code>&lt;div class=&quot;loading&quot;&gt;Loading...&lt;/div&gt;</code></li></ul><p>Renders normal loading state when try to load more content.</p><ul><li>Available scoped slot data: <ul><li><code>isFirstLoad</code> - indicates whether it was first load <code>&lt;template #loading=&quot;{ isFirstLoad }&quot;&gt; ... &lt;/template&gt;</code></li></ul></li></ul><h2 id="nomore" tabindex="-1">#noMore <a class="header-anchor" href="#nomore" aria-hidden="true">#</a></h2><ul><li>Default: <code>&lt;div class=&quot;no-more&quot;&gt;No more.&lt;/div&gt;</code></li></ul><p>Renders state when we don&#39;t have more new content and there is no need to make further loading.</p><ul><li>Available scoped slot data (added in <code>v1.1.0</code>): <ul><li><code>retry</code> - activates <code>loading</code> state again <code>&lt;template #noMore=&quot;{ retry }&quot;&gt; ... &lt;button @click=&quot;retry&quot;&gt;Retry&lt;/button&gt; &lt;/template&gt;</code></li></ul></li></ul><h2 id="noresults" tabindex="-1">#noResults <a class="header-anchor" href="#noresults" aria-hidden="true">#</a></h2><ul><li>Default: <code>&lt;div class=&quot;no-results&quot;&gt;No results.&lt;/div&gt;</code></li></ul><p>Renders case when we don&#39;t have even 1 item loaded.</p><ul><li>Available scoped slot data (added in <code>v1.1.0</code>): <ul><li><code>retry</code> - activates <code>loading</code> state again <code>&lt;template #noResults=&quot;{ retry }&quot;&gt; ... &lt;button @click=&quot;retry&quot;&gt;Retry&lt;/button&gt; &lt;/template&gt;</code></li></ul></li></ul><h2 id="error" tabindex="-1">#error <a class="header-anchor" href="#error" aria-hidden="true">#</a></h2><ul><li>Default: <code>&lt;div class=&quot;error&quot;&gt;Error.&lt;/div&gt;</code></li></ul><p>Renders case when we caught an error.</p><ul><li>Available scoped slot data (added in <code>v1.1.0</code>): <ul><li><code>retry</code> - activates <code>loading</code> state again <code>&lt;template #error=&quot;{ retry }&quot;&gt; ... &lt;button @click=&quot;retry&quot;&gt;Retry&lt;/button&gt; &lt;/template&gt;</code></li></ul></li></ul>',17),r=[d];function i(n,s,c,u,h,g){return o(),t("div",null,r)}const v=e(a,[["render",i]]);export{m as __pageData,v as default};
