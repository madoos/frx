export interface ObserverProtocol<T> {
  next: (val: T) => void;
  error: (error: unknown) => void;
  complete: () => void;
}

export interface UnsubscribeProtocol {
  unsubscribe: () => void;
}

export interface ObservableProtocol<T> {
  subscribe: (observer: ObserverProtocol<T>) => UnsubscribeProtocol;
}

export interface ObservableConstructable<T> {
  new (
    producer: (observer: ObserverProtocol<T>) => void
  ): ObservableProtocol<T>;
}
