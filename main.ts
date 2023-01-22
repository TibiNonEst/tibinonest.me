import Server from "lume/core/server.ts";
import notFound from "lume/middlewares/not_found.ts";

const server = new Server({
	port: 8000,
	root: `${Deno.cwd()}/_site`
});

function redirect(location: string, code = 301): Response {
	return new Response(null, { status: code, headers: { location }})
}

server.use(async (request, next) => {
	const { pathname } = new URL(request.url);

	switch (pathname) {
		case "/index.html":
		case "/index":
			return redirect("/");
		case "/ssh":
			return redirect("https://github.com/TibiNonEst.keys");
		case "/pgp":
			return redirect("https://github.com/TibiNonEst.gpg");
	}

	return await next(request);
});

server.use(notFound({ root: `${Deno.cwd()}/_site`, page404: "404/" }));

server.start();

console.log("Listening on http://localhost:8000");
