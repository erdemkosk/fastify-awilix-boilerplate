export function onSend() {
  const wrapOnSendHook = async (request, reply, payload) => {
    if (typeof payload === 'object') {
      return { data: payload };
    }
    return payload;
  };

  return [wrapOnSendHook];
}
