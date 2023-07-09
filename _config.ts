import lume from "lume/mod.ts";
import remark from "lume/plugins/remark.ts";
import a11yEmoji from 'npm:@fec/remark-a11y-emoji';
import picture from "lume/plugins/picture.ts";
import imagick from "lume/plugins/imagick.ts";
import sass from "lume/plugins/sass.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import terser from "lume/plugins/terser.ts";
import modifyUrls from "lume/plugins/modify_urls.ts";
import sitemap from "lume/plugins/sitemap.ts";
import minifyHTML from "lume/plugins/minify_html.ts";

const site = lume({
	src: "./src",
	location: new URL("https://tibinonest.me"),
	prettyUrls: false,
	server: {
		page404: "404.html"
	}
});

site.remoteFile("assets/tibs.png", "https://cdn.tibinonest.me/tibs.png");
site.remoteFile("_styles/vendor/_normalize.scss", "https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.css");
site.remoteFile("_styles/vendor/_catppuccin.scss", "https://cdn.jsdelivr.net/gh/catppuccin/palette/scss/_catppuccin.scss");

site.use(remark({ remarkPlugins: [a11yEmoji] }));
site.use(picture());
site.use(imagick());
site.use(sass({ includes: "_styles" }));
site.use(lightningCss());
site.use(terser());
site.use(modifyUrls({ fn: url => url.endsWith(".html") ? url.slice(0, -5) : url }));
site.use(sitemap({
	lastmod: _ => new Date(),
	changefreq: _ => "monthly",
	priority: data => data.url?.toString().endsWith("index.html") ? 1 : 0.8
}));
site.use(minifyHTML({
	options: {
		do_not_minify_doctype: true,
		ensure_spec_compliant_unquoted_attribute_values: true,
		keep_spaces_between_attributes: true
	}
}));

// A hack for getting the correct urls in the sitemap
site.process([".xml"], page => {
	if (page.src.slug !== "sitemap" || !page.content) {
		return;
	}

	page.content = page.content.toString().replaceAll(/\/index|\.html/g, "");
});

site.copy("static", ".");

export default site;
