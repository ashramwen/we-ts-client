function to16kHz(buffer: Float32Array) {
  const data = new Float32Array(buffer);
  const fitCount = Math.round(data.length * (16000 / 44100));
  const newData = new Float32Array(fitCount);
  const springFactor = (data.length - 1) / (fitCount - 1);
  newData[0] = data[0];
  for (let i = 1; i < fitCount - 1; i++) {
    const tmp = i * springFactor;
    const before = Number(Math.floor(tmp).toFixed());
    const after = Number(Math.ceil(tmp).toFixed());
    const atPoint = tmp - before;
    newData[i] = data[before] + (data[after] - data[before]) * atPoint;
  }
  newData[fitCount - 1] = data[data.length - 1];
  return newData;
}

function to16BitPCM(input: Float32Array) {
  const dataLength = input.length * (16 / 8);
  const dataBuffer = new ArrayBuffer(dataLength);
  const dataView = new DataView(dataBuffer);
  let offset = 0;
  for (let i = 0; i < input.length; i++, offset += 2) {
    const s = Math.max(-1, Math.min(1, input[i]));
    dataView.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return Array.from(new Int8Array(dataView.buffer));
}

export function toPcm(buffer: Float32Array): number[] {
  const bufTo16kHz = to16kHz(buffer);
  const bufTo16BitPCM = to16BitPCM(bufTo16kHz);
  return bufTo16BitPCM;
}
