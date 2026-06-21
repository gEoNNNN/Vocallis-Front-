class PCMProcessor extends AudioWorkletProcessor {
  constructor() {
    super()
    this._chunks = []
    this._len = 0
    this._target = 1600 // ~100ms la 16kHz — reduce overhead-ul WebSocket
  }

  process(inputs) {
    const channel = inputs[0]?.[0]
    if (channel?.length) {
      this._chunks.push(new Float32Array(channel))
      this._len += channel.length

      if (this._len >= this._target) {
        const out = new Int16Array(this._len)
        let offset = 0
        for (const chunk of this._chunks) {
          for (let i = 0; i < chunk.length; i++) {
            const s = Math.max(-1, Math.min(1, chunk[i]))
            out[offset++] = s < 0 ? s * 0x8000 : s * 0x7fff
          }
        }
        this.port.postMessage(out.buffer, [out.buffer])
        this._chunks = []
        this._len = 0
      }
    }
    return true
  }
}
registerProcessor('pcm-processor', PCMProcessor)
