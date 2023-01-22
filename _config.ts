import lume from "lume/mod.ts";
import sass from "lume/plugins/sass.ts";
import lightningCss from "lume/plugins/lightningcss.ts";
import terser from "lume/plugins/terser.ts";
import minifyHTML from "lume/plugins/minify_html.ts";

const site = lume({
	src: "./src",
	server: {
		page404: "404/"
	}
});

site.use(sass({ includes: "_styles" }));
site.use(lightningCss());
site.use(terser());
site.use(minifyHTML({
	options: {
		do_not_minify_doctype: true,
		ensure_spec_compliant_unquoted_attribute_values: true,
		keep_spaces_between_attributes: true
	}
}));

export default site;
