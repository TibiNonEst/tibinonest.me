import lume from "lume/mod.ts";
import nav from "lume/plugins/nav.ts";
import sass from "lume/plugins/sass.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import terser from "lume/plugins/terser.ts";
import sitemap from "lume/plugins/sitemap.ts";
import minifyHTML from "lume/plugins/minify_html.ts";

const site = lume({
	src: "./src",
	location: new URL("https://tibinonest.me"),
	server: {
		page404: "404/"
	}
});

site.use(nav());
site.use(sass({ includes: "_styles" }));
site.use(lightningCss());
site.use(terser());
site.use(sitemap({ query: "index!=false" }));
site.use(minifyHTML({
	options: {
		do_not_minify_doctype: true,
		ensure_spec_compliant_unquoted_attribute_values: true,
		keep_spaces_between_attributes: true
	}
}));

site.copy("static", ".");

export default site;
