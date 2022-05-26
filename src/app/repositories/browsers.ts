const browsers: Record<string, () => () => void> = {};

let finalise = () => {};

export function Register(name: string, focus: () => () => void) {
  browsers[name] = focus;
}

export function Focus(name: string) {
  finalise();
  finalise = browsers[name]();
}

export function Close() {
  finalise();
  finalise = () => {};
}
