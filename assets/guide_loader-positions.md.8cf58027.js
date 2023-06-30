import{_ as o,c as a,o as e,a as n,b as s}from"./app.9013c3dc.js";const w=JSON.parse('{"title":"Loader positions","description":"","frontmatter":{},"headers":[],"relativePath":"guide/loader-positions.md"}'),l={name:"guide/loader-positions.md"},t=n('<h1 id="loader-positions" tabindex="-1">Loader positions <a class="header-anchor" href="#loader-positions" aria-hidden="true">#</a></h1><p><strong>vue-eternal-loading</strong> offers 4 loader positions: <code>top</code>, <code>left</code>, <code>right</code>, <code>bottom</code>. We used bottom position in examples before ( means that <strong>vue-eternal-loading</strong> component was below loaded items ). We shouldn&#39;t pass any prop to tell where our component is if we want to put it in the bottom or in the right. But we have to pass special props for top / left positions. Why that?</p><p>It&#39;s because if you load new content which you put to the bottom or to the right of container, it doesn&#39;t affect scroll position towards our content.</p><p>In other words if you scroll 100 pixels down, and then put 200 pixels of new content to the end, it would be okay, because your top content and your scroll are in the same positions. Same rules can be applied to the right loader position:</p>',4),p=s("iframe",{width:"100%",height:"300",src:"//jsfiddle.net/gavrashenko/8u150Lpk/59/embedded/result/dark/",allowfullscreen:"allowfullscreen",allowpaymentrequest:"",frameborder:"0"},null,-1),r=n(`<p>As you see, we just put loader to the right using css, nothing else, and everything works great!</p><p>It won&#39;t work the same way if we just put loader to the top or to the left. Because if put some new content to the top / left - browser will preserve our scroll, but the content in the same scroll position will be different, and we need to change scroll position to the difference between old &amp; new scroll content sizes.</p><p>Luckily, all this calculations make <strong>vue-eternal-loading</strong>.</p><p>We need to pass prop <code>position</code>, which can accept following values:</p><ul><li><strong>default</strong> - it&#39;s a default value for bottom / right positions, you don&#39;t need to specify it manually</li><li><strong>top</strong> - if loader is above the items</li><li><strong>left</strong> - if loader is on the left of the items.</li></ul><p>If your scroll area is the whole document it&#39;s enough. But if your scroll area is a custom element you need to pass this element via prop <code>container</code>. It&#39;s required because we need to change scroll position and it&#39;s important to know where the scroll is:</p><div class="language-html"><button class="copy"></button><span class="lang">html</span><pre><code><span class="line"><span style="color:#676E95;">&lt;!-- Make container scrollable --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">ref</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">containerRef</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">height: 500px; overflow-y:auto</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">&lt;!-- Pass \`position\` and \`container\` props --&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">VueEternalLoading</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:load</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">load</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">position</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">top</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">:container</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">containerRef</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">VueEternalLoading</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#676E95;">&lt;!-- Render items here --&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><div class="language-js"><button class="copy"></button><span class="lang">js</span><pre><code><span class="line"><span style="color:#82AAFF;">setup</span><span style="color:#A6ACCD;">() </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// Other props</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// ...</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">containerRef</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">    </span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// Other methods</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;">// ...</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">load</span><span style="color:#89DDFF;">({</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">loaded</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">})</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// Load logic</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">load</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">      </span><span style="color:#A6ACCD;">containerRef</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#89DDFF;">      </span><span style="color:#676E95;">// Other data</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span></code></pre></div><p>Top scroll example:</p>`,9),c=s("iframe",{width:"100%",height:"300",src:"//jsfiddle.net/gavrashenko/j2ystkcf/20/embedded/result/dark/",allowfullscreen:"allowfullscreen",allowpaymentrequest:"",frameborder:"0"},null,-1),i=s("p",null,"Left scroll example:",-1),d=s("iframe",{width:"100%",height:"300",src:"//jsfiddle.net/gavrashenko/eLoqnbaz/30/embedded/result/dark/",allowfullscreen:"allowfullscreen",allowpaymentrequest:"",frameborder:"0"},null,-1),y=[t,p,r,c,i,d];function F(D,u,h,f,g,m){return e(),a("div",null,y)}const A=o(l,[["render",F]]);export{w as __pageData,A as default};