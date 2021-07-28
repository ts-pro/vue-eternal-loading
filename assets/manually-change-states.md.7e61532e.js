import{o as n,c as s,d as a,a as t}from"./app.a28aa1ac.js";const p='{"title":"Manually Change States","description":"","frontmatter":{},"relativePath":"manually-change-states.md","lastUpdated":1627452428404}',o={},e=a('<h1 id="manually-change-states"><a class="header-anchor" href="#manually-change-states" aria-hidden="true">#</a> Manually Change States</h1><p><strong>vue-eternal-loading</strong> allows changing state manually. It can be useful if we have more complex or custom logic than offers <code>loaded</code> callback.</p><p>Let&#39;s write logic where we don&#39;t rely on current page size, but we can use other fields in the response ( e.g. <strong>page</strong>, <strong>total_pages</strong> ). Using those fields we know that if current page number equals total pages count - there should be <strong>no-more</strong>.</p><div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> loaded<span class="token punctuation">,</span> noMore <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Load data from server</span>\n  <span class="token comment">// ...</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>page <span class="token operator">&lt;</span> response<span class="token punctuation">.</span>total_pages<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token function">loaded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token function">noMore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div>',4),c=t("iframe",{width:"100%",height:"300",src:"//jsfiddle.net/gavrashenko/mqsh4kbr/9/embedded/result/dark/",allowfullscreen:"allowfullscreen",allowpaymentrequest:"",frameborder:"0"},null,-1),l=a('<hr><p>Let&#39;s set <strong>no-results</strong> state if we got empty response for the first loading. For this case we need to use second argument in <code>load</code> prop method. It&#39;s a payload which contains <code>isFirstLoad</code> flag.</p><div class="language-js"><pre><code><span class="token keyword">function</span> <span class="token function">load</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> loaded<span class="token punctuation">,</span> noMore<span class="token punctuation">,</span> noResults <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token punctuation">{</span> isFirstLoad <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Load data from server</span>\n  <span class="token comment">// ...</span>\n  <span class="token keyword">if</span> <span class="token punctuation">(</span>items<span class="token punctuation">.</span>length <span class="token operator">===</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">if</span> <span class="token punctuation">(</span>isFirstLoad<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n      <span class="token function">noResults</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n      <span class="token function">noMore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>\n    <span class="token function">loaded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</code></pre></div>',3),u=t("iframe",{width:"100%",height:"300",src:"//jsfiddle.net/gavrashenko/hs5up20d/8/embedded/result/dark/",allowfullscreen:"allowfullscreen",allowpaymentrequest:"",frameborder:"0"},null,-1),r=a('<hr><p>It&#39;s a good practice to handle errors in the app, and show clear feedback to a user. That&#39;s why we offer <strong>error</strong> state. You should set this state manually if something bad have happened in your opinion, and we need to show error message to a user. Let&#39;s set error state if we get error response from a server, and show custom error message to a user, using <code>#error</code> slot.</p><div class="language-html"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>vue-eternal-loading</span> <span class="token attr-name">:load</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>load<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span> <span class="token attr-name">#error</span><span class="token punctuation">&gt;</span></span>\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>error<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>\n        Oops! Looks like we&#39;ve got an error.\n      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>vue-eternal-loading</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><div class="language-js"><pre><code><span class="token function">load</span><span class="token punctuation">(</span><span class="token parameter"><span class="token punctuation">{</span> loaded<span class="token punctuation">,</span> error <span class="token punctuation">}</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token comment">// Load users from server</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">loadUsers</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>page<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">users</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token comment">// Add users to an array</span>\n    <span class="token comment">// ...</span>\n    <span class="token function">loaded</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>\n    <span class="token function">error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span><span class="token punctuation">)</span>\n<span class="token punctuation">}</span>\n</code></pre></div>',4),i=t("iframe",{width:"100%",height:"300",src:"//jsfiddle.net/gavrashenko/kbvtjnc0/41/embedded/result/dark/",allowfullscreen:"allowfullscreen",allowpaymentrequest:"",frameborder:"0"},null,-1);o.render=function(a,t,p,o,k,d){return n(),s("div",null,[e,c,l,u,r,i])};export default o;export{p as __pageData};
