export async function onRequest({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/oauth_state=([^;]+)/);
  if (!match || match[1] !== state) return new Response("state错误", {status:400});

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {"Content-Type":"application/json","Accept":"application/json"},
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code
    })
  });
  const tokenData = await tokenRes.json();
  return new Response(`
    <script>
      window.opener.postMessage({token:"${tokenData.access_token}"}, "*");
      window.close();
    </script>
  `, {headers:{"Content-Type":"text/html"}});
}