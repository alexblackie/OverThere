const process = require("process")

module.exports = async function (context, req) {
  const targetUrl =
    "https://" +
    process.env.TARGET_HOSTNAME +
    "/" +
    (context.bindingData.path || "")

  const responseMessage = `<p>You are being <a href="${targetUrl}">redirected</a></p>\n`

  context.res = {
    status: 302,
    headers: {"Location": targetUrl},
    body: responseMessage
  };
}
