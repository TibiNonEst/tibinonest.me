import Server from "lume/core/server.ts";
import notFound from "lume/middlewares/not_found.ts";

const server = new Server({
	root: `${Deno.cwd()}/_site`,
	port: 8000
});

server.use(async (request, next) => {
	const { pathname } = new URL(request.url);

	if (pathname.endsWith("/index.html") || pathname.endsWith("/index")) {
		return await next(new Request(request.url + "this will 404", request));
	}

	return await next(request);
});

server.use(notFound({ root: `${Deno.cwd()}/_site`, page404: "404.html" }));

console.log("Listening on http://localhost:8000");

await server.start();
