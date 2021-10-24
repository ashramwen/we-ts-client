export interface Cw {
  sc: number;
  w: string;
  wp: string;
  rl: string;
  wb: number;
  wc: number;
  we: number;
}

export interface W {
  cw: Cw[];
  wb: number;
  we: number;
}

export interface Rt {
  ws: W[];
}

export interface St {
  rt: Rt[];
  bg: string;
  type: string;
  ed: string;
}

export interface Cn {
  st: St;
}

export interface WSData {
  seg_id: number;
  cn: Cn;
  ls: boolean;
}

export interface WSMessage {
  action: string;
  code: string;
  data: string;
  desc: string;
  sid: string;
}
